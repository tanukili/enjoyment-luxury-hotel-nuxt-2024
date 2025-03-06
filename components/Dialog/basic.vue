<script setup>
import { dialogData, useDialog } from "@/composables/useDialog.js";

const dialog = useDialog();
</script>

<template>
  <dialog id="dialog">
    <div
      class="position-fixed z-3 d-flex justify-content-center align-items-center px-3"
      style="inset: 0; background-color: #0005; backdrop-filter: blur(10px)"
    >
      <div
        class="w-100 d-flex flex-column justify-content-center align-items-center bg-neutral-0 p-8"
        style="max-width: 1020px; border-radius: 20px"
      >
        <div class="d-flex gap-4">
          <template v-if="dialogData.icon === 'loading'" class="my-15">
            <div
              class="spinner-grow bg-neutral-100"
              style="--bs-spinner-animation-speed: 1s"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
            <div
              class="spinner-grow bg-neutral-80"
              style="--bs-spinner-animation-speed: 1.5s"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
            <div
              class="spinner-grow bg-neutral-60"
              style="--bs-spinner-animation-speed: 2s"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          </template>
          <template v-else-if="dialogData.icon === 'success'">
            <Icon
              class="p-2 display-2 text-neutral-0 bg-success-100 rounded-circle my-8"
              icon="material-symbols:check"
            />
          </template>
          <template v-else-if="dialogData.icon === 'error'">
            <Icon
              class="p-2 display-2 text-neutral-0 bg-alert-100 rounded-circle my-8"
              icon="material-symbols:close"
            />
          </template>
        </div>
        <img
          class="mb-4"
          style="max-width: 144px"
          src="@/assets/images/logo-primary.svg"
          alt="logo"
        />
        <main class="mb-8">
          <h3 class="mb-0 text-center text-neutral-100 fs-5 fw-bold">
            {{ dialogData.title }}
          </h3>
          <p
            v-if="dialogData.content"
            class="text-center text-neutral-100 fw-medium"
          >
            {{ dialogData.content }}
          </p>
        </main>
        <footer
          class="d-flex flex-wrap justify-content-center w-100 w-sm-50 gap-2"
        >
          <button
            v-if="dialogData.cancel.needShow"
            class="cancel btn btn-neutral-0 text-primary-100 border border-primary-100 fw-bold w-100 w-sm-45 py-4"
            @click="dialog.close('cancel')"
          >
            {{ dialogData.cancel.btnName }}
          </button>
          <button
            class="confirm btn btn-primary-100 text-neutral-0 fw-bold w-100 w-sm-45 py-4"
            @click="dialog.close('confirm')"
          >
            {{ dialogData.confirm.btnName }}
          </button>
        </footer>
      </div>
    </div>
  </dialog>
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

.w-sm-45 {
  @include media-breakpoint-up(sm) {
    width: 45% !important;
  }
}

.w-sm-50 {
  @include media-breakpoint-up(sm) {
    width: 50% !important;
  }
}

.spinner-grow,
.spinner-border {
  width: 12px;
  height: 12px;
}
</style>
