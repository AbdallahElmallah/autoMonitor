require('dotenv').config();
import { EmailManager } from '../managers/emailManager';
import { EmailConfig, EmailOptions, EmailServerConfig } from '../interfaces/emailTypes';

export class ZohoEmailService {
    private emailManager: EmailManager;
    private serverConfig: EmailServerConfig = {
        host: 'smtp.zoho.com',
        port: 587,
        secure: false,
    }
    private config: EmailConfig = {
        user: process.env.EMAIL_USER!,
        password: process.env.EMAIL_PASSWORD!
    }
    constructor() {
        this.emailManager = new EmailManager(this.config, this.serverConfig);
    }

    sendZohoEmail(options: EmailOptions): Promise<void> {
        return this.emailManager.sendEmail(options);
    }
}
