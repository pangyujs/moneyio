<template>
  <div id="myEcharts"></div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import 'echarts/lib/chart/bar';

  @Component
  export default class Echarts extends Vue {
    @Prop({required: true}) readonly totalList!: RResult;
    mounted() {
      const ele = document.getElementById('myEcharts');
      const chart: any = this.$echarts.init(ele);
      chart.setOption(this.options);
    }
    created() {
      console.log(this.totalList); // 这就是 result 数据, 打出来一直是支出的
      const now = new Date();
      const month = (now.getMonth() + 1).toString();
      if ('13578'.indexOf(month) >= 0 || month === '10' || month === '12') {
        this.monthValue.push('29', '30', '31');
        this.totalMonthItems.push(0, 0, 0);
      } else if ('469'.indexOf(month) >= 0 || month === '11') {
        this.monthValue.push('29', '30');
        this.totalMonthItems.push(0, 0);
      }
      const title = this.totalList.map(item => item.title.split('-')[1]);
      if (title[title.length - 1].slice(-1) === month) {
        for (let i = 0; i < this.totalList.length; i++) {
          const day = this.totalList[i].title.split('-')[2];
          const total = this.totalList[i].total;
          let dayIndex: number;
          if (day.indexOf('0') >= 0) {
            dayIndex = parseInt(day.slice(-1));
          } else {
            dayIndex = parseInt(day);
          }
          this.totalMonthItems[dayIndex - 1] = total;
        }

      }
    }

    totalMonthItems: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    monthValue: string[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'];
    totalAndDays: { total: number; day: string }[] = [];
    $echarts: any;
    options = {
      xAxis: {
        boundaryGap: false,
        splitLine: {
          show: false
        },
        type: 'category',
        data: this.monthValue
      },
      yAxis: {
        show: false,
        type: 'value'
      },
      series: [

        {
          data: this.totalMonthItems,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'top',
              }
            }
          },
          areaStyle: {
            color: '#212943',
            shadowColor: 'rgb(30,29,43)',
          },
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变

          color: '#212943',
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: function (params) {

                if (params.value > 0) {

                  return params.value;

                } else {

                  return '';

                }

              },
            }
          },
        }]
    };
  }
</script>

<style lang="scss" scoped>

</style>