import { LightningElement,api,wire } from 'lwc';
import displayAccounts from '@salesforce/apex/DisplayAndUpdateAccounts.displayAccounts';
import updateRecord from '@salesforce/apex/DisplayAndUpdateAccounts.updateRecord';
import deleteRecord from '@salesforce/apex/DisplayAndUpdateAccounts.deleteRecord';
import { refreshApex } from '@salesforce/apex';

export default class LwcDisplayUpdateDeleteAccounts extends LightningElement {
	@api currentRecordId;
	@api errorMessage;
    @wire(displayAccounts) accounts;
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

    handleDelete(event){
        this.currentRecordId=event.target.value;
        console.log('@@currentRecordId@@@'+this.currentRecordId);
        alert('currentRecordId'+this.currentRecordId)
        deleteRecord({
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
}