export default class UserNotFound extends Error {
  constructor() {
    super('User not found');
    this.name = 'UserNotFound';
  }
}
