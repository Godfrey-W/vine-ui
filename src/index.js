/* Automatically generated by './build/bin/build-entry.js' */
import Collapse from '../packages/collapse/index.js';
import CollapsePanel from '../packages/collapse-panel/index.js';
import Countdown from '../packages/countdown/index.js';
import Rollnotice from '../packages/rollnotice/index.js';
import RollnoticeItem from '../packages/rollnotice-item/index.js';
import Sendcode from '../packages/sendcode/index.js';
// import locale from 'vine-ui/src/locale';
import CollapseTransition from 'vine-ui/src/transitions/collapse-transition';
const components = [
  Collapse,
  CollapsePanel,
  Countdown,
  Rollnotice,
  RollnoticeItem,
  Sendcode,
  CollapseTransition
];
const install = function(Vue, opts = {}) {
  // locale.use(opts.locale);
  // locale.i18n(opts.i18n);
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  // Vue.use(Loading.directive);
  /**
  Vue.prototype.$ELEMENT = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  };
  **/
  // Vue.prototype.$loading = Loading.service;
  // Vue.prototype.$msgbox = MessageBox;
  // Vue.prototype.$alert = MessageBox.alert;
  // Vue.prototype.$confirm = MessageBox.confirm;
  // Vue.prototype.$prompt = MessageBox.prompt;
  // Vue.prototype.$notify = Notification;
  // Vue.prototype.$message = Message;
};
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default {
  version: '0.0.1',
  // locale: locale.use,
  // i18n: locale.i18n,
  install,
  CollapseTransition,
  // Loading,
  Collapse,
  CollapsePanel,
  Countdown,
  Rollnotice,
  RollnoticeItem,
  Sendcode
};
