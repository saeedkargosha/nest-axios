import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

export const mailerConfig = async (
  configService: ConfigService,
): Promise<MailerOptions> => ({
  transport: {
    host: configService.get('SMTP_HOST'),
    port: configService.get('SMTP_PORT'),
    auth: {
      user: configService.get('SMTP_USER'),
      pass: configService.get('SMTP_PASSWORD'),
    },
  },
});
