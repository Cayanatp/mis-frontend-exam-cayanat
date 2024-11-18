<script setup lang="ts">
const auth = authen();

const profilePopover = ref<boolean>(false);

const logout = () => {
  auth.logout();
};
</script>

<template>
  <div
    class="h-16 sticky top-0 py-2 shadow z-10 flex items-center justify-end px-3"
  >
    <div
      class="text-xl text-blue-600 font-medium mr-auto flex items-center gap-3"
    >
      บทความ
    </div>

    <UButton
      icon="i-fa6-solid-arrow-right-from-bracket"
      variant="soft"
      color="gray"
      size="xl"
      label="ออกจากระบบ"
      @click="logout"
    />
  </div>
</template>
