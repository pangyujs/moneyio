<template>
  <ul class="tabs" :class="{[classPrefix+'tabs']: classPrefix}">
    <li v-for="tab in dataSource" :key="tab.value"
        @click="select(tab)"
        class="tabs-item"
        :class="liClass(tab)"
    >{{tab.text}}
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
  .tabs {
    background: #c4c4c4;
    display: flex;
    text-align: center;
    font-size: 24px;

    &-item  {
      width: 50%;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      &.selected{
        background:  #ffffff;
      }
    }
  }

</style>