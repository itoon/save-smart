<template>
  <div class="container px-4 mx-auto">
    <div
      class="bg-white rounded-lg -mt-20 p-4 flex flex-col gap-4 border border-[#EDEDED]"
    >
      <div class="flex flex-col gap-1">
        <label for="saving" class="text-[#A1A1A1] text-center"
          >จำนวนเงินออม</label
        >
        <h2 class="text-4xl font-bold text-center">
          {{
            Intl.NumberFormat("th-TH", {
              style: "currency",
              currency: "THB",
            }).format(saving)
          }}
        </h2>
      </div>
      <p v-show="!canSavingMore2Years" class="text-center">
        ฝากสั้น ไม่ถึง 2 ปี
      </p>
      <p v-show="canSavingMore2Years" class="text-center">
        ฝากยาว มากกว่า 2 ปี
      </p>
      <button
        class="border border-[#2969FF] py-3 text-[#2969FF] rounded-lg"
        @click="showInput"
      >
        คำนวณใหม่
      </button>
      <div class="text-xs text-[#A1A1A1] bg-[#f5f5f5] p-2 rounded-lg">
        <b>Disclaimer</b>
        ข้อมูลที่ได้จากการคำนวณเป็นเพียงการประมาณการเท่านั้น
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  saving: number;
  canSavingMore2Years: boolean;
  isShowInput: boolean;
}>();

const emits = defineEmits(["showInput"]);

function showInput() {
  emits("showInput");
}
</script>
