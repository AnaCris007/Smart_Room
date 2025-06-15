# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## Nome do Projeto: Smart Room

### Autora do projeto: [Ana Cristina Alves Jardim](https://www.linkedin.com/in/ana-cristina-jardim/)

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

---

<br>

## <a name="c1"></a>1. Introdução (Semana 01)

Este projeto tem como objetivo o desenvolvimento de uma aplicação web que permite aos estudantes reservarem espaços de estudo na escola ou universidade. Por meio da plataforma, os alunos poderão visualizar as salas disponíveis, verificar os horários livres e realizar agendamentos de acordo com suas necessidades. Além de facilitar a organização da rotina de estudos, a aplicação contribui para otimizar o uso dos espaços disponíveis e promover a autonomia dos estudantes. Outro benefício importante é a redução da carga administrativa da instituição de ensino, que não precisará mais gerenciar manualmente as reservas, tornando o processo mais ágil, eficiente e automatizado.

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01)

Este projeto é focado em um perfil principal: estudantes matriculados em uma escola ou faculdade que possua espaços de estudo que precisam ser reservados. Com o objetivo de desenvolver uma aplicação centrada na experiência do usuário final, uma persona representativa foi desenvoldida, conforme apresentado a seguir:

<div align="center">
  <sub>FIGURA 1 - Persona</sub><br>
  <img src= "./assets/persona.png" width="100%"
  alt="Persona"><br>
  <sup>Fonte: Material produzido pelos autora, 2025</sup>
</div>

A imagem do João foi gerada pelo site https://this-person-does-not-exist.com.

### 2.2. User Stories (Semana 01)

Para garantir que o desenvolvimento da aplicação esteja alinhado com as necessidades reais dos usuários, foram elaboradas User Stories com base na perspectiva da persona João Gonçalves, um estudante que representa o público-alvo principal da aplicação.

Cada User Story segue o formato tradicional da metodologia ágil, contendo uma descrição clara do desejo do usuário, bem como os critérios de aceite que definem quando a funcionalidade pode ser considerada completa. Além disso, a User Story US01, considerada a mais relevante do projeto, foi avaliada com base nos critérios INVEST, garantindo que ela seja Independente, Negociável, Valiosa, Estimável, Small (pequena) e Testável.

A seguir, são apresentadas as User Stories identificadas:

Identificação | US01
--- | ---
Persona | João Gonçalves.
User Story | "Como estudante, quero poder visualizar todas as salas disponíveis em um dia específico, para que eu possa escolher a melhor."
Critério de aceite 1 | CR1: O usuário tem acesso a um calendário da semana.
Critério de aceite 2 | CR2: O calendário possui uma lista com as salas disponíveis no dia.
Critério de aceite 3 | CR3: O usuário consegue reservar a sala que ele deseja, caso ela não tenha sido reservada ainda.

---

Como essa User Story é a mais importante do projeto, foi analisado se ela segue os critérios INVEST que são:

- **I** – Independente  
- **N** – Negociável  
- **V** – Valiosa  
- **E** – Estimável  
- **S** – Pequena (Small)  
- **T** – Testável

Essa User Story é **independente** pois descreve uma funcionalidade específica (visualizar todas as salas disponíveis para reserva) que pode ser desenvolvida e testada de forma isolada. É **negociável** pois o objetivo principal (visualizar) pode ser alcançado de diferentes maneiras, podendo ser discutidas posteriormente. É **valiosa** pois permite que o estudante possa escolher o melhor dia e a melhor sala para o que ele precisa. É **estimável** pois sabemos que envolve a integração com um calendário e com um banco de dados que informe se uma sala foi ou não reservada até o momento. É **sob medida** pois considera apenas a funcionalidade de visualizar uma sala com base em um dia específico. É **testável** pois os critérios de aceite estão bem definidos, verificando a capacidade de visualizar as salas ainda disponíveis.

---

Identificação | US02
--- | ---
Persona | João Gonçalves.
User Story | "Como estudante, quero poder escolher por quanto tempo eu quero reservar uma sala, para que eu não atrapalhe os meus colegas."
Critério de aceite 1 | CR1: O usuário deve escolher a partir de qual horário ele deseja utilizar a sala.
Critério de aceite 2 | CR2: O usuário deve informar o horário que irá liberar a sala.

---

Identificação | US03
--- | ---
Persona | João Gonçalves.
User Story | "Como estudante, quero poder reservar uma sala quando ela estiver disponível, para que eu consiga estudar"
Critério de aceite 1 | CR1: O usuário deve poder reservar uma sala, só quando ela estiver disponível.

---

Identificação | US04
--- | ---
Persona | João Gonçalves.
User Story | "Como estudante, quero poder cancelar uma reserva para que ela volte a sala possa voltar a ficar disponível para os meus colegas"
Critério de aceite 1 | CR1: A aplicação deve disponibilizar um campo para que o usuário possa cancelar uma reserva.

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

Para a modelagem do banco de dados dessa aplicação, desenvolveu-se o modelo lógico desse banco antes da criação do modelo físico. Segue abaixo o modelo lógico:

