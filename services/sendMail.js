import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); // nạp biến môi trường từ .env

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
});

export async function sendProductEmail(toEmail, product, downloadFile) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: `Cảm ơn bạn đã mua sản phẩm ${product.name}`,
    text: `Chào bạn,\n\nCảm ơn bạn đã mua sản phẩm ${product.name}.\nBạn có thể tải file qua link sau:\n${downloadFile.googleDriveLink}\n\nTrân trọng!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email gửi thành công');
  } catch (error) {
    console.error('❌ Lỗi gửi email:', error);
  }
}
