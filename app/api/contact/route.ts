import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Redis from "ioredis";
import nodemailer from "nodemailer";

const redis = new Redis(process.env.KV_URL || "redis://localhost:6379");
const RATE_LIMIT_DURATION = 60;

export async function POST(req: Request) {
    try {
        const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
        const key = `contact_form_ip:${ip}`;

        const isBlocked = await redis.exists(key);

        if (isBlocked) {
            return NextResponse.json(
                { error: "You have sent a message too recently. Please wait a minute." },
                { status: 429 }
            );
        }

        const { name, email, subject, message } = await req.json();

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
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
            replyTo: email,
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

        await transporter.sendMail(mailOptions);

        await redis.set(key, "blocked", "EX", RATE_LIMIT_DURATION);

        return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
    }
}
