import axios from 'axios';

export const sendWhatsAppMessage = async (req, res) => {
  const { doctorPhone, userMessage } = req.body;

  if (!doctorPhone || !userMessage) {
    return res.status(400).json({ error: "Missing doctorPhone or userMessage" });
  }

  if (!process.env.WHATSAPP_PHONE_ID || !process.env.WHATSAPP_TOKEN) {
    console.error("❌ .env values missing");
    return res.status(500).json({ error: "Server config error" });
  }

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: doctorPhone,
        type: "text",
        text: { body: userMessage },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Message sent:", response.data);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ WhatsApp API Error:", error.response?.data || error.message || error);
    res.status(500).json({ error: "Failed to send WhatsApp message" });
  }
};
