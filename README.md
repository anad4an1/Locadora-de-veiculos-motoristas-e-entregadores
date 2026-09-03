# 🚗 CarLoc

Sistema de locação de carros e motos desenvolvido para atender principalmente **motoristas e entregadores** que necessitam de um veículo para realizar suas atividades profissionais.

---

## 🎓 Identificação Acadêmica

| Informação | Detalhes |
|---|---|
| **Instituição de Ensino** | UNICEPLAC |
| **Curso** | Análise e Desenvolvimento de Sistemas |
| **Disciplina** | A ser definido pela equipe |
| **Orientador** | Profº Hudson Neves |
| **Nome do Projeto** | CarLoc |
| **Status** | Em desenvolvimento |

---

## 📋 Descrição do Projeto

O **CarLoc** é um sistema desenvolvido para funcionar como uma plataforma de **locação de carros e motos**, voltada principalmente para motoristas e entregadores.

A proposta do projeto é oferecer uma solução semelhante a uma locadora de veículos, permitindo que pessoas que precisam de um carro ou uma moto para trabalhar possam consultar os veículos disponíveis e realizar uma locação.

O sistema busca facilitar o acesso a veículos para profissionais que trabalham com transporte de passageiros, entregas e outras atividades que dependem de um veículo.

---

## 🎯 Objetivos

### Objetivo Geral

Desenvolver uma aplicação web para **locação de carros e motos**, proporcionando aos motoristas e entregadores uma maneira prática de encontrar e alugar veículos para utilização profissional.

### Problema que o Sistema Resolve

Muitos motoristas e entregadores precisam de um veículo para trabalhar, mas não possuem carro ou moto própria.

O **CarLoc** busca facilitar o acesso desses profissionais a veículos disponíveis para locação, centralizando o processo em uma aplicação web.

### Público-Alvo

O sistema é destinado principalmente para:

- Motoristas de aplicativos;
- Entregadores;
- Profissionais que utilizam veículos para trabalho;
- Pessoas que necessitam alugar carros ou motos.

---

## ⚙️ Funcionalidades

As principais funcionalidades propostas para o sistema são:

- Consulta de veículos disponíveis;
- Locação de carros;
- Locação de motos;
- Cadastro e gerenciamento de veículos;
- Gerenciamento das locações;
- Interface web para interação com o sistema.

> Novas funcionalidades poderão ser adicionadas conforme o desenvolvimento do projeto.

---

## 💻 Tecnologias Utilizadas

O projeto utiliza tecnologias para desenvolvimento do frontend e backend.

| Tecnologia | Utilização |
|---|---|
| **HTML5** | Estrutura das páginas web |
| **CSS3** | Estilização e layout da aplicação |
| **JavaScript** | Interatividade e funcionalidades do frontend |
| **Java** | Linguagem utilizada no backend |
| **Spring Boot** | Desenvolvimento do backend |
| **Gradle** | Gerenciamento e construção do projeto |

### Frontend

O frontend do CarLoc utiliza:

- HTML5;
- CSS3;
- JavaScript.

### Backend

O backend é desenvolvido utilizando:

- Java;
- Spring Boot.

### Gerenciamento do Projeto

O projeto utiliza o **Gradle** para gerenciamento de dependências e construção da aplicação.

---

## 🏗️ Arquitetura da Solução

O sistema CarLoc possui uma estrutura dividida entre **frontend** e **backend**.

