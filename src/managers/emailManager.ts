import { EmailConfig, EmailOptions, EmailServerConfig } from '../interfaces/emailTypes';
import nodemailer from 'nodemailer';
import { Logger } from './loggerManager';

const logger = Logger.getInstance()

export class EmailManager {

    private transporter: nodemailer.Transporter;
    private config: EmailConfig
    constructor(config: EmailConfig, serverConfig: EmailServerConfig) {
        this.config = config;
        this.transporter = nodemailer.createTransport({
            host: serverConfig.host,
            port: serverConfig.port,
            secure: serverConfig.secure,
            auth: {
                user: this.config.user,
                pass: this.config.password
            },
        });
    }

    sendEmail(options: EmailOptions, serverConfig?: nodemailer.SendMailOptions): Promise<void> {
        return new Promise((resolve, reject) => {
            const mailOptions = {
                ...serverConfig,
                ...options,
                from: this.config.user,
            };
            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    logger.error(`Error sending email: ${error}`);
                    reject(error);
                } else {
                    logger.info(`Email sent: ${info.response}`);
                    resolve();
                }
            });
        });
    }
}