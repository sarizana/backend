import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('✅ Webhook Verified');
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

export default router;
