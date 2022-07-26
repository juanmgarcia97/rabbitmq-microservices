import { injectable } from 'inversify';
import { User, UserService } from './user.service';
import axios from 'axios';

@injectable()
export class UserServiceImpl implements UserService {
  private userApi = process.env.USER_API;

  async findUserById(id: string): Promise<User> {
    const response = await axios.get(`${this.userApi}/${id}`);
    return response.data.data as User;
  }
}
