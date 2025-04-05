<script setup>
const router = useRouter();
const baseUrl = "https://two024-ts-freyia.onrender.com/api/v1";

const dialog = useDialog();

// 第一步驟的資料方法
const isEmailAndPasswordValid = ref(false);
const email = ref("");
const password = ref("");
const canUseEmail = ref(null);

const checkEmailUsable = async (isValid) => {
  canUseEmail.value = false;
  if (isValid && email.value) {
    try {
      const { result } = await $fetch(`${baseUrl}/verify/email`, {
        method: "POST",
        body: {
          email: email.value,
        },
      });
      if (result.isEmailExists) {
        dialog.open({
          title: "信箱已被註冊",
          content: "請填寫其他的信箱地址。",
          didConfirm: () => {
            canUseEmail.value = false;
            email.value = "";
          },
        });
      } else {
        canUseEmail.value = true;
      }
    } catch (error) {
      const { name, status } = error?.data;
      dialog.open({
        title: `信箱驗證錯誤`,
        content: `代碼 ${status ? status : ""}：${name}`,
      });
    }
  }
  canUseEmail.value = true;
};

watch(email, (newEmail) => {
  if (!newEmail) {
    canUseEmail.value = null;
  }
});

// 第二步驟的資料方法
const birthday = ref({
  year: 1959,
  month: 1,
  day: 1,
});
const address = ref({
  city: "高雄市",
  county: "前金區",
});

const districtList = [
  {
    name: "臺北市",
    districts: [
      { name: "中正區", zipcode: 100 },
      { name: "萬華區", zipcode: 108 },
      { name: "南港區", zipcode: 115 },
    ],
  },
  {
    name: "臺中市",
    districts: [
      { name: "中區", zipcode: 400 },
      { name: "東區", zipcode: 401 },
      { name: "北屯區", zipcode: 406 },
    ],
  },
  {
    name: "高雄市",
    districts: [
      { name: "前金區", zipcode: 802 },
      { name: "苓雅區", zipcode: 803 },
      { name: "鹽埕區", zipcode: 804 },
    ],
  },
];

const counties = computed(() => {
  const [{ districts }] = districtList.filter(
    (city) => city.name === address.value.city
  );
  return districts;
});

const zipcode = computed(() => {
  const { zipcode } = counties.value.find(
    (county) => county.name === address.value.county
  );
  return zipcode;
});

// 切換城市時代入預設選項
watch(
  () => address.value.city,
  () => {
    address.value.county = counties.value[0].name;
  }
);

const isSubmitting = ref(false);

