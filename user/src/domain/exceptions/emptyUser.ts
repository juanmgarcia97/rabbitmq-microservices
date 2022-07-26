export default class EmptyUser extends Error {
  constructor() {
    super("Can't create empty user");
    this.name = 'EmptyUser';
  }
}
