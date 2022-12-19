require('dotenv').config();

const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const exphbs = require('exphbs');
const { resolve } = require('path');

const {
    EMAIL,
    EMAIL_PASSWORD,
    EMAIL_PORT,
    EMAIL_SMTP,
} = process.env;

class Email{
    transporter;

    constructor(rootDir){
        this.transporter = nodemailer.createTransport({
            port: EMAIL_PORT,
            host: EMAIL_SMTP,
            auth: {
                user: EMAIL,
                pass: EMAIL_PASSWORD 
            },
            secure: true
        })

        const viewPath = resolve(rootDir, 'views', 'emails');

        this.transporter.use('compile', hbs({
            viewEngine: exphbs.create({
                defaultLayout: 'default',
                extname: '.hbs'
            }),
            viewPath,
            extName: '.hbs'
        }))
    }

    async sendEmail(to, subject, template, context){
        const data ={
            from: EMAIL,
            to,
            subject,
            template,
            context
        }

        return await this.transporter.sendMail(data);

    }
}

module.exports = Email;