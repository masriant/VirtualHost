<?php
function penyebut($nilai)
{

  $nilai = abs($nilai);
  $huruf = array("", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas");
  $temp = "";
  if ($nilai < 12) {
    $temp = " " . $huruf[$nilai];
  } else if ($nilai < 20) {
    $temp = penyebut($nilai - 10) .
      " belas";
  } else if ($nilai < 100) {
    $temp = penyebut($nilai / 10) .
      " puluh" . penyebut($nilai % 10);
  } else if ($nilai < 200) {
    $temp = " seratus" . penyebut($nilai - 100);
  } else if ($nilai < 1000) {
    $temp = penyebut($nilai / 100) .
      " ratus" . penyebut($nilai % 100);
  } else if ($nilai < 2000) {
    $temp = " seribu" . penyebut($nilai - 1000);
  } else if ($nilai < 1000000) {
    $temp = penyebut($nilai / 1000) .
      " ribu" . penyebut($nilai % 1000);
  } else if ($nilai < 1000000000) {
    $temp = penyebut($nilai / 1000000) .
      " juta" . penyebut($nilai % 1000000);
  } else if ($nilai < 1000000000000) {
    $temp = penyebut($nilai / 1000000000) .
      " milyar" . penyebut(fmod($nilai, 1000000000));
  } else if ($nilai < 1000000000000000) {
    $temp = penyebut($nilai / 1000000000000) .
      " trilyun" . penyebut(fmod($nilai, 1000000000000));
  }
  return $temp;
}

function terbilang($nilai)
// function terbilang()
{
  if ($nilai < 0) {
    $hasil = "minus " . trim(penyebut($nilai));
  } else {
    $hasil = trim(penyebut($nilai));
  }
  return $hasil;
} ?>
<!-- Main content -->
<?= $this->extend('layout/template'); ?>
<?= $this->section('content'); ?>
<!-- Main content -->
<!-- <section class="content"> -->
<div class="container">
  <div class="row">
    <div class="col">
      <?php
      $angka = 79825645;
      echo terbilang($angka);

      ?>
    </div>
  </div>

  <hr>
  <div class="row">
    <div class="col">
      Masukkan bilangan saja : <br />
      <input type=text id="nilai">
      <button value="ubah" onclick="ubah(document.getElementById('nilai').value)">Go</button>
      <div id="hasil" />
    </div>
  </div>
</div>
<hr>

<div class="row">
  <div class="col">
    <form>
      <label>Nilai</label>
      <input type="text" id="terbilang-input" class="mata-uang" onkeyup="inputTerbilang();">
      <br />
      <!-- <br /> -->
      <label>Hasil</label>

      <input type="text" id="terbilang-output">
    </form>
  </div>
</div>
</div>
<script type="text/javascript">
function inputTerbilang() {
  //membuat inputan otomatis jadi mata uang
  $('.mata-uang').mask('0.000.000.000', {
    reverse: true
  });

  //mengambil data uang yang akan dirubah jadi terbilang
  var input = document.getElementById("terbilang-input").value.replace(/\./g, "");

  //menampilkan hasil dari terbilang
  document.getElementById("terbilang-output").value = terbilang(input).replace(/  +/g, ' ');
}
</script>

<!-- </div> -->
<!-- </div> -->

<!-- </section> -->
<?= $this->endSection(); ?>