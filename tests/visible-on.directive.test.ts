import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { vVisibleOn } from '../src/directives/visible-on';

const TestComponent = {
  template: '<div v-visible-on="size">Content</div>',
  props: ['size'],
};

describe('v-visible-on', () => {
  it('shows element when matches', async () => {
    const matchMediaMock = vi.fn().mockReturnValue({ 
      matches: true, 
      addEventListener: vi.fn(), 
      removeEventListener: vi.fn() 
    });
    
    vi.stubGlobal('window', { matchMedia: matchMediaMock });
    
    const wrapper = mount(TestComponent, { 
      props: { size: 'md-up' }, 
      global: { directives: { 'visible-on': vVisibleOn } } 
    });
    
    await wrapper.vm.$nextTick();
    
    const div = wrapper.find('div');
    expect(div.element.style.display).not.toBe('none');
    vi.unstubAllGlobals();
  });

  it('hides element when does not match', async () => {
    const matchMediaMock = vi.fn().mockReturnValue({ 
      matches: false, 
      addEventListener: vi.fn(), 
      removeEventListener: vi.fn() 
    });
    
    vi.stubGlobal('window', { matchMedia: matchMediaMock });
    
    const wrapper = mount(TestComponent, { 
      props: { size: 'md-up' }, 
      global: { directives: { 'visible-on': vVisibleOn } } 
    });
    
    await wrapper.vm.$nextTick();
    
    const div = wrapper.find('div');
    expect(div.element.style.display).toBe('none');
    vi.unstubAllGlobals();
  });

  it('shows element on SSR (no window)', () => {
    // Mock window.matchMedia to return undefined for SSR
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockReturnValue(undefined as any);
    
    const wrapper = mount(TestComponent, { 
      props: { size: 'md-up' }, 
      global: { directives: { 'visible-on': vVisibleOn } } 
    });
    
    const div = wrapper.find('div');
    expect(div.element.style.display).not.toBe('none');
    
    // Restore original matchMedia
    window.matchMedia = originalMatchMedia;
  });
});
