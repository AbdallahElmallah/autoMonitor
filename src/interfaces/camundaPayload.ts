export interface CamundaIncidentStatusPayload {
    processDefinitionIdIn: string[];
    activityIdIn?: string[];
    sortBy: string;
    sortOrder: string;
}

export interface CamundaInstancesStatusPayload {
    processDefinitionId: string;
    activityIdIn: string[];
}


