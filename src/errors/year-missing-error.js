class YearMissingError extends Error {
    constructor() {
      super('O campo year é obrigatório');
      this.name = 'ValidationError';
      this.statusCode = 400;
    }
}

module.exports = YearMissingError
