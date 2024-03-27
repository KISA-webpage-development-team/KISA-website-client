import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  console.log("test");
  const req = await request.json();
  console.log(req);
  const { name, email, message } = req;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NEXT_PUBLIC_KISA_EMAIL,
      pass: process.env.NEXT_PUBLIC_KISA_PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.KISA_EMAIL,
    subject: `New contact message from ${name}: ${email}`,
    text: message,
  };

  const sendMailPromise = () =>
    new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, (err, response) => {
        if (!err) {
          resolve(response);
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
