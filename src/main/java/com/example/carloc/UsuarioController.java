package com.example.carloc;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = {
        "https://anad4an1.github.io",
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:8080"
})
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioController(UsuarioRepository usuarioRepository,
                             PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Dados que o cadastro aceita (o id e o admin nunca vêm do cliente)
    public record CadastroRequest(String email, String telefone, String senha) {}

    // Dados que a API devolve (nunca inclui a senha)
    public record UsuarioResponse(Integer id, String email, String telefone) {}

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrar(@RequestBody CadastroRequest dados) {

        if (dados.email() == null || dados.email().isBlank()
                || dados.telefone() == null || dados.telefone().isBlank()
                || dados.senha() == null || dados.senha().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("E-mail, telefone e senha são obrigatórios.");
        }

        if (dados.senha().length() < 6) {
            return ResponseEntity.badRequest()
                    .body("A senha deve ter pelo menos 6 caracteres.");
        }

        String email = dados.email().trim().toLowerCase();

        if (usuarioRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Este e-mail já está cadastrado.");
        }

        Usuario usuario = new Usuario();
        usuario.setEmail(email);
        usuario.setTelefone(dados.telefone().trim());
        usuario.setSenha(passwordEncoder.encode(dados.senha()));

        try {
            Usuario salvo = usuarioRepository.save(usuario);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new UsuarioResponse(salvo.getId(), salvo.getEmail(), salvo.getTelefone()));
        } catch (DataIntegrityViolationException e) {
            // dois cadastros simultâneos com o mesmo e-mail
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Este e-mail já está cadastrado.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest dados) {

        Optional<Usuario> usuario = autenticar(dados);

        if (usuario.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("E-mail ou senha incorretos.");
        }

        Usuario u = usuario.get();
        return ResponseEntity.ok(new UsuarioResponse(u.getId(), u.getEmail(), u.getTelefone()));
    }

    @PostMapping("/admin/login")
    public ResponseEntity<?> loginAdmin(@RequestBody LoginRequest dados) {

        Optional<Usuario> usuario = autenticar(dados);

        if (usuario.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("E-mail ou senha incorretos.");
        }

        if (!usuario.get().isAdmin()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Acesso restrito a administradores.");
        }

        return ResponseEntity.ok("Credenciais validadas.");
    }

    // Confere e-mail e senha (comparando com o hash salvo no banco)
    private Optional<Usuario> autenticar(LoginRequest dados) {
        if (dados == null || dados.getEmail() == null || dados.getSenha() == null) {
            return Optional.empty();
        }

        return usuarioRepository
                .findByEmail(dados.getEmail().trim().toLowerCase())
                .filter(u -> passwordEncoder.matches(dados.getSenha(), u.getSenha()));
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