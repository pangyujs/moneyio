<template>
  <layout>
    <div>
    <Icon name="left"/>
      <span>编辑标签</span>
    </div>
    <Notes note-name="标签" placeholder="请输入标签"/>
  </layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import tagListModel from '@/models/tagListModel';
  import Notes from '@/components/Money/Notes.vue';
  import Icon from '@/components/Icon.vue';

  @Component({
    components: {Notes,Icon}
  })
  export default class EditLabel extends Vue {
    created(){
      const id = this.$route.params.id;
      tagListModel.fetch();
      const tags = tagListModel.data;
      const tag = tags.filter(item=>item.id === id)[0];
      if(tag){
        console.log(tag);
      }else{
        this.$router.replace('/404');
      }

    }
  }
</script>

<style lang="scss" scoped>

</style>