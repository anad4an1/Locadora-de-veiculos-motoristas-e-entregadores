<div align="center">

# 🚗 CarLoc

### Locação de carros e motos para quem vive na estrada

*Sistema pensado para motoristas de aplicativo e entregadores que precisam de um veículo para trabalhar*

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Java](https://img.shields.io/badge/Java-backend-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-framework-brightgreen)
![Gradle](https://img.shields.io/badge/Gradle-build-blue)

</div>

---

## 🎓 Identificação acadêmica

| Informação | Detalhes |
|---|---|
| **Instituição** | UNICEPLAC |
| **Curso** | Análise e Desenvolvimento de Sistemas |
| **Disciplina** | A definir pela equipe |
| **Orientador** | Profº Hudson Neves |
| **Projeto** | CarLoc |
| **Status** | 🟡 Em desenvolvimento |

---

## 📋 Descrição do projeto

O **CarLoc** funciona como uma locadora digital de carros e motos, pensada para quem depende de um veículo para trabalhar — motoristas de aplicativo, entregadores e profissionais do transporte.

A proposta é simples: o usuário consulta os veículos disponíveis e realiza a locação direto pela plataforma, sem burocracia de locadora tradicional.

---

## 🎯 Objetivos

**Objetivo geral**
Desenvolver uma aplicação web de locação de carros e motos que dê a motoristas e entregadores uma forma prática de encontrar e alugar veículos para uso profissional.

**Problema que o sistema resolve**
Muitos motoristas e entregadores precisam de um veículo para trabalhar, mas não têm carro ou moto próprios. O CarLoc centraliza a busca e a locação desses veículos em um só lugar.

**Público-alvo**
- Motoristas de aplicativo
- Entregadores
- Profissionais que dependem de veículo para trabalhar
- Pessoas em busca de locação de carros ou motos

---

## ⚙️ Funcionalidades

- 🔍 Consulta de veículos disponíveis
- 🚗 Locação de carros
- 🏍️ Locação de motos
- 📋 Cadastro e gerenciamento de veículos
- 📑 Gerenciamento das locações
- 🌐 Interface web para interação com o sistema

> Novas funcionalidades poderão ser adicionadas conforme o desenvolvimento do projeto.

---

## 💻 Tecnologias utilizadas

| Camada | Tecnologia | Uso |
|---|---|---|
| **Frontend** | HTML5 · CSS3 · JavaScript | Estrutura, estilo e interatividade das páginas |
| **Backend** | Java · Spring Boot | Regras de negócio e API |
| **Build** | Gradle | Gerenciamento de dependências e construção do projeto |

---

## 🏗️ Arquitetura da solução

```
                    ┌─────────────────┐
                    │     USUÁRIO     │
                    └────────┬────────┘
                             ▼
                  ┌─────────────────────┐
                  │      FRONTEND       │
                  │   HTML + CSS + JS   │
                  └──────────┬──────────┘
                             ▼
                  ┌─────────────────────┐
                  │       BACKEND       │
                  │  Spring Boot + Java │
                  └──────────┬──────────┘
                             ▼
                  ┌─────────────────────┐
                  │    BANCO DE DADOS   │
                  └─────────────────────┘
```

- **Frontend** → interface visual e interação do usuário
- **Backend** → lógica de negócio, processamento e comunicação com o banco de dados

---

## 🗄️ Banco de dados

**SGBD:** a ser definido pela equipe

A modelagem deverá contemplar as principais entidades do sistema:

- Usuários
- Veículos
- Carros
- Motos
- Locações

**Diagrama Entidade-Relacionamento (DER)**
📌 *Inserir aqui o diagrama do banco de dados.*

---

## 📦 Pré-requisitos

- ☕ Java
- 🐘 Gradle
- 🍃 Spring Boot
- 🔧 Git
- 🌐 Navegador web

> As versões específicas serão definidas conforme a configuração final do projeto.

---

## 📥 Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/anad4an1/Locadora-de-veiculos-motoristas-e-entregadores.git

# 2. Acessar a pasta do projeto
cd Locadora-de-veiculos-motoristas-e-entregadores
```

O projeto usa Gradle com Gradle Wrapper. Arquivos principais: `build.gradle`, `settings.gradle`, `gradlew`, `gradlew.bat`.

---

## ▶️ Como executar

**Windows**
```bash
gradlew.bat bootRun
```

**Linux / macOS**
```bash
chmod +x gradlew
./gradlew bootRun
```

---

## 📁 Estrutura do projeto

```
Locadora-de-veiculos-motoristas-e-entregadores/
│
├── gradle/
│   └── wrapper/
│
├── src/
│
├── .gitattributes
├── .gitignore
├── build.gradle
├── gradlew
├── gradlew.bat
├── settings.gradle
└── README.md
```

---

## 🧪 Exemplos de uso

**🚗 Motorista alugando um carro**
`Acessar o CarLoc → Consultar veículos disponíveis → Selecionar um carro → Realizar a locação → Utilizar o veículo para trabalhar`

**🏍️ Entregador alugando uma moto**
`Acessar o CarLoc → Consultar motos disponíveis → Selecionar uma moto → Realizar a locação → Utilizar a moto para realizar entregas`

---

## 🔌 API

Backend desenvolvido com Spring Boot, responsável pela comunicação entre frontend e backend.

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/veiculos` | Consultar veículos |
| `GET` | `/veiculos/{id}` | Consultar veículo específico |
| `POST` | `/locacoes` | Realizar uma locação |
| `GET` | `/locacoes` | Consultar locações |

> Documentação completa da API a ser definida pela equipe.

---

## 🖼️ Capturas de tela

**Página inicial**
📌 *Inserir captura de tela da página inicial aqui.*

**Página de veículos**
📌 *Inserir captura de tela da página de veículos aqui.*

**Página de locação**
📌 *Inserir captura de tela da página de locação aqui.*

---

## 👥 Equipe do projeto

| Integrante | Função |
|---|---|
| Lucas Emanuel Carvalho Lazo | Testes e Qualidade (QA) |
| Fábio Dutra dos Santos | Documentação e Requisitos |
| Igor Fernando Roque Gonçalves | UI/UX Design (protótipos, layout das telas) |
| Rebeca Evellyn Sousa Farias | Documentação e Requisitos |
| Thiago Gabriel Braga dos Santos | Líder de Projeto / Scrum Master |
| Guilherme Moreira Sant'Ana | Desenvolvedor Full Stack |
| Vitória da Silva de Jesus | Desenvolvedor Frontend (HTML/CSS/JS) |

---

## 🚀 Melhorias futuras

📌 *A ser definido pela equipe conforme a evolução do projeto.*

---

## 📊 Status do projeto

🟡 **Em desenvolvimento** — projeto acadêmico do curso de Análise e Desenvolvimento de Sistemas da UNICEPLAC.

---

## 📄 Licença

A ser definida pela equipe.

---

## 👨‍💻 Considerações finais

O CarLoc nasce com um propósito claro: dar a motoristas e entregadores uma forma simples e digital de encontrar o veículo que precisam para trabalhar.

Construído com HTML, CSS e JavaScript no frontend e Java com Spring Boot no backend, o projeto é desenvolvido no contexto acadêmico do curso de Análise e Desenvolvimento de Sistemas da UNICEPLAC, sob orientação do Profº Hudson Neves.

---

<div align="center">

### 🔗 Repositório

[github.com/anad4an1/Locadora-de-veiculos-motoristas-e-entregadores](https://github.com/anad4an1/Locadora-de-veiculos-motoristas-e-entregadores)

</div>
