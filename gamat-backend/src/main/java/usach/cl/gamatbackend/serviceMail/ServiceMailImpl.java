package usach.cl.gamatbackend.serviceMail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class ServiceMailImpl implements IServiceMail {
	@Autowired
	private JavaMailSender emailSender;
	

	@Override
	public void sendMailNotification(String to, String subject, String body) {
		// TODO Auto-generated method stub
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject(subject);
		message.setText(body);
		emailSender.send(message);
		
		
	}
	// aca iran la implementacion de los metodos para generar notificaciones por mail
}
