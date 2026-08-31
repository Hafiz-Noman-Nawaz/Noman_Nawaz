const nodemailer = require('nodemailer');

const createTransporter = () => {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return null;
};

const sendInquiryAlert = async ({ name, email, message }) => {
  const recipient = process.env.NOTIFICATION_EMAIL || 'nawaznoman7766@gmail.com';
  const isFastTrack = message.includes('[⚡ FAST-TRACK HIRE INQUIRY]');

  const subject = isFastTrack
    ? `⚡ Fast-Track Hire Inquiry: ${name}`
    : `📩 New Portfolio Message from ${name}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #0f172a; color: #f8fafc; padding: 24px; }
    .card { background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 24px; max-width: 600px; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
    .badge { display: inline-block; background: #4f46e5; color: #ffffff; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-bottom: 16px; }
    h2 { color: #ffffff; margin-top: 0; font-size: 20px; }
    .field { margin-bottom: 12px; }
    .label { font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: bold; margin-bottom: 2px; }
    .value { font-size: 14px; color: #f8fafc; font-weight: 500; }
    .message-box { background: #0f172a; border-left: 3px solid #818cf8; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 13px; color: #e2e8f0; white-space: pre-wrap; line-height: 1.5; margin-top: 16px; }
    .btn { display: inline-block; background: #4f46e5; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; font-size: 13px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">${isFastTrack ? '⚡ Fast-Track Hire Lead' : '📩 Contact Inquiry'}</div>
    <h2>New Lead Received on Your Portfolio</h2>

    <div class="field">
      <div class="label">Client Name</div>
      <div class="value">${name}</div>
    </div>

    <div class="field">
      <div class="label">Client Email</div>
      <div class="value"><a href="mailto:${email}" style="color: #38bdf8;">${email}</a></div>
    </div>

    <div class="field">
      <div class="label">Inquiry Details</div>
      <div class="message-box">${message}</div>
    </div>

    <a href="mailto:${email}?subject=Re: Your inquiry on nouman-nawaz.dev" class="btn">Reply Directly via Email</a>
  </div>
</body>
</html>
  `;

  try {
    const transporter = createTransporter();
    if (transporter) {
      await transporter.sendMail({
        from: `"Noman Nawaz Portfolio" <${process.env.EMAIL_USER}>`,
        to: recipient,
        replyTo: email,
        subject,
        html,
      });
      console.log(`✅ Real-time email notification sent to ${recipient}`);
    } else {
      console.log(`ℹ️ [Email Alert Queued]: Set EMAIL_USER & EMAIL_PASS in .env for direct SMTP delivery. Notification logged for ${name} (${email})`);
    }
  } catch (err) {
    console.error('Error sending email notification:', err.message);
  }
};

module.exports = { sendInquiryAlert };
