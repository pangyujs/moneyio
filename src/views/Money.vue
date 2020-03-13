<template>
  <Layout class-prefix="layout">
    {{recordList}}
    <NumberPad :value.sync="record.amount" @submit="saveRecordList"/>
    <Types :value.sync="record.type"/>
    <FormItem @update:value="getNotes" placeholder="输入点什么吧" note-name="备注"/>
    <Tags :data-source.sync="tags" @update:value="getTags"/>

  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component, Watch} from 'vue-property-decorator';
  import recordListModel from '@/models/recordListModel';
  import tagListModel from '@/models/tagListModel';

  const recordList = recordListModel.fetch();

  const tagList = tagListModel.fetch();



  @Component({
    components: {Tags, FormItem: FormItem, Types, NumberPad},
  })
  export default class Money extends Vue {
    tags: {id: string;name: string} = tagList;
    record: RecordItem = {
      tags: {id:'',name:''}, notes: '', amount: 0, type: '+'
    };
    recordList: RecordItem[] =  recordList;

    getTags(value: string[]) {
      this.record.tags = value;
    }

    getNotes(value: string) {
      this.record.notes = value;
    }

    getType(value: string) {
      this.record.type = value;
    }

    getAmount(value: string) {
      this.record.amount = parseFloat(value);
    }

    saveRecordList() {
      recordListModel.create(this.record);
    }

    @Watch('recordList')
    recordChanged() {
     recordListModel.save(); // 存入localStorage必须是字符串
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>