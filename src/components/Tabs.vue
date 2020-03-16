<template>
  <ul class="tabs" :class="{[classPrefix+'tabs']: classPrefix}">
    <li v-for="tab in dataSource" :key="tab.value"
        @click="select(tab)"
        class="tabs-item"
        :class="liClass(tab)"
    ><h3>{{tab.text}}</h3>
    </li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  type DateSourceItem = { text: string; value: string }
  @Component
  export default class Tabs extends Vue {
    @Prop({required: true, type: Array}) dataSource!: DateSourceItem[];
    @Prop() readonly value!: string;
    @Prop(String) classPrefix?: string;

    liClass(tab: DateSourceItem) {
      return {
        selected: tab.value === this.value, [this.classPrefix + '-tabs-item']: this.classPrefix
      };
    }

    select(tab: DateSourceItem) {
      this.$emit('update:value', tab.value);
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/helper.scss';
  .tabs {
    background: $color-height;
    display: flex;
    text-align: center;
    font-size: 16px;
    font-weight: normal;

    &-item {
      width: 50%;
      min-height: 58px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      color: #ffffff;

      &.selected {
        &::after {
          content: '';
          background: $color-height;
          height: 2px;
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
        }

        background: #ffffff;
        color: $color-font;
      }
    }
  }

</style>