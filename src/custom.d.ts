type RecordItem = {
  tags: Tag[];
  notes: string;
  amount: number;
  type: string;
  createDate: string;
}
type Total = {
  date: string;
  total: number;
}
type RResult = {title: string; total: number;items: RecordItem[]}[];
type RootState = {
  recordList: RecordItem[];
  errorState: string;
  successState: string;
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

