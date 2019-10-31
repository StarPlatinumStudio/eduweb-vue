<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
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
    if (this.$route.query.openid !== undefined) {
      this.$store.state.openid = this.$route.query.openid
      this.$store.state.access_token = this.$route.query.access_token
      if (JSON.stringify(this.$store.state.userData) === '{}') {
        this.$http.get(process.env.url + '/weixin/getinfo?openid=' + this.openid + '&access_token=' + this.access_token).then(response => {
          this.userinfo = response.data
          this.$store.state.userData = response.data
          this.$http.get(process.env.url + '/api/myclass?theclass=' + response.data.theclass).then(response => {
            this.$store.state.theClass = response.data
          })
        })
      }
    } else {
      console.log(this.$route.query.openid)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
  body{margin:0;}
  .el-menu {
    position: fixed;
    z-index: 1024;
    bottom: 0px;
    width: 101%;
  box-shadow: 0px -5px 9px 0px #90939966;
}
</style>
