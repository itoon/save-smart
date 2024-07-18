<template v-for="(summary, index) in bankCalculator">
  <div
    v-if="index != 4 && (summary.saving > 0 || isShowInput)"
    class="border border-[#DFDFDF] p-4 bg-white rounded-lg flex gap-3"
  >
    <div>
      <img :src="summary.logo" class="w-10 h-10 rounded-lg" />
    </div>
    <div class="flex justify-between flex-1">
      <div class="flex flex-col gap-0.5">
        <div class="flex items-center gap-1 text-sm">
          <p class="font-bold">
            {{ summary.name }}
          </p>
          <div class="hidden min-[375px]:block">
            <span
              class="p-0.5 px-1 rounded-lg text-[10px] font-bold bg-green-300"
            >
              {{ (summary.interest * 100).toFixed(2) }}%
            </span>
          </div>
        </div>
        <p class="text-[#A1A1A1] text-xs">{{ summary.bank }}</p>
      </div>
      <div class="flex flex-col gap-0.5">
        <p class="text-sm font-bold text-right">
          {{
            Intl.NumberFormat("th-TH", {
              style: "currency",
              currency: "THB",
            }).format(summary.saving)
          }}
        </p>
        <p class="text-[#A1A1A1] text-xs text-right">
          <!-- <span> สัดส่วน {{ summary.ratio.toFixed(2) }}% </span> -->
          <span>
            ดอกเบี้ย
            {{
              Intl.NumberFormat("th-TH", {
                style: "currency",
                currency: "THB",
              }).format(summary.totalInterest)
            }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Bank } from "../interfaces/Bank";

defineProps<{
  summary: Bank;
  index: number;
  isShowInput: boolean;
}>();
</script>
