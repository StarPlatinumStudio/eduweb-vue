<template>
  <div class="hello">
    <div class="helf-radiu"></div>
    <el-dialog title="成为会员" :visible.sync="requestVipDialogVisible" width="100%" :show-close="false">
        <el-form ref="requestVipForm" :model="requestVipForm" label-width="80px">
          <el-form-item label="验证信息"   prop="detial" autocomplete="off" :rules="[{ required: true, message: '介绍详情不能为空'}]">
            <el-input type="textarea" v-model="requestVipForm.detial"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round style="width: 100%"  @click="requestVip('requestVipForm')" v-loading.fullscreen.lock="fullscreenLoading">确认</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
    <el-row v-if="requestVipRowVisible">
        <el-card class="box-card" style="margin:10px">
      <h3>你还没有认证成为会员用户</h3>
      <el-button type="primary" round style="width: 100%"  @click="requestVipDialogVisible=true" >我是家长，申请成为会员</el-button>
      <!-- <el-button type="primary" round style="width: 100%"  @click="requestVipDialogVisible=true" >历史申请记录</el-button> -->
        </el-card>
    </el-row>
    <el-row v-if="requestVipStatuVisible">
      <el-card class="box-card" style="margin:10px">
      <h2>会员认证中</h2>
      <el-timeline>
        <el-timeline-item key="0" :timestamp="requestVipForm.createtime" >
          发出会员请求：{{requestVipForm.detial}}
        </el-timeline-item>
        <el-timeline-item key="1" :timestamp="dateFormat(new Date())" >
          审核中
        </el-timeline-item>
      </el-timeline>
      </el-card>
    </el-row>
     <div v-if="contentVisible">
         <el-row>
         <el-col  :xs='{span: 22, offset: 1}' :sm='{span: 16, offset: 4}' :md='{span: 12, offset: 6}' :lg='{span: 12, offset: 6}' :xl='{span: 8, offset: 8}'>
           <h3 style="color: aliceblue;">{{$store.state.theClass.school}}</h3>
           <h3 style="color: aliceblue;">班级{{$store.state.userData.theclass}}</h3>
         </el-col>
         </el-row>
       <el-card class="box-card" style="margin:10px">
         <el-row><el-tag>作业</el-tag> 班级作业表</el-row>
         <el-row v-for="(item, index) in allHomeWork" :key="index">
           <el-col :span='18' :offset='0'><p>{{item.name}}</p><small style="color: #909399">{{item.starttime.substring(0,10)}}到{{item.finishtime.substring(0,10)}}</small> </el-col>
           <el-col :span='6' :offset='0'><el-button style="position: relative;top: 20px;" icon="el-icon-search"  round @click="$store.state.homeWorkDetial=allHomeWork[index];$router.push({ name: 'HomeWorkDetial'})"></el-button></el-col>
         </el-row>
         <el-row></el-row>
       </el-card>
    </div>
    <el-row class="el-menu">
      <el-menu :default-active="activeIndex"  mode="horizontal" >
        <el-menu-item index="1"  @click="$router.push({ name: 'Index'})">主页</el-menu-item>
        <el-menu-item index="2" @click="$router.push({ name: 'Course'})">课程</el-menu-item>
        <el-menu-item index="3">会员</el-menu-item>
        <el-menu-item index="4" @click="$router.push({ name: 'My'})">我的</el-menu-item>
      </el-menu>
    </el-row>
  </div>
</template>

<script>
import { getDate } from '@/utils/get-date'
export default {
  name: 'Upload',
  data () {
    return {
      activeIndex: '3',
      requestVipDialogVisible: false,
      requestVipRowVisible: false,
      fullscreenLoading: false,
      requestVipStatuVisible: false,
      contentVisible: false,
      requestVipForm: {detial: '', createtime: ''},
      allHomeWork: []
    }
  },
  mounted () {
    if (this.$store.state.userData.theclass === undefined || this.$store.state.userData.theclass === '') {
      this.$http.post(process.env.url + '/api/isviprequest?openid=' + this.$store.state.userData.openid).then(response => {
        if (response.data.ret === 0) {
          this.requestVipStatuVisible = true
          this.requestVipForm.detial = response.data.data.detial
          this.requestVipForm.createtime = response.data.data.createtime
          console.log(response.data)
        } else if (response.data.ret === 1) {
          this.requestVipRowVisible = true
        }
      })
    } else {
      this.contentVisible = true
      this.$http.get(process.env.url + '/api/classhomework?theclass=' + this.$store.state.userData.theclass).then(response => {
        if (response.data.ret === 0) {
          this.allHomeWork = response.data.data
        } else {
          this.$alert(response.data.msg)
        }
      })
    }
  },
  methods: {
    requestVip (refName) {
      this.$refs[refName].validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true
          var data = {nickname: this.$store.state.userData.nickname, detial: this.requestVipForm.detial, statu: '待审核', createtime: getDate(new Date()), openid: this.$store.state.userData.openid, headimgurl: this.$store.state.userData.headimgurl}
          this.$http.post(process.env.url + '/api/saveviprequest', data).then(response => {
            if (response.data.ret === 0) {
              this.$message.success(response.data.msg)
              this.requestVipDialogVisible = false
              this.requestVipStatuVisible = true
              this.requestVipRowVisible = false
            } else {
              this.$message.error(response.data.msg)
            }
            this.fullscreenLoading = false
          })
        }
      })
    },
    dateFormat (dt) {
      return getDate(dt)
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
    background-color: #03A9F4;
    border-radius: 0 0 600px 600px;
    position: fixed;
    right: -400px;
    top: -350px;
    z-index: -1;
}
  .el-menu {
    position: fixed;
    z-index: 1024;
    bottom: 0px;
    width: 101%;
  box-shadow: 0px -5px 9px 0px #90939966;
}
</style>
