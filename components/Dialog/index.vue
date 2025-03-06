<script setup>
import { dialogObj, useDialog } from "@/composables/useDialog.js";

const dialog = useDialog();
</script>

<template>
  <dialog id="dialog">
    <div
      class="position-fixed z-3 d-flex align-items-end align-items-md-center justify-content-md-center w-100"
      style="inset: 0; background-color: #0005; backdrop-filter: blur(10px)"
    >
      <div class="dialog-content bg-neutral-0 rounded-3 border-0 w-100 w-md-50">
        <div
          class="dialog-header d-flex align-items-center border-bottom border-neutral-40"
        >
          <h3 class="fs-8 fw-bold mb-0 d-md-none">{{ dialogObj.title }}</h3>
          <button
            type="button"
            class="btn p-0 ms-auto"
            @click="dialog.close('didCancel')"
          >
            <Icon
              class="fs-5 text-neutral-100 text-neutral-md-80 align-bottom"
              icon="material-symbols:close"
            />
          </button>
        </div>
        <div class="px-3 my-10 mt-md-15 mb-md-25 text-neutral-80 text-center">
          <h3
            v-if="dialogObj.showTitleMd"
            class="fs-5 fw-bold d-none d-md-block"
          >
            {{ dialogObj.title }}
          </h3>
          <p v-if="dialogObj.content" class="fs-8 fs-md-6 fw-bold">
            {{ dialogObj.content }}
          </p>
        </div>
        <div class="p-3 d-flex gap-4 border-top border-neutral-40">
          <button
            v-if="dialogObj.showCancelBtn"
            type="button"
            class="btn btn-outline-primary-100 flex-grow-1 m-0 py-4 fw-bold"
            style="--bs-btn-hover-color: #fff"
            @click="dialog.close('didCancel')"
          >
            {{ dialogObj.cancelBtnText }}
          </button>
          <button
            v-if="dialogObj.showConfirmBtn"
            type="button"
            class="btn btn-primary-100 flex-grow-1 m-0 py-4 text-white fw-bold"
            @click="dialog.close('didConfirm')"
          >
            {{ dialogObj.confirmBtnText }}
          </button>
        </div>
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

#dialog {
  backdrop-filter: none;

  @include media-breakpoint-down(md) {
  }
}

.dialog-header {
  padding: 16px;
  @include media-breakpoint-up(md) {
    border-bottom: 0 !important;
    padding: 8px;
  }
}

.dialog-content {
  @include media-breakpoint-up(md) {
    max-width: 600px;
  }
  @include media-breakpoint-down(md) {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
}

.w-md-50 {
  @include media-breakpoint-up(md) {
    width: 50% !important;
  }
}
.text-neutral-md-80 {
  @include media-breakpoint-up(md) {
    color: #4b4b4b !important;
  }
}
</style>