<div align="center">
  <sub>FIGURA 2 - Modelo lógico do banco de dados da aplicação</sub><br>
  <img src= "./assets/modeloLogico.png" width="100%"
  alt="Modelo lógico "><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

Foram criadas cinco tabelas para armazenar todos os dados da aplicação, sendo elas:

#### Tabela Alunos:
Tem os atributos matricula, nome, turma, ano, email, senha_aluno. Essa entidade representa de forma abstrata os alunos de uma escola ou universidade, armazenando as informações necessárias para identificá-los e permitir que realizem login na plataforma. Um aluno pode fazer de 0 a N reservas, ou seja, a cardinalidade entre Alunos e Reservas é 0:N.

--- 

#### Tabela Salas_disponiveis:
Contém os atributos id_salas_dispo, numero_sala, dia_disponivel, a_partir_das e ate_as. Essa entidade representa os períodos em que cada sala está disponível para reserva. Cada disponibilidade pode estar vinculada a várias reservas, configurando uma cardinalidade de 1:N entre Salas_disponiveis e Reservas.

---

#### Tabela Duracao:
Contém os atributos id_duracao e descricao_duracao. Essa entidade define os tipos de duração disponíveis para uma reserva, como: 30 minutos, 1 hora, 1 hora e 30 minutos ou 2 horas. Cada tipo de duração pode ser associado a várias reservas, estabelecendo uma cardinalidade de 1:N entre Duracao e Reservas.

---

#### Tabela Cancelamentos:
Contém os atributos id_cancelar, id_reservas e dia_cancelar. Ela registra o cancelamento de uma reserva. Cada cancelamento refere-se a uma única reserva, e essa relação é opcional, portanto, a cardinalidade entre Reservas e Cancelamentos é 1:1 (opcional).

---

#### Tabela Reservas:
É a tabela central do modelo e por isso possui muitos atributos: id_reservas, matricula_alunos, id_salas_dispo, id_duracao, horário e dia. Três desses atributos são chaves estrangeiras: matricula_alunos, id_salas_dispo e id_duracao. Ela representa cada reserva feita por um aluno para uma sala em um determinado horário e dia. Além disso, cada reserva está vinculada a um único aluno, uma única sala e uma única duração.

---

### Resumo das Cardinalidades

| Tabela Origem     | Tabela Destino     | Cardinalidade |
|-------------------|--------------------|---------------|
| Alunos            | Reservas           | 0:N           |
| Salas_disponiveis | Reservas           | 1:N           |
| Duracao           | Reservas           | 1:N           |
| Reservas          | Cancelamentos      | 1:1 (opcional) |

---

O modelo físico foi implementado no arquivo init.sql, como segue abaixo:

```sql

-- Criar extensão para suportar UUIDs, se ainda não estiver ativada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar tabela Alunos
CREATE TABLE IF NOT EXISTS Alunos (
matricula INT PRIMARY KEY NOT NULL,
nome VARCHAR(100) NOT NULL,
turma VARCHAR(10) NOT NULL,
ano INT NOT NULL,
email VARCHAR(255) NOT NULL,
senha_aluno VARCHAR(60) NOT NULL
);

-- Criar tabela Salas_disponiveis
CREATE TABLE IF NOT EXISTS Salas_disponiveis(
id_salas_dispo SERIAL PRIMARY KEY,
numero_sala VARCHAR(20) NOT NULL,
dia_disponivel DATE NOT NULL,
a_partir_das TIME NOT NULL,
ate_as TIME NOT NULL,
CHECK (ate_as > a_partir_das)
);

-- Criar tabela Duracao
CREATE TABLE IF NOT EXISTS Duracao(
id_duracao SERIAL PRIMARY KEY,
descricao_duracao VARCHAR(100) NOT NULL UNIQUE
);

-- Adicionar os tipos de duração de reserva existentes na escola ou universidade
INSERT INTO Duracao (descricao_duracao) Values
('30 minutos'),
('1 hora'),
('1 hora e 30 minutos'),
('2 horas')
ON CONFLICT (descricao_duracao) DO NOTHING;

-- Criar tabela Reservas
CREATE TABLE IF NOT EXISTS Reservas (
id_reservas SERIAL PRIMARY KEY,
matricula_alunos INT NOT NULL,
id_salas_dispo INT NOT NULL,
id_duracao INT NOT NULL,
horario TIME NOT NULL,
dia DATE NOT NULL,
FOREIGN KEY (matricula_alunos) REFERENCES Alunos(matricula),
FOREIGN KEY (id_salas_dispo) REFERENCES Salas_Disponiveis(id_salas_dispo),
FOREIGN KEY (id_duracao) REFERENCES Duracao(id_duracao)
);

-- Criar tabela Cancelamentos
CREATE TABLE IF NOT EXISTS Cancelamentos (
id_cancelar SERIAL PRIMARY KEY,
id_reservas INT NOT NULL,
dia_cancelar DATE NOT NULL
);

```

