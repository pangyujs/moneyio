import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import router from '@/router';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    createError: 'none',
    tagList: [] as Tag[],
    currentTag: undefined
  } as RootState,
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecords(state, record) {
      const deepRecord: RecordItem = clone(record);// 对record 进行深拷贝
      state.recordList.push(deepRecord);
      store.commit('saveRecords');
      router.replace('/statistics');
    },
    saveRecords(state) {
      localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    setCurrentTag(state, id) {
      state.currentTag = state.tagList.filter(item => item.id === id)[0];
    },
    fetchTags(state) {
      state.tagList = JSON.parse(localStorage.getItem('tagList') || `
            [
              {
                "id": "e46mmdwgnf7",
                "name": "购物",
                "iconName": "shopping"
              },
              {
                "id": "zu427xlf3h",
                "name": "娱乐",
                "iconName": "happy"
              },
              {
              "id": "k2a3cxa9kvl",
              "name": "餐饮",
              "iconName": "eat"
              },
              {
              "id": "1bejsj3xh49",
              "name": "通信",
              "iconName": "phone"
              },
              {
              "id": "ipshdvwgr3",
              "name": "宠物",
              "iconName": "pet"
              },
              {
              "id": "nkrs864gck",
              "name": "交通",
              "iconName": "transportation"
              },
              {
              "id": "gj26q6tsyaf",
              "name": "学习",
              "iconName": "study"
              },
              {
              "id": "nxvirwsgdub",
              "name": "旅行",
              "iconName": "travel"
              },
              {
              "id": "avhj7kh3enh",
              "name": "投资",
              "iconName": "financing"
              },
              {
              "id": "u1gcfr6h8fn",
              "name": "其他收入",
              "iconName": "othercome"
              },
              {
              "id": "plsvvup3xlf",
              "name": "兼职",
              "iconName": "parttimejob"
              },
              {
              "id": "kidhyl5p9y",
              "name": "工资",
              "iconName": "salary"
              },
              {
                "id": "71t6qxpji4",
                "name": "转账",
                "iconName": "transfer"
              }
            ]
        `);
    },
    createTag(state, tag: Tag) {
      const nameData = state.tagList.map(item => item.name);
      if (nameData.indexOf(tag.name) >= 0) {
        state.createError = 'failed';
        return alert('标签名不能重复!');
      }
      tag.id = Math.random().toString(36).substring(2);
      state.tagList.unshift(tag);
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

    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        alert('刪除失敗!');
      } else {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        router.back();
      }
    },
  }
});

export default store;
