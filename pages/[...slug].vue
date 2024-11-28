<script setup lang="ts">
const event = useRequestEvent();
setResponseStatus(event, 404);
</script>

<template>
  <div class="min-vh-100 bg-neutral-120">
    <div
      class="position-relative d-flex flex-column flex-md-row align-items-center min-vh-100"
    >
      <div
        class="d-flex flex-column justify-content-center align-items-center flex-grow-1 pt-18 pt-md-0 h-100"
      >
        <picture class="w-100">
          <source
            srcset="@/assets/images/deco-line-group-horizontal.svg"
            media="(min-width: 576px)"
          />
          <img
            class="deco-line-group w-100"
            src="@/assets/images/deco-line-group-horizontal-sm.svg"
            alt="deco-line-group"
          />
        </picture>
        <main class="w-100 text-center">
          <div class="px-5 px-md-0">
            <h2 class="text-neutral-0 fw-bold">您所造訪的頁面並不存在</h2>
            <p class="mb-5 text-primary-100 fs-7 fs-md-6 fw-bold">
              404 Not Found
            </p>
            <NuxtLink
              to="/"
              class="btn btn-primary-100 px-8 py-4 text-white fw-bold border-0 rounded-3"
            >
              返回首頁
            </NuxtLink>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "bootstrap/scss/mixins/breakpoints";

$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px,
  xxxl: 1537px,
);
.deco-line-group {
  position: absolute;
  top: calc(50% + 142px);
  right: 0;
}
</style>
