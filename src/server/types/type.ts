export interface IWSServer {
    url: string;
    readyState: number;
    onopen: (() => void) | null;
    onmessage: ((data: string) => void) | null;
    onclose: (() => void) | null;
    onerror: ((error: Error) => void) | null;
    send: (data: string) => void;
    close: () => void;
}

export interface IController {
    orderId: string;
    controller: AbortController | null;
}
