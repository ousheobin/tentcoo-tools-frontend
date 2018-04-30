<template>
    <div v-loading="loading"  element-loading-text="正在加载，请稍等">
        <div id="my-attendance-chart" style="height:400px;"></div>
        <el-table
            :data="tableData"
            :row-class-name="tableRowClassName"
            style="width: 100%">
            <el-table-column
            prop="memberName"
            label="姓名">
            </el-table-column>
            <el-table-column
            prop="weekName"
            label="周数">
            </el-table-column>
            <el-table-column
            sortable
            prop="time"
            label="该周出勤">
            </el-table-column>
            <el-table-column
            sortable
            prop="averageTime"
            label="全体平均出勤">
            </el-table-column>
            <el-table-column
            prop="rank"
            label="考勤评价">
            </el-table-column>
        </el-table>
    </div>
</template>

<style>
  .el-table .grade-excellent-row {
    background: #d7ebce;
  }

  .el-table .grade-good-row {
    background: #a6d3df;
  }

  .el-table .grade-average-row {
    background: #f5e3c2;
  }

  .el-table .grade-fail-row {
    background: #ffbebe;
  }
</style>

<script>
import Api from '@/api/Api'
export default {
  methods: {
    tableRowClassName: function ({row, rowIndex}) {
      if (row.rank === '优秀') {
        return 'grade-excellent-row'
      } else if (row.rank === '良好') {
        return 'grade-good-row'
      } else if (row.rank === '合格') {
        return 'grade-average-row'
      } else if (row.rank === '时间不足') {
        return 'grade-fail-row'
      }
      return ''
    }
  },
  data: function () {
    return {
      tableData: [],
      loading: true
    }
  },
  mounted(){
     var promise = Api.getAttendance()
    promise.then(data => {
      this.$data.loading = false;
      if(data.status != 'ok'){
        this.$message({
          message: '服务器出现八阿哥啦，稍后再试试或者找后端的小伙伴看看哦',
          type: 'warning'
        });
        return false
      }
      var object = document.getElementById('my-attendance-chart')
      var attendanceChart = this.$echarts.init(object)
      var chartData = {
        memberName: data.name,
        weeks: [],
        myAttendance: [],
        avgAttendance: []
      }
      var attendanceList = data.attendanceList
      if(attendanceList.length > 0){
        for (var index = attendanceList.length - 1; index >= 0 ; index --) {
          var row = attendanceList[index];
          chartData.weeks.push(row.weekName)
          chartData.myAttendance.push(row.time)
          chartData.avgAttendance.push(row.averageTime)
          if (row.time < 30) {
            row.rank = '时间不足'
          } else if (row.time >= 30 && row.time < 40) {
            row.rank = '合格'
          } else if (row.time >= 40 && row.time < 50) {
            row.rank = '良好'
          } else {
            row.rank = '优秀'
          }
        }
      }
      this.$data.tableData = attendanceList
      attendanceChart.setOption({
        title: {
          text: chartData.memberName + '童鞋的出勤记录'
        },
        width: '80%',
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['我的出勤时间', '大家的平均出勤时间']
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: chartData.weeks
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} 小时'
          }
        },
        series: [
          {
            name: '我的出勤时间',
            type: 'line',
            data: chartData.myAttendance,
            smooth: true,
            markPoint: {
              data: [
                {type: 'max', name: '最勤劳的一周'},
                {type: 'min', name: '最悠闲的一周'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          },
          {
            name: '大家的平均出勤时间',
            type: 'line',
            data: chartData.avgAttendance,
            smooth: true,
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          }
        ]
      })
    }, reject => {
      // 处理Reject的情况
      this.$message({
        message: '无法获取你的出勤记录哦，稍后重新再试下吧',
        type: 'error'
      });
      this.$data.loading = false;
    })
  }
}
</script>
