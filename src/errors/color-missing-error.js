class ColorMissingError extends Error {
    constructor() {
      super('O campo color é obrigatório.');
      this.name = 'ValidationError';
      this.statusCode = 400;
    }
}

module.exports = ColorMissingError