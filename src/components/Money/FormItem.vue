<template>
  <div>
    <label class="fromItem">
      <span class="name">{{this.noteName}}</span>
      <input :value="value" @input="valueChanged($event.target.value)" type="text" :placeholder="this.placeholder">
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
    @Watch('value')
    valueChanged(value: string ){
      this.$emit('update:value',value);
    }
  }

</script>

<style lang="scss" scoped>
.fromItem{
  font-size: 14px;
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