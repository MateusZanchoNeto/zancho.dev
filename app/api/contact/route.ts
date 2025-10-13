import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
        return NextResponse.json(
            { error: "All fields are required." },
            { status: 400 },
        );
    }

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        secure: true,
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
        },
    });

    const mailOptions = {
        from: `"Portfolio Contact Form" <${process.env.EMAIL_SERVER_USER}>`,
        to: process.env.EMAIL_TO,
        subject: `New Message from ${name}: ${subject}`,
        html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json(
            { message: "Message sent successfully!" },
            { status: 200 },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to send message." },
            { status: 500 },
        );
    }
}
