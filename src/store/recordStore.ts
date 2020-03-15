import clone from '@/lib/clone';


const localStorageKeyName = 'recordList';


const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecords(){
    this.recordList = JSON.parse(localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.recordList;
  },
  createRecord (record: RecordItem){
    const deepRecord: RecordItem = clone(record);// 对record 进行深拷贝
    deepRecord.createDate = new Date().toISOString();
    this.recordList && this.recordList.push(deepRecord);
    recordStore.saveRecords();
  },
  saveRecords(){
    localStorage.setItem(localStorageKeyName,JSON.stringify(this.recordList));
  }
};

recordStore.fetchRecords();

export default recordStore;
