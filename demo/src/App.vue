<template>
  <h1>Vue Responsive Visibility Demo</h1>
  <h2>Component Usage</h2>
  <VisibleOn size="md-up">
    <div style="background: #d1fae5; padding: 1em; margin-bottom: 1em;">
      Visible on <b>md-up</b> (≥ 768px)
    </div>
  </VisibleOn>
  <VisibleOn size="sm-only">
    <div style="background: #fee2e2; padding: 1em; margin-bottom: 1em;">
      Visible on <b>sm-only</b> (640px - 767px)
    </div>
  </VisibleOn>
  <VisibleOn size="lg-down">
    <div style="background: #e0e7ff; padding: 1em; margin-bottom: 1em;">
      Visible on <b>lg-down</b> (≤ 1024px)
    </div>
  </VisibleOn>

  <h2>Directive Usage</h2>
  <div v-visible-on="'md-up'" style="background: #fef9c3; padding: 1em; margin-bottom: 1em;">
    v-visible-on <b>md-up</b> (≥ 768px)
  </div>
  <div v-visible-on="'sm-only'" style="background: #fbcfe8; padding: 1em; margin-bottom: 1em;">
    v-visible-on <b>sm-only</b> (640px - 767px)
  </div>
  <div v-visible-on="'lg-down'" style="background: #bbf7d0; padding: 1em; margin-bottom: 1em;">
    v-visible-on <b>lg-down</b> (≤ 1024px)
  </div>
</template>

<script setup lang="ts">
import { VisibleOn } from 'vue-responsive-visibility';
</script>

<style>
body {
  font-family: system-ui, sans-serif;
  background: #f9fafb;
  color: #222;
  margin: 0;
  padding: 2em;
}
h1 {
  margin-bottom: 1em;
}
</style>
