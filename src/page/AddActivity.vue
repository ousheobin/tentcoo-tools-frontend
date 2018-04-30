<template>
    <div>
        <el-steps :active="status" align-center>
            <el-step title="填写推送信息" description="填写下面的推送表单"></el-step>
            <el-step title="微信推送" description="企业微信推送消息"></el-step>
            <el-step title="查看推送情况" description="点击企业微信的消息，查看阅读情况"></el-step>
        </el-steps>
        <el-form ref="form" :model="formData" label-position="top"  v-loading="loading" element-loading-text="正在执行推送，请稍等候" v-if="showEditor">
        <h1>新建通知推送</h1>
        <el-form-item label="通知类型">
            <el-switch
                v-model="formData.type"
                active-text="会议与活动通知"
                inactive-text="普通工作室通知"
                active-value="activity"
                inactive-value="notice">
            </el-switch>
        </el-form-item>
        <el-form-item label="活动地点" v-if="formData.type=='activity'">
            <el-input v-model="formData.place"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" v-if="formData.type=='activity'">
            <el-col :span="4" style="padding-right:5px;">
                <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="formData.date"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-col>
            <el-col :span="4">
                <el-time-picker
                    type="fixed-time"
                    placeholder="选择时间"
                    v-model="formData.time"
                    style="width: 100%;"
                    format="HH:mm"
                    value-format="HH:mm">
                </el-time-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="活动描述" v-if="formData.type=='activity'">
            <el-input :autosize="{ minRows: 8, maxRows: 15}" type="textarea" v-model="formData.content" :rows="8"></el-input>
        </el-form-item>
        <el-form-item label="通知标题" v-if="formData.type!='activity'">
            <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="通知信息" v-if="formData.type!='activity'">
            <el-input :autosize="{ minRows: 8, maxRows: 15}" type="textarea" v-model="formData.content" :rows="8"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即发布</el-button>
        </el-form-item>
        </el-form>
        <div style="text-align:center;"  v-if="!showEditor">
            <h1 style="font-size: 28px; margin-top:50px;">提交成功！</h1>
            <p>稍后工作室的童鞋会收到企业微信下发的通知消息哦</p>
        </div>
        <el-dialog
            title="Tips 提醒"
            :visible.sync="showDialog"
            width="30%"
            :before-close="handleClose">
            <span>{{dialogMessage}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="showDialog = false">好的，返回修改</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Api from '@/api/Api';
export default {
  data() {
    return {
      formData: {
        time: '',
        date: '',
        place: '',
        content: '',
        type: '',
        title: ''
      },
      loading: false,
      status: '1',
      showEditor: true,
      showDialog: false,
      dialogMessage: ''
    }
  },
  methods: {
    onSubmit() {
        if( this.$data.formData.type == 'activity' ){
            if (this.$data.formData.place === '') {
                this.$data.showDialog = true
                this.$data.dialogMessage = '活动地点还没有填写哦'
                return;
            }
            if (this.$data.formData.content === '') {
                this.$data.showDialog = true
                this.$data.dialogMessage = '活动描述还没有填写哦'
                return;
            }
            var date = this.$data.formData.date != null ? this.$data.formData.date : ''
            var time = this.$data.formData.time != null ? this.$data.formData.time : ''
            var timestamp = date + ' ' + time;
            timestamp = timestamp.trim();
            if( timestamp === '') {
                this.$data.showDialog = true;
                this.$data.dialogMessage = '活动时间还没有选择哦'
                return;
            }
        }else{
            if (this.$data.formData.title === '') {
                this.$data.showDialog = true
                this.$data.dialogMessage = '通知标题还没有填写哦'
                return;
            }
            if (this.$data.formData.content === '') {
                this.$data.showDialog = true
                this.$data.dialogMessage = '通知详情还没有填写哦'
                return;
            }
        }
      
      this.$data.loading = true
      this.$data.status = '2'

      var promise = Api.addActivity({
        time: timestamp,
        place: this.$data.formData.place,
        content: this.$data.formData.content,
        type: this.$data.formData.type,
        title: this.$data.formData.title
      });
      promise.then(data => {
        if(data.status === 'ok') {
          this.$data.loading = false;
          this.$notify.success({
            title: '推送成功啦',
            message: '稍后大家可以在微信平台查看您发布的信息'
          })
          this.$data.status = '3'
          this.$data.showEditor = false
        } else {
          this.$data.loading = false
          this.$notify.error({
            title: '推送失败',
            message: data.message
          })
          this.$data.status = '1'
        }
      },reject => {
          this.$data.loading = false
          this.$notify.error({
            title: '推送失败',
            message: '找不到服务器菌了'
          })
          this.$data.status = '1'
      })
    }
  }
}
</script>
