<template>
<el-container>
<el-main>
  <el-page-header @back="goBack" content="我的作业"></el-page-header>
  <br/>
     <el-divider content-position="left"><el-avatar icon="el-icon-user-solid" :src='$store.state.userData.headimgurl'></el-avatar><span style="bottom: 13px;position: relative;left: 10px;">{{$store.state.userData.nickname}}已经提交的作业</span></el-divider>
  <el-collapse  accordion>
  <el-collapse-item   v-for="(item, index) in userHomeWork" :key="index" :title="item.nickname" :name='index'>
   <template slot="title">
            {{item.createtime}}<el-tag v-if="item.comment" style="position: absolute;right: 50px;">已点评</el-tag>
            </template>
            <el-row>创建时间：{{item.createtime}}</el-row>
            <el-row>{{item.detial}}</el-row>
            <el-image style="margin-top: 20px" v-for="url in item.pictures" :key="url" :src="url"></el-image>
            <video style="width:100%;margin-top: 20px" v-if="item.video"  controls="controls">
              <source :src="item.video" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
            </video>
            <div v-if="item.comment">
               <el-divider>精彩点评</el-divider>
              <el-row>{{item.comment}}</el-row>
              <el-divider content-position="right">{{item.commenttime}}</el-divider>
            </div>
           </el-collapse-item>
  </el-collapse>
</el-main>
</el-container>
</template>

<script>
import { getDate } from '@/utils/get-date'
export default {
  name: 'MyHomeWork',
  data () {
    return {
      userHomeWork: []
    }
  },
  mounted () {
    this.$http.get(process.env.url + '/api/myhomework?openid=' + this.$store.state.userData.openid).then(response => {
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
<style scoped></style>
