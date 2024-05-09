# Car Searcher - Frengee API

## Inicialização

Após realizar o clone do projeto, bastam 2 comandos 1 uma configuração para tê-lo rodando localmente. Os comandos são:

Para instalar os pacotes e as dependências necessárias
```
yarn
```

Antes de iniciar o servidor é necesário atribuir os valores desejados para as variaveis de ambiente em um arquivo `.env`. Para isso, basta copiar e colar o arquivo `.env.sample`, removendo o `.sample` e atribuindo os valores para cada variável.

Para iniciar o servidor localmente
```
yarn start
```

Para rodar os testes de integração basta rodar o comando:
```
yarn test
```

Por fim, é possível conferir a documentação da API abaixo no READ.ME e também disponibilizado no endereço `localhost:3000/doc` (quando o servidor estiver rodando).

A API também está disponível publicamente (hospedada pela plataforma [Render](https://render.com/)) no endereço [https://vehicle-searcher-frengee.onrender.com/](https://vehicle-searcher-frengee.onrender.com/), bastando adicionar a URL necessária para acessar o método desejado.

## Endpoints

### Documentação

`/doc`
Documentação da API com os métodos existentes, parâmetros necessários e códigos e modelos de resposta.

### Listar Veículos

`GET /api/vehicles/`
Retorna uma lista de todos os veículos cadastrados no sistema.

### Inserir Veículo

`POST /api/vehicles/`
Insere um novo veículo no sistema.

Parâmetros da Solicitação:
-  Informações do veículo a ser inserido.
```json
{
  "maker": "Ford", // obrigatório
  "year": 2013, // obrigatório
  "model": "Fiesta", // obrigatório
  "color": "White" // obrigatório
}
```

### Obter Veículo por ID

`GET /api/vehicles/{id}`
Retorna os detalhes de um veículo específico com base no ID fornecido.

Parâmetros da URL:
- `id` (string): O ID do veículo a ser obtido.

### Atualizar Veículo

`PUT /api/vehicles/{id}`
Atualiza os detalhes de um veículo específico com base no ID fornecido.

Parâmetros da URL:
- `id` (string): O ID do veículo a ser atualizado.

Parâmetros da Solicitação:
- Informações do veículo a serem atualizadas.
```json
{
  "maker": "Ford",
  "year": 2013,
  "model": "Fiesta",
  "color": "White"
}
```

### Excluir Veículo

`DELETE /api/vehicles/{id}`
Exclui um veículo específico com base no ID fornecido.

Parâmetros da URL:
- `id` (string): O ID do veículo a ser excluído.
