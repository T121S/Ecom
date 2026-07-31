<template>
  <section id="faq" class="section bg-white dark:bg-slate-900/30">
    <div class="container-page">
      <div class="max-w-2xl mx-auto text-center mb-12">
        <div class="badge-dot mb-4 mx-auto">FAQ</div>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">
          Pertanyaan yang sering diajukan
        </h2>
        <p class="mt-4 text-gray-600 dark:text-gray-400">
          Tidak menemukan jawaban? <a href="mailto:hello@jadee.app" class="text-blue-600 dark:text-blue-400 font-medium hover:underline">Email kami</a>.
        </p>
      </div>

      <div class="max-w-3xl mx-auto space-y-3">
        <details
          v-for="(faq, i) in faqs"
          :key="i"
          class="group bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-xl px-5 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
          :open="i === 0"
        >
          <summary class="flex items-center justify-between gap-4 py-4 cursor-pointer list-none">
            <span class="font-semibold text-gray-900 dark:text-white">{{ faq.q }}</span>
            <svg class="faq-chevron w-5 h-5 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>
          </summary>
          <div class="pb-4 pr-9 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ faq.a }}
          </div>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const faqs = [
  {
    q: 'Apakah Jadee butuh kartu kredit untuk mulai?',
    a: 'Tidak. Anda bisa daftar gratis dan trial 14 hari tanpa perlu input kartu kredit. Upgrade ke paket berbayar hanya saat Anda merasa cocok.'
  },
  {
    q: 'Marketplace apa saja yang didukung?',
    a: 'Saat ini kami mendukung Shopee, Tokopedia, dan Lazada — tiga marketplace dengan volume transaksi terbesar di Indonesia. Marketplace lain seperti Bukalapak, Blibli, dan TikTok Shop sedang dalam roadmap kami.'
  },
  {
    q: 'Apakah data toko saya aman?',
    a: 'Ya. Kami menggunakan OAuth resmi dari tiap marketplace — artinya kami tidak pernah menyimpan password akun marketplace Anda. Data transaksi & stok disimpan di Supabase dengan enkripsi standar industri (AES-256).'
  },
  {
    q: 'Berapa cepat sinkronisasi stok bekerja?',
    a: 'Pada kondisi normal, perubahan stok (baik manual maupun akibat penjualan) tersebar ke seluruh marketplace yang terhubung dalam waktu kurang dari 5 detik. Latensi bergantung pada rate limit API masing-masing marketplace.'
  },
  {
    q: 'Bisakah saya berhenti berlangganan kapan saja?',
    a: 'Tentu saja. Tidak ada kontrak mengikat. Anda bisa menurunkan paket atau membatalkan langganan kapan saja melalui dasbor akun Anda. Akses akan berlaku sampai akhir periode tagihan.'
  },
  {
    q: 'Apakah ada batasan jumlah Master SKU?',
    a: 'Paket Free dibatasi 50 Master SKU — cocok untuk validasi awal. Paket Pro dan Business tidak memiliki batasan jumlah Master SKU. Anda bebas menskalakan sesuai kebutuhan.'
  },
  {
    q: 'Bagaimana jika stok di marketplace tidak sinkron?',
    a: 'Setiap sinkronisasi gagal akan otomatis dicoba ulang dengan backoff eksponensial. Anda juga mendapat notifikasi di dashboard jika ada sinkronisasi yang gagal lebih dari 1 menit, lengkap dengan log error untuk transparency.'
  },
  {
    q: 'Apakah Jadee mengambil fee per transaksi?',
    a: 'Tidak. Kami tidak mengambil potongan dari penjualan Anda. Model bisnis kami murni langganan SaaS — Anda bayar biaya tetap per bulan sesuai paket, selesai.'
  }
]
</script>