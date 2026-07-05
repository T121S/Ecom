<template>
  <UCard class="hover:shadow-lg transition-shadow duration-200 border">
    <div class="flex flex-col items-center text-center gap-4 py-8">
      <div class="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center shadow-sm">
        <UIcon :name="icon" class="text-3xl" />
      </div>
      <div>
        <h3 class="font-semibold text-lg text-gray-900 dark:text-white">{{ marketplace.name }}</h3>
        <p v-if="connection" class="text-sm text-gray-500 mt-1">{{ connection.store_name }}</p>
        <p v-else class="text-sm text-gray-400 mt-1">Integrasikan toko {{ marketplace.name }} Anda</p>
      </div>

      <UBadge
        v-if="connection"
        color="success"
        variant="subtle"
        size="lg"
      >
        <template #leading>
          <div class="w-2 h-2 rounded-full bg-green-500" />
        </template>
        Terhubung
      </UBadge>
      <UBadge v-else color="neutral" variant="subtle" size="lg">
        Belum Terhubung
      </UBadge>

      <UButton
        v-if="connection"
        color="error"
        variant="outline"
        size="sm"
        @click="$emit('disconnect', connection.id)"
      >
        Putuskan
      </UButton>
      <UButton
        v-else
        color="primary"
        size="sm"
        @click="$emit('connect', marketplace.id)"
      >
        Hubungkan
      </UButton>
    </div>
  </UCard>
</template>

<script setup lang="ts">
defineProps<{
  marketplace: { id: string; name: string; slug: string; icon_name: string }
  connection?: { id: string; store_name: string; status: string } | null
  description: string
  icon: string
}>()

defineEmits<{
  connect: [marketplaceId: string]
  disconnect: [connectionId: string]
}>()
</script>
