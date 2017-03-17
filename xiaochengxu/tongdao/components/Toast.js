import extend from '../utils/extend';

export default class Toast {

  constructor(context) {
    this.context = context;
  }

  showToast(options) {
    if(typeof options === 'string') {
      options = {
        title: options,
      };
    }
    options = extend({
      title: null,
      duration: 2000
    }, options);
    this.context.setData({
      toast: {
        title: options.title,
      },
    });
    setTimeout(() => {
      this.hide();
    }, options.duration);
  }

  hide() {
    this.context.setData({
      toast: {
        message: null,
      }
    });
  }

}