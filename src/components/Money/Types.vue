<template>
 <div>
  <ul class="types">
    <li :class="type === '-' && 'selected'"
    @click="selectType('-')">支出</li>
    <li :class="type === '+' && 'selected'"
    @click="selectType('+')">收入</li>
  </ul>
</div>
</template>

<script lang="ts">

  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  @Component
  export default class Types extends Vue{
    type = '-';
    selectType(t: string){
        if (t !== '-' && t !== '+') {
        throw new Error("输入的值不正确")
        }
        this.type = t;

    }
  }
  // export default {
  //   name: 'Types',
  //   props: ['xxx'],
  //   mounted(){
  //     console.log(this.xxx);
  //   },
  //   data(){
  //     return {
  //       type: '-' // - 号为支出 + 号为收入
  //     }
  //   },
  //   methods: {
  //     selectType(t){
  //       if (t !== '-' && t !== '+') {
  //         throw new Error("输入的值不正确")
  //       }
  //       this.type = t;
  //     }
  //   }
  // };
</script>

<style lang="scss" scoped>
.types{
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  > li{
    width: 50%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &.selected::after{
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333333;
    }
  }
}
</style>