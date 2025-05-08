# Smart Room
## 📜 Descrição

Este projeto tem como objetivo o desenvolvimento de uma aplicação web que permite aos estudantes reservarem espaços de estudo na escola ou universidade. Por meio da plataforma, os alunos poderão visualizar as salas disponíveis, verificar os horários livres e realizar agendamentos conforme suas necessidades.

Além de facilitar a organização da rotina de estudos, a aplicação contribui para otimizar o uso dos espaços disponíveis e promover a autonomia dos estudantes. Outro benefício importante é a redução da carga administrativa da instituição de ensino, que não precisará mais gerenciar manualmente as reservas — tornando o processo mais ágil, eficiente e automatizado.

Adicionalmente, a aplicação oferece aos estudantes a possibilidade de reportar colegas que ocupem as salas por um tempo superior ao reservado, colaborando para o bom uso coletivo dos espaços.

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
│   └── PI-WAD.md         
├── models/                # Definição de modelos de dados (estrutura do banco)
│   └── User.js
├── routes/                # Definição das rotas do sistema
│   └── index.js
├── services/              # Serviços auxiliares do sistema
│   └── userService.js
├── assets/                # Arquivos públicos como imagens e fontes
├── scripts/               # Arquivos de JavaScript públicos
├── styles/                # Arquivos CSS públicos
├── tests/                 # Arquivos de testes unitários
│   └── example.test.js
├── .gitignore             # Arquivo para ignorar arquivos no Git
├── .env.example           # Arquivo de exemplo para variáveis de ambiente
├── jest.config.js         # Arquivo de configuração do Jest
├── package-lock.json      # Gerenciador de dependências do Node.js
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
```
### Executar o servidor:
Após realisar os passos anteriores, execute o servidor com o seguinte comando no terminal do seu projeto:
```
npm start

```
Se tudo estiver configurado corretamente, o projeto estará rodando localmente em http://localhost:3000 ou na porta definida no seu .env.