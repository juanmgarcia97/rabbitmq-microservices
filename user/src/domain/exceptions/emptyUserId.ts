export default class EmptyUserId extends Error {
  constructor() {
    super("There/'s no user id");
    this.name = 'EmptyUserId';
  }
}
