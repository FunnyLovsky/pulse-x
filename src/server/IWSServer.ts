export interface IWSServer {
    url: string;
    readyState: number;
    onopen: (() => void) | null;
    onmessage: ((event: { data: any }) => void) | null;
    onclose: (() => void) | null
    onerror: ((error: Error) => void) | null;
    send: (data: any) => void,
    close: () => void
}