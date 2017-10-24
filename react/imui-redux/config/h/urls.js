//旧版私信
export const tooldversion = `${LT.Env.hRoot}message/showmessage/`;
export const getmsgdialoglistbymsgid = `${LT.Env.hRoot}message/getmsgdialoglistbymsgid.json`;

//联系人列表
export const getcontactlist = `${LT.Env.hRoot}message/getcontactlist.json`;
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
export const getsysmsglist4im = `${LT.Env.hRoot}message/getsysmsglist4im.json`;
/**
   * 删除通知
*/
export const delsysmessagebyid = `${LT.Env.hRoot}message/delsysmessagebyid.json`;
/**
   * 已读通知
*/
export const readedmessagebyid = `${LT.Env.hRoot}message/readedmessagebyid.json`;
export const getonecontact = `${LT.Env.hRoot}message/getonecontact.json`;
export const removecontact = `${LT.Env.hRoot}message/removecontact.json`;

export const cansend = `${LT.Env.hRoot}message/cansend.json`;
export const getonecontactotherinfo = `${LT.Env.hRoot}message/getonecontactotherinfo.json`;
//获取历史联系人列表
export const gethistorycontactlist = `${LT.Env.hRoot}message/gethistorycontactlist.json`;
//是否能操作应聘反馈
export const isapplyfeedback = `${LT.Env.hRoot}resume/isapplyfeedback.json`;
//应聘反馈置为合适／待定
export const updateappresappropriate4im = `${LT.Env.hRoot}resume/updateappresappropriate4im.json`;
//是否已经索要过简历名片
export const hasaskedresume = `${LT.Env.hRoot}message/hasaskedresume.json`;
//是否可以索要简历
export const checkaskresume = `${LT.Env.hRoot}message/checkaskresume.json`;
//索要简历成功，通知后端
export const askresume = `${LT.Env.hRoot}message/askresume.json`;
