<template>
  <Layout class-prefix="layout">
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
  import {Component} from 'vue-property-decorator';
  import store from '@/store/index2';


  @Component({
    components: {Tags, FormItem: FormItem, Types, NumberPad},
  })
  export default class Money extends Vue {
    tags = store.tagList;
    record: RecordItem = {
      tags: [], notes: '', amount: 0, type: '+'
    };
    recordList: RecordItem[] = store.recordList;

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
      store.createRecord(this.record);
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>