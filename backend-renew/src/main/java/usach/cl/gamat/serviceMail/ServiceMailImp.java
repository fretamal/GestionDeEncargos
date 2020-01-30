package usach.cl.gamat.serviceMail;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class ServiceMailImp implements IServiceMail {
	@Autowired
	private JavaMailSender emailSender;
	

	@Override
	public void sendMailNotification(String to, String subject, String body,String ruta) {
		// TODO Auto-generated method stub
		String texto =body;
		texto+="\n\n Puede acceder desde el siguiente enlace: "
				+ "https://pingeso-frontend.herokuapp.com/"
				+ ruta;
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject(subject);
		message.setText(texto);
		emailSender.send(message);
		
		
	}
	// aca iran la implementacion de los metodos para generar notificaciones por mail
}