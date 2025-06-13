# Smart Room
## 📜 Descrição

Este projeto tem como objetivo o desenvolvimento de uma aplicação web que permite aos estudantes reservarem espaços de estudo na escola ou universidade. Por meio da plataforma, os alunos poderão visualizar as salas disponíveis, verificar os horários livres e realizar agendamentos conforme suas necessidades.

Além de facilitar a organização da rotina de estudos, a aplicação contribui para otimizar o uso dos espaços disponíveis e promover a autonomia dos estudantes. Outro benefício importante é a redução da carga administrativa da instituição de ensino, que não precisará mais gerenciar manualmente as reservas — tornando o processo mais ágil, eficiente e automatizado.

## 📁 Estrutura de pastas

Esse projeto utiliza o modelo MVC (Model-View-Controller), que é um padrão para a arquitetura de software , que separa responsabilidades para facilitar a manutenção e a escalabilidade e divide uma aplicação web em três camadas principais:

- Model: parte que armazena o modelo de negócios da aplicação;
- View: armazena a parte visual da aplicação;
- Controller: funciona como um intermediário entre Model e View.

Portanto, a estrutura das pastas foi pensada de modo a seguir esse modelo, conforme mostrado a seguir:
```
meu-projeto/
│
├── config/                # Arquivos de configuração (ex: conexão com banco)
│   └── database.js
├── controllers/           # Lógica de controle das requisições
│   └── HomeController.js
├── documents/             # Arquivos relacionados ao WAD(Web Design Document)
│   └── assets/            # Assets do WAD
│   └── PI-WAD.md          # Web Design Document 
├── models/                # Definição de modelos de dados (estrutura do banco)
│   └── User.js
├── routes/                # Definição das rotas do sistema
│   └── index.js
├── services/              # Serviços auxiliares do sistema
│   └── userService.js
├── assets/                # Arquivos públicos como imagens e fontes
├── scripts/               # Arquivos de JavaScript públicos
│   └── init.sql           # Script de criação e inserção de dados no banco
│   └── runSQLScript.js    # Script para executar comandos SQL via Node.js      
├── styles/                # Arquivos CSS públicos
├── tests/                 # Arquivos de testes unitários
│   └── example.test.js
├── .gitignore             # Arquivo para ignorar arquivos no Git
├── .env.example           # Arquivo de exemplo para variáveis de ambiente
├── jest.config.js         # Arquivo de configuração do Jest
├── package.json           # Gerenciador de dependências do Node.js
├── readme.md              # Documentação do projeto (Markdown)
├── rest.http              # Teste de endpoints (opcional)
└── server.js              # Arquivo principal que inicializa o servidor
```

## 🔧 Como executar o código
Caso você queira apenas acessar essa aplicação web basta clicar no link abaixo:

_inserir link_

Entretanto, caso você queira executar o projeto localmente, você deve:
### Clonar o repositório:

```bash
git clone https://github.com/AnaCris007/Smart_Room.git
cd Smart_Room
```

### Instalar o Node.js:
O Node.js permite que você execute JavaScript no lado do servidor e para instalá-lo acesse o site https://nodejs.org e baixe a versão apropriada.

### Instalar as dependências do projeto:

Após instalar o Node.js, no diretório do projeto, rode o seguinte comando para instalar todas as dependências listadas no package.json:

```
npm install
```
As dependências do projeto são pacotes ou bibliotecas externas que o projeto precisa para funcionar corretamente. Elas estão listadas no arquivo package.json, que define quais pacotes o projeto depende e suas versões.

### Configurar variáveis de ambiente:
Crie um arquivo .env na raiz do projeto com base no .env.example. Nele, você deve definir as variáveis necessárias para a conexão com o banco de dados e outras configurações sensíveis. Utilizar variáveis de ambiente ajuda a manter informações como senhas e credenciais fora do código-fonte, aumentando a segurança e facilitando a configuração do projeto em diferentes ambientes.
Exemplo de conteúdo para o .env:

```
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=smart_room_db
DB_SSL = 'true'
```
### Criar banco de dados:

Crie um banco de dados PostgreSQL com o nome especificado no seu arquivo .env. Você pode usar o Supabase para isso.

### Executar script SQL (migrações):
Para criar as tabelas e a estrutura inicial do banco de dados, execute o seguinte comando no terminal:
```bash
npm run migrate
```

### Executar o servidor:
Após realizar os passos anteriores, execute o servidor com o seguinte comando no terminal do seu projeto:
```bash
npm start
```
Se tudo estiver configurado corretamente, o projeto estará rodando localmente em http://localhost:3000.

### Testar a API
Você também pode utilizar ferramentas como **Postman** ou **Insomnia** para testar os endpoints da API definidos na pasta `/routes`. Por exemplo:

- `POST http://localhost:3000/reservas` - para criar uma nova reserva.

Exemplo de Body (JSON):

```json
{
  "matricula_alunos": "12345",
  "id_salas_dispo": 1,
  "id_duracao": 2,
  "horario": "14:00",
  "dia": "2025-05-25"
}
```
- `GET http://localhost:3000/reservas` - retorna todas as reservas ordenadas por data.

- `PUT http://localhost:3000/reservas/:id_reservas` - atualiza os dados de uma reserva específica.

- `DELETE http://localhost:3000/reservas/:id_reservas` - remove uma reserva existente do sistema.

Certifique-se de enviar os dados necessários no corpo da requisição (body), especialmente nos endpoints `POST` e `PUT`.

