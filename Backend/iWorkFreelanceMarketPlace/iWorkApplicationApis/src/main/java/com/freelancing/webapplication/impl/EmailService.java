package com.freelancing.webapplication.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender sendMail;
	
	public void sendSimpleEmail(String toFrom,String toEmail,
            String body,
            String subject) throws MessagingException {
		SimpleMailMessage message = new SimpleMailMessage();
		
		//message.setFrom("godserushi1997@gmail.com");
		message.setFrom(toFrom);
		message.setTo(toEmail);
		message.setText(body);
		message.setSubject(subject);
		
		System.out.println(toEmail);
		System.out.println(body);
		System.out.println(subject);
		
		//Another Way
		
		//MimeMessage message=sendMail.createMimeMessage();
		//MimeMessageHelper helper=new MimeMessageHelper(message);
		//helper.setFrom("godserushi1997@gmail.com");
		//helper.setTo(toEmail);
		//helper.setText(body);
		//helper.setSubject(subject);
		
		sendMail.send(message);
		
		System.out.println("Mail Send...");
}
	
	public void ContactSeller(String toEmail,
            String body,
            String subject) throws MessagingException {
		SimpleMailMessage message = new SimpleMailMessage();
		
		//message.setFrom("godserushi1997@gmail.com");
		message.setFrom("pratik.chavhan.77@gmail.com");
		message.setTo(toEmail);
		message.setText(body);
		message.setSubject(subject);
		
		System.out.println(toEmail);
		System.out.println(body);
		System.out.println(subject);
		
		//Another Way
		
		//MimeMessage message=sendMail.createMimeMessage();
		//MimeMessageHelper helper=new MimeMessageHelper(message);
		//helper.setFrom("godserushi1997@gmail.com");
		//helper.setTo(toEmail);
		//helper.setText(body);
		//helper.setSubject(subject);
		
		sendMail.send(message);
		
		System.out.println("Mail Send...");
}
	

	public void sendOtp(String toEmail, String otp, String subject) {
SimpleMailMessage message = new SimpleMailMessage();
		
		//message.setFrom("godserushi1997@gmail.com");
		message.setFrom("pratik.chavhan.77@gmail.com");
		message.setTo(toEmail);
		message.setText(otp);
		message.setSubject(subject);
		
		System.out.println(toEmail);
		System.out.println(otp);
		System.out.println(subject);
		
		//Another Way
		
		//MimeMessage message=sendMail.createMimeMessage();
		//MimeMessageHelper helper=new MimeMessageHelper(message);
		//helper.setFrom("godserushi1997@gmail.com");
		//helper.setTo(toEmail);
		//helper.setText(body);
		//helper.setSubject(subject);
		
		sendMail.send(message);
		
		System.out.println("Mail Send...");
		
	}
}
