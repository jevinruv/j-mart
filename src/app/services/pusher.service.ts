import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class PusherService {

  private pusher: any;

  constructor() {
    this.pusher = new Pusher('809276b50cbfba68b5cc', {
      cluster: 'ap2',
      encrypted: true
    });
  }

  getPusher() {
    return this.pusher;
  }
}
