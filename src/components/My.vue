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
            <el-col :span="16"><el-row style="font-size: x-large;line-height: 40px;">{{$store.state.userData.nickname}}</el-row><el-row style="font-size: large;line-height: 40px;"><i class="el-icon-trophy">2</i></el-row></el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
   <el-row>
    <el-col  :xs='{span: 22, offset: 1}' :sm='{span: 16, offset: 4}' :md='{span: 12, offset: 6}' :lg='{span: 12, offset: 6}' :xl='{span: 8, offset: 8}'>
     <img style="    width: inherit;" src="https://i.loli.net/2019/10/09/CW4cGh5VIE6NYpK.png"/>
    </el-col>
  </el-row>
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
</style>
