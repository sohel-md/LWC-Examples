import { LightningElement, track } from 'lwc';
import getContactList from "@salesforce/apex/DisplayContactsUsingImperative.getContactList";

export default class LwcDisplayContactsUsingImperative extends LightningElement {
    @track contacts;
    @track error;
  
    handleLoad() {
      getContactList()
        .then((result) => {
          this.contacts = result;
        })
        .catch((error) => {
          this.error = error;
        });
    }
}
