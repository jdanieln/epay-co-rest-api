const nodemailer = require('nodemailer')

const send = async (smtp, message) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: smtp.SMTP_HOST,
    port: smtp.SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: smtp.SMTP_USER, // generated ethereal user
      pass: smtp.SMTP_PASS // generated ethereal password
    }
  });

  // send mail with defined transport object
  return transporter.sendMail({
    from: smtp.SMTP_USER, // sender address
    to: message.to, // list of receivers
    subject: message.subject, // Subject line
    text: message.text, // plain text body
    // html: "<b>Hello world?</b>" // html body
  });
}

module.exports = {
    send
}