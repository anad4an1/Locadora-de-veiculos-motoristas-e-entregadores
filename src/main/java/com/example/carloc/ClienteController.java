package com.example.carloc;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = {
    "http://localhost:5500",
    "http://127.0.0.1:5500"
})
@RequestMapping("/clientes")
public class ClienteController {

    private final ClienteRepository clienteRepository;

    public ClienteController(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @GetMapping
    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }

    @PostMapping
    public Cliente cadastrarCliente(@RequestBody Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    @GetMapping("/{id}")
    public Cliente buscarCliente(@PathVariable Integer id) {
        return clienteRepository.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void excluirCliente(@PathVariable Integer id) {
        clienteRepository.deleteById(id);
    }
}