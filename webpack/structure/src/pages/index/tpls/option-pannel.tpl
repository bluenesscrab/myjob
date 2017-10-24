<template name="main">
<style>
.hide {
  display: none;
}
.arrow-left,
.arrow-right {
  top: 50%;
  width: 28px;
  height: 28px;
  position: absolute;
  padding: 12px;
}
.arrow-left {
  left: 6px;
}
a.arrow-right {
  right: 6px;
}
a.arrow-left:hover,
a.arrow-right:hover {
  background-color: #ebeff4;
  border-radius: 50%;
  box-shadow: 1px 1px 2px #c8c8c8;
}
.phone-display {
  background: url(../images/tpls/weichat-phone.png) no-repeat;
  width: 248px;
  height: 466px;
  padding: 98px 12px 0;
  position: relative;
  float: left;
}
.phone-display img {
  width: 242px;
  height: 380px;
}
.company-main {
  padding-top: 10px;
  margin-left: 20px;
  float: left;
}
.company-main .company-content {
  padding-top: 30px;
}
.company-main .company-content ul.content-tab {
  margin: 10px 0 20px;
}
.company-main .company-content ul.content-tab li {
  line-height: 46px;
  float: left;
  cursor: pointer;
  background-color: #eee;
  padding: 0 42px;
  margin-right: 1px;
}
.company-main .company-content ul.content-tab li:first-child {
  border-radius: 4px 0 0 4px;
}
.company-main .company-content ul.content-tab li:last-child {
  border-radius: 0 4px 4px 0;
}
.company-main .company-content ul.content-tab li a {
  color: #57666a;
  font-size: 16px;
  text-decoration: none;
}
.company-main .company-content ul.content-tab li.active,
.company-main .company-content .welfare-tab label.active {
  background-color: #29c;
}
.company-main .company-content ul.content-tab li.active a,
.company-main .company-content .welfare-tab label.active,
.company-main .company-content .welfare-tab label.active a.close {
  color: #fff;
}
.company-main .company-content h3 {
  font-weight: normal;
  font-size: 16px;
  margin-bottom: 15px;
}
.company-main .company-content .index-content {
  margin-bottom: 30px;
  font-size: 16px;
}
.company-main .company-content .index-content textarea {
  width: 472px;
  height: 100px;
}
.company-main .company-content .welfare-tab {
  width: 508px;
  margin: 0 -4px 38px;
}
.company-main .company-content .welfare-tab label input {
  display: none;
}
.company-main .company-content .welfare-tab label,
.company-main .company-content .welfare-tab .edit-box .edit,
.company-main .company-content .welfare-tab .edit-box .editable {
  text-align: center;
  line-height: 44px;
  float: left;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #dfdfdf;
  margin: 4px;
  width: 116px;
  font-size: 16px;
  color: #29c;
  position: relative;
}
.company-main .company-content .welfare-tab .edit-box .edit {
  border: 1px solid #fff;
}
.company-main .company-content .welfare-tab .edit-box .edit input {
  width: 92px;
}
.company-main .company-content .welfare-tab .edit-box .editable {
  border: 1px dashed #29c;
  background-color: #f4f9ff;
  font-size: 40px;
}
.company-main .company-content .welfare-tab label a.close {
  position: absolute;
  line-height: 20px;
  right: 6px;
  text-decoration: none;
  top: 0;
}
.company-main .company-content .welfare-tab label a.close:hover {
  color: #00528c;
}
.company-main .company-content .job-list,
.company-main .company-content .qr-code {
  border: 1px solid #dfdfdf;
  font-size: 16px;
}
.company-main .company-content .job-list {
  padding: 10px 20px;
  height: 196px;
  overflow-y: auto;
  width: 456px;
  margin-bottom: 25px;
}
.company-main .company-content .job-list table {
  line-height: 35px;
}
.company-main .company-content .job-list table th {
  text-align: left;
}
.company-main .company-content .job-list table td {
  color: #f75f07;
}
.company-main .company-content .job-list table th label {
  color: #999;
}
.company-main .company-content .job-list table th label.check {
  color: #29c;
}
.company-main .company-content .job-list .more-job {
  margin-top: 20px;
  text-align: center;
}
.company-main .company-content .job-list .empty-job {
  padding: 68px 0 0 130px;
  position: relative;
  color: #999;
  line-height: 30px;
}
.company-main .company-content .job-list .empty-job img {
  width: 62px;
  height: 62px;
  position: absolute;
  top: 65px;
  left: 54px;
}
.company-main .company-content .qr-code {
  padding: 60px 16px;
}
.company-main .company-content .qr-code img {
  width: 140px;
  height: 140px;
  float: left;
}
.company-main .company-content .qr-code ul {
  color: #29c;
  font-size: 14px;
  line-height: 30px;
  margin: 16px 0 0 150px;
}
.company-main .company-content .qr-code ul li:before {
  width: 10px;
  height: 10px;
  content: '';
  margin-right: 10px;
  background-color: #29c;
  border-radius: 50%;
  display: inline-block;
}
</style>
<div id="$ROOT">
  <a href="javascript:;" class="arrow-left hide" data-selector="arrow"><i class="icons32 icons32-arrow-left"></i></a>
  <a href="javascript:;" class="arrow-right" data-selector="arrow"><i class="icons32 icons32-arrow-right"></i></a>
  <div class="clearfix">
    <div class="phone-display">
      <img src="../images/0.png" alt="">
    </div>
    <div class="company-main">
      <h2 class="text-center">修改手机版微站内容</h2>
      <div class="company-content">
        <ul class="clearfix content-tab">
          <li class="active" data-name="index"><a href="javascript:;">首页</a></li>
          <li data-name="welfare"><a href="javascript:;">第二页</a></li>
          <li data-name="job"><a href="javascript:;">第三页</a></li>
          <li data-name="channel"><a href="javascript:;">尾页</a></li>
        </ul>
        <div data-selector="company-details"></div>
      </div>
    </div>
  </div>
</div>
<script>
//显示页
let imgList = [require('../images/0.png'), require('../images/2.png'), require('../images/3.png'), require('../images/4.png')]; //对应h5的图片
  </script>
</template>