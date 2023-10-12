import SvgIcon from '@/components/SvgIcon/index.vue';
import 'virtual:svg-icons-register';

export function loadSvg(app) {
    app.component('SvgIcon', SvgIcon);
}
