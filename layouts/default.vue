<script setup lang="ts"></script>

<template>
  <LayoutsSidebar class="lg:hidden" />
  <div class="min-h-full">
    <layouts-topbar />
    <div class="grow px-6">
      <div class="py-10 px-3">
        <slot />
      </div>
    </div>
  </div>
</template>
