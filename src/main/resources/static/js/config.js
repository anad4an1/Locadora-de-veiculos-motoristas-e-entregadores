// Troque pela URL que o Render te der (sem a barra no final)
const RENDER_URL = "https://carloc-api.onrender.com";
// Escolhe sozinho: GitHub Pages -> Render | Live Server -> localhost | Render direto -> mesmo endereço
const API_URL = location.hostname.endsWith("github.io")
    ? RENDER_URL
    : (location.port === "5500" ? "http://localhost:8080" : "");