import nodemailer from 'nodemailer'
import {SETTINGS} from "../settings";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "backenddeveloper409@gmail.com",
        pass: SETTINGS.EMAIL_PASSWORD,
    },
});
const info = await transporter.sendMail({
    from: 'I BackendDeveloper',
    to: req.body.email
    subject: req.body.subject,
    html: "<h1>Thanks for your registration</h1>\n" +
        " <p>To finish registration please follow the link below:\n" +
        "     <a href='https://somesite.com/confirm-email?code=your_confirmation_code'>complete registration</a>\n" +
        " </p>",
});

