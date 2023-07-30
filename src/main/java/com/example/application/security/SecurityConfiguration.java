package com.example.application.security;

import java.util.Base64;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.JwsAlgorithms;
import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.*;

import com.vaadin.flow.spring.security.VaadinWebSecurity;

@EnableWebSecurity
@Configuration
public class SecurityConfiguration extends VaadinWebSecurity {

    public static final String LOGOUT_URL = "/";

    // The secret is stored in /config/secrets/application.properties by default.
    // Never commit the secret into version control; each environment should have
    // its own secret.
    @Value("${com.example.application.auth.secret}")
    private String authSecret;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        super.configure(http);
        // http.authorizeHttpRequests(authorizeHttpRequests -> authorizeHttpRequests.
        //         requestMatchers(antMatcher("/public/**")).permitAll().
        //         anyRequest().hasRole("USER"))
                http.formLogin(form -> form.loginPage("/login")).logout(logout -> logout.logoutUrl(LOGOUT_URL))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        setLoginView(http, "/login", LOGOUT_URL);
        setStatelessAuthentication(http, new SecretKeySpec(Base64.getDecoder().decode(authSecret), JwsAlgorithms.HS256),
                "com.example.application");
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        super.configure(web);
        web.ignoring().requestMatchers(antMatcher("/images/*.png"));
    }
}