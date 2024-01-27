import { LightningElement, track } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import RATING_FIELD from '@salesforce/schema/Account.Rating';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import insertAcc from '@salesforce/apex/LwcCreateAccount.insertAcc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class AccountRecCreation extends LightningElement {

    @track name = NAME_FIELD;
    @track phone = PHONE_FIELD;
    @track rating = RATING_FIELD;
    @track industry = INDUSTRY_FIELD;

    recAccount = {

        Name : this.name,
        Phone : this.phone,
        Rating : this.rating,
        Industry: this.industry
    }

    handelNamechange(event){
        this.recAccount.Name = event.target.value;
        //console.log("name",this.recAccount.Name);
    }
    handelPhonechange(event){
        this.recAccount.Phone = event.target.value;
       // console.log("phone",this.recAccount.Phone);
    }

    handelRatingchange(event){
        this.recAccount.Rating = event.target.value;
       // console.log("email",this.recAccount.Rating);
    }

    handelinduschange(event){
        this.recAccount.Industry = event.target.value;
        //console.log("industry",this.recAccount.Industry);
    }

    createAccount() {
        debugger;
        insertAcc({ accRec : this.recAccount })
            .then(result => {
                this.message = result;
                this.error = undefined;
                if(this.message !== undefined) {
                    this.recAccount.Name = '';
                    this.recAccount.Industry = '';
                    this.recAccount.Phone = '';
                    this.recAccount.Rating= '';
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Account created',
                            variant: 'success',
                        }),
                    );
                }
                
                console.log(JSON.stringify(result));
                console.log("result", this.message);
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                console.log("error", JSON.stringify(this.error));
            });
    }
}