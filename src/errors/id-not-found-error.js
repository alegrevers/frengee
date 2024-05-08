class IdNotFoundError extends Error {
    constructor() {
      super('ID não encontrado');
      this.name = 'DatabaseError';
      this.statusCode = 404;
    }
}

module.exports = IdNotFoundError
