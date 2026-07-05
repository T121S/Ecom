<template>
  <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 relative overflow-hidden">
    <div class="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10" :class="bgClass" />
    <div class="flex items-start justify-between relative">
      <div class="space-y-1">
        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ title }}</p>
        <p v-if="max" class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ value }}<span class="text-lg text-gray-400 font-normal"> / {{ max }}</span>
        </p>
        <p v-else class="text-2xl font-bold text-gray-900 dark:text-white">{{ value }}</p>
      </div>
      <div class="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm" :class="iconBgClass">
        <UIcon :name="icon" class="w-6 h-6" :class="iconColorClass" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  value: string | number
  max?: number
  icon: string
  color?: 'blue' | 'cyan' | 'emerald' | 'amber' | 'rose'
}>()

const colorMap: Record<string, { bg: string; iconBg: string; icon: string }> = {
  blue: { bg: 'bg-blue-500', iconBg: 'bg-blue-50 dark:bg-blue-950', icon: 'text-blue-600 dark:text-blue-400' },
  cyan: { bg: 'bg-cyan-500', iconBg: 'bg-cyan-50 dark:bg-cyan-950', icon: 'text-cyan-600 dark:text-cyan-400' },
  emerald: { bg: 'bg-emerald-500', iconBg: 'bg-emerald-50 dark:bg-emerald-950', icon: 'text-emerald-600 dark:text-emerald-400' },
  amber: { bg: 'bg-amber-500', iconBg: 'bg-amber-50 dark:bg-amber-950', icon: 'text-amber-600 dark:text-amber-400' },
  rose: { bg: 'bg-rose-500', iconBg: 'bg-rose-50 dark:bg-rose-950', icon: 'text-rose-600 dark:text-rose-400' }
}

const c = computed(() => colorMap[props.color || 'blue'])
const bgClass = computed(() => c.value.bg)
const iconBgClass = computed(() => c.value.iconBg)
const iconColorClass = computed(() => c.value.icon)
</script>