### 3.1.1 BD e Models (Semana 5)
Este projeto utiliza a arquitetura MVC (Model-View-Controller), onde os arquivos da pasta models são responsáveis pela comunicação com o banco de dados. Cada Model contém funções que executam consultas SQL para manipulação e recuperação dos dados utilizados pela aplicação.

Abaixo está a descrição detalhada dos arquivos contidos na pasta models, incluindo as principais funções implementadas e suas finalidades:

#### __AlunosModel.js__

Responsável por lidar com os dados da tabela `alunos`, este arquivo possui as seguintes funções:

| Função                    | Descrição                                                                 |
|--------------------------|---------------------------------------------------------------------------|
| verificarMatriculaExiste | Verifica se uma matrícula já está cadastrada no sistema                   |
| cadastrarAluno           | Cadastra um novo aluno no banco de dados, com validações e criptografia de senha |
| listarAlunos             | Retorna uma lista de todos os alunos cadastrados                         |
| listarReservasPorAlunoId | Lista todas as reservas feitas por um aluno específico, baseado na matrícula |

#### __CancelamentoModel.js__

Este módulo é responsável por lidar com os cancelamentos de reservas no sistema. Ele interage com as tabelas `cancelamentos` e `reservas` do banco de dados.

| Função                         | Descrição                                                                                                   |
|--------------------------------|-------------------------------------------------------------------------------------------------------------|
| cancelarReserva                | Insere um novo registro de cancelamento usando o id_reservas e define a data atual                         |
| listarCancelamentos            | Retorna uma lista de todos os cancelamentos, incluindo detalhes das reservas relacionadas (id_aluno, id_sala, data_reserva, horários) |
| contarCancelamentosPorMatricula| Conta o número total de cancelamentos realizados por um aluno específico através da matrícula              |

#### __LoginModel.js__

Este módulo é responsável por verificar as credenciais de login dos alunos no sistema. Para isso, ele interage com a tabela `alunos` do banco de dados, a fim de validar a matrícula e a senha fornecidas.

| Função         | Descrição                                                           |
|----------------|----------------------------------------------------------------------|
| verificarLogin | Busca os dados do aluno pela matrícula para validação de login      |

#### __ReservasModel.js__

Este módulo é responsável por gerenciar as operações de criação, listagem, atualização e exclusão de reservas no sistema. Ele interage com a tabela `reservas` do banco de dados.

| Função                      | Descrição                                                                 |
|-----------------------------|--------------------------------------------------------------------------|
| criarReserva                | Insere uma nova reserva com informações de aluno, sala, duração, horário e data |
| listarReservasPorMatricula | Lista todas as reservas ativas de um aluno específico                   |
                                                                       
#### __Salas_disponiveisModel.js__

Este arquivo gerencia as operações relacionadas às salas disponíveis para reserva no sistema. Ele interage diretamente com a tabela `salas_disponiveis` no banco de dados.

| Função                          | Descrição                                                                  |
|----------------------------------|-----------------------------------------------------------------------------|
| criarSalaDisponivel              | Insere uma nova sala disponível                                            |
| listarSalasDisponiveis           | Retorna todas as salas disponíveis                                         |
| salasAgrupadasPorDia             | Agrupa as salas por dia da semana                                          |
| salasAgrupadasPorDiaSemanaAtual | Agrupa as salas para a semana atual                                        |
| salasAgrupadasPorSemana          | Agrupa as salas por semana                                                 |
| buscarHorarioDisponibilidade     | Busca o horário disponível de uma sala                                     |
| atualizarSalaDisponivel          | Atualiza dados de uma sala                                                 |
| excluirSalaDisponivel            | Remove uma sala disponível                                                 |
| atualizarHorarioDisponivel       | Atualiza o horário inicial de disponibilidade                              |

#### _DuracaoModel.js

Gerencia as durações das reservas e interage com a tabela `duracao`:

| Função           | Descrição                                     |
|------------------|-----------------------------------------------|
| cadastrarDuracao | Cadastra uma nova duração de reserva          |
| listarDuracoes   | Lista todas as durações cadastradas           |

### 3.2. Arquitetura (Semana 5)

Este projeto adota a arquitetura **MVC (Model-View-Controller)** — em tradução livre, **Modelo-Visão-Controlador**. Essa arquitetura organiza o sistema em camadas bem definidas, o que facilita tanto a manutenção quanto a escalabilidade da aplicação.

A **camada Model (Modelo)** é responsável pela comunicação com o banco de dados e pela definição das regras de negócio.

A **camada Controller (Controlador)** atua como intermediária entre o Model e a View. Ela recebe as requisições HTTP, processa os dados por meio das funções definidas na camada Model e encaminha as respostas para a camada View.

Por fim, a **camada View (Visão)** é responsável pela interface com o usuário, ou seja, pela apresentação visual da aplicação. Nela ficam armazenados os arquivos HTML e CSS que definem o que é exibido ao usuário.

O diagrama a seguir ilustra a estrutura dessa arquitetura:

<div align="center">
  <sub>FIGURA 3 – Diagrama MVC</sub><br>
  <img src="./assets/mvc.drawio.png" width="100%" alt="Diagrama"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

