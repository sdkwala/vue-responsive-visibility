<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { getMediaQuery, defaultBreakpoints, QueryType, Breakpoints } from '../utils/breakpoints';

const props = defineProps<{
  size: QueryType;
  breakpoints?: Breakpoints;
}>();

const isVisible = ref(true);
let mql: MediaQueryList | null = null;

const query = computed(() => getMediaQuery(props.size, props.breakpoints || defaultBreakpoints));

function updateVisibility() {
  if (typeof window === 'undefined' || !query.value) {
    isVisible.value = true;
    return;
  }
  
  try {
    mql = window.matchMedia(query.value);
    if (mql && typeof mql.matches === 'boolean') {
      isVisible.value = mql.matches;
    } else {
      // Fallback for SSR or when matchMedia is not available
      isVisible.value = true;
    }
  } catch (error) {
    // Fallback for SSR or when matchMedia fails
    isVisible.value = true;
  }
}

function handleChange(e: MediaQueryListEvent) {
  isVisible.value = e.matches;
}

onMounted(() => {
  updateVisibility();
  if (mql) mql.addEventListener('change', handleChange);
});

onUnmounted(() => {
  if (mql) mql.removeEventListener('change', handleChange);
});

watch(() => [props.size, props.breakpoints], updateVisibility);
</script>
<template>
  <slot v-if="isVisible" />
</template>
