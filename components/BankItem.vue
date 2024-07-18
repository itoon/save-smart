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
				<p class="text-sm font-bold">{{ summary.name }}</p>
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
					สัดส่วน {{ summary.ratio.toFixed(2) }}%
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
}>()
</script>