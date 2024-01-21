export class WSServer {
    url: string;
    readyState: number = WebSocket.CONNECTING;
    onopen: (() => void) | null = null;
    onmessage: ((event: { data: any }) => void) | null = null;
    onclose: (() => void) | null = null;
    onerror: ((error: Error) => void) | null = null;

    constructor(url: string) {
        this.url = url;

        setTimeout(() => {
            this.readyState = WebSocket.OPEN;

            if(this.onopen) {
                this.onopen()
            }
        }, 1000);
    }

    async close() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.readyState = WebSocket.CLOSED;

        if(this.onclose) {
            this.onclose()
        }
    }

    async send(data: any) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if(data === 'error') {
            if(this.onerror) {
                this.onerror(new Error('Ошибка соединения'))
            }
        }

        if(this.onmessage) {
            this.onmessage({data: 'Server work!'})
        }
    }
}