import amqp from 'amqplib/callback_api';
import { injectable } from 'inversify';

@injectable()
export class SenderService {
  private config = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'admin',
    password: '123456',
  };
  readonly queueName = 'statsQueue';
  rabbitConnection!: amqp.Connection;
  rabbitChannel!: amqp.Channel;

  constructor() {
    this.createConnection();
  }

  createConnection() {
    amqp.connect(this.config, (error, connection) => {
      if (error) throw new Error(error);
      this.rabbitConnection = connection as amqp.Connection;
      this.rabbitConnection.createChannel((error1, channel) => {
        if (error1) throw new Error(error1);
        this.rabbitChannel = channel;
      });
    });
  }

  publishMessage(message: string) {
    this.rabbitChannel.assertQueue(this.queueName, { durable: false });
    this.rabbitChannel.sendToQueue(this.queueName, Buffer.from(message));
  }

  closeConnection() {
    this.rabbitConnection.close();
  }
}
