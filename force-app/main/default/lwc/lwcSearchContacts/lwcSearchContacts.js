import { LightningElement, wire } from "lwc";
import findContacts from "@salesforce/apex/SearchContacts.findContacts";

/** The delay used when debouncing event handlers before invoking Apex. */
const DELAY = 300;

export default class LwcSearchContacts extends LightningElement {
  searchKey = "";

  @wire(findContacts, { searchKey: "$searchKey" })
  contacts;

  handleKeyChange(event) {
    window.clearTimeout(this.delayTimeout);
    const searchKey = event.target.value;
    this.delayTimeout = setTimeout(() => {
      this.searchKey = searchKey;
    }, DELAY);
  }
}