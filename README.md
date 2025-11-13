# 🏥 Sistema de Clínica Médica

### Projeto Banco de Dados

Este projeto simula um **sistema de gerenciamento de clínica médica**, desenvolvido como parte de um trabalho acadêmico.  
A aplicação conecta o **Node.js** a um banco de dados **MySQL**, permitindo realizar operações diretamente pelo terminal, como **cadastrar, listar, buscar e remover** registros das entidades da clínica.

---

## 👩‍💻 Integrantes

- **Isabelle Caroline Pereira** — 2097 — Curso: Engenharia de Computação  
- **Lucas de Souza Magalhães** — 617 — Curso: Engenharia de Software  

---

## 🧩 Contexto do Sistema

O sistema é composto pelas entidades:  
**Paciente**, **Médico**, **Especialidade**, **Consulta**, **Exame**, **Funcionário** e **Solicitação de Exame**.  

Cada entidade possui suas relações de acordo com o modelo lógico do banco de dados da clínica.  

---

## ⚙️ Tecnologias Utilizadas

- **Node.js**
- **MySQL**
- **readline-sync** (para interação via terminal)
- **mysql2** (para conexão com o banco)

---

## 📁 Estrutura do Projeto

```
project-c07/
│
│   .env
│   .env-example
│   .gitignore
│   package-lock.json
│   package.json
│   README.md
│
└─── src
    │     index.js
    │
    ├─── config
    │         db.js           # Conexão com o banco
    │         seed.js         # Inserção de dados iniciais (seeding)
    │
    ├─── menus
    │         appointmentMenu.js   
    │         doctorMenu.js        
    │         employeeMenu.js      
    │         mainMenu.js          
    │         patientMenu.js       
    │         specialtyMenu.js     
    │         examMenu.js          
    │         examRequestMenu.js   
    │
    └─── models
              appointment.js       # CRUD de Consultas
              doctor.js            # CRUD de Médicos
              employee.js          # CRUD de Funcionários
              patient.js           # CRUD de Pacientes
              specialty.js         # CRUD de Especialidades
              exam.js              # CRUD de Exames
              examRequest.js       # CRUD de Solicitações de Exames
```

---

## ▶️ Como Executar o Projeto

1. **Clone o repositório ou copie os arquivos:**
   ```bash
   git clone https://github.com/isacarol-04/project-c07.git
   cd project-c07
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o banco de dados:**
   - Certifique-se de que o MySQL esteja rodando.
   - Execute o script `database/schema.sql` no seu gerenciador de banco de dados para criar a estrutura correta.
   - Copie o arquivo `.env.example` e renomeie para `.env`.
   - Atualize as credenciais do banco (usuário, senha) no arquivo `.env`.

4. **(Opcional) Popular o banco com dados iniciais:**
   ```bash
   npm run seed
   ```

5. **Inicie o projeto:**
   ```bash
   npm start
   ```

6. **Utilize o menu interativo no terminal** para escolher a entidade e operação desejada.

---

🩺 *Trabalho acadêmico — Disciplina de Banco de Dados*
