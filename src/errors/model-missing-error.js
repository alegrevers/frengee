class ModelMissingError extends Error {
    constructor() {
      super('O campo model é obrigatório');
      this.name = 'ValidationError';
      this.statusCode = 400;
    }
}

module.exports = ModelMissingError

