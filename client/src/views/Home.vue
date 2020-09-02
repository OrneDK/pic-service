<template>
  <div class="home" ref="home">
    <div class="content p30">
      <el-button type="primary" round class="btn-upload" @click="handleRouterUpload">上传图片</el-button>
      <el-table :data="page.list" style="width: 100%">
        <el-table-column label="缩略图">
          <template slot-scope="scope">
            <img style="width:80px;height:80px;" :src="scope.row.address" alt srcset />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :data-clipboard-text="scope.row.address"
              @click="handleEdit($event, scope.row.address)"
            >复制</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-next">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="page.pageNum"
          :page-size="page.pageSize"
          :total="page.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getImgs, delImg } from '@api'
export default {
  name: 'Home',

  mixins: [],

  components: {},

  props: {},

  data () {
    return {
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 20,
        list: []
      }
    }
  },

  computed: {},

  watch: {},

  created () {
    this.apigetImgs(this.page)
  },

  mounted () {},

  destroyed () {},

  methods: {
    apigetImgs (p) {
      const PARAM = {
        pageNum: p.pageNum,
        pageSize: p.pageSize
      }
      getImgs(PARAM).then(res => {
        if (res.status === 200) {
          this.page.list = res.data.list
          this.page.total = res.data.total
        }
      })
    },
    apiDelImg (p) {
      delImg(p).then(res => {
        if (res.status === 200) {
          this.$message.success('删除成功')
          this.apigetImgs(this.page)
        }
      })
    },
    handleEdit (e, text) {
      const clipboard = new this.Clipboard(e.target, { text: () => text })
      clipboard.on('success', e => {
        this.$message({ type: 'success', message: '复制成功' })
        // 释放内存
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$message({ type: 'waning', message: '该浏览器不支持自动复制' })
        // 释放内存
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      })
      clipboard.onClick(e)
    },
    handleDelete (index, row) {
      this.apiDelImg(row._id)
    },
    handleRouterUpload () {
      this.$router.push({ name: 'PicBed' })
    },
    handleCurrentChange (val) {
      this.page.pageNum = val
      this.apigetImgs(this.page)
    }
  }
}
</script>
<style lang="less">
.home {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  .content {
    width: 100%;
    background: #ffffff;
    margin-top: 20px;
    .btn-upload {
      width: 100%;
      margin: 20px 0;
    }
    .page-next {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 0;
    }
  }
}
</style>
