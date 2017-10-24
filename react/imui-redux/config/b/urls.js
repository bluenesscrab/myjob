//旧版私信
export const tooldversion = '//lpt.liepin.com/message/showmessageindex/#c:1:/message/showecgrouplist/';
export const getcontactlist = `${LT.Env.lptRoot}msg/getcontactlist.json`;
export const getmsgdialoglistbymsgid = `${LT.Env.lptRoot}msg/getmsgdialoglistbymsgid.json`;
/**
   *
   *
   * 获取系统消息
   * unreadflag 如果查未读，传1，否则不传
   * sysMsgSearchType ：
   * ALL("000", "全部"),
   * ANNOUNCEMENT("001", "猎聘网公告"),
   * ANSWER("010", "职场问答"),
   * SYSTEMCOMMON("999","其它");
   * 传code即可，如查猎聘网公告就传001
   * curPage：当前页
   * pageSize： 页大小，默认20
   * 注：获取的这部分消息，会自动设置为已读
   * https://c.liepin.com/message/getsysmsglist4im.json?sysMsgSearchType=001&pageSize=3
   * {
   *   "data": [
   *     {
   *       "context": "系统公告",
   *       "id": 10321,
   *       "type": "0",
   *       "title": "猎聘网公告",
   *       "createtime": "20160828071056",
   *       "readFlag": "1"
   *     },
   *     ...
   *   ],
   *  "flag": 1
   * }
   */
export const getsysmsglist4im = `${LT.Env.lptRoot}message/getsysmsglist4im.json`;

/**
   * 已读通知
*/

export const readedmessagebyid = `${LT.Env.lptRoot}message/handleunreadsysmessageasread.json`;
/**
   * 删除通知
*/
export const delsysmessagebyid = `${LT.Env.lptRoot}message/delsysmessagebyid.json`;
export const getonecontact = `${LT.Env.lptRoot}msg/getonecontact.json`;
export const removecontact = `${LT.Env.lptRoot}msg/removecontact.json`;
export const cansend = `${LT.Env.lptRoot}msg/cansend.json`;
//获取历史联系人列表
export const gethistorycontactlist = `${LT.Env.lptRoot}msg/gethistorycontactlist.json`;
//获取应聘id 
export const getapplyidbyejobidandresid = `${LT.Env.lptRoot}apply/getapplyidbyejobidandresid.json`;
//应聘反馈置为合适不合适
export const batchchangeapplycategorybyapplyids = `${LT.Env.lptRoot}apply/batchchangeapplycategorybyapplyids.json`;
/*
* 获取用户是否屏蔽了信息
* rejectStatus    0:为屏蔽, 1: B屏蔽C, 2: C屏蔽B, 3: 互相屏蔽
*/
export const infoBetweenUsers = `${LT.Env.lptRoot}msg/getrejectstatus.json`;
/*
* 屏蔽
* rejectStatus    0:为屏蔽, 1: B屏蔽C, 2: C屏蔽B, 3: 互相屏蔽
*/
export const rejectreceivemsg = `${LT.Env.lptRoot}msg/rejectreceivemsg.json`;
/*
* 解除屏蔽
* rejectStatus    0:为屏蔽, 1: B屏蔽C, 2: C屏蔽B, 3: 互相屏蔽
*/
export const cancelrejectreceivemsg = `${LT.Env.lptRoot}msg/cancelrejectreceivemsg.json`;

//索要简历
export const askresume = `${LT.Env.lptRoot}msg/checkforaskresume.json`;

//索要简历按钮是否置灰  true 正常  false 置灰
export const iscanaskresume = `${LT.Env.lptRoot}msg/canaskresume.json`;

// 索要简历成功后告诉后端
export const successaskresume = `${LT.Env.lptRoot}msg/successaskresume.json`;
