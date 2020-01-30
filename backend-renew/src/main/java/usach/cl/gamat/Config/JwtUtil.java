package usach.cl.gamat.Config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import usach.cl.gamat.entities.User;
import usach.cl.gamat.facadeBD.IServiceBD;
import usach.cl.gamat.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static java.util.Collections.emptyList;

import java.io.IOException;

public class JwtUtil {
	

	  
	    
	
    // Método para crear el JWT y enviarlo al cliente en el header de la respuesta
    static void addAuthentication(HttpServletResponse res, String username,User user) throws JsonProcessingException, IOException {

    	
        String token = Jwts.builder()
                .setSubject(username)
                
                // Vamos a asignar un tiempo de expiracion de 1 minuto
                // solo con fines demostrativos en el video que hay al final
                .setExpiration(new Date(System.currentTimeMillis() + 18000000))

                // Hash con el que firmaremos la clave
                .signWith(SignatureAlgorithm.HS512, "gamat")
                .compact();

        //agregamos al encabezado el token
        Map<String, Object> body = new HashMap<String, Object>();
        body.put("idUser", user.getIdUser());
        body.put("email", user.getEmail());
        body.put("role", user.getRole());
        body.put("name", user.getName());
       
        
        res.addHeader("Authorization", "Bearer " + token);
        
        res.getWriter().write(new ObjectMapper().writeValueAsString(body));
  		res.setStatus(200);
  		res.setContentType("application/json");
    }

    // Método para validar el token enviado por el cliente
    static Authentication getAuthentication(HttpServletRequest request) {
    	System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAa8");
        // Obtenemos el token que viene en el encabezado de la peticion
        String token = request.getHeader("Authorization");

        // si hay un token presente, entonces lo validamos
        if (token != null) {
            String user = Jwts.parser()
                    .setSigningKey("gamat")
                    .parseClaimsJws(token.replace("Bearer", "")) //este metodo es el que valida
                    .getBody()
                    .getSubject();

            // Recordamos que para las demás peticiones que no sean /login
            // no requerimos una autenticacion por username/password
            // por este motivo podemos devolver un UsernamePasswordAuthenticationToken sin password
            return user != null ?
                    new UsernamePasswordAuthenticationToken(user, null, emptyList()) :
                    null;
        }
        System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAa9");
        return null;
    }
}