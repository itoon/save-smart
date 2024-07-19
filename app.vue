<template>
  <div class="bg-[#2969FF] h-52">
    <div class="flex flex-col gap-1 py-4 pt-10 text-center text-white">
      <h1 class="text-2xl font-bold">ฝากเงินที่ไหนดี ?</h1>
      <p class="text-sm">เนิร์ดไฟแนนซ์ x CodeTraveler</p>
    </div>
  </div>
  <div class="flex flex-col gap-5">
    <MoneyInput
      v-if="isShowInput"
      v-model:saving="saving"
      v-model:canSavingMore2Years="canSavingMore2Years"
      @calculate="calculate"
    />
    <ResultDisplay
      v-else
      :saving="saving"
      :canSavingMore2Years="canSavingMore2Years"
      :isShowInput="isShowInput"
      @showInput="showInput"
    />
    <div class="container px-4 mx-auto">
      <div class="mb-2">
        <h2 class="text-lg font-bold">ฝากที่ไหนบ้าง</h2>
        <div class="text-xs text-[#A1A1A1] bg-[#f5f5f5] p-2 rounded-lg">
          <p>Disclaimer</p>
          <p>ข้อมูลที่ได้รับมาจากการคำนวณเป็นเพียงการประมาณการเท่านั้น</p>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <BankItem
          v-for="(summary, index) in bankCalculator"
          :key="index"
          :index="index"
          :summary="summary"
          :isShowInput="isShowInput"
        />
      </div>
    </div>
    <div class="container px-4 pb-4 mx-auto">
      <h2 class="mb-1 text-lg font-bold">ดอกเบี้ยที่จะได้รับโดยประมาณ</h2>
      <div class="border border-[#DFDFDF] p-4 bg-white rounded-lg flex gap-3">
        <div class="flex justify-between flex-1">
          <div class="flex flex-col gap-0.5">
            <div class="flex items-center gap-1 text-sm">
              <p class="text-sm font-bold">ดอกเบี้ยรวมทุกธนาคาร</p>
              <span v-if="!isShowInput" class="p-0.5 px-1 rounded-lg text-[10px] font-bold bg-green-300">
              {{ ((sumTotalInterest/saving)*100).toFixed(2) }}%
              </span>
            </div>
            <p class="text-[#A1A1A1] text-xs">
              ดอกเบี้ยรวมทุกธนาคารหากฝากเงิน 1 ปี
            </p>
          </div>
          <div class="flex flex-col gap-0.5">
            <p class="text-sm font-bold text-right">
              {{
                Intl.NumberFormat("th-TH", {
                  style: "currency",
                  currency: "THB",
                }).format(sumTotalInterest)
              }}
            </p>
            <p class="text-[#A1A1A1] text-xs text-right"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { banks } from "~/data/banks";
const saving = ref(0);
const canSavingMore2Years = ref(false);
const isShowInput = ref(true);

const bankCalculator = ref(banks);
const showInput = () => {
  isShowInput.value = true;
  sumTotalInterest.value = 0;
  resetBanksValue();
};

const sumTotalInterest = ref(0);

const resetBanksValue = () => {
  bankCalculator.value = bankCalculator.value.map(bank => ({
    ...bank,
    saving: 0,
    ratio: 0,
    totalInterest: 0
  }));
}

const calculateSumTotalInterest = () => {
  sumTotalInterest.value = bankCalculator.value.reduce(
    (acc, bank) => acc + bank.totalInterest,
    0
  );
};

const calculateTotalInterest = (bank: (typeof banks)[0]) =>
  bank.saving * bank.interest;

