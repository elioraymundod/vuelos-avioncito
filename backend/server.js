equire('dotenv').config();
const nodemailer = require('nodemailer');

let transportador = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'infobancomipistio@gmail.com',
        pass: 'BancoMiPisti02020#'
    }
});

let mailOptions = {
    from: 'infobancomipistio@gmail.com',
    to: 'vanessa17grande@gmail.com',
    subject: 'Correo de prueba',
    text: 'Correo listo'
};

transportador.sendMail(mailOptions, function(err, data){
    if (err) {
        console.log('error al enviar el correo');
    } else {
        console.log('Correo enviado exitosamente');
    }
});