Na sequência, apresenta-se um segundo diagrama que detalha a arquitetura da aplicação web desenvolvida, evidenciando os componentes criados em cada uma das camadas (Models, Controllers e Views), o Sistema de Gerenciamento de Banco de Dados (SGBD) utilizado e a ferramenta empregada para a hospedagem do banco de dados:

<div align="center">
  <sub>FIGURA 4 – Arquitetura do projeto</sub><br>
  <img src="./assets/MVCdiagram.drawio.png" width="100%" alt="Diagrama"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

### 3.3. Wireframes (Semana 03)

O wireframe é um esboço de um projeto web, seja ele um site, um aplicativo ou uma aplicação web. Ele serve para auxiliar o designer na definição da estrutura final do projeto de maneira rápida e simples. Os wireframes podem ser classificados como de baixa, média ou alta fidelidade, conforme o nível de detalhamento (MIRO, 2025). Com o objetivo de iniciar a construção da interface da aplicação, foi elaborado um wireframe de baixa fidelidade, com poucos detalhes e foco na organização estrutural, conforme apresentado a seguir:

<div align="center">
  <sub>FIGURA 5 - Wireframe de baixa fidelidade</sub><br>
  <img src= "./assets/wireframe.png" width="100%"
  alt="Wireframe "><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>
 