const calculate = () => {
  isShowInput.value = false;
  bankCalculator.value.forEach((bank) => {
    bank.saving = 0;
    bank.ratio = 0;
    bank.totalInterest = 0;
  });
  const saveDime = 10000;
  let remainSaving = 0;
  if (saving.value < saveDime) {
    bankCalculator.value[0].saving = saving.value;
    bankCalculator.value[0].ratio = (saving.value / saving.value) * 100;
    bankCalculator.value[0].totalInterest = calculateTotalInterest(
      bankCalculator.value[0]
    );

    calculateSumTotalInterest();
  } else {
    remainSaving = saving.value - saveDime;
    bankCalculator.value[0].saving = saveDime;
    bankCalculator.value[0].ratio = (saveDime / saving.value) * 100;
    bankCalculator.value[0].totalInterest = calculateTotalInterest(
      bankCalculator.value[0]
    );

    const saveTTBME = 5833;
    if (remainSaving < saveTTBME) {
      bankCalculator.value[1].saving = remainSaving;
      bankCalculator.value[1].ratio = (remainSaving / saving.value) * 100;
      bankCalculator.value[1].totalInterest = calculateTotalInterest(
        bankCalculator.value[1]
      );

      calculateSumTotalInterest();
      return;
    } else {
      const saveKKP = 10000;
      if (remainSaving < saveKKP) {
        bankCalculator.value[2].saving = remainSaving;
        bankCalculator.value[2].ratio = (remainSaving / saving.value) * 100;
        bankCalculator.value[2].totalInterest = calculateTotalInterest(
          bankCalculator.value[2]
        );

        calculateSumTotalInterest();
        return;
      } else {
        bankCalculator.value[2].saving = saveKKP;
        bankCalculator.value[2].ratio = (saveKKP / saving.value) * 100;
        bankCalculator.value[2].totalInterest = calculateTotalInterest(
          bankCalculator.value[2]
        );
        remainSaving = remainSaving - saveKKP;
        const saveChillD = 100000;
        if (remainSaving < saveChillD) {
          bankCalculator.value[1].saving = remainSaving;
          bankCalculator.value[1].ratio = (remainSaving / saving.value) * 100;
          bankCalculator.value[1].totalInterest = calculateTotalInterest(
            bankCalculator.value[1]
          );

          calculateSumTotalInterest();
          return;
        } else {
          bankCalculator.value[3].saving = saveChillD;
          bankCalculator.value[3].ratio = (saveChillD / saving.value) * 100;
          bankCalculator.value[3].totalInterest = calculateTotalInterest(
            bankCalculator.value[3]
          );
          remainSaving = remainSaving - saveChillD;
          const saveTTBMEStep2 = 100000;
          if (remainSaving < saveTTBMEStep2) {
            bankCalculator.value[1].saving = remainSaving;
            bankCalculator.value[1].ratio = (remainSaving / saving.value) * 100;
            bankCalculator.value[1].totalInterest = calculateTotalInterest(
              bankCalculator.value[1]
            );

            calculateSumTotalInterest();
            return;
          } else {
            bankCalculator.value[1].saving = saveTTBMEStep2;
            bankCalculator.value[1].ratio =
              (saveTTBMEStep2 / saving.value) * 100;
            bankCalculator.value[1].totalInterest = calculateTotalInterest(
              bankCalculator.value[1]
            );
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
              bankCalculator.value[2].totalInterest = calculateTotalInterest(
                bankCalculator.value[2]
              );

              calculateSumTotalInterest();
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
              bankCalculator.value[2].totalInterest = calculateTotalInterest(
                bankCalculator.value[2]
              );
              remainSaving = remainSaving - saveKKPStep2;
            }
            const saveAlpha = 500000;
            if (remainSaving < saveAlpha) {
              bankCalculator.value[5].saving = remainSaving;
              bankCalculator.value[5].ratio =
                (bankCalculator.value[5].saving / saving.value) * 100;
              bankCalculator.value[5].totalInterest = calculateTotalInterest(
                bankCalculator.value[5]
              );

              calculateSumTotalInterest();
              return;
            } else {
              bankCalculator.value[5].saving = saveAlpha;
              bankCalculator.value[5].ratio =
                (bankCalculator.value[5].saving / saving.value) * 100;
              remainSaving = remainSaving - saveAlpha;
              bankCalculator.value[5].totalInterest = calculateTotalInterest(
                bankCalculator.value[5]
              );
            }
            if (remainSaving < 971000 && canSavingMore2Years.value) {
              bankCalculator.value[6].saving = remainSaving;
              bankCalculator.value[6].ratio =
                (remainSaving / saving.value) * 100;
              bankCalculator.value[6].totalInterest = calculateTotalInterest(
                bankCalculator.value[6]
              );

              calculateSumTotalInterest();
              return;
            } else {
              const saveHL = 1000000;
              if (remainSaving > saveHL) {
                bankCalculator.value[7].saving = saveHL;
                bankCalculator.value[7].ratio = (saveHL / saving.value) * 100;
                bankCalculator.value[7].totalInterest = calculateTotalInterest(
                  bankCalculator.value[7]
                );

                remainSaving = remainSaving - saveHL;
              } else {
                bankCalculator.value[7].saving = remainSaving;
                bankCalculator.value[7].ratio =
                  (remainSaving / saving.value) * 100;
                bankCalculator.value[7].totalInterest = calculateTotalInterest(
                  bankCalculator.value[7]
                );

                calculateSumTotalInterest();
                return;
              }
              if (canSavingMore2Years.value) {
                // save to kept
                bankCalculator.value[6].saving =
                  bankCalculator.value[6].saving + remainSaving;
                bankCalculator.value[6].ratio =
                  (bankCalculator.value[6].saving / saving.value) * 100;
                bankCalculator.value[6].totalInterest = calculateTotalInterest(
                  bankCalculator.value[6]
                );

                calculateSumTotalInterest();
                return;
              } else {
                if (remainSaving < 385000) {
                  // save TTBME
                  bankCalculator.value[8].saving = remainSaving;
                  bankCalculator.value[8].ratio =
                    (remainSaving / saving.value) * 100;
                  bankCalculator.value[8].totalInterest =
                    calculateTotalInterest(bankCalculator.value[8]);

                  calculateSumTotalInterest();
                  return;
                } else {
                  // save CIMB Speed D+
                  bankCalculator.value[9].saving = remainSaving;
                  bankCalculator.value[9].ratio =
                    (remainSaving / saving.value) * 100;
                  bankCalculator.value[9].totalInterest =
                    calculateTotalInterest(bankCalculator.value[9]);

                  calculateSumTotalInterest();
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
