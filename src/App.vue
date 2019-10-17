<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
