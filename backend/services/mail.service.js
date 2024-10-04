// const nodejsmailer = require('nodemailer');
import nodejsmailer from 'nodemailer'

var transporter = nodejsmailer.createTransport({
    // service:'gmail',
    host: 'smtp.gmail.com',
    secure:true,
    port:465,
    auth:{
        user:'imlimonpro@gmail.com',
        pass:'qnflwvvhncnksrjr'
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