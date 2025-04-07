<script setup>
import { is } from "@vee-validate/rules";

const router = useRouter();
const dialog = useDialog();
const baseUrl = "https://two024-ts-freyia.onrender.com/api/v1";
const cookieUser = useCookie("user", {
  maxAge: 86400,
  path: "/",
});

onMounted(async () => {
  let isLogined = false;
  if (cookieUser?.value?.token) {
    // CSR 請求資源
    const { status } = await $fetch(`${baseUrl}/user/check`, {
      headers: {
        Authorization: `Bearer ${cookieUser.value.token}`,
      },
    });
    isLogined = status;
  }
  if (isLogined) {
    dialog.open({
      title: "您已登入",
      confirmBtnText: "登出帳號",
      didConfirm: () => {
        console.log("登出 function");
      },
      showCancelBtn: true,
      cancelBtnText: "前往會員頁",
      didCancel: () => {
        router.push({ path: "/user" });
      },
    });
  }
});

const credentials = reactive({
  email: null,
  password: null,
});
const needRememberEmail = ref(false);
const cookieRememberedEmail = useCookie("userEmail", {
  path: "/",
});
const isSubmitting = ref(false);

onMounted(() => {
  if (cookieRememberedEmail.value) {
    credentials.email = cookieRememberedEmail.value;
    needRememberEmail.value = true;
  }
});

const login = async () => {
  isSubmitting.value = true;
  try {
    const { token, result } = await $fetch(`${baseUrl}/user/login`, {
      method: "POST",
      body: {
        ...credentials,
      },
    });
    cookieUser.value = {
      token,
      id: result.id,
    };
    if (needRememberEmail.value) {
      cookieRememberedEmail.value = result.email;
    }
    dialog.open({
      title: "登入成功",
      confirmBtnText: "前往訂房",
      didConfirm: () => {
        router.push({ path: "/room" });
      },
      showCancelBtn: true,
      cancelBtnText: "前往會員頁",
      didCancel: () => {
        router.push({ path: "/user" });
      },
    });
  } catch (error) {
    const { message } = error?.data;
    const isPassordWrong = !message.search("密碼");
    isPassordWrong ? (credentials.password = null) : (credentials.email = null);
    dialog.open({
      title: message,
    });
  }
  isSubmitting.value = false;
};
</script>

<template>
  <NuxtLayout name="account">
    <div class="px-5 px-md-0">
      <div class="mb-10">
        <p class="mb-2 text-primary-100 fs-8 fs-md-7 fw-bold">
          享樂酒店，誠摯歡迎
        </p>
        <h1 class="text-neutral-0 fw-bold">立即開始旅程</h1>
      </div>

      <VFrom v-slot="{ errors }" @submit="login" class="mb-10">
        <div class="mb-4 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="email">
            電子信箱
          </label>
          <VField
            id="email"
            name="email"
            v-model="credentials.email"
            rules="required|email"
            class="form-control p-4 text-neutral-100 fw-medium border-neutral-40"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入信箱"
            type="email"
          />
          <VErrorMessage name="email">
            <span class="invalid-feedback">{{
              errors["email"].replace("email", "電子信箱")
            }}</span>
          </VErrorMessage>
        </div>
        <div class="mb-4 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="password">
            密碼
          </label>
          <VField
            id="password"
            name="password"
            v-model="credentials.password"
            rules="required|min:8|alpha_num"
            class="form-control p-4 text-neutral-100 fw-medium border-neutral-40"
            :class="{ 'is-invalid': errors['password'] }"
            placeholder="請輸入密碼"
            type="password"
          />
          <VErrorMessage name="password">
            <span class="invalid-feedback">{{
              errors["password"].replace("password", "密碼")
            }}</span>
          </VErrorMessage>
        </div>
        <div
          class="d-flex justify-content-between align-items-center mb-10 fs-8 fs-md-7"
        >
          <div class="form-check d-flex align-items-end gap-2 text-neutral-0">
            <input
              id="remember"
              v-model="needRememberEmail"
              class="form-check-input"
              type="checkbox"
            />
            <label class="form-check-label fw-bold" for="remember">
              記住帳號
            </label>
          </div>
          <button
            class="text-primary-100 fw-bold text-decoration-underline bg-transparent border-0"
            type="button"
          >
            忘記密碼？
          </button>
        </div>
        <button
          class="btn btn-primary-100 w-100 py-4 text-neutral-0 fw-bold"
          type="submit"
          :disabled="
            Object.keys(errors).length ||
            !credentials.email ||
            !credentials.password
          "
        >
          <Icon
            v-if="isSubmitting"
            class="fs-7 ms-2 text-neutral-0"
            icon="line-md:loading-twotone-loop"
          />
          <span v-else>會員登入</span>
        </button>
      </VFrom>

      <p class="mb-0 fs-8 fs-md-7">
        <span class="me-2 text-neutral-0 fw-medium">沒有會員嗎？</span>
        <NuxtLink
          to="/signup"
          class="text-primary-100 fw-bold text-decoration-underline bg-transparent border-0"
        >
          <span>前往註冊</span>
        </NuxtLink>
      </p>
    </div>
  </NuxtLayout>
  <Dialog />
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

input[type="password"] {
  font: small-caption;
  font-size: 1.5rem;
}

input::placeholder {
  color: #909090;
  font-size: 1rem;
  font-weight: 500;

  @include media-breakpoint-down(md) {
    font-size: 14px;
  }
}

.form-check-input {
  width: 1.5rem;
  height: 1.5rem;
}

.form-check-input:checked {
  background-color: #bf9d7d;
  border-color: #bf9d7d;
}
</style>
