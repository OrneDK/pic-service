<template>
  <div class="pic-bed">
    <el-upload
      ref="upload"
      multiple
      action="#"
      :file-list="fileList"
      list-type="picture-card"
      :auto-upload="false"
      :limit="2"
      :on-change="handleChange"
    >
      <i slot="default" class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
    <el-button type="primary" @click="handleChangeSubmit">上传</el-button>
  </div>
</template>
<script>
import { uploadImg } from '@api'
export default {
  name: 'pic-bed',

  mixins: [],

  components: {},

  props: {},

  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: []
    }
  },

  computed: {},

  watch: {},

  created () {},

  mounted () {},

  destroyed () {},

  methods: {
    apiUploadImg (p) {
      const PARAM = {
        img: p
      }
      uploadImg(PARAM)
        .then(res => {
          if (res.status === 200) {
            this.$message.success('上传成功')
            this.$refs.upload.clearFiles()
          }
        })
        .catch(err => {
          this.$message.error('上传失败')
          throw new Error(err)
        })
    },
    handleChange (file, fileList, type) {
      this.dialogImageUrl = file.raw
    },
    handleChangeSubmit () {
      this.apiUploadImg(this.dialogImageUrl)
    }
  }
}
</script>
<style lang="less">
.pic-bed {
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .avatar-uploader .el-upload {
    width: 500px;
    height: 500px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-button {
    width: 80%;
    height: 80px;
    margin-top: 80px;
  }
}
</style>