const signup = async (values) => {
  const { name, phone, birthYear, birthMonth, birthDay, city, county, detail } =
    values;
  const signupInfo = {
    name,
    phone,
    email: email.value,
    password: password.value,
    birthday: `${birthYear}/${birthMonth}/${birthDay}`,
    address: {
      city,
      county,
      zipcode: zipcode.value,
      detail,
    },
  };
  const cookieToken = useCookie("token", {
    maxAge: 86400,
  });

  try {
    isSubmitting.value = true;
    const { token } = await $fetch(`${baseUrl}/user/signup`, {
      method: "POST",
      body: {
        ...signupInfo,
      },
    });
    cookieToken.value = token;
    isSubmitting.value = false;
    dialog.open({
      title: "註冊成功",
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
    dialog.open({
      title: `註冊失敗`,
      content: message,
      didConfirm: () => {
        isEmailAndPasswordValid.value = false;
        email.value = "";
      },
    });
    isSubmitting.value = false;
  }
};
</script>

<template>
  <NuxtLayout name="account">
    <div class="account-container p-5 px-md-0 py-md-30">
      <div class="mb-10">
        <p class="mb-2 text-primary-100 fs-8 fs-md-7 fw-bold">
          享樂酒店，誠摯歡迎
        </p>
        <h1 class="mb-4 text-neutral-0 fw-bold">立即註冊</h1>
        <div class="d-flex align-items-center py-4 gap-2">
          <div
            class="d-flex flex-column align-items-center gap-1 text-neutral-0"
          >
            <span
              :class="{ 'd-none': isEmailAndPasswordValid }"
              class="step p-2 bg-primary-100 rounded-circle"
              >1</span
            >
            <Icon
              :class="{ 'd-none': !isEmailAndPasswordValid }"
              class="p-2 fs-3 bg-primary-100 rounded-circle"
              icon="material-symbols:check"
            />
            <p class="mb-0 fs-8 fs-md-7 fw-bold">輸入信箱及密碼</p>
          </div>

          <hr class="flex-grow-1 my-0 border border-neutral-60 opacity-100" />

          <div
            :class="{
              'text-neutral-0': isEmailAndPasswordValid,
              'text-neutral-60': !isEmailAndPasswordValid,
            }"
            class="d-flex flex-column align-items-center gap-1"
          >
            <span
              :class="{
                'bg-primary-100': isEmailAndPasswordValid,
                'bg-transparent border border-neutral-60':
                  !isEmailAndPasswordValid,
              }"
              class="step p-2 rounded-circle"
              >2</span
            >
            <p class="mb-0 fs-8 fs-md-7 fw-bold">填寫基本資料</p>
          </div>
        </div>
      </div>
      <div class="mb-4">
        <VFrom
          v-slot="{ errors, values }"
          v-show="!isEmailAndPasswordValid"
          class="mb-4"
        >
          <div class="mb-4 fs-8 fs-md-7">
            <label
              class="mb-2 text-neutral-0 fw-bold d-block d-flex align-items-center"
              for="email"
            >
              電子信箱
              <Icon
                v-if="!!email"
                class="fs-7 ms-2 text-neutral-0 rounded-circle"
                :class="{ 'bg-success-100': canUseEmail }"
                :icon="
                  canUseEmail
                    ? 'material-symbols:check'
                    : 'line-md:loading-twotone-loop'
                "
              />
              <span class="text-primary-100 ms-auto">必填</span>
            </label>
            <VField
              id="email"
              name="email"
              rules="required|email"
              v-model="email"
              class="form-control p-4 text-neutral-100 fw-medium border-neutral-40"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="hello@exsample.com"
              type="email"
              @blur="checkEmailUsable(!errors['email'])"
            />
            <VErrorMessage name="email">
              <span class="invalid-feedback">{{
                errors["email"].replace("email", "電子信箱")
              }}</span>
            </VErrorMessage>
          </div>
          <div class="mb-4 fs-8 fs-md-7">
            <label
              class="mb-2 text-neutral-0 fw-bold d-block d-flex"
              for="password"
            >
              密碼
              <span class="text-primary-100 ms-auto">必填</span>
            </label>
            <VField
              id="password"
              name="password"
              rules="required|password"
              v-model="password"
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
          <div class="mb-10 fs-8 fs-md-7">
            <label
              class="mb-2 text-neutral-0 fw-bold d-block d-flex"
              for="confirmPassword"
            >
              確認密碼
              <span class="text-primary-100 ms-auto">必填</span>
            </label>
            <VField
              id="confirmPassword"
              name="confirmPassword"
              rules="required|confirmed:@password"
              class="form-control p-4 text-neutral-100 fw-medium border-neutral-40"
              :class="{ 'is-invalid': errors['confirmPassword'] }"
              placeholder="請再輸入一次密碼"
              type="password"
            />
            <VErrorMessage name="confirmPassword">
              <span class="invalid-feedback">{{
                errors["confirmPassword"].replace("confirmPassword", "確認密碼")
              }}</span>
            </VErrorMessage>
          </div>
          <button
            class="btn btn-primary-100 w-100 py-4 text-neutral-0 fw-bold"
            type="button"
            :disabled="
              !canUseEmail ||
              !password ||
              !values.confirmPassword ||
              Object.keys(errors).length
            "
            @click="isEmailAndPasswordValid = true"
          >
            下一步
          </button>
        </VFrom>
        <VFrom
          v-slot="{ errors }"
          v-show="isEmailAndPasswordValid"
          @submit="signup"
          class="mb-4"
        >
          <div class="mb-4 fs-8 fs-md-7">
            <label
              class="mb-2 text-neutral-0 fw-bold d-block d-flex"
              for="name"
            >
              姓名
              <span class="text-primary-100 ms-auto">必填</span>
            </label>
            <VField
              id="name"
              name="name"
              rules="required"
              class="form-control p-4 text-neutral-100 fw-medium border-neutral-40 rounded-3"
              :class="{ 'is-invalid': errors['name'] }"
              placeholder="請輸入姓名"
              type="text"
            />
            <VErrorMessage name="name">
              <span class="invalid-feedback">{{
                errors["name"].replace("name", "姓名")
              }}</span>
            </VErrorMessage>
          </div>
          <div class="mb-4 fs-8 fs-md-7">
            <label
              class="mb-2 text-neutral-0 fw-bold d-block d-flex"
              for="phone"
            >
              手機號碼
              <span class="text-primary-100 ms-auto">必填</span>
            </label>
            <VField
              id="phone"
              name="phone"
              rules="required|phone"
              class="form-control p-4 text-neutral-100 fw-medium border-neutral-40 rounded-3"
              :class="{ 'is-invalid': errors['phone'] }"
              placeholder="請輸入手機號碼"
              type="tel"
            />
            <VErrorMessage name="phone">
              <span class="invalid-feedback">{{
                errors["phone"].replace("phone", "手機號碼")
              }}</span>
            </VErrorMessage>
          </div>
          <div class="mb-4 fs-8 fs-md-7">
            <label
              class="mb-2 text-neutral-0 fw-bold d-block d-flex"
              for="birth"
            >
              生日
              <span class="text-primary-100 ms-auto">必填</span>
            </label>
            <div class="d-flex gap-2">
              <VField
                id="birth"
                name="birthYear"
                as="select"
                v-model="birthday.year"
                class="form-select p-4 text-neutral-80 fw-medium rounded-3"
              >
                <option v-for="year in 65" :key="year" :value="1958 + year">
                  {{ 1958 + year }} 年
                </option>
              </VField>
              <VField
                name="birthMonth"
                as="select"
                v-model="birthday.month"
                class="form-select p-4 text-neutral-80 fw-medium rounded-3"
              >
                <option v-for="month in 12" :key="month" :value="month">
                  {{ month }} 月
                </option>
              </VField>
              <VField
                name="birthDay"
                as="select"
                v-model="birthday.day"
                class="form-select p-4 text-neutral-80 fw-medium rounded-3"
              >
                <option v-for="day in 30" :key="day" :value="day">
                  {{ day }} 日
                </option>
              </VField>
            </div>
          </div>
          <div class="mb-4 fs-8 fs-md-7">
            <label
              class="form-label text-neutral-0 fw-bold d-block d-flex"
              for="address"
            >
              地址
              <span class="text-primary-100 ms-auto">必填</span>
            </label>
            <div>
              <div class="d-flex gap-2 mb-2">
                <VField
                  name="city"
                  as="select"
                  v-model="address.city"
                  class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                >
                  <option
                    v-for="city in districtList"
                    :value="city.name"
                    :key="city"
                  >
                    {{ city.name }}
                  </option>
                </VField>
                <VField
                  name="county"
                  as="select"
                  v-model="address.county"
                  class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                >
                  <option
                    v-for="county in counties"
                    :key="county.zipcode"
                    :value="county.name"
                  >
                    {{ county.name }}
                  </option>
                </VField>
              </div>
              <VField
                id="address"
                name="detail"
                rules="required"
                type="text"
                class="form-control p-4 rounded-3"
                :class="{ 'is-invalid': errors['detail'] }"
                placeholder="請輸入詳細地址"
              />
              <VErrorMessage name="detail">
                <span class="invalid-feedback">{{
                  errors["detail"].replace("detail", "地址")
                }}</span>
              </VErrorMessage>
            </div>
          </div>

          <div
            class="form-check d-flex flex-wrap align-items-end gap-2 text-neutral-0"
          >
            <VField
              id="agreementCheck"
              name="agreementCheck"
              rules="required"
              class="form-check-input"
              type="checkbox"
              value="false"
            />
            <label class="form-check-label fw-bold" for="agreementCheck">
              我已閱讀並同意本網站個資使用規範
            </label>
          </div>
          <span
            v-if="errors['agreementCheck']"
            class="w-100 text-alert-100 fw-bold fs-8 mt-0"
            >同意後才能註冊</span
          >
          <button
            class="btn btn-primary-100 w-100 py-4 text-neutral-0 fw-bold mt-10"
            type="submit"
          >
            <Icon
              v-if="isSubmitting"
              class="fs-7 ms-2 text-neutral-0"
              icon="line-md:loading-twotone-loop"
            />
            <span v-else>完成註冊</span>
          </button>
        </VFrom>
      </div>

      <p class="mb-0 fs-8 fs-md-7">
        <span class="me-2 text-neutral-0 fw-medium">已經有會員了嗎？</span>
        <NuxtLink
          to="/login"
          class="text-primary-100 fw-bold text-decoration-underline bg-transparent border-0"
        >
          <span>立即登入</span>
        </NuxtLink>
      </p>
    </div>
  </NuxtLayout>
  <ClientOnly>
    <Dialog />
  </ClientOnly>
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

.step {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
}

.account-container {
  @include media-breakpoint-up(lg) {
    & {
      min-width: 416px;
    }
  }
}
</style>
