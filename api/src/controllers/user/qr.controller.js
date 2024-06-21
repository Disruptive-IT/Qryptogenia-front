import prisma from "../../lib/prisma.js";
import { useSend } from "../../utils/useSend.js";

export const save = async (req, res) => {
  try {
    const { qrData } = req.body;
    // const userId = req.userId;
    const userId = qrData.userId;

    const newQR = await prisma.qr.create({
      data: {
        typeQr: qrData.typeQr || "",
        qr: qrData.qr || "",
        QrText: {
          create: {
            ...qrData.qrText,
            QrTextFont: {
              create: qrData.qrTextFont,
            },
            QrTextBubble: {
              create: qrData.qrTextBubble,
            },
          },
        },
        QrDesign: {
          create: qrData.qrDesign,
        },
        QrLogo: {
          create: qrData.qrLogo,
        },
      },
    });
    res.status(201).json(useSend("QR saved successfully"));
  } catch (error) {
    res.status(500).json(useSend({ error: error.message }));
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
