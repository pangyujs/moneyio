<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
    <Tabs :data-source="intervalList" class-prefix="interval" :value.sync="interval"/>
    <div>
      <ol>
        <li v-for="(group,index) in result" :key="index" >
          <h3 class="title">{{group.title}}</h3>
          <ol>
            <li class="record" v-for="item in group.items" :key="item.id">
              <span>{{tagString(item.tags)}}</span>
              <span class="notes">{{item.notes}}</span>
              <span>￥{{item.amount}}</span>
            </li>
          </ol>
        </li>
      </ol>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import intervalList from '@/constants/intervalList';
  import typeList from '@/constants/typeList';

  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    tagString(tags: Tag[]){
      return tags.length === 0? '无' : tags.join(',');
    }
    get recordList(){
      return (this.$store.state as RootState).recordList;
    }
    get result(){
      const {recordList} = this;
      type HashTableValue = {title: string; items: RecordItem[]};
      const hashTable: {[key: string]: HashTableValue } = {};
      for(let i=0;i< recordList.length;i++){
        const [date,time] = recordList[i].createDate!.split('T');
        hashTable[date]=hashTable[date] || {title:date,items:[]};// hashTable 日期键如果存在就是本身,如果不存在就为空数组
        hashTable[date].items.push(recordList[i]);
      }
      return hashTable;
    }
    beforeCreate(){
      this.$store.commit('fetchRecords');
    }
    type = '-';
    interval = 'day';
    intervalList = intervalList;
    typeList = typeList;

  }
</script>

<style lang="scss" scoped>
  ::v-deep {
    .type-tabs-item {
      background: #ffffff;
      &.selected {
        background: #c4c4c4;

        &::after {
          display: none;
        }
      }
    }
    .interval-tabs-item {
      height: 48px;
    }
  }
  %item{
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .title{
    @extend %item;
  }
  .record{
    background: #ffffff;
    @extend %item;
  }
  .notes{
    margin-right: auto;
    margin-left: 16px;
    color: #999999;
  }
</style>