import tagStore from '@/store/tagStore';
import recordStore from '@/store/recordStore';

const store = {
  // record store
  ...tagStore,
  // tag store
  ...recordStore
};
console.log(store);
export default store;