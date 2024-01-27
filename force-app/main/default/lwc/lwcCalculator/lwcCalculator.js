import { LightningElement, track } from 'lwc';

export default class LwcCalculator extends LightningElement {

    @track number1;
    @track number2;
    @track result;

    handleNumberOne(event){
        this.number1 = parseInt(event.target.value);
    }

    handleNumberTwo(event){
        this.number2 = parseInt(event.target.value);
    }

    addition(){
        this.result = parseInt(this.number1) + parseInt(this.number2);
    }

}