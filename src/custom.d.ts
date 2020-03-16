type RecordItem = {
  tags: Tag[];
  notes: string;
  amount: number;
  type: string;
  createDate: string;
}
type RootState = {
  recordList: RecordItem[];
  createError: string;
  tagList: Tag[];
  currentTag?: Tag;
}
type Tag = {
  id: string;
  name: string;
  iconName: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated'; //联合类型
  save: () => void;
  update: (id: string, name: string) => 'success' | 'duplicated' | 'not found';
  remove: (id: string) => boolean;
}

