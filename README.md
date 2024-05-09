# Car Searcher - Frengee API

## Endpoints

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
  "maker": "Ford", // obrigatório
  "year": 2013, // obrigatório
  "model": "Fiesta", // obrigatório
  "color": "White" // obrigatório
}
```

### Excluir Veículo

`DELETE /api/vehicles/{id}`
Exclui um veículo específico com base no ID fornecido.

Parâmetros da URL:
- `id` (string): O ID do veículo a ser excluído.
