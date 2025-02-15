import { LightningElement, wire, track } from 'lwc';
import { getRecordUi} from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';
import ProfileName from '@salesforce/schema/User.Profile.Name';

export default class RerenderingExample extends LightningElement {
userId = Id;
isSystemAdministrator = false;

    @wire(getRecordUi, { recordId: Id, fields: [ProfileName] })
    userDetails({ error, data }) {
        if (error) {
            this.error = error;
        } else if (data) {
            if (data.fields.Profile.value != null && data.fields.Profile.value.fields.Name.value=='System Administrator') {
                this.isSystemAdministrator = true;
            }
        }
    }
}