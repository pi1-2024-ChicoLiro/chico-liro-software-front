import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  constructor(private socket: Socket) {}

  //emitir
  sendMessages(body?: any) {
    this.socket.emit("msgToServer", body);
  }

  //ouvir
  onFetchMessages() {
    return this.socket.fromEvent("msgToClient");
  }

  emitTyping(typing: boolean) {
    this.socket.emit("typing", {
      isTyping: typing,
      name: JSON.parse(localStorage.getItem("UserData")).usuario,
    });
  }
}
