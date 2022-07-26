import { Container } from 'inversify';
import { AttendanceRepository } from './src/repository/attendance.repository';
import { AttendanceRepositoryImpl } from './src/infrastructure/attendance.repository.impl';
import { AttendanceService } from './src/service/attendance.service';
import { AttendanceServiceImpl } from './src/service/attendance.service.impl';
import { UserService } from './src/service/user.service';
import { UserServiceImpl } from './src/service/user.service.impl';
import { SenderService } from './src/rabbitmq/sender.service';
const container = new Container();

container
  .bind<AttendanceRepository>('AttendanceRepository')
  .to(AttendanceRepositoryImpl);
container
  .bind<AttendanceService>('AttendanceService')
  .to(AttendanceServiceImpl);
container.bind<UserService>('UserService').to(UserServiceImpl);
container.bind<SenderService>('SenderService').to(SenderService);

export default container;
