const localStorageKeyName = 'tagList';

const tagStore = {
  tagList: [] as Tag[],
  fetchTags(){
    this.tagList = JSON.parse(localStorage.getItem(localStorageKeyName) || '[]');
    return this.tagList;
  },
  findTag(id: string) {
    return this.tagList.filter(item => item.id === id)[0];
  },
  createTag (name: string)  {
    const nameData = this.tagList.map(item=>item.name);
    if (nameData.indexOf(name) >= 0) {
      alert('文件名不能重复!');
      return 'duplicated';
    }
    const idStr: string = Math.random().toString(36).substring(2);
    this.tagList.push({id: idStr,name:name});
    this.saveTags();
    return 'success';
  },
  removeTag (id: string)  {
    let index = -1;
    for(let i=0;i<this.tagList.length;i++){
      if(this.tagList[i].id===id){
        index=i;
        break;
      }
    }
    console.log(index);
    if(index===-1){
      return false;
    }
    this.tagList.splice(index,1);
    this.saveTags();
    return true;
  },
  updateTag (id: string, name: string) {
    const idList = this.tagList.map(item => item.id);
    if(idList.indexOf(id)>=0){
      const names = this.tagList.map(item=>item.name);
      console.log(names);
      if(names.indexOf(name)>=0){
        return 'duplicated';
      }else{
        const tag = this.tagList.filter(item => item.id === id)[0];
        tag.name = name;
        this.saveTags();
        return 'success'
      }
    }else{
      return 'not found';
    }
  },
  saveTags(){
    localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
  }
};
tagStore.fetchTags();

export default tagStore;
