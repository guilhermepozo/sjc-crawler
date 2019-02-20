# SJC Crawler
Está aplicação obtém os dados de licitações da cidade de São José dos Campos - SP e salva em um bando de dados (MongoDB).
> Também foi implementado um "retorno" que pode ser utilizado como resposta à um requisição HTTP (API).

### Requisitos
- Node ^v10
- NPM ^v6
- Linux CentOS/RHEL 7 -based ou Windows com Google Chrome já instalado.

## Como Utilizar

 1. Se estiver em ambiente AWS (AWS linux, Cloud9) execute o arquivo:
    `. ./installChrome.sh` 
	 > Também pode ser aplicado para SO's CentOS/RHEL 7 -based)
    
    A aplicação usa a Puppeteer, biblioteca que disponibiliza uma
    API que controla o Chromium, uma versão do Chrome *"headless e
    server-side"*.
2. Instale as dependências com `npm i` 
	- config - Variáveis de Ambiente e Informações de Conexão.
	- lodash - Manipulação de Estrutura de Dados.
	- moment - Manipulação de Datas.
	- mongoose - ORM para MondoDB.
	- numeral - Manipulação de Números.
	- puppeteer - Browser server-side.
	- winston - Loggin.
	- xregexp - Expressões Reguláres .
3. Declare a senha do banco de dados em uma variável de ambiente **DB_PASSWORD**:  `export DB_PASSWORD=<senha> ` - Linux
	> Obs.:Para este projeto utilizei o serviço Atlas MongoDB, minha senha é `admin` para efeitos de teste.

4. Preencha o arquivo `config/default.json` com as informações do seu Banco de Dados MongoDB.

5. Execute `npm start`

## Considerações
- Comecei direto com a página de licitações de SJC sem antes pensar em outra página com mais elementos (tabelas, lista de links...), então acabei trabalhando com poucos elementos do DOM e com mais expressões regulares (RegEx) para obter os dados dos textos.

  [Licitações Prefeitura de São José dos Campos - SP](https://servicos.sjc.sp.gov.br/sa/licitacoes/index.aspx)
- Notará que o arquivo `scraping.js` cria duas estruturas, uma para salvar os dados no banco e uma para um possível retorno, acabei disponibilizando um *'return'* já estruturado, onde pode ser uma resposta à uma requisição HTTP (API).
