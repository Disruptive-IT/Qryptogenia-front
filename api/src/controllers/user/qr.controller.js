import prisma from "../../lib/prisma.js";
import { getDate } from "../../utils/dateUtils.js";
import { useSend } from "../../utils/useSend.js";

const generateQrDataValue = (userId, qrType, qrData) => {
  let qrDataValue = qrData.qr.data; 

  if (qrType.type !== "website url" && qrType.type !== "pdf") {
    // const encryptedUserId = encrypt(userId.toString()); 
    const serverUrl = "http://localhost:5173/qr";
    qrDataValue = `${serverUrl}/${userId}/algomas`;
  }

  return qrDataValue;
};

export const save = async (req, res) => {
  try {
    const { qrData } = req.body;
    const userId = req.userId;
    let dateCurrent = getDate();
    console.log("Received qrData:", qrData);
    console.log("Received userId:", userId);

    // Crear qrDesign
    const qrDesign = await prisma.qrDesign.create({
      data: {
        frame: qrData.qrDesign.frame,
        frameColor: qrData.qrDesign.frameColor,
        dots: qrData.qrDesign.dots,
        dotsColor: qrData.qrDesign.dotsColor,
        cornerSquare: qrData.qrDesign.cornerSquare,
        cornerSquareColor: qrData.qrDesign.cornerSquareColor,
        cornerDot: qrData.qrDesign.cornerDot,
        cornerDotColor: qrData.qrDesign.cornerDotColor,
      },
    });
    console.log("qrDesign created:", qrDesign);

    let qrType = await prisma.qrType.findFirst({
      where: {
        type: qrData.qr.qrType,
      },
    });

    // Generar nombre automático si qrData.qr.qrName no está definido
    let qrName = qrData.qr.qrName;
    if (!qrName || typeof qrName !== 'string') {
      qrName = await generateUniqueName(userId);
    }

    const newQR = await prisma.qr.create({
      data: {
        name_qr: qrName,
        userId: userId,
        createdAt: dateCurrent,
        qrDesignId: qrDesign.id,
        qrTypeId: qrType.id,
      },
    });
    console.log("newQR created:", newQR);

    // Obtener qrDataValue según el tipo de qrType
    const qrDataValue = generateQrDataValue(userId, qrType, qrData);

    // Actualizar newQR con qrDataValue
    const updatedQR = await prisma.qr.update({
      where: { id: newQR.id },
      data: { qr: qrDataValue },
    });

    // Crear qrLogo
    const qrLogo = await prisma.qrLogo.create({
      data: {
        logo: qrData.qrLogo.logo || null,
        size: qrData.qrLogo.size,
        qrId: newQR.id,
      },
    });
    console.log("qrLogo created:", qrLogo);

    // Crear qrPreview
    const qrPreview = await prisma.qrPreview.create({
      data: {
        title: qrData.qrPreview.title,
        colorTitle: qrData.qrPreview.colorTitle,
        description: qrData.qrPreview.description,
        descriptionColor: qrData.qrPreview.descriptionColor,
        boxColor: qrData.qrPreview.boxColor,
        borderImg: qrData.qrPreview.borderImg,
        imgBoxBackgroud: qrData.qrPreview.imgBoxBackgroud,
        backgroudColor: qrData.qrPreview.backgroudColor,
        SelectOptions: qrData.qrPreview.SelectOptions,
        qrId: newQR.id,
      },
    });
    console.log("qrPreview created:", qrPreview);

    // Crear qrTextFont solo si el texto no está vacío
    if (qrData.qrText.text !== "") {
      // Crear qrTextFont
      const qrTextFont = await prisma.qrTextFont.create({
        data: {
          fontFamily: qrData.qrTextFont.fontFamily,
        },
      });
      console.log("qrTextFont created:", qrTextFont);

      // Crear qrTextBubble
      const qrTextBubble = await prisma.qrTextBubble.create({
        data: {
          burbble: qrData.qrTextBubble.burbble,
          color: qrData.qrTextBubble.color,
        },
      });
      console.log("qrTextBubble created:", qrTextBubble);

      // Crear qrText
      const qrText = await prisma.qrText.create({
        data: {
          text: qrData.qrText.text,
          positionX: qrData.qrText.positionX,
          positionY: qrData.qrText.positionY,
          colorText: qrData.qrText.colorText,
          fontSize: qrData.qrText.fontSize,
          qrTextFontId: qrTextFont.id,
          qrTextBubbleId: qrTextBubble.id,
          qrId: newQR.id,
        },
      });
      console.log("qrText created:", qrText);
    }

    res.status(201).json(useSend("QR saved successfully"));
  } catch (err) {
    console.error(err.message);
    res.status(500).json(useSend(err.message));
  }
};

const generateUniqueName = async (userId) => {
  let uniqueName = "";
  let exists = true;

  // Generar un nombre único hasta que se encuentre uno que no exista para el usuario
  while (exists) {
    uniqueName = `QR_${Math.floor(Math.random() * 10000)}`;
    const existingQR = await prisma.qr.findFirst({
      where: {
        name_qr: uniqueName,
        userId: userId,
      },
    });
    exists = existingQR ? true : false;
  }

  return uniqueName;
};

export const getQrs = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log('userId:', userId); 

    const qrs = await prisma.qr.findMany({
      where: { userId },
      include: {
        QrType: {
          select: {
            type: true,
            description: true,
          },
        },
      },
    });

    console.log('Database response:', qrs); 

    res.status(200).json({ qrCodes: qrs });
  } catch (error) {
    console.error('Error fetching QR codes:', error); 
    res.status(400).json({ error: error.message });
  }
};