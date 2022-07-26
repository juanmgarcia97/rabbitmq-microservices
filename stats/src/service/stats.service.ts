import amqp from 'amqplib/callback_api';
import { UserService } from './user.service';

export class StatsService {
  private config = {
    hostname: process.env.RABBIT_HOST,
    port: Number(process.env.RABBIT_PORT),
    username: process.env.RABBIT_USER,
    password: process.env.RABBIT_PASS,
  };
  private readonly queueName = 'statsQueue';
  private userService!: UserService;
  private connection!: amqp.Connection;
  private channel!: amqp.Channel;

  constructor() {
    this.userService = new UserService();
    this.createConnection();
  }

  createConnection() {
    amqp.connect(this.config, (error, connection) => {
      if (error) console.error(error);
      this.connection = connection;
      connection.createChannel((error1, channel) => {
        if (error1) console.error(error1);
        this.channel = channel;
        this.consumeMessage();
      });
    });
  }

  consumeMessage() {
    this.channel.assertQueue(this.queueName, { durable: false });
    this.channel.consume(this.queueName, async (message) => {
      if (message) {
        const queueMessage = message.content.toString();
        let updatedUser;
        try {
          updatedUser = await this.userService.updateUserAttendance(
            queueMessage
          );
        } catch (error) {
          console.log(error);
        }
        if (updatedUser) this.channel.ack(message);
      }
    });
  }

  closeConnection() {
    this.connection.close();
  }
}
