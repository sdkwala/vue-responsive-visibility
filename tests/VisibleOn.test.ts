import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import VisibleOn from '../src/components/VisibleOn.vue';

describe('VisibleOn', () => {
  it('renders slot when matches breakpoint', async () => {
    const matchMediaMock = vi.fn().mockReturnValue({ 
      matches: true, 
      addEventListener: vi.fn(), 
      removeEventListener: vi.fn() 
    });
    
    vi.stubGlobal('window', { matchMedia: matchMediaMock });
    
    const wrapper = mount(VisibleOn, { 
      props: { size: 'md-up' }, 
      slots: { default: 'Visible' } 
    });
    
    // Wait for next tick to ensure component has mounted and updated
    await wrapper.vm.$nextTick();
    
    expect(wrapper.text()).toBe('Visible');
    vi.unstubAllGlobals();
  });

  it('does not render slot when does not match', async () => {
    const matchMediaMock = vi.fn().mockReturnValue({ 
      matches: false, 
      addEventListener: vi.fn(), 
      removeEventListener: vi.fn() 
    });
    
    vi.stubGlobal('window', { matchMedia: matchMediaMock });
    
    const wrapper = mount(VisibleOn, { 
      props: { size: 'md-up' }, 
      slots: { default: 'Hidden' } 
    });
    
    // Wait for next tick to ensure component has mounted and updated
    await wrapper.vm.$nextTick();
    
    expect(wrapper.text()).toBe('');
    vi.unstubAllGlobals();
  });

  it('renders on SSR (no window)', () => {
    // Mock window.matchMedia to return undefined for SSR
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockReturnValue(undefined as any);
    
    const wrapper = mount(VisibleOn, { 
      props: { size: 'md-up' }, 
      slots: { default: 'SSR' } 
    });
    
    expect(wrapper.text()).toBe('SSR');
    
    // Restore original matchMedia
    window.matchMedia = originalMatchMedia;
  });
});
