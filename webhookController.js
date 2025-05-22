export const verifyWebhook = (req, res) => {
  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token && mode === 'subscribe' && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
};

export const receiveWhatsAppMessage = (req, res) => {
  const data = req.body;

  if (data?.entry?.[0]?.changes?.[0]?.value?.messages) {
    const message = data.entry[0].changes[0].value.messages[0];
    console.log("📩 Received WhatsApp message:", message);
  }

  res.sendStatus(200);
};
