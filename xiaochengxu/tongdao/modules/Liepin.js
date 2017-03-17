export default class Liepin {
  constructor() {
    this.toast = wx;
  }

  toastProxy(toast) {
    this.toast = toast || wx;
    return this.toast;
  }
  
}