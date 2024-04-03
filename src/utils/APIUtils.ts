import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Logger } from '../managers/loggerManager';
import { Config } from '../config/config';
import { pluralize } from './pluralize';
import { HeadersManager } from '../managers/headersManagers';
import { FlagStateManager } from '../managers/flagStateManager';

const logger = Logger.getInstance();
export interface ApiRequestOptions {
    method?: string;
    port?: number;
    path?: string;
}
const flag = FlagStateManager.getInstance();

export async function checkCamundaStatus(config: Config, key: string, options: Record<string, any>, payload: any | undefined = undefined, jsessionID: string | undefined = undefined
): Promise<void> {

    const header = new HeadersManager();
    header.setHeader('Cookie', jsessionID!);
    const headers = header.getHeaders();

    const requestConfig: AxiosRequestConfig = {
        method: options.method,
        url: `${config.serverHost}:${options.port}/${options.path}`,
        data: payload,
        headers
    };

    try {
        const response: AxiosResponse = await axios(requestConfig);
        const count = response.data.count
        flag.status = count > 0;
        flag.messages[key] = pluralize(count, key);
    } catch (error) {
        logger.error(`Error during check camunda status request: ${(error as Error)?.message}`);
    }
}

export async function checkKafkaStatus(config: Config, key: string, options: Record<string, any>, endpoint: string
): Promise<void> {

    const requestConfig: AxiosRequestConfig = {
        method: options.method,
        url: `${config.serverHost}:${options.port}/${options.path}/${endpoint}`,
    };
    try {
        const response: AxiosResponse = await axios(requestConfig);
        const count = response.data.messagesBehind
        flag.status = count > 0;
        flag.messages[key] = pluralize(count, key);
    } catch (error) {
        logger.error(`Error during check kafka status request: ${(error as Error)?.message}`);
    }
}
