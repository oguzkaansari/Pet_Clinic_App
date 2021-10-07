package com.works.config;

import com.works.services.UserService;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    final UserService userService;
    public WebSecurityConfig(UserService userService) {
        this.userService = userService;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(userService.encoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable();

        http
                .authorizeRequests()
                .antMatchers("/").hasAnyRole("ADMIN","DOCTOR","SECRETARY")
                .antMatchers("/dashboard/**").hasAnyRole("ADMIN","DOCTOR","SECRETARY")
                .antMatchers("/customer/**").hasAnyRole("ADMIN","DOCTOR", "SECRETARY")
                .antMatchers("/calendar/**").hasAnyRole("ADMIN","DOCTOR", "SECRETARY")
                .antMatchers("/sale/**").hasAnyRole("ADMIN","DOCTOR")
                .antMatchers("/buy/**").hasAnyRole("ADMIN","SECRETARY")
                .antMatchers("/lab/**").hasAnyRole("ADMIN","DOCTOR")
                .antMatchers("/chest/**").hasAnyRole("ADMIN","SECRETARY")
                .antMatchers("/product/**").hasAnyRole("ADMIN","SECRETARY")
                .antMatchers("/supplier/**").hasAnyRole("ADMIN","SECRETARY")
                .antMatchers("/agenda/**").hasAnyRole("ADMIN","SECRETARY", "DOCTOR")
                .antMatchers("/statistics/**").hasAnyRole("ADMIN","SECRETARY", "DOCTOR")
                .antMatchers("/specifications/**").hasAnyRole("ADMIN","SECRETARY")
                .antMatchers("/admin/**").hasRole(("ADMIN"))
                .antMatchers("/user/**").hasAnyRole("ADMIN","SECRETARY", "DOCTOR")
                //.anyRequest().authenticated()
                .and()
                .formLogin()
                    .loginPage("/login")
                    .permitAll()
                    .loginProcessingUrl("/login")
                    .defaultSuccessUrl("/dashboard", true)
                .and()
                .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .deleteCookies("JSESSIONID")
                .invalidateHttpSession(true)
                .logoutSuccessHandler(userService)
                .permitAll()
                .and()
                .exceptionHandling().accessDeniedPage("/403");


    }

}
