AETHERIA — FOREST RPG / 03

OCHISH
ZIPni Extract All orqali chiqaring.
Eng oson usul: ZIP boshidagi index.html ni Chrome yoki Edge bilan oching.
Bu bitta fayl barcha kod va inglizcha ovozlarni o'z ichiga oladi, internet talab qilmaydi.
VS Code orqali o'zgartirish: anime-island papkasini oching, index.html ni ishga tushiring.
Modulli index.html uchun papkadagi qolgan fayllar ham yonida turishi kerak.

BOSHQARUV
WASD — yurish. Sichqoncha — atrofga qarash.
Shift — yugurish. Space — sakrash.
F — uchish, uchishda Space yuqoriga, Q pastga.
R — qasr darvozasi oldiga qaytish.
E — yoningizdagi NPC bilan suhbat. M — ovozni yoqish/o'chirish.
Esc — sichqonchani bo'shatish. Ekranni bosing — davom etish.
Sichqoncha qulflanmasa bosib tortish ham ishlaydi.
O'ng yuqorida grafika, kun/oqshom va ovoz tugmalari bor.

OLAM
100 ta qishloq binosi: 75 turar joy va 25 ochiq market.
Bir va ikki qavatli uylar, turli devor va tomlar, katta ko'chalar.
Har bir marketning eshigi ochiq, ichiga kirib savdogarni ko'rish mumkin.
Boshqa uylar hozircha tashqi dekoratsiya; savdo tranzaksiyalari hali yo'q.
Katta qasr orqada joylashgan. Ochiq markaziy kirish va erkin yuriladigan taxt zali.
Oq ustunlar, oltin bezaklar, qizil gilam, vitrajlar va uchta qandil.
Rasmdan ilhomlangan soddalashtirilgan 3D talqin; fotorealistik nusxa emas.
Himoya devori, to'rtta tosh ko'prik va o'rmon halqasi qo'shilgan.

