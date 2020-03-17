<template>
  <div class="tags">
    <div class="new">
      <router-link class="addLabel" to="/add">新增标签</router-link>
    </div>
    <ul class="current">
      <li :class="{selected: selectedTags.indexOf(tag)>=0}" @click="toggle(tag)" v-for="tag in tagList"
          :key="tag.id">
        <Icon :name="tag.iconName"/>
        <span>{{tag.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  @Component
  export default class Tags extends Vue {
    get tagList(){
      return this.$store.state.tagList;
    }
    selectedTags: Tag[] = [];
    created(){
      this.$store.commit('fetchTags');
    }
    toggle(tag: Tag) {
      const result = this.selectedTags.indexOf(tag);
      if (result >= 0) {
        this.selectedTags.splice(result, 1);
      } else {
        this.selectedTags.push(tag);
      }
      this.$emit('update:value', this.selectedTags);
    }
  }

</script>

<style lang="scss" scoped>
  .tags {
    font-size: 14px;
    padding-left: 16px;
    padding-bottom: 10px;
    flex-grow: 1;
    background: #ffffff;
    display: flex;
    flex-direction: column-reverse;

    > .current {
      flex: 1;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      overflow-x: auto;
      width: auto;

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
        span{
          min-width: 50px;
        }
        $bg: #d9d9d9;
        padding: 10px 15px 10px 15px;
        /*border: 1px solid green;*/
        display: flex;
        align-content: center;
        align-items: center;
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
      padding-top: 10px;

      .addLabel {
        background: transparent;
        border: none;
        color: #999;
        border-bottom: 1px solid;
      }
    }
  }

</style>