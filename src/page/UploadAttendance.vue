<template>
    <div>
        <h1>管理出勤信息</h1>
        <el-steps :active="status" align-center>
            <el-step title="准备出勤信息" description="使用系统导出出勤时间"></el-step>
            <el-step title="上传出勤表" description="把出勤表添加到服务器"></el-step>
            <el-step title="完成" description="大功告成"></el-step>
        </el-steps>
        <div style="margin-top:30px; text-align:center;" 
          v-if="showUploader" 
          v-loading="showProgress"
          element-loading-text="正在执行出勤信息上传">
            <el-upload
            drag
            :before-upload="beforeUpload"
            :on-error="onUploadError"
            :on-success="onUploadSuccess"
            :on-progress="onProgress"
            :show-file-list='false'
            action="api/upload_attendance"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">亲爱的行政同学，目前只能上传xlsx文件</div>
            </el-upload>
        </div>
        <div style="text-align:center;"  v-if="!showUploader">
            <h1 style="font-size: 28px; margin-top:50px;">出勤信息上传成功</h1>
            <p>0.0</p>
        </div>
    </div>
</template>
<script>
export default {
  name: 'UploadAttendace',
  methods:{
    beforeUpload(data) {
      this.$data.status = '2'
      this.$data.showProgress = true
    },
    onUploadError() {
      this.$data.status = '1'
      this.$notify.error({
        title: '错误',
        message: '文件在宇宙中迷失了，没找到服务器'
      });
      this.$data.showUploader = false
    },
    onUploadSuccess(data) {
      if (data.status == 'ok') {
        this.$notify.success({
          title: '上传成功',
          message: '上传成功，已经更新本周的考勤信息了，全体同学会在稍后收到考勤信息推送。'
        });
        this.$data.status = 3;
        this.$data.showUploader = false
      } else {
        this.$notify.error({
          title: '错误',
          message: '上传出错啦，请重试'
        });
        this.$data.showUploader = false
      }
    }
  },
  data() {
    return{
      status: '1',
      showUploader: true,
      showProgress: false,
      uploadPrecent: 0
    }
  }
}
</script>
