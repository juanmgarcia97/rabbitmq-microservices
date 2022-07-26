import express, { NextFunction, Request, Response } from 'express';
import container from '../../inversify.config';
import User from '../domain/user';
import { UserService } from '../service/user.service';
import { validate as uuidValidate } from 'uuid';
import InvalidUserId from '../domain/exceptions/invalidUserId';
import EmptyUser from '../domain/exceptions/emptyUser';
import { QueryFailedError } from 'typeorm';

const router = express.Router();

const userService: UserService = container.get<UserService>('UserService');

router.get(
  '/filter',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { nickname, fullName } = request.query;
      let foundUsers: User[] = [];
      if (nickname) {
        foundUsers = await userService.findUserByNickname(nickname as string);
      }
      if (fullName) {
        foundUsers = await userService.findUserByFullName(fullName as string);
      }
      response.status(200).json({
        message: 'User(s) found',
        data: foundUsers,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;
      if (!uuidValidate(id)) throw new InvalidUserId();
      const user = await userService.findUserById(id);
      response.status(200).json({
        message: 'User found',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const users = await userService.findAll();
      response.status(200).json({
        message: 'Users found',
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;
      if (!uuidValidate(id)) throw new InvalidUserId();
      await userService.deleteUser(id);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = request.body as User;
      if (!user || user === null) throw new EmptyUser();
      const createdUser = await userService.createUser(user);
      response.status(201).json({
        message: 'User created',
        data: createdUser,
      });
    } catch (error) {
      if (error instanceof QueryFailedError) next(new EmptyUser());
      next(error);
    }
  }
);

router.put(
  '/:id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;
      if (!uuidValidate(id)) throw new InvalidUserId();
      const user = request.body as User;
      const createdUser = await userService.updateUser(id, user);
      response.status(200).json({
        message: 'User updated',
        data: createdUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;
      if (!uuidValidate(id)) throw new InvalidUserId();
      const { attendance } = request.body;
      const updatedUser = await userService.updateUserAttendance(
        id,
        attendance
      );
      response.status(200).json({
        message: 'User attendance was updated',
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.all('*', () => {
  throw new Error('Page not found');
});

export default router;
