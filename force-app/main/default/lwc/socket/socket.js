import { LightningElement,api,wire,track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import getUserContext from '@salesforce/apex/UserContext.getUserContext';
import Id from "@salesforce/user/Id";

export default class Socket extends LightningElement {

    @api recordId;
    @track sObject;
    @track userID = Id;
    @track performanceEntries;
    error;
    user;

    @wire(getRecord, {
        recordId: "$recordId",
        layoutTypes: ["Compact"], 
        modes: ["View"]
      })
      wiredRecord({ error, data }) {
        let records = {};
        if (error) {
          console.log("error");
        } else if (data) {
          
          for (const property of Object.keys(data)) {
            if(property === "apiName"){
              records[property] = data[property];
            }       
            if(property === "id"){
              records[property] = data[property];
            }    
            if(property === "recordTypeId"){
              records[property] = data[property];
            }    
          }         
          getUserContext({userID:this.userID}).then(data=>{
            for(const property in data){
              records[property] = data[property];
            }
            this.sObject = records;
          }).then( () => {
            this.messageSync();
          })
        }       
      }

    disconnectedCallback() {
      console.log('disconnected callback');
      this.callDisconnect();
    }

    callDisconnect(){
      console.log('in the disconnect function');
      let cmp = this.refs.webSocket;
      cmp.disconnect();
    }

    /*renderedCallback() {
      // Ensure this logic runs only once after initial rendering
      let perfObj = {};
      if (!this.isRendered) {
          this.isRendered = true;

          const performanceEntries = performance.getEntries();
          for (const entry of performanceEntries) {
            if(!perfObj[entry.entryType]){
              perfObj[entry.entryType] = [];
            }
            perfObj[entry.entryType].push(entry);
          }
          this.performanceEntries = JSON.stringify(perfObj);
      }
  }*/
    
  messageSync() {
    console.log('in the message function');
    let cmp = this.refs.webSocket;
    cmp.sendMessage(this.sObject);
  }

}