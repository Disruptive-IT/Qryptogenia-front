import prisma from "../../lib/prisma.js";
import { getDate } from "../../utils/dateUtils.js";
import { useSend } from "../../utils/useSend.js";

export const save = async (req, res) => {
  try {
    const { qrData } = req.body;
    const userId = req.userId;
    let dateCurrent = new getDate()

    // Crear qrDesign
    const qrDesign = await prisma.qrDesign.create({
      data: {
        frame: qrData.qrDesign.frame,
        frameColor: "#000",
        dots: qrData.qrDesign.dots,
        dotsColor: qrData.qrDesign.dotsColor,
        cornerSquare: qrData.qrDesign.cornerSquare,
        cornerSquareColor: qrData.qrDesign.cornerSquareColor,
        cornerDot: qrData.qrDesign.cornerDot,
        cornerDotColor: qrData.qrDesign.cornerDotColor,
      },
    });

    // Crear el QR principal primero
    const newQR = await prisma.qr.create({
      data: {
        // ! Tabla qrtype
        description: qrData.qr.description,
        qr: qrData.qr.data,
        userId: userId,
        createdAt: dateCurrent,
        qrDesignId: qrDesign.id,
      },
    });

    // Crear qrLogo
    const qrLogo = await prisma.qrLogo.create({
      data: {
        logo: qrData.qrLogo.logo || null,
        size: qrData.qrLogo.size|| null,
        qrId: newQR.id,
      },
    });

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

    // Crear qrTextFont
    const qrTextFont = await prisma.qrTextFont.create({
      data: {
        fontFamily: qrData.qrTextFont.fontFamily,
      },
    });

    // Crear qrTextBubble
    const qrTextBubble = await prisma.qrTextBubble.create({
      data: {
        burbble: qrData.qrTextBubble.burbble,
        color: qrData.qrTextBubble.color,
      },
    });

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

    res.status(201).json(useSend("QR saved successfully"));
  } catch (err) {
    console.error(err.message);
    res.status(500).json(useSend(err.message ));
  }
};

export const getQrs = async (req, res) => {
  try {
    const { userId } = req.params;
    const qrs = await prisma.qr.findMany({ where: { userId } });
    res.status(200).json({ qrs });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
