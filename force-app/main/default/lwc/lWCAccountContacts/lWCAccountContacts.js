import { LightningElement,api,wire, track } from 'lwc';
import displayAccounts from '@salesforce/apex/AccountContactsController.displayAccounts';
import updateRecord from '@salesforce/apex/AccountContactsController.updateRecord';
import displayContacts from '@salesforce/apex/AccountContactsController.displayContacts';
import { refreshApex } from '@salesforce/apex';
export default class LWCAccountContacts extends LightningElement {
	@api currentRecordId;
	@api errorMessage;
    @wire(displayAccounts) accounts;
    @api records;
    @track isModalOpen = false;
    
    handleUpdate(event){
        this.currentRecordId=event.target.value;
        console.log('@@currentRecordId@@@'+this.currentRecordId);
        updateRecord({
            accId:this.currentRecordId
        })
        .then(() => {
            console.log('SUCCESS');
            return refreshApex(this.accounts);
        })
        .catch((error) => {
            this.errorMessage=error;
			console.log('unable to update the record due to'+JSON.stringify(this.errorMessage));
        });
    }

    handleDisplayContacts(event){
        this.isModalOpen = true;
        this.currentRecordId=event.target.value;
        console.log('@@currentRecordId@@@'+this.currentRecordId);
        displayContacts({
            accId:this.currentRecordId
        })
        .then((result) => {
            this.records = result;
            console.log('SUCCESS');
            console.log('@@@records'+JSON.stringify(result));
            //return refreshApex(this.accounts);
        })
        .catch((error) => {
            this.errorMessage=error;
			console.log('unable to update the record due to'+JSON.stringify(this.errorMessage));
        });
    }

    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
}
