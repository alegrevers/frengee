# Car Searcher - Frengee API

## Endpoints

### Listar Veículos

Endpoint:
GET /api/vehicles/

Descrição:
Retorna uma lista de todos os veículos cadastrados no sistema.

### Inserir Veículo

Endpoint:
POST /api/vehicles/

Descrição:
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

Endpoint:
GET /api/vehicles/{id}

Descrição:
Retorna os detalhes de um veículo específico com base no ID fornecido.

Parâmetros da URL:
- `id` (string): O ID do veículo a ser obtido.

### Atualizar Veículo

Endpoint:
PUT /api/vehicles/{id}

Descrição:
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

Endpoint:
DELETE /api/vehicles/{id}

Descrição:
Exclui um veículo específico com base no ID fornecido.

Parâmetros da URL:
- `id` (string): O ID do veículo a ser excluído.
