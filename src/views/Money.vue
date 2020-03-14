<template>
  <Layout class-prefix="layout">
    {{recordList}}
    <NumberPad :value.sync="record.amount" @submit="saveRecordList"/>
    <Types :value.sync="record.type"/>
    <FormItem @update:value="getNotes" placeholder="输入点什么吧" note-name="备注"/>
    <Tags @update:value="getTags" />

  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component} from 'vue-property-decorator';


  @Component({
    components: {Tags, FormItem: FormItem, Types, NumberPad},
  })
  export default class Money extends Vue {
    get recordList(){
      return this.$store.state.recordList;
    }
    record: RecordItem = {
      tags: [], notes: '', amount: 0, type: '+'
    };
    created(){
      this.$store.commit('fetchRecords');
    }

    getTags(value: string[]) {
      this.record.tags = value;
    }

    getNotes(value: string) {
      this.record.notes = value;
    }


    saveRecordList() {
      this.$store.commit('createRecords',this.record);
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>