<template>
<el-container>
<el-page-header @back="goBack" content="言桥教育 管理控制台">

</el-page-header>
</el-container>
</template>

<script>
import { getDate } from '@/utils/get-date'
export default {
  name: 'Upload',
  data () {
    return {
      // TODO
    }
  },
  mounted () {
    // TODO
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
