<template>
  <div>
    <label class="fromItem">
      <span class="name">{{this.noteName}}:</span>
      <input :value="value" @input="valueChanged($event.target.value)" type="text" :placeholder="placeholder">
      <span class="name date">日期:</span><input :dateVakye="dateValue" :value="dateValue" :max="defaultDateValue" @input="dateChanged($event.target.value)" type="date">
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  @Component
  export default class FormItem extends Vue{
    defaultDateValue = '';
    created(){
      const now = new Date();
      const day = ("0" + now.getDate()).slice(-2);
      const month = ("0" + (now.getMonth() + 1)).slice(-2);
      this.defaultDateValue = now.getFullYear() + "-" + (month) + "-" + (day);
    }
    @Prop({default: ''}) readonly value!: string;
    @Prop({default: ''}) readonly dateValue!: string;
    @Prop({required:true}) noteName!: string;
    @Prop() placeholder? : string;
    valueChanged(value: string ){
      this.$emit('update:value',value);
    }
    dateChanged(value: string){
      this.$emit('update:dateValue',value);
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
  padding: 0 16px;
  .name{
    flex-grow: 1;
  }
  input{
    flex-shrink: 1;
    background: transparent;
    border: none;
  }
}
</style>