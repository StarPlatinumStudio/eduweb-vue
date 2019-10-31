<template>
<el-container>
  <el-dialog :visible.sync="imgPreviewDialogVisible">
    <img width="100%" :src="imgPreviewDialogImageUrl" alt="">
  </el-dialog>
<el-main style="padding:0;">
<el-page-header @back="goBack" content="提交作业">
</el-page-header>
<el-card>
  <el-collapse>
    <el-collapse-item title='查看作业详情'>
      <h1>{{homeWorkDetial.name}}</h1>
      <small style="color: #909399" v-if="homeWorkDetial.starttime && homeWorkDetial.finishtime">{{homeWorkDetial.starttime.substring(0,10)}}到{{homeWorkDetial.finishtime.substring(0,10)}}</small>
      <pre style="white-space: pre-wrap;">{{homeWorkDetial.detial}}</pre>
      <div class="demo-image__lazy">
        <el-image style="margin-top: 20px" v-for="url in homeWorkDetial.pictures" :key="url" :src="url"></el-image>
        <video style="width:100%;margin-top: 20px" v-if="ifVideo"  controls="controls">
          <source :src="homeWorkDetial.video" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
        </video>
      </div>
    </el-collapse-item>
  </el-collapse>
</el-card>
  <el-form ref="detial" :model="homeWorkForm">
    <el-form-item prop="detial" :rules="[{ required: true, message: '不能为空'}]">
      <el-input type="textarea" placeholder='在这里填写作业内容' v-model="homeWorkForm.detial" height='100px'></el-input>
    </el-form-item>
    <el-form-item label="添加图片">
                </el-form-item>
                <el-upload
                  class="upload-demo"
                  action
                  :http-request="handleUpload"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="limit"
                  :on-exceed="handleExceed"
                  :file-list="homeWorkForm.fileList"
                  :list-type="listType"
                  accept="image/*"
                >
                  <i slot="default" class="el-icon-plus"></i>
                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview"></span>
                    <span
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)">
                        <i class="el-icon-delete"></i>
                      </span>
                  </span>
                  <div slot="tip" class="el-upload__tip">{{ tip }}</div>
                </el-upload>
                <el-form-item label="添加视频">
               <el-upload
                accept="video/mp4,video/x-m4v,video/*"
                ref="upload"
                action
                :http-request="videoUpload"
                :limit="videoLimit"
                :before-remove="videoRemove"
                :on-remove="handleRemove"
                :file-list="homeWorkForm.videoList">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                </el-upload>
               </el-form-item>
               <el-button :loading="homeWorkBtnAttr" type="primary" @click="saveHomeWork">{{homeWorkBtnStatus}}</el-button>
  </el-form>
</el-main>
</el-container>
</template>

<script>
import { put } from '@/utils/ali-oss'
import { getDate } from '@/utils/get-date'
export default {
  props: {
    tip: {
      type: String,
      default: '上传大小不能超过8M'
    },
    limit: {
      type: Number,
      default: 9
    },
    videoLimit: {
      type: Number,
      default: 1
    },
    action: {
      type: String,
      default: ''
    },
    headers: {
      type: Object,
      default: () => {}
    },
    name: {
      type: String,
      default: ''
    },
    listType: {
      type: String,
      default: 'picture-card'
    }
  },
  name: 'Upload',
  data () {
    return {
      homeWorkDetial: {},
      ifVideo: false,
      homeWorkForm: {fileList: [], videoList: []},
      homeWorkBtnStatus: '立即发布',
      homeWorkBtnAttr: false,
      imgPreviewDialogImageUrl: '',
      imgPreviewDialogVisible: false
    }
  },
  mounted () {
    this.homeWorkDetial = this.$store.state.homeWorkDetial
    this.homeWorkDetial.pictures = JSON.parse(this.homeWorkDetial.pictures)
    this.ifVideo = (this.homeWorkDetial.video !== null)
  },
  methods: {
    handleRemove (file, fileList) {
      this.$emit('on-remove', file, fileList)
    },
    handlePreview (file) {
      this.imgPreviewDialogImageUrl = file.url
      this.imgPreviewDialogVisible = true
      this.$emit('on-preview', file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`每次只能上传 ${this.limit} 个文件`)
    },
    // 照片删除
    beforeRemove (file, fileList) {
      delete this.homeWorkForm.fileList[file.uid]
      console.log(this.fileList)
    },
    videoRemove (file, fileList) {
      delete this.homeWorkForm.videoList[file.uid]
    },
    handleUpload (option) {
      this.homeWorkBtnStatus = '上传中'
      this.homeWorkBtnAttr = true
      put(option.file.uid + option.file.name, option.file).then(res => {
        this.homeWorkBtnStatus = '立即发布'
        this.homeWorkBtnAttr = false
        this.homeWorkForm.fileList[option.file.uid] = res.url
        console.log(res)
      })
    },
    videoUpload (option) {
      this.homeWorkBtnStatus = '上传中'
      this.homeWorkBtnAttr = true
      put(option.file.uid + option.file.name, option.file).then(res => {
        this.homeWorkBtnStatus = '立即发布'
        this.homeWorkBtnAttr = false
        this.homeWorkForm.videoList[option.file.uid] = res.url
        console.log(res)
      })
    },
    goBack () {
      this.$router.go(-1)
    },
    saveHomeWork () {
      this.$refs['detial'].validate((valid) => {
        if (valid) {
          if (this.$store.state.userData.theclass !== undefined) {
            let data = this.homeWorkForm
            data.pictures = []
            for (let index in data.fileList) {
              data.pictures.push(data.fileList[index])
            }
            data.pictures = JSON.stringify(data.pictures)
            for (let index in data.videoList) {
              data.video = data.videoList[index]
            }
            data.createtime = getDate(new Date())
            data.nickname = this.$store.state.userData.nickname
            data.headimgurl = this.$store.state.userData.headimgurl
            data.theclass = this.$store.state.userData.theclass
            data.openid = this.$store.state.userData.openid
            data.homework = this.homeWorkDetial.id
            console.log(data)
            this.fullscreenLoading = true
            this.$http.post(process.env.url + '/api/saveuserhomework', data).then(response => {
              if (response.data.ret === 0) {
                this.$message.success(response.data.msg)
                console.log('succeed', response.data)
              } else {
                this.$message.error(response.data.msg)
              }
              this.fullscreenLoading = false
            })
          } else {
            this.$message.error('登录信息过期')
            return false
          }
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
