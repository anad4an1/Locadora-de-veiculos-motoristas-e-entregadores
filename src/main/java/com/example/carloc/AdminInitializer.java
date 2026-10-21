package com.example.carloc;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${ADMIN_EMAIL:}")
    private String adminEmail;

    @Value("${ADMIN_PASSWORD:}")
    private String adminPassword;

    public AdminInitializer(UsuarioRepository usuarioRepository,
                            PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (adminEmail.isBlank() || adminPassword.length() < 6) {
            System.out.println("ADMIN_EMAIL/ADMIN_PASSWORD não configurados. Admin não criado.");
            return;
        }

        String email = adminEmail.trim().toLowerCase();

        Usuario usuario = usuarioRepository.findByEmail(email).orElseGet(() -> {
            Usuario novo = new Usuario();
            novo.setEmail(email);
            novo.setTelefone("00000000000");
            novo.setSenha(passwordEncoder.encode(adminPassword));
            return novo;
        });

        usuario.setAdmin(true);
        usuarioRepository.save(usuario);
        System.out.println("Admin garantido: " + email);
    }
}