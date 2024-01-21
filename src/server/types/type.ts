import { ClientEnvelope } from "../../Models/ClientMessages";
import { ServerEnvelope } from "../../Models/ServerMessages";


export interface IWSServer {
    url: string;
    readyState: number;
    onopen: (() => void) | null;
    onmessage: ((event: ServerEnvelope) => void) | null;
    onclose: (() => void) | null
    onerror: ((error: Error) => void) | null;
    send: (date: ClientEnvelope) => void,
    close: () => void
}