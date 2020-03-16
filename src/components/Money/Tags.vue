<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li :class="{selected: selectedTags.indexOf(tag.name)>=0}" @click="toggle(tag.name)" v-for="tag in tagList"
          :key="tag.id">
        <Icon :name="tag.iconName"/>
        {{tag.name}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import store from '@/store/index2';

  @Component
  export default class Tags extends Vue {
    get tagList(){
      return this.$store.state.tagList;
    }
    selectedTags: string[] = [];
    created(){
      this.$store.commit('fetchTags');
      console.log(this.tagList);
    }
    toggle(tag: string) {
      const result = this.selectedTags.indexOf(tag);
      if (result >= 0) {
        this.selectedTags.splice(result, 1);
      } else {
        this.selectedTags.push(tag);
      }
      this.$emit('update:value', this.selectedTags);
    }

    createTag() {
      const name = window.prompt('请输入标签名');
      if (name === '') {
        return alert('标签名不能为空!');
      } else if (name === null) {
        return;
      }
      this.$store.commit('createTag',name);
    }
  }

</script>

<style lang="scss" scoped>
  .tags {
    font-size: 14px;
    padding: 16px;
    flex-grow: 1;
    background: #ffffff;
    display: flex;
    flex-direction: column-reverse;

    > .current {
      flex: 1;
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      width: auto;
      padding-bottom: 10px;

      > li {
        .icon{
          min-width: 35px;
          min-height: 35px;
          border-radius: 50%;
          font-size: 15px;
          background: #d9d9d9;
          padding: 5px;
          /*border: 1px solid red;*/
        }
        $bg: #d9d9d9;
        padding: 10px 22px 10px 22px;
        /*border: 1px solid green;*/
        display: flex;
        align-content: center;
        text-align: center;
        flex-direction: column;
        font-size: 12px;
        &.selected .icon{
          background: darken($bg, 50%);
          color: #f5f5f5;
        }
      }
    }

    > .new {
      padding-top: 16px;

      button {
        background: transparent;
        border: none;
        color: #999;
        border-bottom: 1px solid;
        padding: 0 4px;
      }
    }
  }

</style>