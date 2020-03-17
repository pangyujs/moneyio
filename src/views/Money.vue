<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecordList"/>
    <FormItem  :value.sync="record.notes" :dateValue.sync="record.createDate" placeholder="输入点什么吧" note-name="备注"/>
    <Tags @update:value="getTags"/>
    <Tabs :data-source="typeList" :value.sync="record.type"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component} from 'vue-property-decorator';
  import typeList from '@/constants/typeList';
  import Tabs from '@/components/Tabs.vue';


  @Component({
    components: {Tabs, Tags,FormItem, NumberPad},
  })
  export default class Money extends Vue {
    typeList= typeList;
    record: RecordItem = {
      tags: [], notes: '', amount: 0, type: '-', createDate: ''
    };
    created(){
      const now = new Date();
      const day = ("0" + now.getDate()).slice(-2);
      const month = ("0" + (now.getMonth() + 1)).slice(-2);
      this.record.createDate = now.getFullYear() + "-" + (month) + "-" + (day);
    }

    getTags(value: Tag[]) {
      this.record.tags = value;
    }

    saveRecordList() {
      if(this.record.tags.length===0){
        return alert('请选择1~3个标签!');
      }else if(this.record.tags.length>2){
        return alert('标签名太多啦,请重新选择');
      }
      if(this.record.amount === 0){
        return alert('您还没有输入金额哦!')
      }
      this.$store.commit('createRecords',this.record);
      this.record.notes = '';
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>