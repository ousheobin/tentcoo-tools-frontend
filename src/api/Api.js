import $ from 'jquery'
import Promise from 'bluebird'
// import MockData from '../../mock/MockData'

export default {
  getWelcomePageData: function () {
    return new Promise(function (resolve, reject) {
      $.ajax({
        'url': 'api/get_welcome_page',
        method: 'POST',
        success: function (data) {
          resolve(data);
        },
        error: function () {
          reject();
        }
      })
    })
  },
  getWeeklyList: function () {
    return new Promise(function (resolve, reject) {
      $.ajax({
        'url': 'api/get_weekly_list',
        method: 'POST',
        success: function (data) {
          resolve(data);
        },
        error: function () {
          reject();
        }
      })
    })
  },
  getAttendance: function () {
    return new Promise(function (resolve, reject) {
      $.ajax({
        'url': 'api/get_attendance',
        method: 'POST',
        success: function (data) {
          resolve(data);
        },
        error: function () {
          reject();
        }
      })
    })
  }
  ,
  getBirthdayList: function () {
    return new Promise(function (resolve, reject) {
      $.ajax({
        'url': 'api/get_birthday_list',
        method: 'POST',
        success: function (data) {
          resolve(data);
        },
        error: function () {
          reject();
        }
      })
    })
  },
  addActivity: function (formData) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        'url': 'api/add_activity',
        method: 'POST',
        data: formData,
        success: function (data) {
          resolve(data);
        },
        error: function () {
          reject();
        }
      })
    })
  },
  addWeekly: function(formData){
    return new Promise(function (resolve, reject) {
      $.ajax({
        'url': 'api/add_weekly',
        method: 'POST',
        data: formData,
        success: function (data) {
          resolve(data);
        },
        error: function () {
          reject();
        }
      })
    })
  },
  getUserInfo: function(){
    return new Promise(function (resolve, reject) {
      $.ajax({
        'url': 'api/get_user_info',
        method: 'POST',
        success: function (data) {
          resolve(data);
        },
        error: function () {
          reject();
        }
      })
    })
  }
}
