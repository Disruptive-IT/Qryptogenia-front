import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendVerificationEmail(direccion, pin) {
  try {
    const mailOptions = {
      from: "Qryptogenia",
      to: direccion,
      subject: "Verificación de nueva cuenta - Qryptogenia",
      html: createVerificationEmail(pin),
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error; 
  }
}
function createVerificationEmail(pin) {
  const verificationUrl = `${process.env.VERIFICATION_URL}`;
  return `
  <!DOCTYPE html>
  <html lang="es">
  <body style="max-width: 600px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: auto; background-color: rgb(229, 255, 246); padding: 40px; border-radius: 4px; margin-top: 10px;">
      <h1>Verificación de correo electrónico</h1>
      <p>Ya estas a un paso de completar tu registro.</p>
      <p>Introduce el siguiente PIN en la página para completar el registro: <strong>${pin}</strong>.</p>
  </body>
  </html>
  `;
}
