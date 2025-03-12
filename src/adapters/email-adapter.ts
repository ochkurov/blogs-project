import nodemailer from 'nodemailer'
import {SETTINGS} from "../settings";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: "backenddeveloper409@gmail.com",
        pass: SETTINGS.EMAIL_PASSWORD,
    }
})
class EmailSender  {
    async confirmRegistration ( email: string , confiramtionCode:string ) {
        transporter.sendMail({
            from: 'Blogger Platform',
            to: email,
            subject: 'Confirm Registration at Blogger Platform',
            html: ` <h1>Thanks for registration at Blogger Platform</h1>
                 <p>To finish registration please follow the link below:
                     <a href='https://somesite.com/confirm-email?code=${confiramtionCode}'>complete registration</a>
                 </p>`,
        }).catch(e=>{
            console.error('errorRegistration', e.message)
        })
    }
    async recoveryPassword (email:string , recoveryCode:string) {
        transporter.sendMail({
            from: 'Blogger Platform',
            to: email,
            subject: 'Recovery Password at Blogger Platform',
            html: `<h1>Password recovery</h1>
       <p>To finish password recovery please follow the link below:
          <a href='https://somesite.com/password-recovery?recoveryCode=${recoveryCode}'>recovery password</a>
      </p>`,
        }).catch(e => {
            console.error('errorRegistration', e.message)
        })
    }
}
export const emailSender = new EmailSender()
