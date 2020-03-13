<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecordList"/>
    <Types :value.sync="record.type"/>
    <Notes @update:value="getNotes" placeholder="输入点什么吧" note-name="备注"/>
    <Tags :data-source.sync="tags" @update:value="getTags"/>

  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component, Watch} from 'vue-property-decorator';
  import recordListModel from '@/models/recordListModel';
  import tagListModel from '@/models/tagListModel';

  const recordList = recordListModel.fetch();

  const tagList = tagListModel.fetch();



  @Component({
    components: {Tags, Notes, Types, NumberPad},
  })
  export default class Money extends Vue {
    tags: string[] = tagList;
    record: RecordItem = {
      tags: [], notes: '', amount: 0, type: '+'
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
      const deepRecord: RecordItem = recordListModel.clone(this.record);// 对record 进行深拷贝
      deepRecord.createDate = new Date();
      this.recordList.push(deepRecord);
    }

    @Watch('recordList')
    recordChanged() {
     recordListModel.save(this.recordList); // 存入localStorage必须是字符串
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>