Para melhor visualização dos wireframes, acesse o link: [Wireframes Figma](https://www.figma.com/design/nnneG7MvcCWrjghrtlv3r7/Wireframe?node-id=0-1&t=peOSSvikLLiF2O9z-1).

Com o objetivo de facilitar o entendimento do wireframe, as telas possuem números de identificação no canto superior direito. Assim:

#### Tela 1 - Login:
Permite que o aluno realize login na plataforma, informando matrícula e senha.

#### Tela 2 - Reservas:
Exibe todas as reservas ativas do aluno e contém o botão para criação de uma nova reserva.

#### Tela 3 - Nova Reserva:
Apresenta ao usuário um calendário semanal com as salas disponíveis em cada dia, permitindo selecionar uma sala para reserva.

#### Tela 4 - Confirmação da Reserva:
Mostra um resumo da reserva com sala, dia, horário e duração, solicitando confirmação do usuário.

#### Tela 5 - Cadastro:
Caso o usuário ainda não possua cadastro, ele pode acessar esta tela a partir da tela 1. Aqui, ele informa matrícula, nome, turma, ano e senha para se cadastrar.

#### Tela 6 - Informações:
Exibida quando o usuário clica em um ícone específico na tela 2, revelando uma aba lateral com o total de reservas e cancelamentos realizados.

#### Tela 7 - Adicionar Nova Sala:
Acessível através do menu lateral na tela 2, esta interface permite aos usuários cadastrar novas salas no sistema.

#### Tela 8 - Cancelamento:
Pop-up exibido quando o usuário opta por cancelar uma reserva na tela 2. Ela solicita confirmação da ação.

#### Tela 9 - Mensagem de Sucesso:
Pop-up de confirmação exibido após a confirmação do cancelamento na tela 7, informando que a reserva foi cancelada com sucesso e permitindo que o usuário volte para a tela 2.

Os wireframes foram construídos com base nas User Stories descritas na seção 2.2 desse documento, em especial, a User Story US01, que trata da visualização de salas disponíveis para reserva em um dia específico. A funcionalidade é contemplada nas seguinte tela:
- Tela 3: apresenta o calendário semanal com as salas disponíveis por dia, atendendo aos critérios CR1 e CR2.

Além disso, ao clicar em uma sala, o usuário é direcionado à tela de confirmação da reserva, onde pode selecionar o horário de início e a duração, contemplando os critérios da User Story US02. O botão “Confirmar” permite ao usuário efetivar a reserva, de acordo com o critério CR1 da User Story US03. E a opção “Cancelar” aparece junto a cada reserva realizada, sendo seguida por uma tela de confirmação e uma mensagem de sucesso, implementando o critério de aceitação da User Story US04.

Os wireframes também incluem o fluxo de autenticação do usuário (login e cadastro), garantindo que apenas alunos registrados tenham acesso à funcionalidade de reservas, respeitando a estrutura prevista no banco de dados.

Esse conjunto de telas demonstra de forma clara como as funcionalidades foram pensadas com base nas necessidades reais do usuário, garantindo que o sistema seja funcional, intuitivo e centrado no estudante.

### 3.4. Guia de estilos (Semana 05)

Este guia de estilos tem como objetivo padronizar os aspectos visuais da aplicação Smart Room, promovendo consistência, legibilidade e uma experiência de usuário intuitiva. A seguir, apresentamos os elementos visuais e os componentes de interface utilizados no projeto, juntamente com orientações sobre como acessá-los no Figma.

__Tipografia__

A fonte utilizada em toda a aplicação é a Poppins, com hierarquias bem definidas (H1 a H4) para títulos, subtítulos e textos descritivos. A escolha dessa tipografia visa transmitir uma aparência moderna e de fácil leitura.

__Paleta de Cores__

A identidade visual do sistema é construída com tons de azul predominantes:

- Azul escuro: #134A94

- Azul vibrante: #2800ED

- Azul claro: #72AAFF

Além disso, cores neutras como #D9D9D9 (cinza claro) e #FFFFFF (branco) são utilizadas para equilibrar a interface e garantir contraste e acessibilidade.

__Pop-ups e Alertas__

Utilizados para informar ou solicitar ações do usuário, seguem um padrão com fundo azul claro, ícones de ação (ex: fechar) e textos centralizados. Exemplos:

- “Verifique seu e-mail”

- “Reserva concluída”

- “Tem certeza?” (com botões de ação)

__Botões__

Seguem um estilo arredondado, com cores vibrantes (azul ou roxo) para ações primárias. Sempre com textos em caixa alta, alinhados ao centro para garantir clareza.

__Assets__

Logo: Utilizado em cabeçalhos e materiais institucionais.

<div align="center">
  <sub>FIGURA 6 - Logo Smart Room</sub><br>
  <img src= "./assets/logo_meuProjeto.png" width="100%"
  alt="Logo"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

Ícones: Minimalistas e monocromáticos, representando ações como adicionar, cancelar, voltar, entre outros.

<div align="center">
  <sub>FIGURA 7 - Ícones</sub><br>
  <img src= "./assets/icones.png" width="100%"
  alt="Ícones"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

Imagem de fundo: Fotografia de uma sala de aula, reforçando a identidade acadêmica do projeto.

<div align="center">
  <sub>FIGURA 8 - Imagem de Fundo</sub><br>
  <img src= "./assets/fundo.png" width="100%"
  alt="Imagem de Fundo"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

__Acesso no Figma__

Para visualizar o guia de estilos diretamente no Figma:
- Acesse o link: [Smart Room](https://www.figma.com/design/nnneG7MvcCWrjghrtlv3r7/SmartRoom?node-id=98-272&t=I1Jfo7rR6IUTJgKQ-1).

- Na aba lateral esquerda, localize a página Guia de Estilos;


<div align="center">
  <sub>FIGURA 9 - Indicação da localização da página Guia de Estilos</sub><br>
  <img src= "./assets/guia.png" width="100%"
  alt="Guia de Estilos"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

O guia de estilos é uma ferramenta essencial para manter a identidade visual do Smart Room consistente ao longo de seu desenvolvimento. Ao seguir essas diretrizes, garantimos que todas as telas da aplicação estejam alinhadas com os objetivos do projeto, facilitando a colaboração entre designers, desenvolvedores e demais envolvidos na construção da solução. A padronização visual contribui diretamente para a usabilidade, acessibilidade e profissionalismo do sistema.

### 3.5. Protótipo de alta fidelidade (Semana 05)

O protótipo de alta fidelidade da aplicação Smart Room representa a versão visual mais próxima do produto final. Ele foi desenvolvido no Figma com base nas definições do guia de estilos e nas funcionalidades levantadas nas etapas anteriores do projeto. As telas a seguir simulam o funcionamento real do sistema, incluindo elementos visuais como tipografia, cores, botões, ícones e organização dos componentes. As figuras apresentadas nesta seção demonstram diferentes momentos da navegação pelo sistema, desde o acesso inicial até ações como confirmação de reserva e cancelamento. 

<div align="center">
  <sub>FIGURA 10 - Tela 1</sub><br>
  <img src= "./assets/tela1.png" width="100%"
  alt="Tela 1"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

<div align="center">
  <sub>FIGURA 11 - Tela 2</sub><br>
  <img src= "./assets/tela2.png" width="100%"
  alt="Tela 1"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

<div align="center">
  <sub>FIGURA 12 - Tela 3</sub><br>
  <img src= "./assets/tela3.png" width="100%"
  alt="Tela 1"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

<div align="center">
  <sub>FIGURA 13 - Tela 4</sub><br>
  <img src= "./assets/tela4.png" width="100%"
  alt="Tela 1"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

<div align="center">
  <sub>FIGURA 14 - Tela 5</sub><br>
  <img src= "./assets/tela4.png" width="100%"
  alt="Tela 1"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

Para acessar o protótipo interativo, basta entrar no seguinte link: [Smart Room](https://www.figma.com/design/nnneG7MvcCWrjghrtlv3r7/SmartRoom?node-id=98-272&t=I1Jfo7rR6IUTJgKQ-1).

Ao abrir a página, clique no botão Play localizado no canto superior direito da interface do Figma. Isso permitirá a navegação pelo protótipo como se estivesse utilizando o sistema real, facilitando testes de usabilidade e coleta de feedback.

<div align="center">
  <sub>FIGURA 15 - Acesse o protótipo clicando no botão de play</sub><br>
  <img src= "./assets/prototype.png" width="100%"
  alt="Prototype"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

O protótipo de alta fidelidade permite uma visualização clara e realista de como o Smart Room será entregue aos usuários finais. Essa etapa é essencial para identificar possíveis melhorias na interface, garantindo que a experiência do usuário seja fluida e coerente com os objetivos do projeto. A partir desse modelo, será possível avançar para a fase de desenvolvimento com maior segurança e alinhamento entre equipe e público-alvo.

### 3.6. WebAPI e endpoints (Semana 05)

A API desenvolvida para o sistema **Smart Room** segue a arquitetura RESTful e é responsável por gerenciar os dados de alunos, reservas, salas disponíveis, cancelamentos e autenticação. Abaixo estão descritos os principais endpoints organizados por módulo, incluindo o método HTTP utilizado e a função de cada rota.

#### Alunos (`/alunos`)
- `POST /alunos`  
  Cadastra um novo aluno no sistema.
- `GET /alunos`  
  Retorna a lista de todos os alunos cadastrados.
- `GET /alunos/:id/reservas`  
  Lista todas as reservas associadas a um aluno específico.

#### Reservas (`/reservas`)
- `POST /reservas`  
  Cria uma nova reserva de sala.
- `GET /reservas`  
  Lista todas as reservas registradas.
- `PUT /reservas/:id`  
  Atualiza os dados de uma reserva específica.
- `DELETE /reservas/:id`  
  Remove uma reserva existente do sistema.

#### Salas Disponíveis (`/salas`)
- `POST /salas`  
  Adiciona uma nova sala disponível ao sistema.
- `GET /salas`  
  Lista todas as salas disponíveis para reserva.
- `PUT /salas/:id`  
  Atualiza as informações de uma sala específica.
- `DELETE /salas/:id`  
  Remove uma sala do sistema.

#### Cancelamentos (`/cancelamentos`)
- `POST /cancelamentos`  
  Registra o cancelamento de uma reserva.
- `GET /cancelamentos`  
  Lista todos os cancelamentos realizados.

#### Login (`/login`)
- `POST /login`  
  Realiza a autenticação de um usuário/aluno no sistema.

#### Durações (`/duracoes`)
- `POST /duracoes`
  Cadastra uma nova opção de duração para reservas
- `GET /duracoes`
Lista todas as durações disponíveis para reserva
- `PUT /duracoes/:id`
Atualiza uma duração específica
- `DELETE /duracoes/:id`
Remove uma opção de duração do sistema

---

### 3.7. Interface e Navegação (Semana 07)

A interface do Smart Room foi desenvolvida para ser intuitiva, responsiva e agradável visualmente, seguindo o guia de estilos definido para o projeto. O fluxo de navegação foi pensado para que o estudante consiga realizar todas as ações principais (login, cadastro, reserva, cancelamento, visualização de salas) de forma simples e rápida, tanto em desktop quanto em dispositivos móveis.

#### Tela de Login

- Permite ao aluno acessar o sistema informando matrícula e senha;
- Possui link para a tela de cadastro;
- Efeito de hover nos botões e links para melhor experiência visual.

<div align="center">
  <sub>FIGURA 16 - Tela de Login</sub><br>
  <img src= "./assets/login.png" width="100%"
  alt="tela de Login"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

#### Tela de Cadastro

- Formulário para criação de conta de aluno, com validação de campos;
- Layout centralizado, campos bem espaçados e feedback visual para erros e sucesso;
- Efeito de hover nos botões e links.

<div align="center">
  <sub>FIGURA 17 - Tela de Cadastro</sub><br>
  <img src= "./assets/cadastro.png" width="100%"
  alt="tela de cadastro"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

#### Tela de Reservas

- Exibe todas as reservas ativas do aluno;
- Botão para criar nova reserva e botão para cancelar reservas existentes;
- Mostra estatísticas no menu lateral (total de reservas e cancelamentos);
- Layout responsivo e visual limpo.

<div align="center">
  <sub>FIGURA 18 - Tela de Reservas</sub><br>
  <img src= "./assets/reservas.png" width="100%"
  alt="tela de reservas"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

<div align="center">
  <sub>FIGURA 19 - Tela do Menu Lateral</sub><br>
  <img src= "./assets/menu.png" width="100%"
  alt="tela do menu lateral"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

#### Tela de Salas Disponíveis

- Mostra um calendário semanal com as salas disponíveis por dia;
- Cada sala é clicável e leva à tela de confirmação de reserva;
- Navegação por semanas é possível;
- Layout em colunas, cores e tipografia consistentes.

<div align="center">
  <sub>FIGURA 20 - Tela de Salas Disponíveis</sub><br>
  <img src= "./assets/salasDispo.png" width="100%"
  alt="tela de salas disponíveis"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

#### Tela de Confirmação de Reserva

- Exibe os detalhes da reserva (sala, data, horário, duração);
- Permite ao usuário escolher o horário e a duração da reserva;
- Botão de confirmação com feedback visual de sucesso.

<div align="center">
  <sub>FIGURA 21 - Tela de Confirmação de Reserva</sub><br>
  <img src= "./assets/confirmacao.png" width="100%"
  alt="tela de confirmação de researva"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

#### Tela de Adicionar Nova Sala
Embora não estivesse prevista no wireframe inicial da aplicação, a tela de Adicionar Nova Sala foi incorporada na versão final do projeto devido à necessidade de proporcionar ao usuário uma maneira simples e intuitiva de cadastrar novas salas no sistema.

Essa funcionalidade foi pensada para melhorar a usabilidade e garantir a flexibilidade da aplicação. A tela conta com os seguintes elementos:

- Interface para inserção de uma nova sala disponível no sistema;
- Formulário com validação de dados e feedback visual;
- Botão de retorno à tela anterior;
- Layout alinhado ao padrão visual adotado nas demais telas da aplicação.

<div align="center">
  <sub>FIGURA 22 - Tela de Adicionar Nova Sala</sub><br>
  <img src= "./assets/adicionar.png" width="100%"
  alt="tela de adicionar nova sala"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

#### Pop-ups e Mensagens

- Pop-ups para confirmação de reserva, cancelamento e mensagens de sucesso/erro;
- Seguem o padrão visual do sistema, com cores, fontes e botões consistentes.

<div align="center">
  <sub>FIGURA 23 - Pop up de Reserva Concluída</sub><br>
  <img src= "./assets/concluido.png" width="100%"
  alt="pop up de reserva concluida"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

<div align="center">
  <sub>FIGURA 24 - Pop up de Confirmação de Cancelamento de Reserva</sub><br>
  <img src= "./assets/cancelamento.png" width="100%"
  alt="pop up de confirmação de cancelamento de reserva"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

<div align="center">
  <sub>FIGURA 25 - Pop up de Confirmação de Sucesso no Cancelamento da Reserva</sub><br>
  <img src= "./assets/sucesso.png" width="100%"
  alt="pop up de confirmação de sucesso no cancelamento da reserva"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

Todas as telas foram desenvolvidas utilizando EJS, CSS e JavaScript para interatividade. Além disso, o backend em Node.js/Express integra as views com o banco de dados PostgreSQL, garantindo que as informações exibidas estejam sempre atualizadas.

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

Nesta etapa do projeto, foi concluído o desenvolvimento da aplicação web Smart Room, e o sistema já se encontra funcional. A seguir, apresenta-se um vídeo demonstrativo que ilustra o fluxo completo de navegação e uso da plataforma:

<p align="center">
  <a href="https://www.youtube.com/watch?v=gtyhSu4sHos" target="_blank">
    <img src="https://img.youtube.com/vi/gtyhSu4sHos/0.jpg" alt="Vídeo demonstrativo do Smart Room" />
  </a>
</p>


A aplicação foi desenvolvida com foco na experiência do usuário, prezando por uma interface intuitiva, responsiva e visualmente agradável. O frontend utiliza tecnologias como HTML, CSS, JavaScript e EJS para renderização dinâmica das páginas. No backend, foi empregado Node.js com Express, com integração ao banco de dados PostgreSQL por meio da plataforma Supabase, garantindo persistência e atualização em tempo real dos dados.

A seguir, são detalhadas as principais telas exibidas no vídeo, evidenciando os fluxos, funcionalidades implementadas e decisões de design.

#### Tela de Login
A tela de login permite que o aluno acesse sua conta informando matrícula e senha. Ela também possui link para a tela de cadastro, efeitos visuais de hover e layout responsivo.

<div align="center">
  <sub>FIGURA 26 - Tela de Login</sub><br>
  <img src= "./assets/login.png" width="100%"
  alt="tela de Login"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

#### Tela de Cadastro
O aluno pode criar sua conta preenchendo um formulário com validação de dados e feedback visual para erros e sucesso. O layout é centralizado, com campos bem espaçados e alinhados ao estilo do projeto.

<div align="center">
  <sub>FIGURA 27 - Tela de Cadastro</sub><br>
  <img src= "./assets/cadastro.png" width="100%"
  alt="tela de cadastro"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

### Tela de Reservas
Essa tela mostra todas as reservas ativas do aluno, com botões para cancelar reservas ou criar novas. Também é possível visualizar estatísticas de uso ou adicionar uma nova sala no menu lateral presente nessa tela.

<div align="center">
  <sub>FIGURA 28 - Tela de Reservas</sub><br>
  <img src= "./assets/reservas.png" width="100%"
  alt="tela de reservas"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

<div align="center">
  <sub>FIGURA 29 - Tela do Menu Lateral</sub><br>
  <img src= "./assets/menu.png" width="100%"
  alt="tela do menu lateral"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

#### Tela de Adicionar Nova Sala
Funcionalidade adicional criada para permitir o cadastro de novas salas. A tela conta com um formulário com validação e feedback visual, além de botão de retorno.

<div align="center">
  <sub>FIGURA 30 - Tela de Adicionar Nova Sala</sub><br>
  <img src= "./assets/adicionar.png" width="100%"
  alt="tela de adicionar nova sala"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

#### Tela de Salas Disponíveis
Essa tela exibe um calendário semanal com as salas disponíveis. Cada sala pode ser clicada para realizar uma reserva. A navegação entre semanas é possível, e o layout segue um padrão limpo e organizado.

<div align="center">
  <sub>FIGURA 31 - Tela de Salas Disponíveis</sub><br>
  <img src= "./assets/salasDispo.png" width="100%"
  alt="tela de salas disponíveis"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

#### Tela de Confirmação de Reserva
Após escolher uma sala, o aluno pode confirmar a reserva selecionando o horário e a duração desejados. A tela exibe todos os detalhes da reserva, e a confirmação fornece um feedback visual.

<div align="center">
  <sub>FIGURA 32 - Tela de Confirmação de Reserva</sub><br>
  <img src= "./assets/confirmacao.png" width="100%"
  alt="tela de confirmação de researva"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

#### Pop-ups e Mensagens
Diversos momentos da interação com o sistema são acompanhados de pop-ups que fornecem confirmações visuais para as ações realizadas:

- Confirmação de reserva realizada com sucesso;

- Confirmação de cancelamento;

- Mensagem de sucesso após cancelamento.

<div align="center">
  <sub>FIGURA 33 - Pop up de Reserva Concluída</sub><br>
  <img src= "./assets/concluido.png" width="100%"
  alt="pop up de reserva concluida"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

<div align="center">
  <sub>FIGURA 34 - Pop up de Confirmação de Cancelamento de Reserva</sub><br>
  <img src= "./assets/cancelamento.png" width="100%"
  alt="pop up de confirmação de cancelamento de reserva"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

<div align="center">
  <sub>FIGURA 35 - Pop up de Confirmação de Sucesso no Cancelamento da Reserva</sub><br>
  <img src= "./assets/sucesso.png" width="100%"
  alt="pop up de confirmação de sucesso no cancelamento da reserva"><br>
  <sup>Fonte: Material produzido pela autora, 2025</sup>
</div>

Em termos de código, a arquitetura MVC (Model-View-Controller) foi utilizada, como foi descrito na seção 3.2, garantindo a separação clara entre as responsabilidades de cada camada da aplicação:

Model (Modelo): Responsável pela comunicação com o banco de dados PostgreSQL, realizando operações de leitura, escrita, atualização e exclusão de dados referentes a usuários, salas e reservas. Os modelos foram implementados em JavaScript, utilizando bibliotecas como pg para integração com o banco de dados via Supabase.

View (Visão): As views foram desenvolvidas utilizando EJS (Embedded JavaScript), permitindo a renderização dinâmica das páginas HTML com base nos dados fornecidos pelos controladores. O uso de EJS facilitou a criação de componentes reutilizáveis e a atualização em tempo real das informações exibidas ao usuário.

Controller (Controlador): Os controladores atuam como intermediários entre as views e os models, processando as requisições dos usuários, validando dados e coordenando as respostas enviadas para o frontend. Cada funcionalidade principal do sistema (login, cadastro, reservas, salas) possui seu próprio controlador, promovendo organização e facilidade de manutenção do código.

Essa estrutura modular proporcionou maior escalabilidade ao projeto, permitindo a adição de novas funcionalidades (como a tela de adicionar sala) sem comprometer a integridade do sistema. Além disso, a separação de responsabilidades facilita a identificação e correção de eventuais erros, bem como a implementação de melhorias futuras.

Por fim, toda a navegação e interatividade do sistema foram aprimoradas com JavaScript no frontend, garantindo uma experiência fluida.

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

Este projeto representou um desafio significativo, mas também uma oportunidade valiosa de aprendizado. Ao longo do desenvolvimento do Smart Room, foi possível aprimorar consideravelmente minhas habilidades em programação e aprofundar o entendimento da arquitetura MVC (Model-View-Controller), aplicando-a de forma prática em uma aplicação web funcional.

A aplicação atende plenamente às _User Stories_ definidas na seção 2.2, permitindo que estudantes visualizem, reservem e cancelem salas de estudo de forma intuitiva e eficiente. No entanto, alguns pontos de melhoria foram identificados, como a falta de testes automatizados e a lentidão na inicialização da rota /reservas, que pode impactar negativamente a experiência do usuário.

Em relação a possíveis melhorias futuras, algumas ideias foram levantadas para tornar o sistema ainda mais robusto e alinhado com o uso real em instituições de ensino. Uma delas é a implementação de um sistema de denúncias, permitindo que usuários reportem comportamentos inadequados, como o uso prolongado das salas além do horário reservado. Com base nessas denúncias, o sistema poderia aplicar penalidades, como suspensões temporárias ou bloqueios de acesso.

Outra melhoria importante seria a implementação de um sistema de autenticação mais restrito, que impeça alunos comuns de cadastrarem novas salas. Esse controle garantiria maior segurança e integridade dos dados, evitando o uso indevido da aplicação.

Com essas possíveis evoluções, o Smart Room se tornaria uma solução ainda mais completa, segura e eficiente para a gestão de espaços de estudo em ambientes escolares e universitários.

## <a name="c5"></a>5. Referências

MIRO. O que é wireframe? Disponível em: https://miro.com/pt/wireframe/o-que-e-wireframe/. Acesso em: 8 maio 2025.https://miro.com/pt/wireframe/o-que-e-wireframe/

MOZILLA. Introdução à estilização: começando com CSS. MDN Web Docs. Disponível em: https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Styling_basics/Getting_started. Acesso em: 11 jun. 2025.

---
