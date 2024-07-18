<template>
  <div class="container px-4 mx-auto">
    <div
      class="bg-white rounded-lg -mt-20 p-4 flex flex-col gap-4 border border-[#EDEDED]"
    >
      <div class="flex flex-col gap-1">
        <label for="saving" class="text-[#A1A1A1]">จำนวนเงินออม (บาท)</label>
        <input
          v-model="saving"
          placeholder="100000"
          type="number"
          class="border border-[#DFDFDF] py-3 px-4 w-full focus:outline-none focus:border-[#2969FF] rounded-lg"
        />
      </div>
      <label
        for="more2years"
        class="flex items-center gap-1 cursor-pointer select-none"
      >
        <input
          id="more2years"
          v-model="canSavingMore2Years"
          type="checkbox"
          class="h-4 w-4 rounded border-gray-300 text-[#2969FF] focus:ring-[#2969FF]"
        />
        สามารถฝากเงินได้เกิน 2 ปี
      </label>
      <button
        class="bg-[#2969FF] py-3 text-white rounded-lg"
        @click="calculate"
      >
        คำนวณ
      </button>
    </div>
  </div>    
</template>

<script setup lang="ts">
const emits = defineEmits(["calculate"]);
const saving = defineModel("saving", { type: Number });
const canSavingMore2Years = defineModel("canSavingMore2Years", { type: Boolean });

function calculate() {
  emits("calculate");
}
</script>