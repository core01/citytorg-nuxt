"use strict";
import express from "express";

const router = express.Router();
import nodemailer from "nodemailer";
import sanitizeHtml from "sanitize-html";
import Email from "email-templates";

router.post("/", (req, res) => {
  if (
    !req.body.message ||
    !req.body.email ||
    !req.body.phone ||
    !req.body.email
  ) {
    return res.status(400).json({
      status: false
    });
  }
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  const email = new Email();
  email
    .render("../components/email/application", {
      subject: sanitizeHtml(req.body.subject),
      message: sanitizeHtml(req.body.message),
      type: sanitizeHtml(req.body.type),
      name: sanitizeHtml(req.body.name),
      phone: sanitizeHtml(req.body.phone)
    })
    .then(html => {
      const mailOptions = {
        from: process.env.ADMIN_EMAIL, // sender address
        replyTo: req.body.email,
        to: process.env.ADMIN_EMAIL, // list of receivers
        subject: "Заявка на участие в проекте Citytorg.kz", // Subject line
        html // html body
      };
      // send mail with defined transport object
      transporter.sendMail(mailOptions, error => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            status: false
          });
        }
        return res.status(200).json({
          status: true
        });
      });
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({
        status: false
      });
    });
});

export default router;
