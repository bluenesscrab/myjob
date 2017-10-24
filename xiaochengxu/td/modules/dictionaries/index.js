class Dictionaries {
  /** 将 dictionary 转换为 array */
  toArray(DIC) {
    let ret = [];
    Object.keys(DIC).forEach(code => {
      ret.push({
        code: code,
        value: DIC[code][0],
      });
    });
    return ret;
  }

  /** 获取 dictionaries 列表 */
  getList(DIC) {
    return this.toArray(DIC);
  }

  /** 根据 code 获取元素 */
  getItemNameByCode(DIC, code) {
    let item = DIC[code];
    if(item) {
      return item[0];
    } else {
      return null;
    }
  }

  /** 根据关键字获取元素 */
  getItemsByKeyword(DIC, keyword) {
    let ret = [];
    keyword = keyword.toUpperCase();
    Object.keys(DIC).forEach(code => {
      if(DIC[code][0].indexOf(keyword) !== -1 || (DIC[code][1] && DIC[code][1].indexOf(keyword) !== -1)) {
        ret.push({
          code,
          name: DIC[code][0],
        });
      }
    });
    return ret;
  }

  /** 根据关键字获取元素-简单数组 */
  getItemsByKeywordSimple(DIC, keyword) {
    keyword = keyword.toUpperCase();
    return DIC.filter(value => value.indexOf(keyword) !== -1);
  }
}

export default new Dictionaries();