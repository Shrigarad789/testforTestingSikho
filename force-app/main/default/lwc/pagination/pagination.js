import { LightningElement ,api} from 'lwc';

export default class Pagination extends LightningElement {

records
recordSize =5
get record(){
    return this.visibleRecords
}

   @api 
   
   set record(data){
    if(data){
        this.records = data
        this.visibleRecords =data.slice(0,this.recordSize)
        this.totalpage=Math.ceil(data.length/this.recordSize)
        this.updateRecords()
    }
    }
    previousHandler(){

    }
    nextHandler(){
if(this.currentPage <this.totalSize){
    this.currentPage=this.currentPage+1
    this.updateRecords()
}
    }
    updateRecords(){
        const start =(this.currentPage-1)*this.recordSize
        const end =this.recordSize*this.currentPage
        this.visibleRecords=dat.slice(start,end)
this.dispatchEvent(new CustomEvent('update',{
    detail:{
        records:this.visibleRecords
    }
}))
    }
}