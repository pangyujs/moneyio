const localStorageKeyName = 'tagList';
type tags = {
  id: string;
  name: string;
}
type TagListModel = {
  data: tags[];
  fetch: () => tags[];
  create: (name: string) => 'success' | 'duplicated'; //联合类型
  save: () => void;
}
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
    this.data.push({id: name,name:name});
    this.save();
    return 'success';
  },
  save() {
    localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};

export default tagListModel;