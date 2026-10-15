package com.example.carloc;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = {
        "https://anad4an1.github.io",
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:8080"
})
public class AdminController {

    private final UsuarioRepository usuarioRepository;
    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminController(UsuarioRepository usuarioRepository,
                           ClienteRepository clienteRepository,
                           PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.clienteRepository = clienteRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public record UsuarioResumo(Integer id, String email, String telefone, boolean admin) {}

    private boolean ehAdmin(String email, String senha) {
        if (email == null || senha == null) {
            return false;
        }
        return usuarioRepository
                .findByEmail(email.trim().toLowerCase())
                .filter(u -> u.isAdmin() && passwordEncoder.matches(senha, u.getSenha()))
                .isPresent();
    }

    @GetMapping("/usuarios")
    public ResponseEntity<?> listarUsuarios(
            @RequestHeader(value = "X-Admin-Email", required = false) String email,
            @RequestHeader(value = "X-Admin-Senha", required = false) String senha) {

        if (!ehAdmin(email, senha)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Acesso restrito a administradores.");
        }

        List<UsuarioResumo> lista = usuarioRepository.findAll().stream()
                .map(u -> new UsuarioResumo(u.getId(), u.getEmail(), u.getTelefone(), u.isAdmin()))
                .toList();

        return ResponseEntity.ok(lista);
    }

    @GetMapping("/clientes")
    public ResponseEntity<?> listarClientes(
            @RequestHeader(value = "X-Admin-Email", required = false) String email,
            @RequestHeader(value = "X-Admin-Senha", required = false) String senha) {

        if (!ehAdmin(email, senha)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Acesso restrito a administradores.");
        }

        return ResponseEntity.ok(clienteRepository.findAll());
    }
}