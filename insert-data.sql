-- Döşemealtı Belediyesi - Müdürlükler ve Çalışanlar Veritabanı
-- Bu SQL dosyasını Supabase SQL Editor'de çalıştırın

-- Önce mevcut verileri temizle (opsiyonel - dikkatli kullanın!)
-- DELETE FROM calisanlar;
-- DELETE FROM mudurlukler;

-- =====================================================
-- MÜDÜRLÜKLER TABLOSU
-- =====================================================

INSERT INTO mudurlukler (name) VALUES
('NAR MASA'),
('RUHSAT VE DENETİM MÜDÜRLÜĞÜ'),
('EVRAK KAYIT'),
('ZABITA MÜDÜRLÜĞÜ'),
('GELİRLER MÜDÜRLÜĞÜ'),
('SAĞLIK İŞLERİ MÜDÜRLÜĞÜ'),
('İMAR VE ŞEHİRCİLİK MÜDÜRLÜĞÜ'),
('PLAN VE PROJE MÜDÜRLÜĞÜ'),
('BİLGİ İŞLEM MÜDÜRLÜĞÜ'),
('FEN İŞLERİ MÜDÜRLÜĞÜ'),
('MALİ HİZMETLER MÜDÜRLÜĞÜ'),
('YAZI İŞLERİ MÜDÜRLÜĞÜ'),
('BASIN YAYIN VE HALKLA İLİŞKİLER MÜDÜRLÜĞÜ'),
('DESTEK HİZMETLER MÜDÜRLÜĞÜ'),
('İNSAN KAYNAKLARI VE EĞİTİM MÜDÜRLÜĞÜ'),
('EMLAK VE İSTİMLAK MÜDÜRLÜĞÜ'),
('MUHTARLIK İŞLERİ MÜDÜRLÜĞÜ'),
('FEN İŞLERİ MÜDÜRLÜĞÜ (KAZI RUHSAT)'),
('ÖZEL KALEM MÜDÜRLÜĞÜ'),
('İKLİM DEĞİŞİKLİĞİ VE SIFIR ATIK'),
('AFET İŞLERİ MÜDÜRLÜĞÜ'),
('HUKUK İŞLERİ MÜDÜRLÜĞÜ'),
('DİĞER') -- Güvenlik, Çay ocağı, Araç Havuz gibi özel alanlar için
ON CONFLICT DO NOTHING;

-- =====================================================
-- ÇALIŞANLAR TABLOSU
-- =====================================================

INSERT INTO calisanlar (name) VALUES
-- NAR MASA
('1001 - Suzan Ayaz'),
('1002 - Emine Aysel Atalık'),
('1003 - Deniz ERBİ'),
('1010 - Süleyman Çakan'),
('1011 - Gökhan Gökçe'),
('1012 - Ebru İpek Akay'),
('1013 - Havvanur Tekin'),
('1014 - Ceren Oğuz'),
('1015 - Berkay Nizam'),

-- RUHSAT VE DENETİM MÜDÜRLÜĞÜ
('1020 - Halil İbrahim Karacin'),
('1021 - Olcay Altun'),
('1022 - Cem Şahin'),
('1023 - İsmet Tolu'),
('1023 - Elif Küçüktekin'),
('1024 - Hidayet Ayverdi'),
('1024 - Büşra Selin Kepenek'),
('1025 - Merve Kıvrak'),
('1025 - Merdan Akpınar'),
('1026 - Bayram Ünal'),
('1027 - Bilal Aktaş'),

-- EVRAK KAYIT
('1030 - Zeliha Yenicil'),

-- ZABITA MÜDÜRLÜĞÜ
('1040 - Tarkan Gümüş'),
('1041 - Sebahattin Ekiz'),
('1042 - Tuna Özdemir'),
('1043 - İlkay Bahşi'),
('1043 - Özbek Yılmaz'),
('1044 - Ali Çetin'),
('1046 - Tahsin Kayapınar'),
('1048 - Güvenlik'),

