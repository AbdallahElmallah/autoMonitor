export class HeadersManager {
    private headers: Record<string, string>;

    constructor() {
        this.setDefaultHeaders();
        this.headers = {}
    }
    private setDefaultHeaders(): void {
        this.headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/hal+json, application/json; q=0.5'
        };
    }
    getHeaders(): Record<string, string> {
        return this.headers;
    }
    setHeader(name: string, value: string): void {
        this.headers[name] = value;
    }
    resetHeaders(): void {
        this.setDefaultHeaders();
    }
}