```text
                    ┌─────────────────┐
                    │     USUÁRIO     │
                    └────────┬────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │      FRONTEND       │
                  │   HTML + CSS + JS   │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │       BACKEND       │
                  │     Spring Boot     │
                  │        + Java       │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │    BANCO DE DADOS   │
                  └─────────────────────┘

Frontend
Responsável pela interface visual e pela interação do usuário com o sistema.

Backend
Responsável pela lógica de negócio, processamento das informações e comunicação com o banco de dados.

🗄️ Banco de Dados
Banco de dados utilizado: A ser definido pela equipe.

A modelagem do banco deverá contemplar as principais informações necessárias para o funcionamento do sistema, como:

Usuários;
Veículos;
Carros;
Motos;
Locações.
Diagrama do Banco de Dados
Inserir aqui o Diagrama Entidade-Relacionamento (DER) do projeto.

[ INSERIR IMAGEM DO DIAGRAMA DO BANCO DE DADOS AQUI ]

📦 Pré-requisitos
Para executar o projeto, é necessário possuir:

Java;
Gradle;
Spring Boot;
Git;
Navegador web.
A versão específica do Java e demais ferramentas será definida conforme a configuração final do projeto.

📥 Instalação
1. Clonar o repositório
git clone https://github.com/anad4an1/Locadora-de-veiculos-motoristas-e-entregadores.git

2. Acessar a pasta do projeto
cd Locadora-de-veiculos-motoristas-e-entregadores

3. Verificar os arquivos do projeto
O projeto possui configuração utilizando Gradle e conta com o Gradle Wrapper.

Arquivos principais relacionados ao Gradle:

build.gradle
settings.gradle
gradlew
gradlew.bat

▶️ Como Executar
Windows
No Windows, execute:

gradlew.bat bootRun

Linux ou macOS
No Linux ou macOS, execute:

./gradlew bootRun

Caso seja necessário conceder permissão de execução:

chmod +x gradlew

Depois execute:

./gradlew bootRun

A aplicação será iniciada de acordo com as configurações definidas no projeto.

📁 Estrutura do Projeto
A estrutura principal do projeto está organizada da seguinte forma:

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

🧪 Exemplos de Uso
🚗 Aluguel de carro para motorista
Um motorista que precisa de um carro para trabalhar poderá acessar o CarLoc, consultar os carros disponíveis e realizar uma locação.

Acessar o CarLoc
       ↓
Consultar veículos disponíveis
       ↓
Selecionar um carro
       ↓
Realizar a locação
       ↓
Utilizar o veículo para trabalhar

🏍️ Aluguel de moto para entregador
Um entregador que precisa de uma moto para realizar suas entregas poderá acessar o sistema, consultar as motos disponíveis e realizar uma locação.

Acessar o CarLoc
       ↓
Consultar motos disponíveis
       ↓
Selecionar uma moto
       ↓
Realizar a locação
       ↓
Utilizar a moto para realizar entregas

🔌 API
O backend do CarLoc é desenvolvido utilizando Spring Boot.

A API será responsável pela comunicação entre o frontend e o backend do sistema.

Documentação da API: A ser definido pela equipe.

Endpoints
Método	Endpoint	Descrição
GET	/veiculos	Consultar veículos
GET	/veiculos/{id}	Consultar veículo específico
POST	/locacoes	Realizar uma locação
GET	/locacoes	Consultar locações

Os endpoints deverão ser atualizados conforme a implementação definitiva da API.

🖼️ Capturas de Tela
Página Inicial
Adicionar aqui uma imagem da página inicial do sistema.

[ INSERIR CAPTURA DE TELA DA PÁGINA INICIAL AQUI ]

Página de Veículos
Adicionar aqui uma imagem da tela de consulta dos veículos.

[ INSERIR CAPTURA DE TELA DA PÁGINA DE VEÍCULOS AQUI ]

Página de Locação
Adicionar aqui uma imagem da tela de locação.

[ INSERIR CAPTURA DE TELA DA PÁGINA DE LOCAÇÃO AQUI ]

👥 Equipe do Projeto
Integrante	Função
A ser definido pela equipe	A ser definido pela equipe
A ser definido pela equipe	A ser definido pela equipe
A ser definido pela equipe	A ser definido pela equipe
A ser definido pela equipe	A ser definido pela equipe

🚀 Melhorias Futuras
As melhorias futuras serão definidas pela equipe conforme a evolução do projeto.

A ser definido pela equipe;
A ser definido pela equipe;
A ser definido pela equipe.
📊 Status do Projeto
🟡 Em desenvolvimento

O projeto CarLoc encontra-se em fase de desenvolvimento como projeto acadêmico do curso de Análise e Desenvolvimento de Sistemas da UNICEPLAC.

📄 Licença
Licença: A ser definido pela equipe.

👨‍💻 Considerações Finais
O CarLoc tem como objetivo oferecer uma solução digital para locação de carros e motos, com foco principalmente em motoristas e entregadores que necessitam de veículos para exercer suas atividades profissionais.

A aplicação utiliza HTML, CSS e JavaScript no desenvolvimento do frontend e Java com Spring Boot no desenvolvimento do backend, utilizando Gradle para gerenciamento e construção do projeto.

O projeto é desenvolvido no contexto acadêmico do curso de Análise e Desenvolvimento de Sistemas da UNICEPLAC, sob orientação do Profº Hudson Neves.

🔗 Repositório
O código-fonte do projeto está disponível no GitHub:

CarLoc — Locadora de Veículos para Motoristas e Entregadores

https://github.com/anad4an1/Locadora-de-veiculos-motoristas-e-entregadores
