const localStorageKeyName = 'tagList';
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  create(name) {
    const nameData = this.data.map(item=>item.name);
    if (nameData.indexOf(name) >= 0) {
      return 'duplicated';
    }
    const idStr: string = Math.random().toString(36).substring(2);
    this.data.push({id: idStr,name:name});
    this.save();
    return 'success';
  },
  save() {
    localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
  update(id, name){
    const idList = this.data.map(item => item.id);
    if(idList.indexOf(id)>=0){
      const names = this.data.map(item=>item.name);
      console.log(names);
      if(names.indexOf(name)>=0){
        return 'duplicated';
      }else{
        const tag = this.data.filter(item => item.id === id)[0];
        tag.name = name;
        this.save();
        return 'success'
      }
    }else{
      return 'not found';
    }
  },
  remove(id){
    let index = -1;
    for(let i=0;i<this.data.length;i++){
      if(this.data[i].id===id){
        index=i;
        break;
      }
    }
    console.log(index);
    if(index===-1){
      return false;
    }
    this.data.splice(index,1);
    this.save();
    return true;
  }
};

export default tagListModel;