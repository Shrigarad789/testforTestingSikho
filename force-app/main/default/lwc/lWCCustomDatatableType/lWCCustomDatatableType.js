import LightningDatatable from 'lightning/datatable';
import picklistColumn from './picklistColumn.html';
import pickliststatic from './pickliststatic.html';
import picklistColumn1 from './picklistColumn1.html';
import pickliststatic1 from './pickliststatic1.html';


 
export default class LWCCustomDatatableType extends LightningDatatable {
    static customTypes = {
        picklistColumn: {
            template: pickliststatic,
            editTemplate: picklistColumn,
            standardCellLayout: true,
            typeAttributes: ['label', 'placeholder', 'options', 'value', 'context', 'variant','name'],
                   },
                   picklistColumn1: {
                    template: pickliststatic1,
                    editTemplate: picklistColumn1,
                    standardCellLayout: true,
                    typeAttributes: ['label', 'placeholder', 'options', 'value', 'context', 'variant','name'],
                           }
    };
}