import { loadElementPlus } from './element-plus';
import { loadElementPlusIcon } from './element-plus-icon';
import { loadFontawesomeIcon } from './fontawesome';

export function loadPlugins(app) {
    loadElementPlus(app);
    loadElementPlusIcon(app);
    loadFontawesomeIcon(app)
}
