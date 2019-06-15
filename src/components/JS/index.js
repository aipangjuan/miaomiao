import Vue from 'vue'
import MessageBox from './MessageBox'

export var messageBox = (function () {
  var defaults = {
    title: '',
    content: '',
    cancel: '',
    ok: '',
    handleCancel: null,
    handleOk: null
  }
  var MyComponent = Vue.extend(MessageBox)//组件构造器
  return function (opts) {
    for (var attr in opts) {
      defaults[attr] = opts[attr]
    }
    var vm = new MyComponent({//注册全局组件
      el: document.createElement('div'),
      data: {
        title: defaults.title,
        content: defaults.content,
        cancel: defaults.cancel,
        ok: defaults.ok,
      },
      methods: {
        handleCancel() {
          // console.log(defaults.handleCancel);
          defaults.handleCancel && defaults.handleCancel.call(this)
          //defaults.handleCancel存在的前提下 
          //defaults.handleCancel.call(this) 拿到vm这个对象
          document.body.removeChild(vm.$el)
        },
        handleOk() {
          defaults.handleOk && defaults.handleOk.call(this)
          document.body.removeChild(vm.$el)
        }
      }
    })
    document.body.appendChild(vm.$el)
  }
})()