import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import Purchase from '../_models/purchase';

@Injectable({ providedIn: 'root' })
export class SocketService {
    private socket: SocketIOClient.Socket;

    constructor() {
        this.socket = io.connect({ path: '/socket' });
    }

    private sendEvent(event: string, message: any) {
        this.socket.emit(event, { message });
    }

    private onEvent<T>(event: string): Observable<T> {
        return Observable.create((observer) => {
            this.socket.on(event, (message: string) => {
                observer.next(message);
            });
        });
    }

    onConnectedClients() {
        return this.onEvent<number>('ConnectedClients');
    }

    onNewPurchase() {
        return this.onEvent<Purchase>('NewPurchase');
    }
}
