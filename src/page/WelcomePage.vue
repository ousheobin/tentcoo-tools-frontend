<template>
  <div v-loading="loading" element-loading-text="正在载入，请稍等">
    <h1 style="font-size:20px;">消息流 Flow</h1>
    <el-card v-for="item in datalist" :key="item" style="margin-bottom:10px;" class="index-flow-box">
      <div>
        <div class="title">
          <img :src="item.avatar">
          <p class="member-name">{{item.memberName }}</p>
          <p class="subtitle"> {{item.type}} </p>
        </div>
        <div class="content" v-html="item.content"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Api from '@/api/Api';

export default {
  name: 'WelcomePage',
  data: function () {
    var promise = Api.getWelcomePageData();
    promise.then(data => {
      if( data.status == 'ok' ){
        this.$data.datalist = data.infoFlow;
      }else{
        this.$message({
          message: '消息流获取出错了，请刷新页面重试或联系后端的小伙伴',
          type: 'error'
        });
      }
      this.$data.loading = false;
    }, reject => {
      // 处理Reject的情况
      this.$message({
        message: '服务器在茫茫人海中消失了，稍后重新再试下吧',
        type: 'error'
      });
      this.$data.loading = false;
    });
    return {
      datalist: [],
      loading: true
    }
  }
}
</script>
