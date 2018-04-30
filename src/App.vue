<template>
  <div id="app">
    <el-container>
      <el-header
        height="60px"
        :style="{ 'background-color': colors.primary }"
        class="header"
        >
        <div class="brand">
          Tentcoo Tools 工作室内部工作平台
        </div>
        <ul class="head-nav">
          <li class="link-item"><a href="logout">退出系统</a></li>
        </ul>
        <div class="welcome"><img :src="userinfo.avatar" class="avatar" v-if="showAvatar"> {{userinfo.memberName}}</div>
      </el-header>
      <el-container>
        <el-aside class="tools-aslide">
          <el-menu
            :default-active="$route.path"
            :defaultOpeneds=common.openid
            :router=common.route
            class="el-menu-vertical-demo">
            <el-menu-item index="/">
              <i class="fa fa-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="fa fa-paper-plane"></i>
                <span>工作室内部功能</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="weekly">工作周报 Weekly</el-menu-item>
                <el-menu-item index="attendance">出勤情况 Attendance</el-menu-item>
                <el-menu-item index="birthday">生日提醒 Birthday</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="fa fa-rocket"></i>
                <span>服务链接</span>
              </template>
              <el-menu-item-group>
                <el-menu-item @click="clickExMail" index="exmail">企业邮箱 Email</el-menu-item>
                <el-menu-item @click="clickTower" index="tower">旧工作平台 Tower</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4" v-if="userinfo.isAdmin">
              <template slot="title">
                <i class="fa fa-cog"></i>
                <span>系统管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="mgr-notice">发布全体通知</el-menu-item>
                <el-menu-item index="mgr-attendance">导入出勤情况</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main class="main-container">
            <router-view/>
          </el-main>
          <el-footer :style="{'line-height': '60px' , 'vertical-align':'middle' }">
            <p class="copyright">All rights reserves &copy; Tentcoo Studio 2013-2018</p>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Api from '@/api/Api';
export default {
  name: 'App',
  mounted: function(){
    console.log('App Init Mounted')
    var promise = Api.getUserInfo();
    promise.then(data => {
      this.$data.userinfo.memberName = data.memberName
      this.$data.userinfo.isAdmin = data.isAdmin
      this.$data.userinfo.emailAddress = data.emailAddress   
      this.$data.userinfo.avatar = data.avatar
      this.$data.showAvatar = true
    },reject => {
      that.$message({
        message: '无法获取服务器端的状态，请刷新重试或者找后端的小伙伴',
        type: 'error'
      });
    })
  },
  data () {
    return {
      common:{
        openid: ['1','2','3','4'],
        route: true
      },
      colors: {
        primary: '#409EFF'
      },
      userinfo: {
        memberName: '',
        isAdmin: true,
        emailAddress: '',
        avatar: ''
      },
      showAvatar:false
    }
  },
  methods:{
    clickTower: function(){
      window.location.href = 'https://tower.im';
    },
    clickExMail: function(){
      console.log('触发邮箱自动跳转'+this.$data.userinfo.emailAddress)
      window.location.href = this.$data.userinfo.emailAddress;
    }
  }
}
</script>
