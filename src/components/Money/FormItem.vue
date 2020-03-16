<template>
  <div>
    <label class="fromItem">
      <span class="name">{{this.noteName}}:</span>
      <input :value="value" @input="valueChanged($event.target.value)" type="text" :placeholder="placeholder">
      <span class="name date">日期:</span><input type="date">
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';
  @Component
  export default class FormItem extends Vue{
    @Prop({default: ''}) readonly value!: string;
    @Prop({required:true}) noteName!: string;
    @Prop() placeholder? : string;
    valueChanged(value: string ){
      this.$emit('update:value',value);
    }
  }

</script>

<style lang="scss" scoped>
.fromItem{
  display: flex;
  align-items: center;
  justify-content:space-around;
  min-height: 50px;
  font-size: 11px;
  /*font-size: 14px;*/
  padding: 0 16px;
  /*display: flex;*/
  /*align-items: center;*/
  .name{
    flex-grow: 1;
    /*padding-right: 10px;*/
    /*margin-right: 10px;*/
  }
  input{
    /*height: 64px;*/
    flex-shrink: 1;
    background: transparent;
    border: none;
  }
}
</style>