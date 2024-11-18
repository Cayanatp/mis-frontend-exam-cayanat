<template>
  <div class="bg-gray-200 h-screen w-screen">
    <div class="p-7 flex justify-center text-lg">
      <UCard class="w-1/5">
        <template #header>
          <span class="font-medium text-2xl"> เข้าสู่ระบบ </span>
        </template>

        <UForm
          :validate="validate"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormGroup label="ผู้ใช้งาน" name="username">
            <UInput v-model="state.username" />
          </UFormGroup>

          <UFormGroup label="รหัสผ่าน" name="password">
            <UInput v-model="state.password" type="password" />
          </UFormGroup>

          <UButton type="submit" block> เข้าสู่ระบบ </UButton>
        </UForm>
      </UCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from "#ui/types";
const localePath = useLocalePath();
const router = useRouter();

const state = ref<Login>({
  username: "",
  password: "",
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.username) errors.push({ path: "username", message: "Required" });
  if (!state.password) errors.push({ path: "password", message: "Required" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  try {
    await useAuth().Login(event.data);
    const auth = authen();
    auth.getUser();
    useIToast().onSuccess("Login Success");
    router.push(localePath({ name: "index" }));
  } catch (err) {
    console.error("Login error:", err);
    return null;
  }
}
</script>
