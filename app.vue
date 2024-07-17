<template>
  <div class="bg-[#2969FF] h-52">
    <div class="flex flex-col text-center gap-1 text-white py-4 pt-10">
      <h1 class="text-2xl font-bold">ฝากเงินที่ไหนดี ?</h1>
      <p class="text-sm">เนิร์ดไฟแนนซ์ x CodeVenture</p>
    </div>
  </div>
  <div class="flex flex-col gap-5">
    <div class="container px-4">
      <div
        class="bg-white rounded-lg -mt-20 p-4 flex flex-col gap-4 border border-[#EDEDED]"
      >
        <div class="flex flex-col gap-1">
          <label for="saving" class="text-[#A1A1A1]">จำนวนเงินออม (บาท)</label>
          <input
            type="text"
            class="border border-[#DFDFDF] py-3 px-4 w-full focus:outline-none focus:border-[#2969FF] rounded-lg"
          />
        </div>
        <Button class="bg-[#2969FF] py-3 text-white rounded-lg">คำนวณ</Button>
      </div>
    </div>
    <div class="container px-4">
      <h2 class="text-lg font-bold">ฝากที่ไหนบ้าง</h2>
      <div class="flex flex-col gap-2">
        <div class="border border-[#DFDFDF] p-4 bg-white rounded-lg flex gap-3">
          <div>
            <NuxtImg src="/bank/dime.png" class="w-10 h-10 rounded-lg" />
          </div>
          <div class="flex flex-1 justify-between">
            <div class="flex flex-col gap-0.5">
              <p class="font-bold text-sm">Dime! Save</p>
              <p class="text-[#A1A1A1] text-xs">เกียรตินาคิน</p>
            </div>
            <div class="flex flex-col gap-0.5">
              <p class="font-bold text-sm">12,000.00</p>
              <p class="text-[#A1A1A1] text-xs">13.00%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const saving = ref(0);
const calulate = () => {
  console.log(saving.value);
};
</script>
