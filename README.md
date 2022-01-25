![mit-license](https://img.shields.io/badge/LICENSE-MIT-blue) ![node-version](https://img.shields.io/badge/Node-v16.13.0-yellow)

# Projeto Crawler

- Trata-se de um projeto com o objetivo de realizar a busca em um site que exibe o CPF de candidatos aprovados, e ao clicar em cada CPF, é exibido o nome e a nota do candidato. Esta busca consiste em capturar cada número de CPF, nome e nota de todos os candidatos. O site é dividido em aproximadamente 5 mil páginas, contendo 10 candidatos em cada uma delas, finalizando num total de aproximadamente 50 mil candidatos.

[Link do site](https://sample-university-site.herokuapp.com/approvals/1)

# Sumário
  - [Licença](#licenca)
  - [Tecnologias utilizadas](#tecnologias)
  - [Instruções para rodar o projeto](#instrucoes)
  - [Organização e estruturação do projeto](#organizacao)
    - [Arquitetura MSC](#msc)
    - [SOLID](#solid)
  - [REST API](#api)
    - [GET /](#get)
  - [Desenvolvimento](#desenvolvimento)
    - [Fetch](#fetch)
    - [Filtragem de dados](#filtragem)
    - [Higienização dos dados](#higienizacao)
    - [Banco de dados](#banco)
    - [Validações](#validacoes)
  - [Testes](#testes)
    - [API](#teste-api)
# Licença <a name="licença"></a>

Este projeto está sob licença do [MIT](https://github.com/danielbped/crawler/blob/main/LICENSE).

# Tecnologias Utilizadas <a name="tecnologias"></a>
  - [**Node JS**](https://nodejs.org/en/)
  - [**Express**](https://expressjs.com/pt-br/)
  - [**MySQL**](https://www.npmjs.com/package/mysql2)
  - [**Axios**](https://axios-http.com/docs/intro)
  - [**Sequelize**](https://www.npmjs.com/package/sequelize)
  - [**RegEx**](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions)
  - [**Chai**](https://www.chaijs.com/)
  - [**Mocha**](https://mochajs.org/)
  - [**Https Status Code**](https://www.npmjs.com/package/http-status-codes)
  - [**dotenv**](https://www.npmjs.com/package/dotenv)
  - [**Nodemon**](https://nodemon.io/)

# Instruções para rodar o projeto

### Será necessário ter instalado na sua máquina:

```
Git
MySQL
Node v16.13.0
```

- Clone o repositório com o comando **git clone**:

```
git clone git@github.com:danielbped/crawler.git
```

- Entre no diretório que acabou de ser criado:

```
cd crawler
```

- Para o projeto funcionar na sua máquina, será necessário instalar suas dependências, para isso, utilize o comando **npm install**:

```
npm install
```

## .env
- Para testes locais, é fundamental configurar um arquivo de variáveis de ambiente **.env** na raiz do projeto, este arquivo deverá possuir as seguintes informações:

```
MYSQL_USER=root
MYSQL_PASSWORD=password
HOSTNAME=localhost
PORT=3000
PAGE=1
```

> ⚠️ Por padrão, a busca irá da página 1 até a última página, caso queira alterar a página de início, é só informar na variável PAGE ⚠️

> ⚠️ Lembre de trocar 'root' pelo seu nome de usuário no MySQL, e 'password' pela sua senha ⚠️

- Pronto, agora o projeto está pronto para ser rodado localmente, utilizando o comando **npm start**:

```
npm start
```

# Organização e estruturação do projeto <a name="organizacao"></a>

## Arquitetura MSC <a name="msc"></a>

Este projeto foi desenvolvido utilizando a arquitetura MSC, que consiste em separar os arquivos por pastas de **M**odels, **S**ervices e **C**ontrollers, dividindo, assim, as responsabilidades das funções, tornando o código mais limpo e organizado.

Desta forma, o projeto está organizado e estruturado da seguinte forma:

```
      |- .env
      |- .README.md
      |- api
            |- index.js
            |- server.js
      |- config
            |- config.js
      |- controllers
            |- getCandidates.js
            |- root.js
      |- middlewares
            |- error.js
      |- migrations
            |- XXXXXXXXXXXXXX-create-user
      |- models
            |- candidate.js
            |- index.js
      |- services
            |- getCandidates.js
            |- populateCandidates.js
      |- tests
            |- getCandidatesApi.test.js
      |- utils
            |- errorMessages.js
            |- filters.js
            |- Regex.js
            |- validations.js
```

## SOLID <a name="solid"></a>

Para o desenvolvimento, também foram utilizados alguns princípios SOLID. SOLID é um acrônimo para cinco princípois, os quais são:

  - **S**ingle responsability principle (Princípio da responsabilidade única)
  - **O**pen/Closed principl (Princípio aberto/fechado)
  - **L**iskov substitution principle (Princípio de substituição de Liskov)
  - **I**nterface segregation principle (Princípio da segregação da interface)
  - **D**ependency inversion principle (Princípio da inversão da dependência)

Os princípios utilizados aqui foram os de responsabilidade única, aberto/fechado e inversão de dependência, mas o que cada um deles representa de fato?

  - Princípio da responsabilidade única: Uma função deve ter uma, e apenas uma, tarefa a realizar dentro do código.
  - Princípio aberto/fechado: O comportamento de uma função deve ser extensível sem que precise modificar seu comportamento anterior.
  - Princípio da inversão de dependência: Quem chama uma função deve ser capaz de determinar quais outros módulos ela usa em sua lógica.

Para saber mais sobre os princípios SOLID, acesse [este link](https://medium.com/desenvolvendo-com-paixao/o-que-%C3%A9-solid-o-guia-completo-para-voc%C3%AA-entender-os-5-princ%C3%ADpios-da-poo-2b937b3fc530).

# REST API <a name="api"></a>

## GET / <a name="get"></a>

Para realizar a busca de todos os candidatos, a requisição não necessita de body nem headers, e a resposta terá um status 200 (**OK**), e será um array parecido com o seguinte:

```
    [
      {
        "id": 1,
        "name": "ANTHONY KING",
        "score": "85.38",
        "CPF": "87645213035",
        "validCPF": true
      },
      {
        "id": 2,
        "name": "ANNE CRAWFORD I II III IV V MD DDS PHD DVM",
        "score": "72.03",
        "CPF": "87650413217",
        "validCPF": true
      },
    ]
```

- Caso haja algum problema com a requisição, surgirá uma mensagem de erro:
  
  - Status 500 (**INTERNAL_SERVER_ERROR**):
      
      - 'Internal Server Error. Try again.'

# Desenvolvimento <a name="desenvolvimento" ></a>

## Fetch <a name="fetch"></a>

Para realizar o fetch no [site](https://sample-university-site.herokuapp.com/approvals/1) dos candidatos, foi utilizado o client HTTP [**Axios**](https://axios-http.com/docs/intro), obtendo como resposta uma **string** com o conteúdo **HTML** da página, parecida com a seguinte:

```
<html>
  <h1>
      Approved candidates (all data is fake)
  </h1>
    <li><a href="/candidate/178.422.117-11">178.422.117-11</a></li>
    <li><a href="/candidate/012.346.857-44">012.346.857-44</a></li>
    ...
  <div><a href="/approvals/2">Next page</a></div>
</html>
```

## Filtragem de dados <a name="filtragem"></a>

Para filtrar os dados obtidos, e recuperar apenas o CPF dos candidatos, foram utilizadas as expressões regulares ([**RegEx**](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions)). O RegEx também foi utilizado para, ao acessar cada CPF, recuperar apenas o nome e a nota de cada candidato.

## Higienização dos dados <a name="higienizacao"></a>

Tendo realizado as filtragens, foi necessário realizar uma higienização nos dados, pois mesmo após filtrar os dados com o RegEx, alguns dados ainda ficam com resquícios do HTML. Feito isso, mais algumas alterações foram feitas, como:
  
  - Remover acentuações, pontuações e caracteres especiais.
  - Deixar todas as letras dos nomes dos candidatos em maiúsculo.

## Banco de dados <a name="banco"></a>

Após a higienização, é a hora de conectar e inserir os dados no banco de dados. O banco de dados utilizado foi o [**MySQL**](https://www.npmjs.com/package/mysql2), um banco de dados relacional, utilizando a [**ORM**](https://www.devmedia.com.br/orm-object-relational-mapper/19056) [**Sequelize**](https://www.npmjs.com/package/sequelize).

## Validações <a name="validacoes"></a>

Algumas funções de valiação foram necessárias, tanto como validar se o [CPF é válido](https://www.aceguarulhos.com.br/blog/como-saber-se-um-cpf-e-verdadeiro/#gsc.tab=0) quanto para verificar se o CPF já existe no banco de dados, não permitindo a inserção de CPFs repetidos.

## Testes <a name="testes"></a>

### API <a name="teste-api"></a>

Para realizar os testes da resposta da requisição da API, foi utilizada as bibliotecas [Chai](https://www.chaijs.com/) e [Mocha](https://mochajs.org/), com 95% de cobertura.

```
------------------------|---------|----------|---------|---------|-------------------
File                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------|---------|----------|---------|---------|-------------------
All files               |   95.27 |    68.42 |   92.59 |   96.55 |                   
 api                    |     100 |      100 |     100 |     100 |                   
  index.js              |     100 |      100 |     100 |     100 |                   
 config                 |     100 |      100 |     100 |     100 |                   
  config.js             |     100 |      100 |     100 |     100 |                   
 controllers            |   94.11 |      100 |     100 |   94.11 |                   
  getCandidates.js      |    90.9 |      100 |     100 |    90.9 | 19                
  root.js               |     100 |      100 |     100 |     100 |                   
 middlewares            |   83.33 |      100 |      50 |   83.33 |                   
  error.js              |   83.33 |      100 |      50 |   83.33 | 5                 
 models                 |   91.66 |    66.66 |     100 |   91.66 |                   
  candidate.js          |     100 |      100 |     100 |     100 |                   
  index.js              |      90 |    66.66 |     100 |      90 | 13,30             
 services               |     100 |       75 |     100 |     100 |                   
  getCandidates.js      |     100 |    83.33 |     100 |     100 | 16                
  populateCandidates.js |     100 |       50 |     100 |     100 | 11                
 utils                  |   93.75 |       50 |   91.66 |     100 |                   
  Regex.js              |     100 |      100 |     100 |     100 |                   
  errorMessages.js      |     100 |      100 |     100 |     100 |                   
  filters.js            |     100 |      100 |     100 |     100 |                   
  validations.js        |   83.33 |       50 |   83.33 |     100 | 9                 
------------------------|---------|----------|---------|---------|-------------------
```