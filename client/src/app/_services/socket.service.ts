import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

type Message = 'ConnectedClients';

@Injectable({ providedIn: 'root' })
export class SocketService {
    private socket: SocketIOClient.Socket;

    constructor() {
        this.socket = io.connect({ path: '/sock' });
    }

    private sendEvent(event: Message, message: any) {
        this.socket.emit(event, { message });
    }

    private onEvent<T>(event: Message): Observable<T> {
        return Observable.create((observer) => {
            this.socket.on(event, (message: string) => {
                observer.next(message);
            });
        });
    }

    onConnectedClients() {
        return this.onEvent<number>('ConnectedClients');
    }
}
