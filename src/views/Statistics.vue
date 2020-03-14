<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
    <Tabs :data-source="intervalList" class-prefix="tab" :value.sync="interval"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import intervalList from '@/constants/intervalList';
  import typeList from '@/constants/typeList';

  @Component({
    components: {Tabs }
  })
  export default class Statistics extends Vue {
    type='-';
    interval= 'day';
    intervalList = intervalList;
    typeList = typeList;

  }
</script>

<style lang="scss" scoped>
 ::v-deep .type-tabs-item{
  background: #ffffff;
  &.selected{
  background: #c4c4c4;
    &::after{
      display: none;
    }
}
}
</style>