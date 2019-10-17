<template>
  <div class="hello">
    <img src="../assets/logo.png">
    <h2>{{ msg }}</h2>
    <el-row>
      <el-col  :xs='{span: 22, offset: 1}' :sm='{span: 16, offset: 4}' :md='{span: 12, offset: 6}' :lg='{span: 12, offset: 6}' :xl='{span: 8, offset: 8}'>
    <el-card shadow="always">
      <el-form ref="form" :model="form" >
      <el-form-item prop="account" autocomplete="off" :rules="[{ required: true, message: '账号不能为空'}]">
    <el-input type="account" v-model="form.account" placeholder="请输入账号"></el-input>
  </el-form-item>
     <el-form-item prop="password" :rules="[{ required: true, message: '密码不能为空'}]">
    <el-input type="password" v-model="form.password" placeholder="请输入密码" ></el-input>
  </el-form-item>
    <el-form-item>
       <el-button type="primary" round style="width: 100%"  @click="login('form')"
       v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
       <el-row>
      <el-col :xs='{offset: 7}' :sm='{offset: 9}' :md='{offset: 9}' :lg='{offset: 9}' :xl='{offset: 10}'>
      记住我
      <el-switch v-model="rememberMe"></el-switch>
      </el-col>
      </el-row>
  </el-form-item>
      </el-form>
    </el-card>
      </el-col>
</el-row>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '言桥教育 管理控制台',
      form: {
        account: '',
        password: ''
      },
      fullscreenLoading: false,
      rememberMe: false
    }
  },
  created: function () {
    let remember = this.getCookie('remember')
    if (remember === 'true') {
      this.rememberMe = true
    }
    this.form.account = this.getCookie('account')
    this.form.password = this.getCookie('password')
  },
  methods: {
    setCookie (cname, cvalue, exdays) {
      var d = new Date()
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
      var expires = 'expires=' + d.toGMTString()
      document.cookie = cname + '=' + cvalue + '; ' + expires
    },
    getCookie (cname) {
      var name = cname + '='
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim()
        if (c.indexOf(name) === 0) { return c.substring(name.length, c.length) }
      }
      return ''
    },
    login (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true
          this.$http.get(process.env.url + '/api/login?account=' + this.form.account + '&password=' + this.form.password).then(response => {
            if (response.data.ret === 0) {
              if (this.rememberMe) {
                this.setCookie('remember', 'true', 30)
                this.setCookie('account', this.form.account, 30)
                this.setCookie('password', this.form.password, 30)
              } else {
                this.setCookie('account', 'false', -1)
                this.setCookie('password', 'false', -1)
                this.setCookie('remember', 'false', -1)
              }
              // this.$message.success(response.data.msg)
              this.$router.push({ name: 'Console', params: response.data.data })
            } else {
              this.fullscreenLoading = false
              this.$message.error(response.data.msg)
            }
          })
        } else {
          this.$message('账号或密码不可为空')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
.hello {
   text-align: center;
}
</style>
