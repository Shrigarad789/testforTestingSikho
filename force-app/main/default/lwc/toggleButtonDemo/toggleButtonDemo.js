import { LightningElement ,track} from 'lwc';
export default class ToggleButtonDemo extends LightningElement {
@track checked = true;
changeToggle(event){
    this.checked = !this.checked;
}
}