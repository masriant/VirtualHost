/*! Copyright (c) 2016 Naufal Rabbani (https://github.com/BosNaufal/terbilang-js)
 * Licensed Under MIT (http://opensource.org/licenses/MIT)
 *
 * Version 0.0.1
 *
 * Inspired By: http://notes.rioastamal.net/2012/03/membuat-fungsi-terbilang-pada-php.html
 */

function terbilang(a) {
  var bilangan = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh', 'Sebelas'];

  // 1 - 11
  if (a < 12) {
    var kalimat = bilangan[a];
  }
  // 12 - 19
  else if (a < 20) {
    var kalimat = bilangan[a - 10] + ' Belas';
  }
  // 20 - 99
  else if (a < 100) {
    var utama = a / 10;
    var depan = parseInt(String(utama).substr(0, 1));
    var belakang = a % 10;
    var kalimat = bilangan[depan] + ' Puluh ' + bilangan[belakang];
  }
  // 100 - 199
  else if (a < 200) {
    var kalimat = 'Seratus ' + terbilang(a - 100);
  }
  // 200 - 999
  else if (a < 1000) {
    var utama = a / 100;
    var depan = parseInt(String(utama).substr(0, 1));
    var belakang = a % 100;
    var kalimat = bilangan[depan] + ' Ratus ' + terbilang(belakang);
  }
  // 1,000 - 1,999
  else if (a < 2000) {
    var kalimat = 'Seribu ' + terbilang(a - 1000);
  }
  // 2,000 - 9,999
  else if (a < 10000) {
    var utama = a / 1000;
    var depan = parseInt(String(utama).substr(0, 1));
    var belakang = a % 1000;
    var kalimat = bilangan[depan] + ' Ribu ' + terbilang(belakang);
  }
  // 10,000 - 99,999
  else if (a < 100000) {
    var utama = a / 100;
    var depan = parseInt(String(utama).substr(0, 2));
    var belakang = a % 1000;
    var kalimat = terbilang(depan) + ' Ribu ' + terbilang(belakang);
  }
  // 100,000 - 999,999
  else if (a < 1000000) {
    var utama = a / 1000;
    var depan = parseInt(String(utama).substr(0, 3));
    var belakang = a % 1000;
    var kalimat = terbilang(depan) + ' Ribu ' + terbilang(belakang);
  }
  // 1,000,000 - 	99,999,999
  else if (a < 100000000) {
    var utama = a / 1000000;
    var depan = parseInt(String(utama).substr(0, 4));
    var belakang = a % 1000000;
    var kalimat = terbilang(depan) + ' Juta ' + terbilang(belakang);
  } else if (a < 1000000000) {
    var utama = a / 1000000;
    var depan = parseInt(String(utama).substr(0, 4));
    var belakang = a % 1000000;
    var kalimat = terbilang(depan) + ' Juta ' + terbilang(belakang);
  } else if (a < 10000000000) {
    var utama = a / 1000000000;
    var depan = parseInt(String(utama).substr(0, 1));
    var belakang = a % 1000000000;
    var kalimat = terbilang(depan) + ' Milyar ' + terbilang(belakang);
  } else if (a < 100000000000) {
    var utama = a / 1000000000;
    var depan = parseInt(String(utama).substr(0, 2));
    var belakang = a % 1000000000;
    var kalimat = terbilang(depan) + ' Milyar ' + terbilang(belakang);
  } else if (a < 1000000000000) {
    var utama = a / 1000000000;
    var depan = parseInt(String(utama).substr(0, 3));
    var belakang = a % 1000000000;
    var kalimat = terbilang(depan) + ' Milyar ' + terbilang(belakang);
  } else if (a < 10000000000000) {
    var utama = a / 10000000000;
    var depan = parseInt(String(utama).substr(0, 1));
    var belakang = a % 10000000000;
    var kalimat = terbilang(depan) + ' Triliun ' + terbilang(belakang);
  } else if (a < 100000000000000) {
    var utama = a / 1000000000000;
    var depan = parseInt(String(utama).substr(0, 2));
    var belakang = a % 1000000000000;
    var kalimat = terbilang(depan) + ' Triliun ' + terbilang(belakang);
  } else if (a < 1000000000000000) {
    var utama = a / 1000000000000;
    var depan = parseInt(String(utama).substr(0, 3));
    var belakang = a % 1000000000000;
    var kalimat = terbilang(depan) + ' Triliun ' + terbilang(belakang);
  } else if (a < 10000000000000000) {
    var utama = a / 1000000000000000;
    var depan = parseInt(String(utama).substr(0, 1));
    var belakang = a % 1000000000000000;
    var kalimat = terbilang(depan) + ' Kuadriliun ' + terbilang(belakang);
  }

  var pisah = kalimat.split(' ');
  var full = [];
  for (var i = 0; i < pisah.length; i++) {
    if (pisah[i] != "") {
      full.push(pisah[i]);
    }
  }
  return full.join(' ');
}

