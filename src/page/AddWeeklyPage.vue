<template>
  <el-form ref="form" :model="weekly" label-width="80px" label-position="top" v-loading="loading" element-loading-text="正在提交，请稍等">
    <h1>添加周报</h1>
    <p :style="{'color': hintColor,'font-size':'12px'}">本周周报共 {{wordCountNumber}} 字</p>
    <el-form-item label="Keep 本周完成的事情">
      <el-input :autosize="{ minRows: 8, maxRows: 15}" type="textarea" v-model="weekly.keep" @input="countWords"> </el-input>
    </el-form-item>
    <el-form-item label="Problem 本周遇到的问题">
      <el-input :autosize="{ minRows: 8, maxRows: 15}" type="textarea" v-model="weekly.problem" @input="countWords"></el-input>
    </el-form-item>
    <el-form-item label="Todo 下周的计划">
      <el-input :autosize="{ minRows: 8, maxRows: 15}" type="textarea" v-model="weekly.todo" @input="countWords"></el-input>
    </el-form-item>
    <el-form-item label="Comment 本周的工作感想">
      <el-input :autosize="{ minRows: 8, maxRows: 15}" type="textarea" v-model="weekly.comment" @input="countWords"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" class="weekly-submit-btn">我写完啦，提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Api from '@/api/Api'

export default {
  data: function () {
    return {
      weekly: {
        keep: '',
        problem: '',
        todo: '',
        comment: ''
      },
      wordCountNumber: 0,
      hintColor: '#ff0000',
      loading: false
    }
  },
  mounted: function(){
    this.countWords();
  },
  methods: {
    onSubmit: function () {
      // if( this.$data.weekly.keep == null || this.$data.weekly.keep == ''){
      //   this.$message({
      //     message: '亲，你还没写本周完成的任务(Keep)哦',
      //     type: 'warning'
      //   });
      //   return false;
      // }
      // if( this.$data.weekly.problem == null || this.$data.weekly.problem == ''){
      //   this.$message({
      //     message: '亲，你还没写本周遇到的问题(Problem)哦',
      //     type: 'warning'
      //   });
      //   return false;
      // }
      // if( this.$data.weekly.todo == null || this.$data.weekly.todo == ''){
      //   this.$message({
      //     message: '亲，你还没写下周的工作展望(Todo)哦',
      //     type: 'warning'
      //   });
      //   return false;
      // }
      // if( this.$data.weekly.comment == null || this.$data.weekly.comment == ''){
      //   this.$message({
      //     message: '亲，你还没写本周的工作感想(Comment)哦',
      //     type: 'warning'
      //   });
      //   return false;
      // }
      this.$data.loading = true
      var promise = Api.addWeekly(this.$data.weekly)
      promise.then( data => {
        this.$data.loading = false
        if( data.status == 'ok' ){
          this.$notify.success({
            title: '提交成功啦',
            message: data.message
          })
          this.$router.push('/weekly')
        }else{
          this.$notify.error({
            title: '提交失败',
            message: data.message
          })
        }
      },reject => {
        this.$notify.error({
            title: '网络通信异常',
            message: '服务器没有响应，请重试'
        })
        this.$data.loading = false;
      })
    },
    countWords: function(){
      var size = 0;
      if( this.$data.weekly.keep != null ){
        size += this.$data.weekly.keep.trim().replace(/\s/g,'').length
      }
      if( this.$data.weekly.problem != null ){
        size += this.$data.weekly.problem.trim().replace(/\s/g,'').length
      }
      if( this.$data.weekly.todo != null ){
        size += this.$data.weekly.todo.trim().replace(/\s/g,'').length
      }
      if( this.$data.weekly.comment != null ){
        size += this.$data.weekly.comment.trim().replace(/\s/g,'').length
      }
      this.$data.wordCountNumber = size
      if(size < 200 ){
        this.$data.hintColor = '#ff0000'
      }else{
        this.$data.hintColor = '#979797'
      }
    }
  },
  
}
</script>
