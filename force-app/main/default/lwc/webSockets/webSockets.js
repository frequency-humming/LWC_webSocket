import { LightningElement,track,api } from 'lwc';
import websocketURL from '@salesforce/label/c.websocketURL';
  
  export default class webSockets extends LightningElement {
    @track messages = [];
    socket;

    connectedCallback() {
      const socket = new WebSocket(websocketURL);
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if(message.channel === 'records'){
          this.messages.push(event.data);
        }else if(message.channel === 'performance'){
          this.messages.push(event.data);
        }else{
          this.messages.push(event.data);
        }
      };
      socket.onopen = () => {
        console.log('Websocket connection open');
      };
      socket.onclose = () => {
        console.log('Websocket connection closed');
      };
      this.socket = socket;
    }

    disconnectedCallback() {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          this.socket.close();
          console.log('WebSocket disconnected due to component unmounting');
      }
    }
    
    @api
    sendMessage(record) {
      if(this.socket && this.socket.readyState === WebSocket.OPEN){
        try{
          let message = JSON.stringify({channel:'records',data:record});
          this.socket.send(message);
        }catch(error){
          console.log('in the error '+error);
        }
      }else{
        console.log('socket is not open');
      }        
    }

  }