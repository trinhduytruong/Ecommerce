package doan.ecm.service;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender javaMailSender;

//    @Value("app.mail.bcc")
    private String bccMail = "tfashion@gmail.com";

    // Độ dài của token (32 ký tự)
    private static final int TOKEN_LENGTH = 32;

    // Tạo reset token ngẫu nhiên với độ dài xác định
    public String generateResetToken(int length) {
        if(length <= 0) length = TOKEN_LENGTH;
        SecureRandom random = new SecureRandom();
        byte[] tokenBytes = new byte[length];
        random.nextBytes(tokenBytes);

        // Mã hóa token thành chuỗi Base64 để dễ sử dụng trong URL
        return Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);
    }

    public void sendEmail(String to, String subject, String text) throws MailException, MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);

        // Cấu hình người nhận, tiêu đề và nội dung email
        messageHelper.setTo(to);
        messageHelper.setBcc(bccMail);
        messageHelper.setSubject(subject);
        messageHelper.setText(text, true); // set true để gửi HTML email

        // Gửi email
        logger.info("Send email to: " + to + " with subject: " + subject);
        javaMailSender.send(mimeMessage);
    }
}

