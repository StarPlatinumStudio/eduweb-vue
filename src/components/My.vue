<template>
<div>
 <div class="helf-radiu"></div>
  <el-row class="el-menu"> <el-menu :default-active="activeIndex"  mode="horizontal">
      <el-menu-item index="1" @click="$router.push({ name: 'Index'})">主页</el-menu-item>
      <el-menu-item index="2" @click="$router.push({ name: 'Course'})">课程</el-menu-item>
      <el-menu-item index="3" @click="$router.push({ name: 'Vip'})">会员</el-menu-item>
      <el-menu-item index="4" >我的</el-menu-item>
    </el-menu>
  </el-row>
  <el-row>
    <el-col  :xs='{span: 22, offset: 1}' :sm='{span: 16, offset: 4}' :md='{span: 12, offset: 6}' :lg='{span: 12, offset: 6}' :xl='{span: 8, offset: 8}'>
     <h3 style="color: aliceblue;">{{$store.state.userData.nickname}}</h3>
    </el-col>
  </el-row>
    <el-row>
    <el-col  :xs='{span: 22, offset: 1}' :sm='{span: 16, offset: 4}' :md='{span: 12, offset: 6}' :lg='{span: 12, offset: 6}' :xl='{span: 8, offset: 8}'>
      <el-card>
        <el-row>
            <el-col :span="8"><el-avatar :src="$store.state.userData.headimgurl" :size="75"  icon="el-icon-user-solid"></el-avatar></el-col>
            <el-col :span="16"><el-row style="font-size: x-large;line-height: 40px;">{{$store.state.userData.nickname}}</el-row>
            <!-- <el-row style="font-size: large;line-height: 40px;"><i class="el-icon-trophy">2</i></el-row> -->
            </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
  <el-main v-if="$store.state.userData.theclass">
    <!-- <p>我的学习</p> -->
    <ul class="icon-list">
      <li @click="$router.push({ name: 'MyHomeWork'})"><span><i class="el-icon-document"></i><span class="icon-name">我的作业</span></span></li>
      <li @click="openPictures" v-if="$store.state.theClass.pictures"><span><i class="el-icon-picture-outline"></i><span class="icon-name">班级照片</span></span></li>
    </ul>
  </el-main>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      openid: this.$route.query.openid,
      access_token: this.$route.query.access_token,
      userinfo: {},
      activeIndex: '4'
    }
  },
  methods: {
    openPictures () {
      window.open(this.$store.state.theClass.pictures)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.care-name {
    font-size: x-large;line-height: 40px;
}
.helf-radiu{
       width: 300%;
    height: 500px;
    background-color: #FF5722;
    border-radius: 0 0 600px 600px;
    position: fixed;
    right: -400px;
    top: -350px;
}
.icon-list li span {
    line-height: normal;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    color: #99a9bf;
    transition: color .15s linear;
    }
.icon-list li:after, .icon-list li span {
    display: inline-block;
    vertical-align: middle;
}
.icon-list li {
    float: left;
    /* width: 16.66%; */
    width: 23%;
    text-align: center;
    height: 120px;
    line-height: 120px;
    color: #666;
    font-size: 13px;
    margin-right: -1px;
    margin-bottom: -1px;
}
.icon-list li i {
    display: block;
    font-size: 32px;
    margin-bottom: 15px;
    color: #606266;
    transition: color .15s linear;
}
  .el-menu {
    position: fixed;
    z-index: 1024;
    bottom: 0px;
    width: 101%;
  box-shadow: 0px -5px 9px 0px #90939966;
}
</style>
