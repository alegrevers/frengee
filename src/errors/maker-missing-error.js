class MakerMissingError extends Error {
    constructor() {
      super('O campo maker é obrigatório');
      this.name = 'ValidationError';
      this.statusCode = 400;
    }
}

module.exports = MakerMissingError
