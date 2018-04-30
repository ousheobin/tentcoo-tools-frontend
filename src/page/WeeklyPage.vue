<template>
  <div class="weekly" v-loading="loading" element-loading-text="正在努力地载入周报，不要离开哦">
    <div class="header">
      <div class="title">本周周报 Weekly
        <el-button type="primary" plain native-type="button" class="btn" @click="onAddButtonClick" v-if="canWrite">
          {{hints}}
        </el-button>
      </div>
    </div>
    <div class="weekly-container">
      <el-collapse v-model="activeNames" :accordion="true">
        <el-collapse-item v-for="item in datalist" :key="item" @name="item.name">
          <template slot="title">
            <img :src="item.avatar" class="avatar">
            <div>{{item.membername}}<span :style="{'float':'right','margin-right':'20px','color':'#979797'}">本周周报约{{item.count}}字</span></div>
          </template>
          <p class="bolder">Keep 已经完成的事情：</p>
          <p class="detail" v-html="item.keep"></p>
          <p class="bolder">Problem 遇到的问题</p>
          <p class="detail" v-html="item.problem"></p>
          <p class="bolder">Todo 未来的计划</p>
          <p class="detail" v-html="item.todo"></p>
          <p class="bolder">Comment 评论</p>
          <p class="detail" v-html="item.comment"></p>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import Api from '@/api/Api'

export default {
  name: 'WeeklyPage',
  methods: {
    onAddButtonClick() {
      this.$router.push('/add-weekly')
    }
  },
  data: function () {
    var promise = Api.getWeeklyList()
    promise.then(data => {
      var datalist = data.weeklyList
      for (var index = 0; index < datalist.length; index++) {
        var obj = datalist[index]
        obj.name = '' + (index + 1)
      }
      this.$data.datalist = datalist
      this.$data.loading = false
      this.$data.hints = data.hints
      this.$data.canWrite = data.canWrite
    },reject => {
      this.$message({
        message: '震惊! 周报居然获取失败了，稍后重新再试下吧',
        type: 'error'
      });
      this.$data.loading = false;
    })
    return {
      datalist: [],
      canWrite: false,
      hints: '撰写周报',
      loading: true,
      activeNames: ['1']
    }
  }
}
</script>
