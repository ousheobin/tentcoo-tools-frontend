import Mock from 'mockjs';

const mockData = Mock.mock({
  'welcome|5-50': [{
    'avatar': 'http://tools.tentcoostudio.com/avatar/guanling.png',
    'memberName': '@cname()',
    'type': '大喇叭消息',
    'content': '@csentence(1,255)'
  }],
  'weekly|10-21': [{
    'avatar': 'http://tools.tentcoostudio.com/avatar/xiaoyu.2.png',
    'membername': '赵小瑜',
    'keep': '@csentence(1,255)',
    'problem': '@csentence(1,255)',
    'todo': '@csentence(1,255)',
    'comment': '@csentence(1,255)',
  }],
  'attendance|10-30': [{
    'memberName': '陈佳佳',
    'weekName': '2015-16学年 第一学期 @integer(1,21)周',
    'time': '@integer(1,70)',
    'averageTime': '@integer(1,70)',
  }],
  'birthday|10-30': [{
    'memberName': '郑二方',
    'birthday': '@date(yyyy-mm-dd)',
    'nextBirthday': '@date(yyyy-mm-dd)',
    'avatar': 'http://tools.tentcoostudio.com/avatar/kunli.png',
    'countDown': '@integer(1,365)',
  }]
});

export default {
  init() {
    console.log('正在使用Mock数据模拟接口！')
  },
  mockData
}
