![mit-license](https://img.shields.io/badge/LICENSE-MIT-blue) ![node-version](https://img.shields.io/badge/Node-v16.13.0-yellow)

# Projeto Crawler

- Trata-se de um projeto com o objetivo de realizar a busca em um site que exibe o CPF de candidatos aprovados, e ao clicar em cada CPF, é exibido o nome e a nota do candidato. Esta busca consiste em capturar cada número de CPF, nome e nota de todos os candidatos. O site é dividido em aproximadamente 5 mil páginas, contendo 7 candidatos em cada uma delas, finalizando num total de aproximadamente 33 mil candidatos.

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
# Licença <a name="licença"></a>

Este projeto está sob licença do [MIT](https://github.com/danielbped/crawler/blob/main/LICENSE).

# Tecnologias Utilizadas <a name="tecnologias"></a>
  - [**Node JS**](https://nodejs.org/en/)
  - [**Express**](https://expressjs.com/pt-br/)
  - [**MySQL**](https://www.npmjs.com/package/mysql2)
  - [**Axios**](https://axios-http.com/docs/intro)
  - [**Sequelize**](https://www.npmjs.com/package/sequelize)
  - [**RegEx**](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions)
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
```

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
      |- index.js
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
      |- utils
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