<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 shadow-lg shadow-blue-200 mb-4">
          <span class="text-sm font-bold text-white tracking-tight">JADEE</span>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Jadee</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1 text-sm">Omnichannel Inventory Management</p>
      </div>
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-gray-950 p-8">
        <slot />
      </div>
    </div>
  </div>
</template>
