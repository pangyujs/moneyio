import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';
const recordListModel = {
  data: [] as RecordItem[],
  create(record: RecordItem){
  const deepRecord: RecordItem = clone(record);// 对record 进行深拷贝
  deepRecord.createDate = new Date();
  this.data.push(deepRecord);
},
fetch(){
  this.data = JSON.parse(localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.data;
  },
  save(){
    localStorage.setItem(localStorageKeyName,JSON.stringify(this.data));
  }
};

export default recordListModel;