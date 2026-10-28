# Portofolio Zikra

Portofolio Azzikra Ramadhanti Aksan, dibuat dengan Next.js 16 dan Tailwind CSS v4.

## Menjalankan

```bash
npm run dev        # pengembangan, http://localhost:3000
npm run build      # build produksi
npm run start      # jalankan build produksi
npm run lint
```

## Mengisi gambar

Semua gambar masih kosong. Selama sebuah file belum ada, halaman menampilkan bidang abu-abu yang
bertuliskan path file yang dibutuhkan. Taruh file dengan nama persis seperti di bawah, lalu jalankan
ulang `npm run build` (atau refresh saat `npm run dev`).

| Path | Isi | Ukuran minimal |
| --- | --- | --- |
| `public/images/hero/zikra-1.jpg` | Potret utama di bingkai lengkung hero | 920 × 1580, potret tinggi |
| `public/images/hero/zikra-2.jpg` | Foto kedua, berganti pelan dengan yang lain | 920 × 1580 |
| `public/images/hero/zikra-3.jpg` | Foto ketiga | 920 × 1580 |
| `public/images/about/zikra-avatar.jpg` | Foto di bagian "Hai, saya Zikra" (sudut kanan atas melengkung) | 1000 × 1250, potret 4:5 |
| `public/images/alurkerja/cover.png` | Dashboard utama AlurKerja | 1600 × 1000, 16:10 |
| `public/images/alurkerja/laptop.png` | Halaman project AlurKerja, bingkai laptop | 1600 × 1000, 16:10 |
| `public/images/alurkerja/tablet.png` | Bingkai tablet | 1200 × 1600, 3:4 potret |
| `public/images/alurkerja/phone.png` | Bingkai handphone | 900 × 1900, potret |
| `public/images/projects/<slug>/{laptop,tablet,phone}.png` | Tiga bingkai yang sama untuk project lain (mavoka, jeep-booking-app, spendly, helpdesk-mini) | ukuran sama |
| `public/images/alurkerja/cs-schema-builder.png` | Schema Builder | 1600 × 1000 |
| `public/images/alurkerja/cs-master-data.png` | Master Data dan dialog unggah massal | 1600 × 1000 |
| `public/images/alurkerja/cs-ai-agent.png` | Tool MCP dan AI gateway | 1600 × 1000 |
| `public/images/alurkerja/cs-multi-tenant.png` | Halaman 403 / pengaturan peran | 1600 × 1000 |
| `public/images/alurkerja/cs-race-condition.png` | Tab Network dengan request canceled | 1600 × 1000 |
| `public/images/alurkerja/cs-bulk-operations.png` | Bulk claim / bulk complete | 1600 × 1000 |
| `public/images/alurkerja/cs-lane-sync.png` | Wizard Lane Sync | 1600 × 1000 |
| `public/images/projects/mavoka.png` | Kartu dan halaman proyek Mavoka | 1600 × 1000 |
| `public/images/projects/jeep-booking.png` | Kartu dan halaman Jeep Booking App | 1600 × 1000 |
| `public/images/projects/spendly.png` | Kartu dan halaman Spendly | 1600 × 1000 |
| `public/images/projects/helpdesk-mini.png` | Kartu dan halaman Helpdesk Mini | 1600 × 1000 |

Path dan teks alt ada di `src/content/site.ts`. Jika memakai nama atau format lain (misalnya `.webp`),
ubah path di file itu.

## Mengubah isi

Semua teks ada di `src/content/site.ts`: profil, delapan studi kasus, pengalaman, dan keahlian.
Surat perkenalan ada di `src/app/page.tsx` (konstanta `letter`). CV yang bisa diunduh ada di
`public/cv-zikra.pdf`.

## Standar yang dipakai

- Desain: mengikuti tampilan abiemaxey.com sesuai permintaan (nav pil, lencana, judul kapital dengan
  kata serif miring, label mono, bagian gelap berkisi). Ini sengaja melanggar aturan rumah Taste Skill
  (`.claude/skills/design-taste-frontend`), jadi inspector-nya akan melaporkan banyak FAIL untuk
  mono, eyebrow, gradien, dan sejenisnya. Aturan kontras, fokus, dan responsif tetap dijaga.
- Antarmuka: Vercel Web Interface Guidelines.
- Pengujian: Playwright CLI (`.claude/skills/playwright-cli`).

Pemeriksaan desain:

```bash
node .claude/skills/design-taste-frontend/scripts/lint.mjs src
npm run build && npm run start
node .claude/skills/design-taste-frontend/scripts/inspect.mjs http://localhost:3000
```
