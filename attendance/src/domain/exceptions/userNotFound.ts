export class UserNotFound extends Error {
  constructor() {
    super("Can't create an attendance for an unexisting user");
    this.name = 'UserNotFound';
  }
}
