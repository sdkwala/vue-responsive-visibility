import type { App, Plugin } from 'vue';
import { defaultBreakpoints, Breakpoints } from './utils/breakpoints';
import VisibleOn from './components/VisibleOn.vue';
import { vVisibleOn } from './directives/visible-on';

export interface ResponsiveVisibilityOptions {
  breakpoints?: Breakpoints;
}

let globalBreakpoints: Breakpoints = { ...defaultBreakpoints };

export function getGlobalBreakpoints() {
  return globalBreakpoints;
}

const ResponsiveVisibilityPlugin: Plugin = {
  install(app: App, options?: ResponsiveVisibilityOptions) {
    if (options?.breakpoints) {
      globalBreakpoints = { ...defaultBreakpoints, ...options.breakpoints };
    }
    app.component('VisibleOn', VisibleOn);
    app.directive('visible-on', vVisibleOn);
  },
};

export default ResponsiveVisibilityPlugin;
