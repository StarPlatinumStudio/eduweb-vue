<template>
<div>
  <div class="helf-radiu"></div>
  <el-row class="el-menu">
   <el-menu :default-active="activeIndex"  mode="horizontal" >
    <el-menu-item index="1">主页</el-menu-item>
    <el-menu-item index="2" @click="$router.push({ name: 'Course'})">课程</el-menu-item>
    <el-menu-item index="3" @click="$router.push({ name: 'Vip'})">会员</el-menu-item>
    <el-menu-item index="4" @click="$router.push({ name: 'My'})">我的</el-menu-item>
   </el-menu>
  </el-row>
  <el-row>
    <el-col  :xs='{span: 22, offset: 1}' :sm='{span: 16, offset: 4}' :md='{span: 12, offset: 6}' :lg='{span: 12, offset: 6}' :xl='{span: 8, offset: 8}'>
     <h3 style="color: aliceblue;">言桥教育</h3>
    </el-col>
  </el-row>
    <el-row>
    <el-col  :xs='{span: 22, offset: 1}' :sm='{span: 16, offset: 4}' :md='{span: 12, offset: 6}' :lg='{span: 12, offset: 6}' :xl='{span: 8, offset: 8}'>
      <el-card>
       <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in ['言桥教育']" :key="item">
      <center><h3>{{ item }}</h3></center>
    </el-carousel-item>
  </el-carousel>
      </el-card>
    </el-col>
  </el-row>
  <el-main v-if="$store.state.userData.theclass">

  </el-main>
  </div>
</template>
<script>
export default {
  name: 'index',
  data () {
    return {
      activeName: '1',
      activeIndex: '1'
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
.helf-radiu{
       width: 300%;
    height: 500px;
    background-color: #2196F3;;
    border-radius: 0 0 600px 600px;
    position: fixed;
    right: -400px;
    top: -350px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
    .el-menu {
    position: fixed;
    z-index: 1024;
    bottom: 0px;
    width: 101%;
  box-shadow: 0px -5px 9px 0px #90939966;
}
</style>
