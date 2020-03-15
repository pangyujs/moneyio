<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
    <Tabs :data-source="intervalList" class-prefix="interval" :value.sync="interval"/>
    <div>
      <ol>
        <li v-for="(group,index) in result" :key="index">
          <h3 class="title">{{beautify(group.title)}}</h3>
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
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';


  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    tagString(tags: Tag[]) {
      return tags.length === 0 ? '无' : tags.join(',');
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    beautify(string: string) {
      const day = dayjs(string);
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if(day.isSame(now,'year')){
        return day.format('M月DD日');
      }else{
        return day.format('YYYY年MM月DD日');
      }
    }

    get result() {
      const {recordList} = this;
      const newList = clone(recordList).sort((a,b)=>dayjs(b.createDate).valueOf()-dayjs(a.createDate).valueOf());
      const groupedList = [{title: dayjs(newList[0].createDate).format('YYYY-MM-DD'),items: [newList[0]]}];
      for(let i=1;i<newList.length;i++){
        const current = newList[i];
        const last = groupedList[groupedList.length-1];
        if(dayjs(last.title).isSame(dayjs(current.createDate),'day')){
          last.items.push(current)
        }else{
          groupedList.push({title:dayjs(current.createDate).format('YYYY-MM-DD'),items: [current]});
        }
      }
      console.log(groupedList);
      return groupedList;
    }

    beforeCreate() {
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

  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .title {
    @extend %item;
  }

  .record {
    background: #ffffff;
    @extend %item;
  }

  .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999999;
  }
</style>