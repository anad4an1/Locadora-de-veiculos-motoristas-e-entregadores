// "" = site e API no mesmo endereço (Spring servindo o site).
const API = API_URL;


const form = document.getElementById("admin-login-form");
const mensagem = document.getElementById("admin-message");
const botao = document.getElementById("admin-submit");

form.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  mensagem.textContent = "";

  const email = document.getElementById("admin-email").value.trim();
  const senha = document.getElementById("admin-password").value;

  botao.disabled = true;
  mensagem.textContent = "Verificando... se o servidor estava parado, pode levar até 1 minuto.";

  try {
    const resposta = await fetch(API + "/usuarios/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    if (!resposta.ok) {
      mensagem.textContent = await resposta.text();
      return;
    }

    sessionStorage.setItem("adminEmail", email);
    sessionStorage.setItem("adminSenha", senha);
    window.location.href = "admin-painel.html";
  } catch (erro) {
    mensagem.textContent = "Não foi possível conectar ao servidor. Tente novamente em instantes.";
  } finally {
    botao.disabled = false;
  }
});