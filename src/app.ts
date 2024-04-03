require('dotenv').config();
import { Logger } from './managers/loggerManager';
import { defaultConfig } from './constants/constants';
import { CamundaLogin } from './services/camundaLogin';
import { CamundaStatus } from './services/camundaRequests';
import { KafkaStatus } from './services/kafkaRequests';
import { FlagStateManager } from './managers/flagStateManager';
import { EmailOptions } from './interfaces/emailTypes';
import { ZohoEmailService } from './services/zohoEmailService';

const logger = Logger.getInstance();
const zohoEmailService = new ZohoEmailService()
const camundaLogin = new CamundaLogin();
const camundaRequest = new CamundaStatus();
const kafkaRequest = new KafkaStatus();
const flag = FlagStateManager.getInstance()

export async function app() {

    const loginResult = await camundaLogin.loginToCamunda(process.env.CAMUNDA_USER!, process.env.CAMUNDA_PASSWORD!);

    if (loginResult == null || loginResult.jsessionID == null) {
        const optionsFailed: EmailOptions = {
            to: process.env.EMAIL_RECEIVER!,
            subject: 'Login failed',
            text: 'Can\'t login'
        };
        logger.error('Login failed.');
        try {
            await zohoEmailService.sendZohoEmail(optionsFailed);
        } catch (error) {
            logger.error(`${error}`)
            process.exit(0);
        }

    } else {

        await camundaRequest.getWatercutRequestInstances(loginResult.jsessionID, defaultConfig);
        await camundaRequest.getWatercutProcessIncidents(loginResult.jsessionID, defaultConfig);
        await camundaRequest.getGeneralRequestInstances(loginResult.jsessionID, defaultConfig);
        await camundaRequest.getGeneralProcesseIncidents(loginResult.jsessionID, defaultConfig);
        await kafkaRequest.kafkaUIPBPMSubmitRequest(defaultConfig);
        await kafkaRequest.psimServiceDispatchingRequest(defaultConfig)

        const messagesArray: string[] = Object.values(flag.messages);
        const options: EmailOptions = {
            to: process.env.EMAIL_RECEIVER!,
            subject: 'IMPORTANT: Action Required for a Service',
            text: `${messagesArray.join('\n')}`,
        }
        if (flag.status) {
            logger.warn('At least one request has issue. Details:');
            Object.values(flag.messages).forEach((message) => {
                logger.info(`${message}`)
            });
            zohoEmailService.sendZohoEmail({
                ...options,
            })

        } else {
            logger.info('All requests are stable.')
            /*zohoEmailService.sendZohoEmail({
                ...options,
                subject: 'All requests are stable.'
            })*/
        }
    }
}