-- GELİRLER MÜDÜRLÜĞÜ
('1060 - Ramazan Yanar'),
('1061 - İrfan Kaşlı'),
('1062 - Doğan Özen'),
('1062 - Umut Ördem'),
('1063 - Durmuş Gürkan'),
('1063 - Oğuzhan Fırat'),
('1064 - Osman Yanar'),
('1064 - Hasibe Tosun'),
('1065 - Recai Kara'),
('1065 - Bekir Arıca'),
('1066 - Abdurrahman Dal'),
('1066 - Nurgül Günay'),
('1067 - Mehmet Tatlı'),

-- SAĞLIK İŞLERİ MÜDÜRLÜĞÜ
('1070 - Fatmana Tıraş Türker'),
('1071 - Fatma İnce'),
('1072 - Ahmet Altıner'),
('1073 - Süleyman Serhat Acar'),
('1074 - Serpil Üneş'),
('1075 - Merve Balcak'),
('1085 - Araç Havuz'),
('1095 - Zemin Kat Çay ocağı'),

-- İMAR VE ŞEHİRCİLİK MÜDÜRLÜĞÜ
('1100 - Sevgi Uzunoğlu'),
('1101 - Hayrettin Bahşi'),
('1102 - Sezen Küçükbaşkan'),
('1103 - Baki Uzunoğlu'),
('1104 - Fulya Barut'),
('1105 - Hale Fırat'),
('1106 - Enver Altundağ'),
('1107 - Mehmet Solaklar'),
('1108 - Hayriye Dölen Sönmez'),
('1109 - Hacer Büyükşahin'),
('1110 - Nurten Yağan'),
('1111 - Ümit Küçükçakal'),
('1112 - Ayşe Böcek Gökçe'),
('1113 - Helin Şahika Barut'),
('1114 - İbrahim Akan'),
('1115 - Salih Saçkan'),
('1116 - Serap Erkuş'),
('1117 - Seher Ataseven'),
('1118 - İsmail Kalkay'),
('1119 - Bayram Kalın'),
('1120 - Mehmet Ali Gökmen'),
('1121 - Mustafa Tatlı'),

-- PLAN VE PROJE MÜDÜRLÜĞÜ
('1130 - Meral Tekşan'),
('1140 - Mustafa Yıldırım'),
('1132 - Hakan Çiloğlu'),
('1133 - Rabia Cebeci'),
('1134 - Fatma Öztürk'),
('1135 - Süleyman Dukluk'),
('1136 - Hanife Özkan'),
('1137 - Özlem Görücü'),
('1138 - Emel Parlak'),
('1365 - Merve Keklik'),
('1366 - Mehtap Çelik'),
('1367 - Barış Yönter'),
('1368 - Ali İhsan Topçu'),

-- BİLGİ İŞLEM MÜDÜRLÜĞÜ
('1150 - Adile Cebeci'),
('1151 - Hüseyin Acay'),
('1152 - Selman Karadağ'),
('1153 - Rauf Kurt'),
('1154 - Can Gürses'),
('1155 - Ahmet Özkan'),

-- FEN İŞLERİ MÜDÜRLÜĞÜ
('1170 - Ezgi Nur Akça'),
('1171 - Harun Erbi'),
('1172 - Erdi Bahşi'),
('1173 - Aydın Kıvrım'),
('1173 - Eray Dinsel'),
('1174 - Halil Kolak'),
('1174 - Furkan Akın'),
('1175 - Alparslan Şahin'),
('1176 - Melda Sapmaz'),
('1177 - Azize Zenkin'),
('1178 - Pınar Sedef Ünal'),
('1179 - Yasin Tekeli'),
('1180 - Halil Çelik'),
('1195 - 1. kat Çay ocağı'),

-- MALİ HİZMETLER MÜDÜRLÜĞÜ
('1200 - Cansel Güneş'),
('1201 - Rabia Uysal'),
('1202 - Adem Erkuş'),
('1203 - Hayal Yurtseven'),
('1204 - Muzaffer Yurtseven'),
('1205 - Ayşe Kübra Yüztaş'),
('1206 - Binnur Uygur'),
('1207 - Tuğba Erdil'),
('1208 - Arif Bahşi'),
('1209 - Ummani Türkmenoğlu'),
('1210 - Emre Alkan'),
('1211 - Havva Keser'),
('1212 - Ali Şekerli'),

-- YAZI İŞLERİ MÜDÜRLÜĞÜ
('1220 - Mustafa Aldemir'),
('1221 - Nadire Özdemir'),
('1222 - Mehmet Ali Tunç'),
('1223 - Erçin Ulukaya'),
('1224 - Çiğdem Ayhan Tosun'),

