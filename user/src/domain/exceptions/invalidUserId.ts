export default class InvalidUserId extends Error {
  constructor() {
    super('You entered an invalid UUID, please verify and try again.');
    this.name = 'InvalidUserId';
  }
}
