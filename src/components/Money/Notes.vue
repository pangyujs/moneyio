<template>
  <div>
    <label class="notes">
      <span class="name">{{this.noteName}}</span>
      <input v-model="value" type="text" :placeholder="this.placeholder">
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';
  @Component
  export default class Notes extends Vue{
    value = '';
    @Prop({required:true}) noteName!: string;
    @Prop() placeholder? : string;
    @Watch('value')
    valueChanged(newValue: string, oldValue: string){
      this.$emit('update:value',this.value);

    }
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