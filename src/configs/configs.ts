import { Config } from './config.interface';

export const configFactory = (): Config => {
  return {
    MONGODB_URI: process.env?.MONGODB_URI,
    SEND_GRID_KEY: process.env?.SEND_GRID_KEY,
    RABBITMQ_USER: process.env?.RABBITMQ_USER,
    RABBITMQ_PASSWORD: process.env?.RABBITMQ_PASSWORD,
    RABBITMQ_HOST: process.env?.RABBITMQ_HOST,
    RABBITMQ_QUEUE_NAME: process.env?.RABBITMQ_QUEUE_NAME,
  };
};
