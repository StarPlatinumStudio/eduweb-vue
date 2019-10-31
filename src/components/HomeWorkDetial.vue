<template>
<el-container>
<el-main style="padding-bottom:50px">
    <el-page-header @back="goBack" content="作业详情"></el-page-header>
      <h1>{{homeWorkDetial.name}}</h1>
  <small style="color: #909399" v-if="homeWorkDetial.starttime && homeWorkDetial.finishtime">{{homeWorkDetial.starttime.substring(0,10)}}到{{homeWorkDetial.finishtime.substring(0,10)}}</small>
  <pre style="white-space: pre-wrap;">{{homeWorkDetial.detial}}</pre>
  <div class="demo-image__lazy">
    <el-image style="margin-top: 20px" v-for="url in homeWorkDetial.pictures" :key="url" :src="url" lazy :preview-src-list="homeWorkDetial.pictures"></el-image>
    <video style="width:100%;margin-top: 20px" v-if="ifVideo" :src="homeWorkDetial.video" controls="controls">您的浏览器不支持 video 标签。</video>
  </div>
   <el-divider content-position="left">已经提交的作业</el-divider>
    <el-collapse accordion>
  <el-collapse-item  v-for="(item, index) in userHomeWork" :key="index" :title="item.nickname" :name='index'>
   <template slot="title">
              <el-avatar icon="el-icon-user-solid" :src='item.headimgurl'></el-avatar>{{item.nickname}}&nbsp;<i class="header-icon el-icon-info"></i>
            </template>
            <el-row>创建时间：{{item.createtime}}</el-row>
            <el-row>{{item.detial}}</el-row>
            <el-image style="margin-top: 20px" v-for="url in item.pictures" :key="url" :src="url"></el-image>
            <video style="width:100%;margin-top: 20px" v-if="item.video"  controls="controls">
          <source :src="item.video" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' /></video>
            <div v-if="item.comment">
               <el-divider>精彩点评</el-divider>
              <el-row>{{item.comment}}</el-row>
              <el-divider content-position="right">{{item.commenttime}}</el-divider>
            </div>
           </el-collapse-item>
  </el-collapse>
</el-main>
<div class="bottombox"><el-button icon='el-icon-edit' round @click="$router.push({ name: 'EditHomeWork'})">写作业</el-button></div>
</el-container>
</template>

<script>
import { getDate } from '@/utils/get-date'
export default {
  name: 'Upload',
  data () {
    return {
      userHomeWork: [],
      homeWorkDetial: {},
      ifVideo: false
    }
  },
  mounted () {
    this.homeWorkDetial = this.$store.state.homeWorkDetial
    this.homeWorkDetial.pictures = JSON.parse(this.homeWorkDetial.pictures)
    this.ifVideo = (this.homeWorkDetial.video !== null)
    this.$http.get(process.env.url + '/api/userhomework?id=' + this.$store.state.homeWorkDetial.id).then(response => {
      response.data.forEach(element => {
        element.pictures = JSON.parse(element.pictures)
        this.userHomeWork.push(element)
      })
      console.log(this.userHomeWork)
    })
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    dateFormat (dt) {
      return getDate(dt)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottombox{
 position: fixed;
    bottom: 0px;
    -webkit-box-shadow: 1px 1px 9px 4px #000;
    box-shadow: 1px 1px 11px 0px #000;
    width: 100%;
    background-color: #fff;
    padding: 3px;
}
.text {
    font-size: 14px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
