import * as fs from 'fs';

export class Logger {
    private static instance: Logger | null = null;
    private logFilePath: string;

    private constructor() {
        this.logFilePath = 'logs/healthCheck.log';
    }
    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    public setLogFilePath(logFilePath: string): void {
        this.logFilePath = logFilePath;
    }
    private writeToFile(log: string): void {
        fs.appendFileSync(this.logFilePath, log + '\n');
    }
    public info(message: string): void {
        const now = new Date();
        now.setHours(now.getHours() + 2); // Add 2 hours
        const log = `[INFO] [${now.toISOString()}] ${message}`;
        this.writeToFile(log);
    }
    public warn(message: string): void {
        const now = new Date();
        now.setHours(now.getHours() + 2); // Add 2 hours
        const log = `[WARN] [${now.toISOString()}] ${message}`;
        this.writeToFile(log);
    }
    public error(message: string): void {
        const now = new Date();
        now.setHours(now.getHours() + 2); // Add 2 hours
        const log = `[ERROR] [${now.toISOString()}] ${message}`;
        this.writeToFile(log);
    }
}