function terbilang(bilangan) {

  bilangan = String(bilangan);
  var angka = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
  var kata = new Array('', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan');
  var tingkat = new Array('', 'Ribu', 'Juta', 'Milyar', 'Triliun');

  var panjang_bilangan = bilangan.length;

  /* pengujian panjang bilangan */
  if (panjang_bilangan > 15) {
    kaLimat = "Diluar Batas";
    return kaLimat;
  }

  /* mengambil angka-angka yang ada dalam bilangan, dimasukkan ke dalam array */
  for (i = 1; i <= panjang_bilangan; i++) {
    angka[i] = bilangan.substr(-(i), 1);
  }

  i = 1;
  j = 0;
  kaLimat = "";


  /* mulai proses iterasi terhadap array angka */
  while (i <= panjang_bilangan) {

    subkaLimat = "";
    kata1 = "";
    kata2 = "";
    kata3 = "";

    /* untuk Ratusan */
    if (angka[i + 2] != "0") {
      if (angka[i + 2] == "1") {
        kata1 = "Seratus";
      } else {
        kata1 = kata[angka[i + 2]] + " Ratus";
      }
    }

    /* untuk Puluhan atau Belasan */
    if (angka[i + 1] != "0") {
      if (angka[i + 1] == "1") {
        if (angka[i] == "0") {
          kata2 = "Sepuluh";
        } else if (angka[i] == "1") {
          kata2 = "Sebelas";
        } else {
          kata2 = kata[angka[i]] + " Belas";
        }
      } else {
        kata2 = kata[angka[i + 1]] + " Puluh";
      }
    }

    /* untuk Satuan */
    if (angka[i] != "0") {
      if (angka[i + 1] != "1") {
        kata3 = kata[angka[i]];
      }
    }

    /* pengujian angka apakah tidak nol semua, lalu ditambahkan tingkat */
    if ((angka[i] != "0") || (angka[i + 1] != "0") || (angka[i + 2] != "0")) {
      subkaLimat = kata1 + " " + kata2 + " " + kata3 + " " + tingkat[j] + " ";
    }

    /* gabungkan variabe sub kaLimat (untuk Satu blok 3 angka) ke variabel kaLimat */
    kaLimat = subkaLimat + kaLimat;
    i = i + 3;
    j = j + 1;

  }

  /* mengganti Satu Ribu jadi Seribu jika diperlukan */
  if ((angka[5] == "0") && (angka[6] == "0")) {
    kaLimat = kaLimat.replace("Satu Ribu", "Seribu");
  }

  return kaLimat + "Rupiah";
}

var daftarAngka = new Array("", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan");

function terbilang(nilai) {
  var temp = '';
  var hasilBagi, sisaBagi;
  //batas untuk ribuan
  var batas = 3;
  //untuk menentukan ukuran array, jumlahnya sesuaikan dengan jumlah anggota dari array gradeNilai[]
  var maxBagian = 5;
  var gradeNilai = new Array("", "ribu", "juta", "milyar", "triliun");
  //cek apakah ada angka 0 didepan ==> 00098, harus diubah menjadi 98
  nilai = this.hapusNolDiDepan(nilai);
  var nilaiTemp = ubahStringKeArray(batas, maxBagian, nilai);
  //ubah menjadi bentuk terbilang
  var j = nilai.length;
  //menentukan batas array
  var banyakBagian = (j % batas) == 0 ? (j / batas) : Math.round(j / batas + 0.5);
  var h = 0;
  for (var i = banyakBagian - 1; i >= 0; i--) {
    var nilaiSementara = parseInt(nilaiTemp[h]);
    if (nilaiSementara == 1 && i == 1) {
      temp += "seribu ";
    } else {
      temp += this.ubahRatusanKeHuruf(nilaiTemp[h]) + " ";
      // cek apakah string bernilai 000, maka jangan tambahkan gradeNilai[i]
      if (nilaiTemp[h] != "000") {
        temp += gradeNilai[i] + " ";
      }
    }
    h++;
  }
  return temp;
}

function ubahStringKeArray(batas, maxBagian, kata) {
  // maksimal 999 milyar
  var temp = new Array(maxBagian);
  var j = kata.length;
  //menentukan batas array
  var banyakBagian = (j % batas) == 0 ? (j / batas) : Math.round(j / batas + 0.5);
  for (var i = banyakBagian - 1; i >= 0; i--) {
    var k = j - batas;
    if (k < 0) k = 0;
    temp[i] = kata.substring(k, j);
    j = k;
    if (j == 0)
      break;
  }
  return temp;
}

function ubahRatusanKeHuruf(nilai) {
  //maksimal 3 karakter 
  var batas = 2;
  //membagi string menjadi 2 bagian, misal 123 ==> 1 dan 23
  var maxBagian = 2;
  var temp = this.ubahStringKeArray(batas, maxBagian, nilai);
  var j = nilai.length;
  var hasil = "";
  //menentukan batas array
  var banyakBagian = (j % batas) == 0 ? (j / batas) : Math.round(j / batas + 0.5);
  for (var i = 0; i < banyakBagian; i++) {
    //cek string yang memiliki panjang lebih dari satu ==> belasan atau puluhan
    if (temp[i].length > 1) {
      //cek untuk yang bernilai belasan ==> angka pertama 1 dan angka kedua 0 - 9, seperti 11,16 dst
      if (temp[i].charAt(0) == '1') {
        if (temp[i].charAt(1) == '1') {
          hasil += "sebelas";
        } else if (temp[i].charAt(1) == '0') {
          hasil += "sepuluh";
        } else hasil += daftarAngka[temp[i].charAt(1) - '0'] + " belas ";
      }
      //cek untuk string dengan format angka  pertama 0 ==> 09,05 dst
      else if (temp[i].charAt(0) == '0') {
        hasil += daftarAngka[temp[i].charAt(1) - '0'];
      }
      //cek string dengan format selain angka pertama 0 atau 1
      else
        hasil += daftarAngka[temp[i].charAt(0) - '0'] + " puluh " + daftarAngka[temp[i].charAt(1) - '0'];
    } else {
      //cek string yang memiliki panjang = 1 dan berada pada posisi ratusan
      if (i == 0 && banyakBagian != 1) {
        if (temp[i].charAt(0) == '1')
          hasil += " seratus ";
        else if (temp[i].charAt(0) == '0')
          hasil += " ";
        else hasil += daftarAngka[parseInt(temp[i])] + " ratus ";
      }
      //string dengan panjang satu dan tidak berada pada posisi ratusan ==> satuan
      else hasil += daftarAngka[parseInt(temp[i])];
    }
  }
  return hasil;
}

function hapusNolDiDepan(nilai) {
  while (nilai.indexOf("0") == 0) {
    nilai = nilai.substring(1, nilai.length);
  }
  return nilai;
}