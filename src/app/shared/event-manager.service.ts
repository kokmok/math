import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventManager {

  private static _events: Map<string, EventEmitter<any>> = new Map<string, EventEmitter<any>>();

  subscribe(eventName: string, next?: (...value: any) => void): void {
    if (!EventManager._events.has(eventName)){
      EventManager._events.set(eventName, new EventEmitter<any>());
    }
    EventManager._events.get(eventName)?.subscribe(next);
  }

  broadcast(eventName: string, ...args: any): void {
    if (EventManager._events.has(eventName)) {
      EventManager._events.get(eventName)?.emit(args);
    }
  }

}
