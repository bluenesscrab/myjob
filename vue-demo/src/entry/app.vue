<template>
  <div>
    <h2>全局规范 <small>文本</small></h2><hr>
    <pre>
      font: 14px/1.8 "microsoft yahei", Arial, sans-serif;     color:#33444c;
      .relative 相对定位
      .absolute 绝对定位
      .float-left 左浮动
      .float-right 右浮动

      .text-left 左对齐
      .text-right 右对齐
      .text-center 左右居中对齐
      .text-middle 上下居中对齐

      .hide  隐藏
      .required <span class="required">性别</span>
    </pre>

    <h2>全局组件</h2><hr>

    <!-- <pre>
    Loading:
      Loading: <Loading></Loading>
      Loading animate="true": <Loading animate="true"></Loading>
    </pre>
    -->

    <pre>
    Icons: color = ['default','muted','success','warning','error','disabled']
      <Icons type="account" color="default"/>
      <Icons type="account" color="muted"/>
      <Icons type="account" color="success"/>
      <Icons type="account" color="warning"/>
      <Icons type="account" color="error"/>
      <Icons type="account" color="disabled"/>
      ————————————————————————————————————————————————————————
      <Icons type="account"/> -> ＜Icons type="account"/＞
      <Icons type="branches" /> -> ＜Icons type="branches" /＞
      <Icons type="briefcase" /> -> ＜Icons type="briefcase" /＞
      <Icons type="company" /> -> ＜Icons type="company" /＞
      <Icons type="contract" /> -> ＜Icons type="contract" /＞
      <Icons type="doctor" /> -> ＜Icons type="doctor" /＞
      <Icons type="downarrow" /> -> ＜Icons type="downarrow" /＞
      <Icons type="dropout" /> -> ＜Icons type="dropout" /＞
      <Icons type="fold" /> -> ＜Icons type="fold" /＞
      <Icons type="mark" /> -> ＜Icons type="mark" /＞
      <Icons type="message" /> -> ＜Icons type="message" /＞
      <Icons type="mail" /> -> ＜Icons type="mail" /＞
      <Icons type="message-fill" /> -> ＜Icons type="message-fill" /＞
      <Icons type="resume-buy" /> -> ＜Icons type="resume-buy" /＞
      <Icons type="phone" /> -> ＜Icons type="phone" /＞
      <Icons type="prompt-close" /> -> ＜Icons type="prompt-close" /＞
      <Icons type="prompt-correct" /> -> ＜Icons type="prompt-correct" /＞
      <Icons type="prompt-failure" /> -> ＜Icons type="prompt-failure" /＞
      <Icons type="prompt-question" /> -> ＜Icons type="prompt-question" /＞
      <Icons type="prompt-warning" /> -> ＜Icons type="prompt-warning" /＞
      <Icons type="resources" /> -> ＜Icons type="resources" /＞
      <Icons type="save" /> -> ＜Icons type="save" /＞
      <Icons type="setting" /> -> ＜Icons type="setting" /＞
      <Icons type="subaccount" /> -> ＜Icons type="subaccount" /＞
      <Icons type="time" /> -> ＜Icons type="time" /＞
      <Icons type="affixation" /> -> ＜Icons type="affixation" /＞
      <Icons type="user" /> -> ＜Icons type="user" /＞
      <Icons type="self" /> -> ＜Icons type="self" /＞
      <Icons type="certification" /> -> ＜Icons type="certification" /＞
      <Icons type="skill" /> -> ＜Icons type="skill" /＞
      <Icons type="project" /> -> ＜Icons type="project" /＞
      <Icons type="language" /> -> ＜Icons type="language" /＞
      <Icons type="favorite" /> -> ＜Icons type="favorite" /＞
      <Icons type="favorite-cancel" /> -> ＜Icons type="favorite-cancel" /＞
      <Icons type="relation" /> -> ＜Icons type="relation" /＞
      <Icons type="relation-cancel" /> -> ＜Icons type="relation-cancel" /＞
      <Icons type="print" /> -> ＜Icons type="print" /＞
      <Icons type="report" /> -> ＜Icons type="report" /＞
      <Icons type="export" /> -> ＜Icons type="export" /＞
      <Icons type="forwarding" /> -> ＜Icons type="forwarding" /＞
      <Icons type="inttention" /> -> ＜Icons type="inttention" /＞
      <Icons type="similar" /> -> ＜Icons type="similar" /＞
      <Icons type="trash" /> -> ＜Icons type="trash" /＞
      <Icons type="backtop" /> -> ＜Icons type="backtop" /＞
      <Icons type="eyes" /> -> ＜Icons type="eyes" /＞
      <Icons type="right" /> -> ＜Icons type="right" /＞
      <Icons type="suggset-company" /> -> ＜Icons type="suggset-company" /＞
      <Icons type="suggset-resume" /> -> ＜Icons type="suggset-resume" /＞
      <Icons type="suggset-major" /> -> ＜Icons type="suggset-major" /＞
      <Icons type="suggset-school" /> -> ＜Icons type="suggset-school" /＞
      <Icons type="freeaccount" /> -> ＜Icons type="freeaccount" /＞

    </pre>


    <pre>
    Labels: color = ['gray','blue','orange','yellow','red','green','disabled']
      ————————————————————————————————————————————————————————
      <span class="labels labels-gray">灰色</span>
      <span class="labels labels-blue">蓝色</span>
      <span class="labels labels-orange">橙色</span>
      <span class="labels labels-yellow">黄色</span>
      <span class="labels labels-red">红色</span>
      <span class="labels labels-green">绿色</span>
      <span class="labels labels-disabled">禁用</span>
    </pre>

    <pre>
    Button:
      type = ['primary', 'warning' ,'success' ,'error' ]
      size = ['small','large']
      ————————————————————————————————————————————————————————
      <Button type="primary" >提交</Button> <Button type="primary" size="small">提交</Button> <Button type="primary" disabled>提交</Button> <Button type="primary" size="large">提交</Button>

      <Button type="warning" >提交</Button> <Button type="warning" size="small">提交</Button> <Button type="warning" disabled>提交</Button> <Button type="warning" size="large">提交</Button>

      <Button type="success" >提交</Button> <Button type="success" size="small">提交</Button> <Button type="success" disabled>提交</Button> <Button type="success" size="large">提交</Button>

      <Button type="error" >提交</Button> <Button type="error" size="small">提交</Button> <Button type="error" disabled>提交</Button> <Button type="error" size="large">提交</Button>

    </pre>
 

  </div>
</template>

<script>

export default {
  props:{

  },
  methods: {
    fn:() =>{
      console.log('this');
    }
  }
}
</script>
<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>