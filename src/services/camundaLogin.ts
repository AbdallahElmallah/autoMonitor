const axios = require('axios');
import { Logger } from '../managers/loggerManager';
import { defaultConfig } from '../constants/constants';

const logger = Logger.getInstance()

export class CamundaLogin {

    async loginToCamunda(username: string, password: string) {
        try {
            const formData = new URLSearchParams();
            formData.append('username', username);
            formData.append('password', password);
            const response = await axios.post(
                `${defaultConfig.serverHost}:${defaultConfig.camundaPort}/${defaultConfig.loginPath}`,
                formData,
                { timeout: 30000 }
            );
            if (response.status === 200) {
                const jsessionID: string = response.headers['set-cookie'][0].split(';')[0];
                logger.info('\nLoggedIn Success!');
                return { jsessionID };
            }
        } catch (error) {
            logger.error(`${(error as Error)?.message}`)
        }
    }
}


