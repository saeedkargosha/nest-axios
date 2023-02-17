export interface Config {
  MONGODB_URI: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASSWORD: string;
  RABBITMQ_USER: string;
  RABBITMQ_PASSWORD: string;
  RABBITMQ_HOST: string;
  RABBITMQ_QUEUE_NAME: string;
}
