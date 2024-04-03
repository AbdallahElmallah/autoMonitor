import { Config } from '../config/config';
import { defaultConfig } from '../constants/constants'
import { CamundaIncidentStatusPayload, CamundaInstancesStatusPayload } from '../interfaces/camundaPayload';
import { GENERAL_ACTIVITY_ID_IN, GENERAL_PROCESS_DESINITION_ID_IN, WATERCUT_ACTIVITY_ID_IN, WATERCUT_PROCESS_DESINITION_ID_IN } from '../constants/constants';
import { checkCamundaStatus } from '../utils/APIUtils';

export class CamundaStatus {

    private defaultCamundaConfig = {
        method: defaultConfig.postMethod,
        port: defaultConfig.camundaPort,
        activityIdIn: []
    }
    private incidentOptions = {
        ...this.defaultCamundaConfig,
        path: defaultConfig.camundaIncidentPath
    };
    private instanceOptions = {
        ...this.defaultCamundaConfig,
        path: defaultConfig.camundaInstancePath
    };
    private defaultCamundaStatusPayload = {
        sortBy: "incidentMessage",
        sortOrder: "asc",
    }

    async getWatercutRequestInstances(JSESSIONID: string, config: Config): Promise<void> {

        const payload: CamundaInstancesStatusPayload = {
            processDefinitionId: WATERCUT_PROCESS_DESINITION_ID_IN,
            activityIdIn: [WATERCUT_ACTIVITY_ID_IN]
        };
        await checkCamundaStatus(config, 'watercut_request_instances', this.instanceOptions, payload, JSESSIONID)
    }

    async getWatercutProcessIncidents(JSESSIONID: string, config: Config): Promise<void> {

        const payload: CamundaIncidentStatusPayload = {
            ...this.defaultCamundaStatusPayload,
            processDefinitionIdIn: [WATERCUT_PROCESS_DESINITION_ID_IN],
        };
        await checkCamundaStatus(config, 'watercut_process_incidents', this.incidentOptions, payload, JSESSIONID);
    }

    async getGeneralProcesseIncidents(JSESSIONID: string, config: Config): Promise<void> {

        const payload: CamundaIncidentStatusPayload = {
            ...this.defaultCamundaStatusPayload,
            processDefinitionIdIn: [GENERAL_PROCESS_DESINITION_ID_IN]
        };
        await checkCamundaStatus(config, 'general_process_incidents', this.incidentOptions, payload, JSESSIONID);
    }

    async getGeneralRequestInstances(JSESSIONID: string, config: Config): Promise<void> {

        const payload: CamundaInstancesStatusPayload = {
            processDefinitionId: GENERAL_PROCESS_DESINITION_ID_IN,
            activityIdIn: [GENERAL_ACTIVITY_ID_IN]
        };
        await checkCamundaStatus(config, 'general_request_instances', this.instanceOptions, payload, JSESSIONID);
    }
}
