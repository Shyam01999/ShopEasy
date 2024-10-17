const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST, //for outlook use different host
        port: process.env.SMTP_PORT, //for outlook use different port
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMPT_PASS

        },
    })

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,

    }

    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;