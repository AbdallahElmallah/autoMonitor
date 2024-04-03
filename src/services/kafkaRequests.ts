import { Config } from '../config/config';
import { defaultConfig } from '../constants/constants'
import { ApiRequestOptions, checkKafkaStatus } from '../utils/APIUtils';

export class KafkaStatus {

    private options: ApiRequestOptions = {
        method: defaultConfig.getMethod,
        port: defaultConfig.kafkaPort,
        path: defaultConfig.kafkaUIPath
    };

    async kafkaUIPBPMSubmitRequest(config: Config): Promise<void> {

        await checkKafkaStatus(config, 'PBPMSubmit_behind_messages', this.options, config.PBPMSubmit)
    }
    async psimServiceDispatchingRequest(config: Config): Promise<void> {

        await checkKafkaStatus(config, 'PSIM_service_dispatching_behind_messages', this.options, config.psimServiceDispatching)
    }
}