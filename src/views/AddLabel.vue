<template>
  <div>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"/>
      <h3>新增标签</h3>
      <Icon name="success" @click="createTag" class="rightIcon"/>
    </div>
    <div class="tags">
      <ul class="current">
        <li :class="{selected: selectedTags.indexOf(tag)>=0}" @click="toggle(tag)" v-for="(tag,index) in tagList"
            :key="index">
          <Icon :name="tag"/>
        </li>
      </ul>
      <label class="inputLabel">标签名:<input @input="getTagName($event.target.value)" type="text" placeholder="输入你想要的标签名"></label>
    </div>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Tags extends Vue {
    myTag: Tag ={id: '',name:'',iconName:''};
    selectedTags: string[] = [];
    goBack(){
        this.$router.back();
    }
    get errorState(){
      return this.$store.state.errorState;
    }
    get tagList() {
      const list = this.$store.state.tagList;
      const array: string[] = [];
      for(let i =0;i<list.length;i++){
        if(array.indexOf(list[i].iconName)===-1){
          array.push(list[i].iconName)
        }
      }
      return array;
    }
    getTagName(value: string){
      if(value.length>6){
        return this.$message.warning("最多可输六个字",1);
      }
      this.myTag.name = value;
    }
    toggle(tag: string) {
      if(this.selectedTags.length>=1 && tag!==this.selectedTags[0]){
        return ;
      }
      if(this.selectedTags.indexOf(tag)>=0){
        this.selectedTags.splice(0, 1);
      }else{
        this.selectedTags.push(tag);
      }
    }

    createTag() {
      if(this.myTag.name===''){
        return this.$message.warning('请输入标签名',1);
      }else if(this.selectedTags.length===0){
        return this.$message.warning('请选择一个标签',1);
      }
      this.myTag.iconName = this.selectedTags[0];
      this.$store.commit('createTag',this.myTag);
      if(this.errorState==='none'){
        this.$router.back();
      }else if(this.errorState==='failed'){
        this.$message.error('标签名不能重复',1);
      }
    }

    created() {
      this.$store.commit('fetchTags');
    }
  }

</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/helper.scss';

  .navBar {
    text-align: center;
    padding: 15px 16px;
    background: $color-height;
    color: #ffffff;
    display: flex;
    align-items: center;
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

  .tags {
    font-size: 14px;
    padding: 16px;
    flex-grow: 1;
    background: #ffffff;
    display: flex;
    flex-direction: column-reverse;

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
    > .current {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      width: auto;
      padding-bottom: 10px;

      > li {
        .icon {
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

        &.selected .icon {
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
