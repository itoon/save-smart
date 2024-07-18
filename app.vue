<template>
  <div class="bg-[#2969FF] h-52">
    <div class="flex flex-col text-center gap-1 text-white py-4 pt-10">
      <h1 class="text-2xl font-bold">ฝากเงินที่ไหนดี ?</h1>
      <p class="text-sm">เนิร์ดไฟแนนซ์ x CodeVenture</p>
    </div>
  </div>
  <div class="flex flex-col gap-5">
    <div v-if="isShowInput" class="container mx-auto px-4">
      <div
        class="bg-white rounded-lg -mt-20 p-4 flex flex-col gap-4 border border-[#EDEDED]"
      >
        <div class="flex flex-col gap-1">
          <label for="saving" class="text-[#A1A1A1]">จำนวนเงินออม (บาท)</label>
          <input
            v-model="saving"
            type="text"
            class="border border-[#DFDFDF] py-3 px-4 w-full focus:outline-none focus:border-[#2969FF] rounded-lg"
          />
        </div>
        <label for="more2years">
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
          @click="calulate"
        >
          คำนวณ
        </button>
      </div>
    </div>
    <div v-else class="container mx-auto px-4">
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
        <p v-show="!canSavingMore2Years" class="text-center">ฝากสั้น ไม่ถึง 2 ปี</p>
        <p v-show="canSavingMore2Years" class="text-center">ฝากยาว มากกว่า 2 ปี</p>
        <button
          class="border border-[#2969FF] py-3 text-[#2969FF] rounded-lg"
          @click="isShowInput = true"
        >
          คำนวณใหม่
        </button>
      </div>
    </div>
    <div class="container mx-auto px-4 pb-4">
      <h2 class="text-lg font-bold mb-1">ฝากที่ไหนบ้าง</h2>
      <div class="flex flex-col gap-2">
        <template v-for="(summary, index) in bankCalculator">
          <div
            v-if="index != 4 && (summary.saving > 0 || isShowInput)"
            class="border border-[#DFDFDF] p-4 bg-white rounded-lg flex gap-3"
          >
            <div>
              <NuxtImg :src="summary.logo" class="w-10 h-10 rounded-lg" />
            </div>
            <div class="flex flex-1 justify-between">
              <div class="flex flex-col gap-0.5">
                <p class="font-bold text-sm">{{ summary.name }}</p>
                <p class="text-[#A1A1A1] text-xs">{{ summary.bank }}</p>
              </div>
              <div class="flex flex-col gap-0.5">
                <p class="font-bold text-sm text-right">
                  {{
                    Intl.NumberFormat("th-TH", {
                      style: "currency",
                      currency: "THB",
                    }).format(summary.saving)
                  }}
                </p>
                <p class="text-[#A1A1A1] text-xs text-right">
                  {{ summary.ratio.toFixed(2) }}%
                </p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { banks } from "~/data/banks";
const saving = ref(0);
const canSavingMore2Years = ref(false);
const isShowInput = ref(true);

const bankCalculator = ref(banks);

