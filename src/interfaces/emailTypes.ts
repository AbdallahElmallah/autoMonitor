export interface EmailConfig {
    user: string;
    password: string;
}

export interface EmailOptions {
    to: string
    subject: string;
    text: string;
}

export interface EmailServerConfig {
    host: string;
    port: number;
    secure: boolean;
    logger?: boolean,
    debug?: boolean
}