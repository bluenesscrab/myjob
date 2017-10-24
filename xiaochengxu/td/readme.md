## wxa-tongdao-app 项目参考

* 组件： https://github.com/skyvow/wux
* redux： https://github.com/charleyw/wechat-weapp-redux
* labrador： https://github.com/maichong/labrador
* 字体： http://transfonter.org
* 接口：http://10.10.10.16:1396/pages/viewpage.action?pageId=19305581
        http://10.10.10.16:1396/pages/viewpage.action?pageId=12943617

* 手机号码注册：
http://10.10.10.16:1396/pages/viewpage.action?pageId=7078982
http://10.10.10.16:1396/pages/viewpage.action?pageId=10653173

## 组件

* toast

页面中，引入 Toast 组件：

```
<import src="../../components/toast.wxml" />
<template is="toast" data="{{...toast}}" />
```

在 ``onLoad`` 方法中，执行下面的方法：

```
  this.toast = new app.Liepin.Toast(this);
  // 下面语句的作用，使用 this.toast 替换 user 中的 wx.showToast
  user.toastProxy(this.toast);
```

用法：

```
  this.toast.showToast(...);  // 用法同 wx.showToast
```

* 列表组件：list-view

基本结构：
```
.list-view
  .list-item
    .list-icon
    .list-title
    .list-arrow
```
* 需要 navigator 的在 list-item 外面自行嵌套
* 需要事件的直接在 list-item 上面书写 bindtap

示例：
```
  <view class="list-view">
    <navigator url="/pages/index/index" hover-stay-time="50">
      <view class="list-item">
        <text class="list-icon iconfont icon-favor"></text>
        <text class="list-title">跳转测试</text>
        <text class="list-arrow iconfont icon-right"></text>
      </view>
    </navigator>
    <view class="list-item" hover hover-class="list-item-hover" hover-stay-time="50" bindtap="exitApp">
      <text class="list-title">切换账号</text>
      <text class="list-arrow iconfont icon-right"></text>
    </view>
  </view>
  ```