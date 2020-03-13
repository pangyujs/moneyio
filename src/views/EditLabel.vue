<template>
  <layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"/>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name" @update:value="updateTag" note-name="标签" placeholder="请输入标签" />
    </div>
    <div class="button-wrapper">
      <Button @click="removeTag">删除标签</Button>
    </div>
  </layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import tagListModel from '@/models/tagListModel';
  import FormItem from '@/components/Money/FormItem.vue';
  import Icon from '@/components/Icon.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button, FormItem: FormItem, Icon}
  })
  export default class EditLabel extends Vue {
    tag? : {id: string;name: string} = undefined;
    created() {
      const id = this.$route.params.id;
      tagListModel.fetch();
      const tags = tagListModel.data;
      const tag = tags.filter(item => item.id === id)[0];
      if (tag) {
        this.tag=tag;
      } else {
        this.$router.replace('/404');
      }

    }
    updateTag(value: string){
      if(this.tag){
        tagListModel.update(this.tag.id,value);
      }
    }
    removeTag(){
      if(this.tag){
        console.log(this.tag.id);
        tagListModel.remove(this.tag.id);
        this.$router.back();
      }
    }
    goBack(){
      this.$router.back();
    }

  }
</script>

<style lang="scss" scoped>
  .navBar {
    text-align: center;
    font-size: 16px;
    padding: 12px 16px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > .title {

    }

    > .leftIcon {
      width: 24px;
      height: 24px;
    }

    > .rightIcon {
      width: 24px;
      height: 24px;
    }
  }

  .form-wrapper {
    background: #ffffff;
    margin-top: 8px;
  }

  .button-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
</style>