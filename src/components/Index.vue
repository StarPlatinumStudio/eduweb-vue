<template>
<div>
  <el-row class="el-menu">
   <el-menu :default-active="activeIndex"  mode="horizontal" >
    <el-menu-item index="1">主页</el-menu-item>
    <el-menu-item index="2" @click="$router.push({ name: 'Course'})">课程</el-menu-item>
    <el-menu-item index="3" @click="$router.push({ name: 'Vip'})">会员</el-menu-item>
    <el-menu-item index="4" @click="$router.push({ name: 'My'})">我的</el-menu-item>
   </el-menu>
  </el-row>
  <el-row>
      <el-col  :xs='{span: 24,}' :sm='{span: 16, offset: 4}' :md='{span: 16, offset: 4}' :lg='{span: 12, offset: 6}' :xl='{span: 12, offset: 6}'>
        {{$store.state.userData.nickname}}
      </el-col>
    </el-row>
  </div>
</template>
<script src="http://gosspublic.alicdn.com/aliyun-oss-sdk-4.4.4.min.js"></script>
<script>
export default {
  name: 'index',
  data () {
    return {
      openid: this.$route.query.openid,
      access_token: this.$route.query.access_token,
      userinfo: {},
      activeName: '1',
      activeIndex: '1',
      status: 'ready',
      files: [],
      point: {},
      uploading: false,
      percent: 0
    }
  },
  mounted () {
    if(this.$route.query.openid != undefined){
    this.$store.state.openid=this.$route.query.openid
    this.$store.state.access_token=this.$route.query.access_token
    if(JSON.stringify(this.$store.state.userData) === '{}'){
    this.$http.get('http://robinwang.nat300.top/weixin/getinfo?openid=' + this.openid + '&access_token=' + this.access_token).then(response => {
      this.userinfo = response.data
      this.$store.state.userData = response.data
    })
    }}
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
</style>
