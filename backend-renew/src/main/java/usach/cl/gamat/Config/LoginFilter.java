package usach.cl.gamat.Config;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import usach.cl.gamat.repositories.UserRepository;
import usach.cl.gamat.entities.User;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import static com.creativa.back.security.SecurityConstants.EXPIRATION_TIME;
//import static com.creativa.back.security.SecurityConstants.HEADER_STRING;
//import static com.creativa.back.security.SecurityConstants.SECRET;
//import static com.creativa.back.security.SecurityConstants.TOKEN_PREFIX;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class LoginFilter extends AbstractAuthenticationProcessingFilter {
	
	private UserRepository userRepository;

    public LoginFilter(String url, AuthenticationManager authManager,UserRepository userRepository) {
        super(new AntPathRequestMatcher(url));
        setAuthenticationManager(authManager);
        this.userRepository= userRepository;
    }

    @CrossOrigin
    @Override
    public Authentication attemptAuthentication(
            HttpServletRequest req, HttpServletResponse res)
            throws AuthenticationException, IOException, ServletException {
        // obtenemos el body de la peticion que asumimos viene en formato JSON
    	
        InputStream body = req.getInputStream();
        // Asumimos que el body tendrá el siguiente JSON  {"username":"ask", "password":"123"}
        // Realizamos un mapeo a nuestra clase User para tener ahi los datos
        AccountCredentials user = new ObjectMapper().readValue(body, AccountCredentials.class);
        System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAa4");
        // Finalmente autenticamos
        // Spring comparará el user/password recibidos
        // contra el que definimos en la clase SecurityConfig
        return getAuthenticationManager().authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword(),
                        Collections.emptyList()
                )
        );
    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest req,
            HttpServletResponse res, FilterChain chain,
            Authentication auth) throws IOException, ServletException {
    	  System.out.println(auth.getName());
    	  System.out.println(res.getHeader("Authorization"));
        // Si la autenticacion fue exitosa, agregamos el token a la respuesta
    	
  		User user= this.userRepository.findByEmail(auth.getName());
  		
        JwtUtil.addAuthentication(res, auth.getName(),user);
    }
    
//	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
//			Authentication authResult) throws IOException, ServletException {
//		
//		Collection<? extends GrantedAuthority> roles = authResult.getAuthorities();
////		
//		Claims claims = Jwts.claims();
//		User user=((User) authResult.getPrincipal());
//		
//		claims.put("authorities", new ObjectMapper().writeValueAsString(roles));
//		claims.put("rol", roles);
//
//		String token = Jwts.builder()
//				.setClaims(claims)
//				.setSubject(user.getUsername())
//				.signWith(SignatureAlgorithm.HS512,  SECRET.getBytes())
//				.setIssuedAt(new Date())
//				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
//				.compact();
//		
//		response.addHeader(HEADER_STRING, TOKEN_PREFIX + token);
//		
//		Map<String, Object> body = new HashMap<String, Object>();
//		body.put("token", token);
//		body.put("user", (User) authResult.getPrincipal());
//		
//		response.getWriter().write(new ObjectMapper().writeValueAsString(body));
//		response.setStatus(200);
//		response.setContentType("application/json");
//
//	}
}