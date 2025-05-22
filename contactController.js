import Contact from "../models/contactModel.js";
import nodemailer from "nodemailer";

export const submitContact = async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  try {
    // Save message to database
    const newContact = await Contact.create({ firstName, lastName, email, message });

    // Send email to GlowGuard
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: "glowguard00@gmail.com",
      subject: `Message from ${firstName} ${lastName}`,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("🔥 Error in submitContact:", err);
    res.status(500).json({ success: false, message: "Failed to send message", error: err.message });
  }
};
