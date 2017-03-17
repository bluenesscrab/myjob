import dict from '../modules/dictionaries/index'
import CITIES from '../modules/dictionaries/cities';
import COUNTRIES from '../modules/dictionaries/countries';
import EDULEVELS from '../modules/dictionaries/edulevels';
import INDUSTRIES from '../modules/dictionaries/industries';
import JOBS from '../modules/dictionaries/jobs';
import PROVINCES from '../modules/dictionaries/provinces';
import SCHOOLS from '../modules/dictionaries/schools';
import MAJORS from '../modules/dictionaries/majors';

class Utils {

  /** 获取城市列表 */
  getCityList() {
    return dict.getList(CITIES);
  }

  /** 根据code获取城市 */
  getCityNameByCode(code) {
    return dict.getItemNameByCode(CITIES, code);
  }

  /** 根据关键字获取城市 */
  getCitiesByKeyword(keyword) {
    return dict.getItemsByKeyword(CITIES, keyword);
  }

  /** 获取国家列表 */
  getCountryList() {
    return dict.getList(COUNTRIES);
  }

  /** 根据code获取国家 */
  getCountryNameByCode(code) {
    return dict.getItemNameByCode(COUNTRIES, code);
  }

  /** 根据关键字获取国家 */
  getCountriesByKeyword(keyword) {
    return dict.getItemsByKeyword(COUNTRIES, keyword);
  }

  /** 获取学历列表 */
  getEduLevelList() {
    return dict.getList(EDULEVELS);
  }

  /** 根据code获取学历 */
  getEduLevelNameByCode(code) {
    return dict.getItemNameByCode(EDULEVELS, code);
  }

  /** 根据关键字获取学历 */
  getEduLevelsByKeyword(keyword) {
    return dict.getItemsByKeyword(EDULEVELS, keyword);
  }

  /** 获取行业列表 */
  getIndustrylList() {
    return dict.getList(INDUSTRIES);
  }

  /** 根据code获取行业 */
  getIndustryNameByCode(code) {
    return dict.getItemNameByCode(INDUSTRIES, code);
  }

  /** 根据关键字获取行业 */
  getIndustriesByKeyword(keyword) {
    return dict.getItemsByKeyword(INDUSTRIES, keyword);
  }

  /** 获取职能列表 */
  getJoblList() {
    return dict.getList(JOBS);
  }

  /** 根据code获取职能 */
  getJobNameByCode(code) {
    return dict.getItemNameByCode(JOBS, code);
  }

  /** 根据关键字获取职能 */
  getJobsByKeyword(keyword) {
    return dict.getItemsByKeyword(JOBS, keyword);
  }

  /** 获取省份列表 */
  getProvinceList() {
    return dict.getList(PROVINCES);
  }

  /** 根据code获取省份 */
  getProvinceNameByCode(code) {
    return dict.getItemNameByCode(PROVINCES, code);
  }

  /** 根据关键字获取省份 */
  getProvincesByKeyword(keyword) {
    return dict.getItemsByKeyword(PROVINCES, keyword);
  }

  /** 获取学校列表 */
  getSchoolList() {
    return SCHOOLS;
  }

  /** 根据关键字获取学校 */
  getSchoolsByKeyword(keyword) {
    return dict.getItemsByKeywordSimple(SCHOOLS, keyword);
  }

  /** 获取专业列表 */
  getMajorList() {
    return MAJORS;
  }

  /** 根据关键字获取专业 */
  getMajorsByKeyword(keyword) {
    return dict.getItemsByKeywordSimple(MAJORS, keyword);
  }
}

export default new Utils();