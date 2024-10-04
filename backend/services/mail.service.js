
import nodejsmailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();



var transporter = nodejsmailer.createTransport({
    // service:'gmail',
    host: process.env.mail_host,
    secure:true,
    port:process.env.mail_port,
    auth:{
        user:process.env.mail,
        pass:process.env.mail_pass
    }
});

export function sendMil(to , sub , msg){
    transporter.sendMail({
        to:to, 
        subject:sub,
        html:msg
    })
    console.log("sendMil")
}