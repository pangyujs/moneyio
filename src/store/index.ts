import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import Tags from '@/components/Money/Tags.vue';
import router from '@/router';

Vue.use(Vuex);
type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
}

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
    currentTag: undefined
  } as RootState,
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecords(state, record) {
      const deepRecord: RecordItem = clone(record);// 对record 进行深拷贝
      deepRecord.createDate = new Date();
      state.recordList.push(deepRecord);
      store.commit('saveRecords');
    },
    saveRecords(state) {
      localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    setCurrentTag(state, id) {
      state.currentTag = state.tagList.filter(item => item.id === id)[0];
    },
    fetchTags(state) {
      state.tagList = JSON.parse(localStorage.getItem('tagList') || '[]');
    },
    createTag(state, name) {
      const nameData = state.tagList.map(item => item.name);
      if (nameData.indexOf(name) >= 0) {
        alert('文件名不能重复!');
      }
      const idStr: string = Math.random().toString(36).substring(2);
      state.tagList.push({id: idStr, name: name});
      store.commit('saveTags');
    },
    saveTags(state) {
      localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    updateTag(state, payload: { id: string; name: string }) {
      const {id, name} = payload;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        console.log(names);
        if (names.indexOf(name) >= 0) {
          return 'duplicated';
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
      }
    },

    removeTag (state,id: string)  {
      let index = -1;
      for(let i=0;i<state.tagList.length;i++){
        if(state.tagList[i].id===id){
          index=i;
          break;
        }
      }
      if(index===-1){
        alert('刪除失敗!');
      }else{
        state.tagList.splice(index,1);
        store.commit('saveTags');
        router.back();
      }
    },
  }
});

export default store;
