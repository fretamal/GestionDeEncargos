package usach.cl.gamat.Config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import usach.cl.gamat.repositories.UserRepository;
import usach.cl.gamat.services.AppUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AppUserDetailsService userDetailsService;
    
    @Autowired
    private UserRepository userRepository;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().authorizeRequests()
                .antMatchers("/login").permitAll()
                .anyRequest().authenticated() //cualquier otra peticion requiere autenticacion
                .and()
                // Las peticiones /login pasaran previamente por este filtro
                .addFilterBefore(new LoginFilter("/login", authenticationManager(),userRepository),
                        UsernamePasswordAuthenticationFilter.class)

                // Las demás peticiones pasarán por este filtro para validar el token
                .addFilterBefore(new JwtFilter(),
                        UsernamePasswordAuthenticationFilter.class);
        http.cors().and().csrf().disable().authorizeRequests();
        
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // Creamos una cuenta de usuario por default
        /*auth.inMemoryAuthentication()
                .withUser("ask")
                .password("{noop}123")
                .roles("ADMIN");*/
    	System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAa");

        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
}
    
    
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//    	System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAa5656");
//        final CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
//        configuration.setAllowedMethods(Arrays.asList("HEAD",
//                "GET", "POST", "PUT", "DELETE", "PATCH"));
//        // setAllowCredentials(true) is important, otherwise:
//        // The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
//        configuration.setAllowCredentials(true);
//        // setAllowedHeaders is important! Without it, OPTIONS preflight request
//        // will fail with 403 Invalid CORS request
//        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
//        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//    	System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAa56567");
//        return source;
//}
    
    @Bean
    public PasswordEncoder passwordEncoder() {
    	System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAa");
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder;
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
    	 final CorsConfiguration configuration = new CorsConfiguration();
       configuration.setAllowedOrigins(Arrays.asList("*"));
       configuration.setAllowedMethods(Arrays.asList("HEAD",
               "GET", "POST", "PUT", "DELETE", "PATCH"));
       // setAllowCredentials(true) is important, otherwise:
       // The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
       configuration.setAllowCredentials(true);
       configuration.setExposedHeaders(Arrays.asList("Authorization"));
       // setAllowedHeaders is important! Without it, OPTIONS preflight request
       // will fail with 403 Invalid CORS request
       configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}