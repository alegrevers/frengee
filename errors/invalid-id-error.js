class InvalidIdError extends Error {
    constructor() {
      super('ID inválido');
      this.name = 'ValidationError';
      this.statusCode = 422;
    }
}

module.exports = InvalidIdError