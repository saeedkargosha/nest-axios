import { Config } from './config.interface';

export const configFactory = (): Config => {
  return {
    MONGODB_URI: process.env?.MONGODB_URI,
    SMTP_HOST: process.env?.SMTP_HOST,
    SMTP_PORT: Number(process.env?.SMTP_PORT),
    SMTP_USER: process.env?.SMTP_USER,
    SMTP_PASSWORD: process.env?.SMTP_PASSWORD,
    RABBITMQ_USER: process.env?.RABBITMQ_USER,
    RABBITMQ_PASSWORD: process.env?.RABBITMQ_PASSWORD,
    RABBITMQ_HOST: process.env?.RABBITMQ_HOST,
    RABBITMQ_QUEUE_NAME: process.env?.RABBITMQ_QUEUE_NAME,
  };
};
