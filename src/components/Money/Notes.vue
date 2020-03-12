<template>
  <div>
    <label class="notes">
      <span class="name">{{value}}备注</span>
      <input :value="value" @input="value = $event.target.value" type="text" placeholder="在这里输入备注">
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  @Component
  export default class Notes extends Vue{
    value = '';
  }
</script>

<style lang="scss" scoped>
.notes{
  font-size: 14px;
  background: #f5f5f5;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name{
    padding-right: 10px;
  }
  input{
    height: 64px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>