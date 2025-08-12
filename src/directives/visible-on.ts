import type { DirectiveBinding } from 'vue';
import { getMediaQuery, defaultBreakpoints, QueryType, Breakpoints } from '../utils/breakpoints';

function updateVisibility(el: HTMLElement, query: QueryType, breakpoints?: Breakpoints) {
  if (typeof window === 'undefined') {
    el.style.display = '';
    return;
  }
  
  const mq = getMediaQuery(query, breakpoints);
  if (!mq) {
    el.style.display = '';
    return;
  }
  
  try {
    const mql = window.matchMedia(mq);
    if (mql && typeof mql.matches === 'boolean') {
      el.style.display = mql.matches ? '' : 'none';
      // Store for cleanup
      (el as any)._vVisibleOnMql = mql;
      (el as any)._vVisibleOnHandler = (e: MediaQueryListEvent) => {
        el.style.display = e.matches ? '' : 'none';
      };
      mql.addEventListener('change', (el as any)._vVisibleOnHandler);
    } else {
      // Fallback for SSR or when matchMedia is not available
      el.style.display = '';
    }
  } catch (error) {
    // Fallback for SSR or when matchMedia fails
    el.style.display = '';
  }
}

function cleanup(el: HTMLElement) {
  const mql = (el as any)._vVisibleOnMql;
  const handler = (el as any)._vVisibleOnHandler;
  if (mql && handler) {
    mql.removeEventListener('change', handler);
  }
  delete (el as any)._vVisibleOnMql;
  delete (el as any)._vVisibleOnHandler;
}

export const vVisibleOn = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string | { size: QueryType; breakpoints?: Breakpoints }>) {
    const value = binding.value;
    let size: QueryType;
    let breakpoints: Breakpoints | undefined;
    if (typeof value === 'string') {
      size = value as QueryType;
    } else if (typeof value === 'object' && value.size) {
      size = value.size;
      breakpoints = value.breakpoints;
    } else {
      return;
    }
    updateVisibility(el, size, breakpoints);
  },
  updated(el: HTMLElement, binding: DirectiveBinding<string | { size: QueryType; breakpoints?: Breakpoints }>) {
    cleanup(el);
    const value = binding.value;
    let size: QueryType;
    let breakpoints: Breakpoints | undefined;
    if (typeof value === 'string') {
      size = value as QueryType;
    } else if (typeof value === 'object' && value.size) {
      size = value.size;
      breakpoints = value.breakpoints;
    } else {
      return;
    }
    updateVisibility(el, size, breakpoints);
  },
  unmounted(el: HTMLElement) {
    cleanup(el);
  },
};
