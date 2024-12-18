const nodemailer = require('nodemailer');
require('dotenv').config();

const sendAlertEmail = async (ip, failedCount) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: 'mishraprashant304@gmail.com', // Replace with recipient's email
        subject: 'Alert: Excessive Failed Requests',
        text: `IP Address ${ip} has failed ${failedCount} requests in a short period.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Alert email sent to Admin for IP: ${ip}`);
    } catch (err) {
        console.error("Failed to send email:", err);
    }
};

module.exports = sendAlertEmail;