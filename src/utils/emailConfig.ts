import { EmailConfig } from '../interfaces/emailTypes';

export const emailConfig: EmailConfig = {
    user: process.env.EMAIL_USER!,
    password: process.env.EMAIL_PASSWORD!,
};
