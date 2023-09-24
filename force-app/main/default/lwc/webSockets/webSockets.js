import { LightningElement,track,api } from 'lwc';
import websocketURL from '@salesforce/label/c.websocketURL';
  
  export default class webSockets extends LightningElement {
    @track messages = [];
    message = '';
    socket;

    connectedCallback() {
      const socket = new WebSocket(websocketURL);
      socket.onmessage = (event) => {
        console.log('this is the connection message');
        this.messages.push(event.data);
        console.log(event);
      };
  
      socket.onopen = () => {
        console.log('Websocket connection open');

      };
  
      socket.onclose = () => {
        console.log('Websocket connection closed');
      };
  
      this.socket = socket;
    }
    
    @api
    sendMessage(record) {
        console.log('in the message');
        this.message = record;
        this.socket.send(this.message);
        this.message = '';
    }

    send() {
        console.log('in the message');
        this.message = 'record';
        this.socket.send(this.message);
        this.message = '';
    }
  }