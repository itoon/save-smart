<template>
  <div class="bg-[#2969FF] h-52">
    <div class="flex flex-col gap-1 py-4 pt-10 text-center text-white">
      <h1 class="text-2xl font-bold">ฝากเงินที่ไหนดี ?</h1>
      <p class="text-sm">เนิร์ดไฟแนนซ์ x CodeTraveler</p>
    </div>
  </div>
  <div class="flex flex-col gap-5">
    <div v-if="isShowInput" class="container px-4 mx-auto">
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
            @keydown.enter="calculate"
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
            @keydown.enter="calculate"
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
    <div v-else class="container px-4 mx-auto">
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
          @click="isShowInput = true"
        >
          คำนวณใหม่
        </button>
      </div>
    </div>
    <div class="container px-4 mx-auto">
      <div class="mb-2">
        <h2 class="text-lg font-bold">ฝากที่ไหนบ้าง</h2>
        <div class="text-xs text-[#A1A1A1] bg-[#f5f5f5] p-2 rounded-lg">
          <p>Disclaimer</p>
          <p>ข้อมูลที่ได้รับมาจากการคำนวณเป็นเพียงการประมาณการเท่านั้น</p>
        </div>
      </div>
      <div class="flex flex-col gap-2">
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
      </div>
    </div>
    <div class="container px-4 pb-4 mx-auto">
      <h2 class="mb-1 text-lg font-bold">ดอกเบี้ยที่จะได้รับโดยประมาณ</h2>
      <div class="border border-[#DFDFDF] p-4 bg-white rounded-lg flex gap-3">
        <div class="flex justify-between flex-1">
          <div class="flex flex-col gap-0.5">
            <p class="text-sm font-bold">ดอกเบี้ยรวมทุกธนาคาร</p>
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
  <footer class="container flex flex-col gap-1 py-2 pb-4 mx-auto text-center">
    <div>
      <a
        href="https://www.facebook.com/permalink.php?story_fbid=pfbid07qpqzy8TA8s2qUi1kPYqYZdhsjct2LjJRbb16JRhbt8dnHWsqhAeVxDffskZ538Yl&id=61558121405445&rdid=pc5pJgOCanjpDqzx"
        target="_blank"
        class="text-[#2969FF] text-sm hover:underline"
        >อ่านโพสต์ต้นฉบับของ เนิร์ดไฟแนนซ์ คลิก</a
      >
    </div>
    <div>
      <p class="text-xs">Developed By:</p>
      <a
        href="https://www.youtube.com/@codetraveler9432"
        target="_blank"
        class="flex justify-center gap-1"
      >
        <img src="/CodeTraveler.png" class="w-5 h-5" />
        <p class="font-bold">CodeTraveler</p>
      </a>
    </div>
    <div class="fixed right-4 bottom-4">
      <a
        href="https://www.buymeacoffee.com/songklodS"
        target="_blank"
        class="bg-[#2969FF] p-2 inline-flex rounded-full"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_14_242)">
            <path
              d="M4.23528 0.705811C4.42249 0.705811 4.60204 0.78018 4.73442 0.912559C4.86679 1.04494 4.94116 1.22448 4.94116 1.41169C4.94116 2.07522 5.32799 2.4084 6.07058 2.96463L6.12705 3.00699C6.79622 3.50816 7.76469 4.2324 7.76469 5.64699C7.76469 5.8342 7.69032 6.01374 7.55795 6.14612C7.42557 6.2785 7.24602 6.35287 7.05881 6.35287C6.8716 6.35287 6.69206 6.2785 6.55968 6.14612C6.4273 6.01374 6.35293 5.8342 6.35293 5.64699C6.35293 4.98346 5.96611 4.65028 5.22352 4.09405L5.16705 4.05169C4.49787 3.55052 3.5294 2.82628 3.5294 1.41169C3.5294 1.22448 3.60377 1.04494 3.73615 0.912559C3.86853 0.78018 4.04807 0.705811 4.23528 0.705811ZM8.47058 0.705811C8.65779 0.705811 8.83733 0.78018 8.96971 0.912559C9.10209 1.04494 9.17646 1.22448 9.17646 1.41169C9.17646 2.07522 9.56328 2.4084 10.3059 2.96463L10.3623 3.00699C11.0315 3.50816 12 4.2324 12 5.64699C12 5.8342 11.9256 6.01374 11.7932 6.14612C11.6609 6.2785 11.4813 6.35287 11.2941 6.35287C11.1069 6.35287 10.9273 6.2785 10.795 6.14612C10.6626 6.01374 10.5882 5.8342 10.5882 5.64699C10.5882 4.98346 10.2014 4.65028 9.45881 4.09405L9.40234 4.05169C8.73316 3.55052 7.76469 2.82628 7.76469 1.41169C7.76469 1.22448 7.83906 1.04494 7.97144 0.912559C8.10382 0.78018 8.28336 0.705811 8.47058 0.705811ZM13.4118 1.41169C13.4118 1.22448 13.3374 1.04494 13.205 0.912559C13.0726 0.78018 12.8931 0.705811 12.7059 0.705811C12.5187 0.705811 12.3391 0.78018 12.2067 0.912559C12.0744 1.04494 12 1.22448 12 1.41169C12 2.82628 12.9685 3.55052 13.6376 4.05169L13.6941 4.09405C14.4367 4.65028 14.8235 4.98346 14.8235 5.64699C14.8235 5.8342 14.8979 6.01374 15.0303 6.14612C15.1626 6.2785 15.3422 6.35287 15.5294 6.35287C15.7166 6.35287 15.8962 6.2785 16.0285 6.14612C16.1609 6.01374 16.2353 5.8342 16.2353 5.64699C16.2353 4.2324 15.2668 3.50816 14.5976 3.00699L14.5412 2.96463C13.7986 2.4084 13.4118 2.07522 13.4118 1.41169ZM19.0588 9.1764H19.7647C20.7008 9.1764 21.5985 9.54825 22.2604 10.2101C22.9223 10.872 23.2941 11.7698 23.2941 12.7058C23.2941 13.6419 22.9223 14.5396 22.2604 15.2015C21.5985 15.8634 20.7008 16.2352 19.7647 16.2352H18.7666C18.2569 18.0401 17.1112 19.5995 15.5411 20.6253C13.9711 21.6511 12.0828 22.074 10.2252 21.8158C8.36765 21.5577 6.66626 20.6359 5.43545 19.2208C4.20464 17.8058 3.52759 15.993 3.5294 14.1176V9.02252C3.5294 8.32934 4.09269 7.76463 4.78728 7.76463H17.8009C18.4955 7.76463 19.0588 8.32793 19.0588 9.02252V9.1764ZM4.94116 9.1764V14.1176C4.94116 15.8025 5.61049 17.4184 6.8019 18.6098C7.9933 19.8012 9.6092 20.4705 11.2941 20.4705C12.979 20.4705 14.5949 19.8012 15.7863 18.6098C16.9777 17.4184 17.647 15.8025 17.647 14.1176V9.1764H4.94116ZM19.0588 10.5882V14.1176C19.0588 14.3557 19.0485 14.591 19.0278 14.8235H19.7647C20.3263 14.8235 20.865 14.6003 21.2621 14.2032C21.6592 13.8061 21.8823 13.2674 21.8823 12.7058C21.8823 12.1442 21.6592 11.6055 21.2621 11.2084C20.865 10.8113 20.3263 10.5882 19.7647 10.5882H19.0588Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_14_242">
              <rect
                width="22.5882"
                height="22.5882"
                fill="white"
                transform="translate(0.705872 0.705811)"
              />
            </clipPath>
          </defs>
        </svg>
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { banks } from "~/data/banks";
const saving = ref(0);
const canSavingMore2Years = ref(false);
const isShowInput = ref(true);

const bankCalculator = ref(banks);

const sumTotalInterest = ref(0);

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
