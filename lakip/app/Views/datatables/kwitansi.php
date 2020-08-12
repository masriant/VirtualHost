<!-- Main content -->

<?= $this->extend('layout/template'); ?>
<?= $this->section('content'); ?>
<!-- Main content -->
<!-- <section class="content"> -->
<div class="container">
  <div class="row">
    <div class="col">
      <?php
      session_start();
      if (isset($_SESSION["mulai_waktu"])) {
        $telah_berlalu = time() - $_SESSION["mulai_waktu"];
      } else {
        $_SESSION["mulai_waktu"] = time();
        $telah_berlalu = 0;
      }
      ?>
      <script type="text/javascript" src="<?= base_url(); ?>/js/jquery-1.5.1.min.js"></script>
      <script type="text/javascript" src="<?= base_url(); ?>/js/js/jquery.countdown.js"></script>
      <div id="tempat_timer">
        <span id="timer">00 : 00 : 00</span>
      </div>
      <script type="text/javascript">
      function waktuHabis() {
        alert("selesai dikerjakan ......");
      }

      function hampirHabis(periods) {
        if ($.countdown.periodsToSeconds(periods) == 60) {
          $(this).css({
            color: "red"
          });
        }
      }
      $(function() {
        var waktu = 180; // 3 menit
        var sisa_waktu = waktu - < ? php echo $telah_berlalu ? > ;
        var longWayOff = sisa_waktu;
        $("#timer").countdown({
          until: longWayOff,
          compact: true,
          onExpiry: waktuHabis,
          onTick: hampirHabis
        });
      })
      </script>
      <style>
      #tempat_timer {
        margin: 0 auto;
        text-align: center;
      }

      #timer {
        border-radius: 7px;
        border: 2px solid gray;
        padding: 7px;
        font-size: 2em;
        font-weight: bolder;
      }
      </style>
      <script>
      var newYear = new Date();
      newYear = new Date(newYear.getFullYear() + 1, 1 - 1, 1);
      $('#defaultCountdown').countdown({
        until: newYear
      });

      $('#removeCountdown').click(function() {
        var destroy = $(this).text() === 'Remove';
        $(this).text(destroy ? 'Re-attach' : 'Remove');
        $('#defaultCountdown').countdown(destroy ? 'destroy' : {
          until: newYear
        });
      });
      </script>

      <?php



      function penyebut($nilai)
      // function penyebut()
      {

        $nilai = abs($nilai);
        $huruf = array("", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas");
        $temp = "";
        if ($nilai < 12) {
          $temp = " " . $huruf[$nilai];
        } else if ($nilai < 20) {
          $temp = "penyebut"($nilai - 10) . " belas";
        } else if ($nilai < 100) {
          $temp = "penyebut"($nilai / 10) . " puluh" . "penyebut"($nilai % 10);
        } else if ($nilai < 200) {
          $temp = " seratus" . "penyebut"($nilai - 100);
        } else if ($nilai < 1000) {
          $temp = "penyebut"($nilai / 100) . " ratus" . "penyebut"($nilai % 100);
        } else if ($nilai < 2000) {
          $temp = " seribu" . "penyebut"($nilai - 1000);
        } else if ($nilai < 1000000) {
          $temp = "penyebut"($nilai / 1000) . " ribu" . "penyebut"($nilai % 1000);
        } else if ($nilai < 1000000000) {
          $temp = "penyebut"($nilai / 1000000) . " juta" . "penyebut"($nilai % 1000000);
        } else if ($nilai < 1000000000000) {
          $temp = "penyebut"($nilai / 1000000000) . " milyar" . "penyebut"(fmod($nilai, 1000000000));
        } else if ($nilai < 1000000000000000) {
          $temp = "penyebut"($nilai / 1000000000000) . " trilyun" . "penyebut"(fmod($nilai, 1000000000000));
        }
        return $temp;
      }

      function terbilang($nilai)
      // function terbilang()
      {
        if ($nilai < 0) {
          $hasil = "minus " . trim("penyebut"($nilai));
        } else {
          $hasil = trim("penyebut"($nilai));
        }
        return $hasil;
      }

      $angka = 1530093;
      echo terbilang($angka);


      // terbilang(1000); // Seribu
      // // Use it!
      // alert(terbilang(1555987643211111) + " Rupiah");
      // console . log(terbilang(1555987643211111) + " Rupiah");
      ?>
      <hr>
      <div class="row">
        <div class="col">
          Masukkan bilangan saja : <br />
          <input type=text id="nilai">
          <button value="ubah" onclick="ubah(document.getElementById('nilai').value)">tes</button>
          <div id="hasil" />
        </div>
      </div>
    </div>
    <hr>

    <div class="row">
      <div class="col">

        <form>
          <label>Masukkan Nilai</label> <input type="text" id="terbilang-input" class="mata-uang"
            onkeyup="inputTerbilang();">
          <br />
          <br />
          <label>Hasil</label>

          <input type="text" id="terbilang-output">
          <div id="hasil" />
      </div>
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
<!-- <script>
    public enum enLanguage {
      Indonesian = 0, English = 1
    }

    public static string Greetings(enLanguage bahasa) {
      string timeSpeak = "";
      if (DateTime.Now.Hour >= 0 && DateTime.Now.Hour < 11) {
        switch (bahasa) {
          case enLanguage.Indonesian:
            timeSpeak = "pagi";
            break;

          case enLanguage.English:
            timeSpeak = "morning";
            break;
        }
      } else if (DateTime.Now.Hour >= 11 && DateTime.Now.Hour < 15) {
        switch (bahasa) {
          case enLanguage.Indonesian:
            timeSpeak = "siang";
            break;

          case enLanguage.English:
            timeSpeak = "day";
            break;
        }
      } else if (DateTime.Now.Hour >= 15 && DateTime.Now.Hour < 19) {
        switch (bahasa) {
          case enLanguage.Indonesian:
            timeSpeak = "sore";
            break;

          case enLanguage.English:
            timeSpeak = "afternoon";
            break;
        }
      } else {
        switch (bahasa) {
          case enLanguage.Indonesian:
            timeSpeak = "malam";
            break;

          case enLanguage.English:
            timeSpeak = "evening";
            break;
        }
      }

      switch (bahasa) {
        case enLanguage.Indonesian:
          timeSpeak = "Selamat " + timeSpeak;
          break;

        case enLanguage.English:
          timeSpeak = "Good " + timeSpeak;
          break;
      }

      return timeSpeak;
    }
    </script> -->
</div>
</div>

<!-- </section> -->
<?= $this->endSection(); ?>