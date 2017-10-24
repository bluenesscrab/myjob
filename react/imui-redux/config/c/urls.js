//旧版私信
export const tooldversion = `${LT.Env.cRoot}message/#c:1:/message/getcmsg/`;

/**
 * 分页查询联系人
 * 接口:/msg/getcontactlist.json?curPage=0&pageSize=20
 * {
 *  "data": [
 *    {
 *    "contactId": 1,
 *    "contactStatus": true,
 *    "lastMessageId": 1761,
 *    "lastEmMessageId": "230627299823715384",
 *    "lastMessageContent": "{\"bodies\":[{\"msg\":\"我们已经成为好友，欢迎随时与我交流~\",\"type\":\"txt\"}]}",
 *    "lastMessageTimestamp": 1471261902679,
 *    "resDelegation": false,
 *    "userId": 1561811,
 *    "oppositeUserId": 8046727,
 *    "oppositeUserKind": "0",
 *    "oppositeUserPhoto": "574e481045cec1ba457c5be202c.png",
 *    "oppositeUserName": "测试",
 *    "oppositeUserName": "测试",
 *    "oppositeUserTitle": "测试工程师",
 *    "oppositeUserCompany": "陌陌",
 *    "oppositeEmUserName": "4779586560c2695791022"
 *     }
 *   ],
 *   flag: 1,
 *   msg: ''
 * }
 */
export const getcontactlist = `${LT.Env.cRoot}msg/getcontactlist.json`;

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
export const getsysmsglist4im = `${LT.Env.cRoot}message/getsysmsglist4im.json`;
/**
   * 删除通知
*/
export const delsysmessagebyid = `${LT.Env.cRoot}message/delsysmessagebyid.json`;
/**
   * 已读通知
*/
export const readedmessagebyid = `${LT.Env.cRoot}message/readedmessagebyid.json`;
/**
   * https://sns.liepin.com/connection/count.json
   * {
   * "data": {
   *     "friendCnt": 18,
   *     "followHCnt": 3,
   *     "followingHCnt": 111,
   *     "followBCnt": 23,
   *     "myFansCnt": 0,
   *     "myFollowCnt": 0
   *   }, "flag": 1
   * }
   */

export const snsList = `${LT.Env.snsRoot}connection/count.json`;
  /**
   * 入参：
   * {pageSize, msgid, oppositeEmUserName}
   * 历史消息记录（按id查询）
   * {
   *   "data": false,
   *   "flag": 1
   * }
   */
export const getmsgdialoglistbymsgid = `${LT.Env.cRoot}msg/getmsgdialoglistbymsgid.json`;

  /*
   * 查询环信id查询一个联系人信息
   *
   * https://c.liepin.com/msg/getonecontact.json?emUsername=6931678922p1874489199
   * {
   *  "data": {
   *    "userId": 1637591,
   *    "photo": "5680a94d45cec209b34315ee02c.jpg",
   *    "oppositeUserKind": "0",
   *    "oppositeUserPhoto": "5680a94d45cec209b34315ee02c.jpg",
   *    "oppositeUserName": "邓芳",
   *    "oppositeUserName": "邓芳",
   *    "oppositeUserTitle": "java",
   *    "oppositeUserCompany": "百度"
   *  },
   *  "flag": 1
   * }
   */
export const getonecontact = `${LT.Env.cRoot}msg/getonecontact.json`;
/*删除联系人*/
export const removecontact = `${LT.Env.cRoot}msg/removecontact.json`;
  /* 判断是否能发送 错误会报异常
   * http://c.liepin.com/msg/cansend.json?oppositeUserId=9000913
   * {
   *   "data": { },
   *   "flag": 1
   * }
   */
export const cansend = `${LT.Env.cRoot}msg/cansend.json`;
/**
  * 设置打招呼语
  * https://c.liepin.com/msg/save-chat-setting.json
  */
export const saveChatSetting = `${LT.Env.cRoot}msg/save-chat-setting.json`;
/**
 * 获取打招呼列表
 * https://c.liepin.com/msg/get-hi-list.json
 */
export const getHiList = `${LT.Env.cRoot}msg/get-hi-list.json`;
export const canAssessH = `${LT.Env.cRoot}msg/can-assess-h.json`;
  /**
   * 猎头评价
   * https://c.liepin.com/msg/assess-h.json
   * 参数: userhId, messageId, level: 1-不专业 2-需提升 3-一般般 4-较专业 5-很专业
   */
export const assessH = `${LT.Env.cRoot}msg/assess-h.json`;
export const canSendExtType = `${LT.Env.cRoot}msg/canSendExtType.json`;
/**
 * 记录发送职位卡片消息
 * http://c.liepin.com/msg/recordSendJobCard.json
 * jobKind, jobId
 */
export const recordSendJobCard = `${LT.Env.cRoot}msg/recordSendJobCard.json`;
/**
 * 是否屏蔽
 * https://c.liepin.com/user/info-between-users.json
 */
export const infoBetweenUsers = `${LT.Env.cRoot}user/info-between-users.json`;
/**
 * 屏蔽 c-c
 * https://c.liepin.com/user/add-c-bl.json
 */
export const addCBl = `${LT.Env.cRoot}user/add-c-bl.json`;
/**
 * 解除屏蔽 c-c
 * https://c.liepin.com/user/remove-c-bl.json
 */
export const removeCBl = `${LT.Env.cRoot}user/remove-c-bl.json`;
/**
 * 屏蔽 c-h
 * https://c.liepin.com/user/adduserhblacklist.json
 */
export const aadduserhblacklist = `${LT.Env.cRoot}user/adduserhblacklist.json`;
/**
 * 解除屏蔽 c-h
 * https://c.liepin.com/user/removeuserhblacklist.json
 */
export const removeuserhblacklist = `${LT.Env.cRoot}user/removeuserhblacklist.json`;
/**
 * 举报
 * https://c.liepin.com/msg/report-chat.json
 */
export const reportChat = `${LT.Env.cRoot}msg/report-chat.json`;
//接收到的职位卡片的状态
export const jobstatus = `${LT.Env.cRoot}job/feedback/recommandhjob/status.json`;
/**
  * 拒绝推荐职位
  * https://c.liepin.com/job/feedback/refuse.json
  * 参数: job_id: 职位ID,fb:code拒绝原因
*/
export const jobrefuse = `${LT.Env.cRoot}job/feedback/refuse.json`;