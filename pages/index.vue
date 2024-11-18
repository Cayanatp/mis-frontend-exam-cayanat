<template>
  <div>
    <UCard
      class="w-full"
      :ui="{
        divide: 'divide-y divide-gray-200 dark:divide-gray-700',
        header: { padding: 'p-4 sm:p-4' },
        body: {
          padding: '',
          base: 'divide-y divide-gray-200 dark:divide-gray-700',
        },
        footer: { padding: 'p-4 sm:p-4' },
      }"
    >
      <UTable :rows="data?.rows" :columns="headers">
        <template #img-data="{ row }">
          <img :src="row.img.url" class="w-[50px] h-[50px]" />
        </template>
      </UTable>
    </UCard>

    <div
      class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <div class="flex flex-wrap items-center gap-3">
        <div class="flex items-center gap-x-2">
          <p class="text-gray-500">รายการต่อหน้า</p>
          <USelect
            v-model="selectedSize"
            :options="pageSizes"
            option-attribute="text"
            value-attribute="value"
            class="w-24"
          />
        </div>
        <div v-if="isMultiplePage" class="flex items-center gap-x-2">
          <p class="text-gray-500">
            {{ $t("PAGE") }}
          </p>
          <UPagination
            v-model="page"
            :page-count="data?.totalPages"
            :total="data!.totalItems"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const page = ref(1);
const { data } = await useArticle().show(page.value, 20, "");
const isMultiplePage = computed(() => data.value!.totalPages > 1);
const selectedSize = ref(20);
const pageSizes = [
  { value: 10, text: 10 },
  { value: 20, text: 20 },
  { value: 30, text: 30 },
  { value: 50, text: 50 },
  { value: 100, text: 100 },
  { value: -1, text: "All" },
];

const headers = [
  {
    label: "",
    key: "img",
    class: "text-center",
  },
  {
    label: "หัวข้อ",
    key: "title",
    align: "right",
  },
  {
    label: "",
    key: "actions",
    align: "center",
  },
];

const AA = {
  totalItems: 1,
  rows: [
    {
      id: 1,
      title: "lorem",
      content: "Fusce fermentum odio nec arcu",
      hit: 0,
      img_id: 5,
      user_id: 3,
      pin: false,
      active: true,
      createdAt: "2024-11-10T16:27:21.000Z",
      updatedAt: "2024-11-10T16:27:21.000Z",
      img: {
        url: "\\uploads\\blogs\\1731256041538-Ns8u76.webp",
      },
    },
  ],
  totalPages: 1,
  currentPage: 1,
};
</script>
