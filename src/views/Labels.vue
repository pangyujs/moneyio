<template>
  <Layout>
    <div class="tags">
      <router-link :to="`/labels/edit/${tag.id}`" class="tag" v-for="tag in tags" :key="tag.id">
        <span>{{tag.name}}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button @click="createTag" class="createTag">
       新增标签
      </Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';
  import store from '@/store/index2';
  @Component({
    components: {Button}
  })
  export default class Labels extends Vue {
    tags = store.tagList;
    createTag(){
      const name = window.prompt('请输入标签名');
      if(name){
          store.createTag(name);
      }else if(name===''){
        alert('标签名不能为空!')
      }
    }
  }
</script>

<style lang="scss" scoped>

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

      svg {
        width: 18px;
        height: 18px;
        color: #666;
        margin-right: 16px;
      }
    }


  }

  .createTag{
    background: #767676;
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