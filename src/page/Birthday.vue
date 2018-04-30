<template>
  <div v-loading="loading"  element-loading-text="正在努力地计算大家的生日" style="margin-top: 20px;">
    <el-row>
      <div v-for="birthday in birthdayList" :key="birthday" style="width:23%; padding:5px; float:left; height:210px;">
        <el-card shadow="hover">
          <div class="birthday">
            <div class="avatar-container">
              <img :src="birthday.avatar" class="avatar">
            </div>
            <p class="name">{{birthday.memberName}}</p>
            <p class="birthday">将在 {{birthday.nextBirthday}} 生日</p>
            <p class="orignBirthday">({{birthday.birthday}})</p>
          </div>
        </el-card>
      </div>
    </el-row>
    
  </div>
</template>

<script>
import Api from '@/api/Api'

export default {
  data: function () {
    var promise = Api.getBirthdayList()
    promise.then(data => {
      if(data.status === 'ok'){
        this.$data.birthdayList = data.data
      }else{
        this.$message({
          message: '好像出问题啦，刷新页面试一下',
          type: 'warning'
        });
      }
      this.$data.loading = false
    },reject => {
      // 处理Reject的情况
      this.$message({
        message: '获取不到生日信息哦，稍后重新再试下吧',
        type: 'error'
      });
      this.$data.loading = false
    })
    return {
      birthdayList: [],
      loading: true
    }
  }
}
</script>
