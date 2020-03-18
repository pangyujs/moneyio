<template>
  <Layout>
    <div class="labelsManager">
      <div class="empty"></div>
      <h3>标签管理</h3>
      <router-link class="addLabel" to="/add">
        <Icon name="add"/>
      </router-link>
    </div>
    <div class="tags">
      <router-link :to="`/labels/edit/${tag.id}`" class="tag" v-for="tag in tags" :key="tag.id">

        <span><Icon class="tagIcon" :name="tag.iconName"/>{{tag.name}}</span>
        <Icon name="right"/>
      </router-link>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';
  @Component({
    components: {Button},
  })
  export default class Labels extends Vue {
    get tags(){
      return this.$store.state.tagList;
    }
    created(){
      this.$store.commit('fetchTags');
    }
  }
</script>

<style lang="scss" scoped>
  .labelsManager{
    height: 58px;
    text-align:center;
    display: flex;
    min-width: 100vw;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    background: #56C5B2;
    font-weight: normal;
    color: #ffffff;
    > .addLabel{
      padding-right: 13px;
      font-size: 24px;
      /*font-size: 25px;*/
    }
    > .empty{
      padding-right: 15px;
      width: 25px;
      height: 25px;
    }
  }
  .tags {
    background: #ffffff;
    font-size: 16px;
    padding-left: 16px;

    > .tag {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;
      .tagIcon{
        border-radius: 50%;
        background: #d9d9d9;
        margin-right: 5px;
        /*border: 1px solid red;*/
      }
      svg {
        width: 18px;
        height: 18px;
        color: #666;
        margin-right: 16px;
      }
    }


  }

  .createTag{
    background: #56C5B2;
    color: #ffffff;
    border-radius: 4px;
    border: none;
    height: 40px;
    padding: 0 16px;

    &-wrapper {
      text-align: center;
      padding: 16px;
      margin-top: 44-16px;
    }
  }
</style>