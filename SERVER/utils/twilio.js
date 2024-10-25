const twilio = require('twilio');

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Twilio Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN; // Twilio Auth Token
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Your Twilio phone number

const client = new twilio(accountSid, authToken);

// Function to send OTP via SMS
const sendSms = (to, otp) => {
    return client.messages.create({
        body: `Your OTP code is: ${otp}`,
        from: twilioPhoneNumber,
        to: to,
    });
};

module.exports = {
    sendSms,
};
