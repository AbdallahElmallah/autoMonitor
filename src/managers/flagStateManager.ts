export class FlagStateManager {
    private static instance: FlagStateManager;
    status: boolean;
    messages: Record<string, string>;

    private constructor() {
        this.status = false;
        this.messages = {};
    }
    static getInstance(): FlagStateManager {
        if (!FlagStateManager.instance) {
            FlagStateManager.instance = new FlagStateManager();
        }
        return FlagStateManager.instance;
    }
}

