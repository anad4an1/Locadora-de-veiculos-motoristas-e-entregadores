package com.example.carloc;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = {
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:8080"
})
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrar(@RequestBody Usuario usuario) {

        String email = usuario.getEmail().trim().toLowerCase();

        if (email.isEmpty()
                || usuario.getSenha() == null
                || usuario.getSenha().isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body("E-mail e senha são obrigatórios.");
        }

        if (usuarioRepository.findByEmail(email).isPresent()) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Este e-mail já está cadastrado.");
        }

        usuario.setEmail(email);

        // Por enquanto salva a senha diretamente
        // para facilitar o primeiro teste.
        usuarioRepository.save(usuario);

        usuario.setSenha(null);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(usuario);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest dados) {

        String email = dados.getEmail().trim().toLowerCase();

        Optional<Usuario> resultado =
                usuarioRepository.findByEmail(email);

        if (resultado.isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("E-mail ou senha incorretos.");
        }

        Usuario usuario = resultado.get();

        if (!usuario.getSenha().equals(dados.getSenha())) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("E-mail ou senha incorretos.");
        }

        usuario.setSenha(null);

        return ResponseEntity.ok(usuario);
    }

    public static class LoginRequest {

        private String email;
        private String senha;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getSenha() {
            return senha;
        }

        public void setSenha(String senha) {
            this.senha = senha;
        }
    }
}