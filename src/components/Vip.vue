<template>
  <div class="hello">
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
      <h2>你还没有认证成为会员用户</h2>
      <el-button type="primary" round style="width: 100%"  @click="requestVipDialogVisible=true" >我是家长，申请成为会员</el-button>
      <el-button type="primary" round style="width: 100%"  @click="requestVipDialogVisible=true" >历史申请记录</el-button>
    </el-row>
     <el-row v-if="requestVipStatuVisible">
      <h2>会员认证中</h2>
      <el-timeline>
        <el-timeline-item key="0" :timestamp="requestVipForm.createtime" >
          发出会员请求：{{requestVipForm.detial}}
        </el-timeline-item>
        <el-timeline-item key="1" :timestamp="dateFormat(new Date())" >
          审核中
        </el-timeline-item>
  </el-timeline>
    </el-row>
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
      requestVipForm: {detial: '', createtime: ''}
    }
  },
  mounted () {
    if (this.$store.state.userData.theclass === undefined) {
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
<style scoped></style>