-- BASIN YAYIN VE HALKLA İLİŞKİLER MÜDÜRLÜĞÜ
('1230 - Figen Yurtseven'),
('1231 - Eylem İmir'),
('1232 - Suna Uysal'),
('1233 - Ahmet Karbuz'),
('1234 - Arif Tom'),
('1235 - Zeynep Doğan'),

-- DESTEK HİZMETLER MÜDÜRLÜĞÜ
('1240 - Erkan Şimşek'),
('1241 - Mehmet Kara'),
('1242 - Hatice Yıldıran'),
('1243 - Selçuk Öcü'),
('1244 - Melek İnce'),
('1245 - Oğuz Taşar'),
('1246 - Harun Önkal'),
('1247 - Esma İnce'),
('1248 - Gülfem Durak'),
('1320 - Mehmet Akif Karabay'),
('1321 - Temel Yetim'),

-- İNSAN KAYNAKLARI VE EĞİTİM MÜDÜRLÜĞÜ
('1260 - Özlem Akın'),
('1261 - Neslihan Baygül'),
('1262 - Derya Akın'),
('1262 - Ramazan Küçükbaşkan'),
('1263 - Mürüvvet Yılmaz'),
('1264 - Eda Deke'),
('1264 - Murat Çankaya'),
('1265 - Murat Yaldız'),
('1265 - İsmail Yıldız'),

-- EMLAK VE İSTİMLAK MÜDÜRLÜĞÜ
('1270 - Hüseyin Sivri'),
('1271 - Arif Çini'),
('1272 - Yalçın Kaya'),
('1273 - Ramazan Boz'),

-- MUHTARLIK İŞLERİ MÜDÜRLÜĞÜ
('1280 - Kadir Çıra'),
('1281 - Sevgi Çiçekdağı'),
('1282 - Gülsüm Karataş'),

-- FEN İŞLERİ MÜDÜRLÜĞÜ (KAZI RUHSAT)
('1290 - Alper Yerli'),
('1291 - Zafer Koyuncu'),
('1295 - 2. kat Çay ocağı'),

-- ÖZEL KALEM MÜDÜRLÜĞÜ
('1300 - Müfettiş Odası'),
('1305 - Hüsnü Şahin'),
('1306 - Dilek Küçükbaşkan'),
('1325 - Özel kalem odası'),
('1330 - Ezgi Çot'),
('1335 - Meclis üyesi Sekreteri'),
('1336 - Meclis Üyeleri Odası'),
('1350 - Esra Çil'),
('1352 - Ömer Kıvrak'),
('1355 - Emine Alkan'),
('1357 - Hakan Bilgi'),
('1360 - Hanife Acar'),
('1362 - Cavit Aktar'),
('1400 - Nilüfer Öztürk'),
('1402 - Raziye Şimşek'),
('1403 - Ömer Dereli'),
('1404 - Başkan'),
('1405 - 4.kat Çay ocağı'),

-- İKLİM DEĞİŞİKLİĞİ VE SIFIR ATIK
('1310 - Emre İpek'),
('1311 - Kübra Tat'),

-- AFET İŞLERİ MÜDÜRLÜĞÜ
('1315 - İbrahim Tekşan'),

-- HUKUK İŞLERİ MÜDÜRLÜĞÜ
('1340 - Ramazan Dönmez'),
('1341 - Rahime Deke'),
('1342 - Ümit Tutar'),
('1343 - Abdullah Gümüş'),

-- DİĞER
('1395 - 3.kat Çay ocağı')

ON CONFLICT DO NOTHING;

-- =====================================================
-- VERİ KONTROLÜ
-- =====================================================

-- Müdürlük sayısını kontrol et
SELECT COUNT(*) as mudurluk_sayisi FROM mudurlukler;

-- Çalışan sayısını kontrol et
SELECT COUNT(*) as calisan_sayisi FROM calisanlar;

-- Tüm müdürlükleri listele
SELECT * FROM mudurlukler ORDER BY name;

-- Tüm çalışanları listele (ilk 50)
SELECT * FROM calisanlar ORDER BY name LIMIT 50;
