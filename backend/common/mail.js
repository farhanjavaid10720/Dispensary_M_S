const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const mapping = require("./email-templates/mapping");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  //   service: "gmail",
  port: 465,
  secure: true,
  logger: true,
  // debug: true,
  //   secureConnection: false,
  // secureConnection: false,
  // port: 587,
  // requiresAuth: true,
  // domains: ["gmail.com", "googlemail.com"],

  auth: {
    user: process.env.EMAIL,
    pass: process.env.MAIL_PASS,
  },
  //   tls: {
  //     rejectUnauthorized: false,
  //   },
});
const SendEmail = async (data, format) => {
  template = mapping.formats[format];
  await transporter.use("compile", hbs(mapping.layout_settings));
  const info = await transporter.sendMail({
    from: '"Demo Project" <test@demo.com>',
    to: data["to"],
    subject: template["subject"],
    template: template["html"],
    context: data,
  });

  return "Message sent: %s", info.messageId;
};
module.exports = SendEmail;