const calulate = () => {
  isShowInput.value = false;
  bankCalculator.value.forEach((bank) => {
    bank.saving = 0;
    bank.ratio = 0;
  });
  const saveDime = 10000;
  let remainSaving = 0;
  if (saving.value < saveDime) {
    bankCalculator.value[0].saving = saving.value;
    bankCalculator.value[0].ratio = (saving.value / saving.value) * 100;
  } else {
    remainSaving = saving.value - saveDime;
    bankCalculator.value[0].saving = saveDime;
    bankCalculator.value[0].ratio = (saveDime / saving.value) * 100;
    const saveTTBME = 5833;
    if (remainSaving < saveTTBME) {
      bankCalculator.value[1].saving = remainSaving;
      bankCalculator.value[1].ratio = (remainSaving / saving.value) * 100;
      return;
    } else {
      const saveKKP = 10000;
      if (remainSaving < saveKKP) {
        bankCalculator.value[2].saving = remainSaving;
        bankCalculator.value[2].ratio = (remainSaving / saving.value) * 100;
        return;
      } else {
        bankCalculator.value[2].saving = saveKKP;
        bankCalculator.value[2].ratio = (saveKKP / saving.value) * 100;
        remainSaving = remainSaving - saveKKP;
        const saveChillD = 100000;
        if (remainSaving < saveChillD) {
          bankCalculator.value[1].saving = remainSaving;
          bankCalculator.value[1].ratio = (remainSaving / saving.value) * 100;
          return;
        } else {
          bankCalculator.value[3].saving = saveChillD;
          bankCalculator.value[3].ratio = (saveChillD / saving.value) * 100;
          remainSaving = remainSaving - saveChillD;
          const saveTTBMEStep2 = 100000;
          if (remainSaving < saveTTBMEStep2) {
            bankCalculator.value[1].saving = remainSaving;
            bankCalculator.value[1].ratio = (remainSaving / saving.value) * 100;
            return;
          } else {
            bankCalculator.value[1].saving = saveTTBMEStep2;
            bankCalculator.value[1].ratio =
              (saveTTBMEStep2 / saving.value) * 100;
            remainSaving = remainSaving - saveTTBMEStep2;
            const saveKKPStep2 = 40000;
            if (remainSaving < saveKKPStep2) {
              // bankCalculator.value[4].saving = remainSaving;
              // bankCalculator.value[4].ratio =
              //   (remainSaving / saving.value) * 100;
              // return;
              bankCalculator.value[2].saving =
                bankCalculator.value[2].saving + remainSaving;
              bankCalculator.value[2].ratio =
                (remainSaving / saving.value) * 100;
              return;
            } else {
              // bankCalculator.value[4].saving = saveKKPStep2;
              // bankCalculator.value[4].ratio =
              //   (saveKKPStep2 / saving.value) * 100;
              // remainSaving = remainSaving - saveKKPStep2;
              bankCalculator.value[2].saving =
                bankCalculator.value[2].saving + saveKKPStep2;
              bankCalculator.value[2].ratio =
                (bankCalculator.value[2].saving / saving.value) * 100;
              remainSaving = remainSaving - saveKKPStep2;
            }
            const saveAlpha = 500000;
            if (remainSaving < saveAlpha) {
              bankCalculator.value[5].saving = remainSaving;
              bankCalculator.value[5].ratio =
                (saveKKPStep2 / saving.value) * 100;
              return;
            } else {
              bankCalculator.value[5].saving = saveAlpha;
              bankCalculator.value[5].ratio = (saveAlpha / saving.value) * 100;
              remainSaving = remainSaving - saveAlpha;
            }
            if (remainSaving < 971000 && canSavingMore2Years.value) {
              bankCalculator.value[6].saving = remainSaving;
              bankCalculator.value[6].ratio =
                (remainSaving / saving.value) * 100;
              return;
            } else {
              const saveHL = 1000000;
              if (remainSaving > saveHL) {
                bankCalculator.value[7].saving = saveHL;
                bankCalculator.value[7].ratio = (saveHL / saving.value) * 100;
                remainSaving = remainSaving - saveHL;
              } else {
                bankCalculator.value[7].saving = remainSaving;
                bankCalculator.value[7].ratio =
                  (remainSaving / saving.value) * 100;
                return;
              }
              if (canSavingMore2Years.value) {
                // save to kept
                bankCalculator.value[6].saving =
                  bankCalculator.value[6].saving + remainSaving;
                bankCalculator.value[6].ratio =
                  (bankCalculator.value[6].saving / saving.value) * 100;
                return;
              } else {
                if (remainSaving < 385000) {
                  // save TTBME
                  bankCalculator.value[8].saving = remainSaving;
                  bankCalculator.value[8].ratio =
                    (remainSaving / saving.value) * 100;
                  return;
                } else {
                  // save CIMB Speed D+
                  bankCalculator.value[9].saving = remainSaving;
                  bankCalculator.value[9].ratio =
                    (remainSaving / saving.value) * 100;
                  return;
                }
              }
            }
          }
        }
      }
    }
  }
};
</script>
