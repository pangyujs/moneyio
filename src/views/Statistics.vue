<template>
  <Layout>
    <div class="statisticName">
      <h3>统计</h3>
    </div>
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
    <div>
      <div>
        <Echarts :total-list="result"/>
      </div>
      <ol v-if="result.length>0">
        <li v-for="(group,index) in result" :key="index">
          <h3 class="title">{{beautify(group.title)}}<span>￥{{group.total}}</span></h3>
          <ol>
            <li class="record" v-for="item in group.items" :key="item.id">
              <span class="tag" :key="tag.id" v-for="tag in item.tags"><Icon :name="tag.iconName"/><span
                class="labelName">{{tag.name}}</span></span>
              <span class="notes">{{item.notes}}</span>
              <span>￥{{item.amount}}</span>
            </li>
          </ol>
        </li>
      </ol>
      <div v-else class="noResult">
        目前没有相关记录
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import typeList from '@/constants/typeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';
  import Echarts from '@/components/Echarts.vue';
  import 'echarts/lib/chart/bar';

  @Component({
    components: {Tabs, Echarts}
  })
  export default class Statistics extends Vue {
    type = '-';
    typeList = typeList;

    beforeCreate() {
      this.$store.commit('fetchRecords');
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
      } else if (day.isSame(now, 'year')) {
        return day.format('M月DD日');
      } else {
        return day.format('YYYY年MM月DD日');
      }
    }

    get result() {
      const {recordList} = this;
      const array = recordList.filter(r => r.type === this.type);
      if (array.length === 0) {return [];}
      const newList = clone(recordList).filter(r => r.type === this.type).sort((a, b) => dayjs(b.createDate).valueOf() - dayjs(a.createDate).valueOf());
      const groupedList: RResult = [{
        title: dayjs(newList[0].createDate).format('YYYY-MM-DD'),
        total: 0,
        items: [newList[0]]
      }];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = groupedList[groupedList.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createDate), 'day')) {
          last.items.push(current);
        } else {
          groupedList.push({title: dayjs(current.createDate).format('YYYY-MM-DD'), total: 0, items: [current]});
        }
      }
      groupedList.map(group => {
        group.total = group.items.reduce((sum, cur) => sum + cur.amount, 0);
      });
      return groupedList;
    }
  }
</script>

<style lang="scss" scoped>
  #myEcharts {
    width: 100vw;
    height: 40vh;
  }

  .statisticName {
    text-align: center;
    min-width: 100vw;
    padding: 15px 0;
    background: #56C5B2;
    font-weight: normal;
    color: #ffffff;
  }

  .noResult {
    text-align: center;
    padding: 20px 20px;
  }

  ::v-deep {
    .type-tabs-item {
      background: #606678;
      color: #ffffff;


      &.selected {
        background: #ffffff;
        color: #585858;

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
    align-items: center;
    align-content: center;
  }

  .title {
    @extend %item;
  }

  .record {
    background: #ffffff;
    @extend %item;

    > .notes {
      margin-right: auto;
      margin-left: 16px;
      color: #999999;
    }

    > .tag {
      display: flex;
      align-items: center;
      justify-content: center;

      .labelName {
        padding: 0 5px;
      }
    }
  }


</style>