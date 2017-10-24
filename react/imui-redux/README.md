@liepin/imui
===

猎聘职聊UI模块。

## 说明

必须与@liepin/imcore共同使用。基于React.js+Redux.js开发。

## 安装
```
cnpm install @liepin/imui
```

## 使用方法
基于@liepin/imcore，需要将imcore初始化后引入Root组件。

```
import React from 'react';
import ReactDOM from 'react-dom';
import ImCore from '@liepin/imcore';
import Root from '@liepin/imui';

let imcore = ImCore({
      emUserName: emUserName, 
      token: token,
      userInfo: userInfo,
      fillInfo: fillInfo,
      env: 'c', //'b', 'h',
      debug: true, //线上置为false，开发环境可以置为true，便于调试，默认false
      inited: function(){
         //初始化完毕，渲染UI
        ReactDOM.render( 
          <Root 
          imcore={this} 
          toggleUnRead={(unread)=>{toggleUnRead(unread)}}
          openPanel={(callback)=>openPanel(callback)}
          wrap={document.getElementById('im-root')}
          componentDidMounted={(props)=>componentDidMounted(props)}
          msgcard={MsgCards}
          />,
          document.getElementById('im-root')
        );
      }
}); 
```

##Root组件
Root组件提供了一些props用于外部引用职聊内部信息或触发职聊内部的动作。

| props名        | 含义           | 
| ------------- |:-------------:|
| toggleUnRead  | 传入改变header里的红点的方法 |
| openPanel      | 传入触发打开职聊面板的方法    |
| onSelectContact | 打开聊天窗口时触发的事件回调| 
| wrap | 职聊面板的父级dom|
| msgcard | 各端自定义消息面板| 
| componentDidMounted | 参数为{imcore, actions, dispatch}，可以由此获取imui内部的各种数据，并且操控内部方法 | 

##聊天窗口信息组成部分
包括了msgList(窗口打开后收发的实时消息，在reducer/panel.js中定义)

initialServerHistory(窗口打开时请求的服务器历史消息+部分本地缓存消息，在reducer/history.js重定义)

注意操作窗口消息卡片时可能需要同时更新这两个list。


##各页面间数据同步方法
不是所有store中的数据都需要进行同步，只需要同步聊天窗口内的消息和屏蔽、关注状态以及红点状态等即可。
对于不需要同步的信息，通过传统dispatch action即可触发本页面reducer的改变，即：

```
dispatch({
    type: ActionType.GET_CONTACTS_SUCC,
    payload: {contacts: newContacts}
});


```

对于需要同步的信息，通过引入utils.js中的publish方法来进行同步，即：


```
publish(imcore, dispatch, {
    type: ActionType.UPDATE_MSGLIST,
    payload: updateFunc(getState().panel.msgList)
});
    
```


##重要actions

###panle.js
| action名       | 含义           | 
| ------------- |:-------------:|
| selectContact  | 选择聊天对象，即打开聊天窗口 |  
| unselectActiveContact | 取消选择聊天对象，即关闭聊天窗口     |
| updateMsgList | 更新msgList| 
| openPanel | 打开panel| 

###message.js
| action名       | 含义           | 
| ------------- |:-------------:|
| sendMsg | 登录环信| 


###history.js
| action名       | 含义           | 
| ------------- |:-------------:|
| updateInitialServerHistory | 更新initialServerHistory| 

##公共组件
###Atlog，InputTlog
将a标签 ， Input封装成支持tlog的高阶组件，用法：

```
<Atlog onClick={()=>{console.log('ddd')}} pushStr="1234">点我</Atlog>

```

###Dialog

支持在职聊面板的不同部分弹出对话框

```

//在Panel部分弹出对话框和遮罩
<PanelDialog props={...}/>
//或
<Dialog parent="panel">


//在Panel右侧列表部分（除左侧tab部分外）弹出对话框和遮罩
<MainDialog props={...}/>
//或
<Dialog parent="main">


//在聊天面板右侧列表部分（除左侧tab部分外）弹出对话框和遮罩
<ChatDialog props={...}/>
//或
<Dialog parent="chat">

```

提供Api形式的基本模式框，直接可以使用，Dialog.alert, Dialog.confirm, Dialog.info, Dialog.closeAllConfirm(关闭全部模式框)

```
import Dialog from '@liepin/imui/common/Dialog';

Dialog.alert({
  parent: 'chat',
  width: 300,
  content: <p>您的简历尚未完善，为了保证双方沟通效率，请先<a href="https://c.liepin.com/resume/getdefaultresume/" target="_blank">完善您的简历</a></p>
});

```


###Toast 

仅存在于聊天窗口内,默认3秒消失，可以配置

```
dispatch(toastActions.openToast({text:'委托成功！'}));

```

###imgPreview
图片预览方法

```
<a href="javascript:;" onClick={()=>{imgPreview({src:message.data})}} className="preview-image">
  <img src={message.data} onLoad={()=>scrollToBottom()}/>
</a>

```