NPClar
400 original qishloq odami:
280 yuruvchi, 60 uch kishilik guruhlarda, 25 savdogar, 35 tinch aholi.
Saroyda yana 10 NPC: 2 o'tirgan darvoza qo'riqchisi,
4 ta kuchli gvardiyachi (2 chap, 2 o'ng), qirol, qirolicha,
kichik malika va hisobchi. Uchta alohida taxt va mos kattalikdagi tojlar.
Qo'l, oyoq, bosh, nafas olish va gapirganda og'iz harakatlari bor.
Bular tanilgan anime personajlari emas, loyiha uchun original qishloq odamlari.

OVOZ
13 ta tayyor sintetik inglizcha gap offline MP3 tarzida ichiga joylangan.
NPC yonidan o'tganda eshitiladi, E bilan qayta suhbat boshlash mumkin.
Ovoz uzoqlashganda pasayadi. Bir vaqtda bitta jumla eshitiladi.
Bu AI bilan erkin suhbat emas: qisqa tayyor jumlalar navbat bilan takrorlanadi.
Birinchi Olamga kirish bosilishi ovozni faollashtiradi.

TEZLIK
Barcha 410 agent simulyatsiyada ishlaydi.
Yaqindagi 120 tagacha NPC batafsil, uzoqdagilar soddalashtirilgan holda chiziladi.
Qotish bo'lsa Grafika: yengil ni tanlang. Desktop klaviatura/sichqoncha uchun.

FAYLLAR
world.js — olam, binolar, kolliziya, kamera va boshqaruv.
people.js — NPC ko'rinishi, yurish, animatsiya, yaqinlik ovozi.
voices.js — offline ovozlar va matnlar.
style.css, index.html — interfeys.
vendor/three.min.js — Three.js r160, MIT litsenziya yonida.
Ovozlar FFmpeg/libflite orqali lokal sintez qilingan.


FOREST RPG YANGILANISHI
Qasr, 100 bino, 25 market va 410 do'stona NPC saqlangan.
Qishloqni himoya devori o'rab turadi. To'rtta darvozadan ko'prik o'tadi.
O'rmon har tomonga 565 metr: markazdan 365–930 m oralig'ida.
Birinchi 100 m yashil, keyin qora/kuygan daraxtlar va olovlar.
300 m chuqurlikdan D darajali iblislar va 2 m baland devlar uchraydi.
56 ta original o'rmon maxluqi, 7 ko'rinish: shilimshiq, qo'ziqorin imp,
mox goblini, tikanli goblin, ildiz maxluqi, D iblisi, Kul dev.
Ular uy nuqtasidan 36 metrdan uzoqlashmaydi va qishloqqa kirmaydi.
Yengilgan maxluq 55 o'yin soniyasidan so'ng yana paydo bo'ladi.
Modellar rasmdagi turlardan ilhomlangan soddalashtirilgan 3D talqin.

JANG
Chap sichqoncha — qilich bilan zarba, masofa 3.8 m, tanaffus 0.65 s.
1 — Qora Alanga qilichi. Har zarba aynan 5000 HP zarar beradi.
Qora tig', qizil chiziq, qizil yorug'lik va aura mavjud.
Do'stona NPCga zarar berilmaydi.
Siz: 1200 HP, 100 himoya, boshlang'ich Lv. 1.
HP: 200 / 500 / 760 / 1000 / 4000 / 8000 (D iblis) / 20000 (dev).
Tegishli XP: 20 / 40 / 65 / 90 / 220 / 400 / 1000.
Keyingi level uchun 100 + (joriy level - 1) * 60 XP kerak.
Lv/XP/kill soni shu brauzerning localStorage xotirasida saqlanadi.
Zaif zarbada 10, kuchli zarbada 50 himoya sarflanadi.
Sarflangan himoya zararning shuncha qismini yutadi, qolgani HPga tushadi.
Masalan 100 zarar + 10 himoya sarfi = 90 HP yo'qotish.
Himoya 0 bo'lsa zarar to'liq HPdan ketadi.
O'limda 5 soniya sanaladi, keyin qasr oldiga qaytiladi;
1200 HP va 100 himoya tiklanadi, XP saqlanadi.
Dushman HPsi faqat unga zarba berganingizda vaqtincha ko'rinadi.

STATUS / PERSONAJ
F1 — statusni ochish/yopish: portret, HP, XP, Lv, himoya, qilich zarari.
V — birinchi / uchinchi shaxs kamerasi.
3D avatar: yuborilgan portretdan ilhomlangan oq soch, qizg'ish ko'z,
oq hudi, qora shim. Bu portretning aynan 1:1 modeli emas.
Status ochiq paytda jang va o'yinchi harakati to'xtaydi.
Portret fayl ichida, internet yoki tashqi API talab qilinmaydi.
F uchish rejimi sinov uchun qoldirilgan.

YANGI FAYLLAR
forest.js — himoya devori, ko'priklar, o'rmon va olovlar.
combat.js — jang, dushmanlar, avatar, HP/XP, status, qayta tirilish.
player-assets.js — ichiga joylangan foydalanuvchi portreti.

04 — TELEFON VA PC BOSHQARUVI
PC: avvalgi klaviatura/sichqoncha; sensorli tugmalar ko'rinmaydi.
Android/iPhone/iPad: chap joystik — yurish; olam ustida barmoqni surish — qarash.
Zarba, Sakrash, Yugurish (yoqish/o'chirish), Status, Suhbat, Kamera,
Uchish, Pastga, Qishloq tugmalari ekranda chiqadi.
Bir nechta barmoq bilan yurish, qarash va jang qilish mumkin.
Telefon: yengil grafika avtomatik. Yonboshlatib o'ynash qulayroq.
ZIPni avval ochib/ajratib oling. index.html mustaqil fayl — barcha resurslar ichida.
Android fayl menejerida HTMLni brauzer bilan oching; ichki fayl-preview dasturi
JavaScriptni bloklasa, Chrome bilan ochish yoki fayllarni web hostingga joylash kerak.
Mobil boshqaruv Chromium mobil emulyatsiyasida tekshirildi; haqiqiy telefon tezligi
qurilmaga bog'liq. Telefonning mahalliy HTML ochish imkoniyati ilovaga bog'liq.
