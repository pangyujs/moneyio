<template>
  <div>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"/>
      <h3 class="title">编辑标签</h3>
      <Icon class="rightIcon" name="success" @click="updateTag"/>
    </div>
    <div class="form-wrapper">
      <label class="inputLabel">标签名:<input :value="this.currentTag.name" @input="getTagName($event.target.value)" type="text" placeholder="输入你想要的标签名"></label>
    </div>
    <div class="button-wrapper">
      <Button @click="removeTag">删除标签</Button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import Icon from '@/components/Icon.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button, FormItem: FormItem, Icon},
  })
  export default class EditLabel extends Vue {
    newLabelName: Tag = {id: '', name: '', iconName: ''};
    created() {
      const id = this.$route.params.id;
      this.$store.commit('fetchTags');
      this.$store.commit('setCurrentTag', id);
      if (!this.currentTag) {
        this.$router.replace('/404');
      }
    }
    get currentTag(){
      return this.$store.state.currentTag;
    }
    get errorState(){
      return this.$store.state.errorState;
    }
    getTagName(value: string){
      if(value.length> 6){
        return this.$message.warning("最多可输六个字",1);
      }
      this.newLabelName.name = value;
    }

    updateTag(){
      this.newLabelName.id = this.currentTag.id;
      this.newLabelName.iconName = this.currentTag.iconName;
      if(this.newLabelName){
        console.log(this.newLabelName);
        if(this.newLabelName.name.length===0){
          return;
        }
        this.$store.commit('updateTag',this.newLabelName);
        console.log(this.errorState);
        if(this.errorState === 'failed'){
          return this.$message.warning('标签名重复了',1)
        }
        this.$router.back();

      }
    }
    removeTag(){
      if(confirm('确认删除') && this.currentTag){
        this.$store.commit('removeTag',this.currentTag.id);
      }
    }
    goBack(){
      this.$router.back();
    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";
  ::v-deep .date{
    visibility: hidden;
  }
  ::v-deep input[type='date']{
  visibility: hidden;
  }
  .navBar {
    text-align: center;
    font-size: 16px;
    padding: 15px 16px;
    background: $color-height;
    display: flex;
    align-items: center;
    color: #ffffff;
    justify-content: space-between;

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
    > .inputLabel{
      font-size: 15px;
      min-height: 10vh;
      display: flex;
      align-items: center;
      padding-left: 23px;
      input{
        background: transparent;
        border: none;
        padding: 10px 10px;
      }
    }
  }

  .button-wrapper {
    > button{
      background: #FE575E;
    }
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
</style>