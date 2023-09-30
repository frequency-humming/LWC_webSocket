import { LightningElement,api,wire,track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import getUserContext from '@salesforce/apex/UserContext.getUserContext';
import Id from "@salesforce/user/Id";

export default class Socket extends LightningElement {

    @api recordId;
    sObject;
    @track userID = Id;
    @track performanceEntries = [];
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

    renderedCallback() {
      // Ensure this logic runs only once after initial rendering
      if (!this.isRendered) {
          this.isRendered = true;
          
          const performanceEntries = performance.getEntries();
          for (const entry of performanceEntries) {
              console.log(entry);
              this.performanceEntries.push(entry);
          }
      }
  }
    
    messageSync() {
      console.log('in the message function');
      this.template.querySelector('c-web-sockets').sendMessage(this.sObject);
    }

}