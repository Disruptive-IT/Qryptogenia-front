import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

export async function sendVerificationEmail(direccion, token) {
    return await transporter.sendMail({
        from: "Qryptogenia",
        to: direccion,
        subject: "Verificación de nueva cuenta - Qryptogenia",
        html: createVerificationEmail(token)
    })
}

function createVerificationEmail(token) {
    return `
  <!DOCTYPE html>
  <html lang="es">
    <style>
      html{
        background-color: white;
      }
      body{
        max-width: 600px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: auto;
        background-color: rgb(229, 255, 246);
        padding: 40px;
        border-radius: 4px;
        margin-top: 10px;
      }
    </style>
  <body>
    <h1>Verificación de correo electrónico</h1>
    <p>Se ha creado una cuenta en Qryptogenia con este correo electrónico.</p>
      <p>Verifique la cuenta <a href="http://localhost:3000/verificar/${token}" target="_blank" rel="noopener noreferrer">haciendo click aquí</a>.
  </body>
  </html>
  `
}