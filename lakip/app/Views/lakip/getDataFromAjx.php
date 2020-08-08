<?= $this->extend('layout/template'); ?>
<?= $this->section('content'); ?>
<!-- Main content -->
<script type="text/javascript">
function SearchAjax() {
  var isi = $('#search_inponow').val();
  console.log(isi);
  $.ajax({
    method: 'POST',
    dataType: 'json',
    url: 'http://localhost:8080/lakip/getDataFromAjx',
    data: {
      input_ajx: isi
    },
    success: function(result) {
      console.log(result);
      if (result == '') {
        $("h6").remove();
        $("h5").remove();
        $("br").remove();
        var isivalue = "<h6 style='border:2px solid #fb1732;'> Tidak Ada di Database ;)</h6><br>";
        $(".hasilSearch").append(isivalue);
      } else {
        $("h6").remove();
        $("h5").remove();
        $("br").remove();
        for (var i = 0; i < result.length; i++) {
          var isivalue = "<h5 style='border-bottom:1px solid #878787;margin-top:20px;'>" + result[i].nama +
            " | " + result[i].jurusan + "</h5><br>";
          $(".hasilSearch").append(isivalue);
        }
      }
    }
  })
}
</script>
<!-- <section class="content"> -->
<div class="container">
  <div class="row">
    <div class="col-6">
      <form action="" method="_POST">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Cari data..." id="myInput" name="keyword" autofocus
            autocomplete="off">
          <!-- <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit" name="submit">Cari</button>
          </div> -->
        </div>
      </form>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="container" style="margin-top:100px;">
        <h1>Ambil Data dengan AJAX Jquery (Inponow Tutorial)</h1>
      </div> <br>
      <div class="container">
        <div class="input-group"> <input type="text" name="keyword" class="form-control" id="search_inponow"
            placeholder="Cari data ?">
          <div class="input-group-append"> <button type="button" class="btn btn-primary" name="button"
              onclick="SearchAjax()">Search</button> </div>
        </div>
        <div class="row" style="margin-top:40px;">
          <div class="col-md-1"></div>
          <div class="col-md-10"> <b>Hasil Penelusuran :</b> <br> <br> <br>
            <div class="hasilSearch">
              <!-- element ini digunakan untuk memunculkan element yang di Request dari ajax -->
            </div>
          </div>
          <div class="col-md-1"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="table-responsive{-sm|-md|-lg|-xl|-xxl}">
        <caption>Hasil cari : </caption>
        <!-- <table class="table table-bordered table-hover caption-top">
          <thead class="table-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
              <th scope="col">Alamat</th>
              <th scope="col">Kode</th>
              <th scope="col">Detail</th>
            </tr>
          </thead>
          <tbody id="myTable">

            <?php $i = 1; ?>
            <?php foreach ($lakip as $k) : ?>
            <tr>
              <td><?= $i++; ?></td>
              <td><?= $k['nama']; ?></td>
              <td><?= $k['alamat']; ?></td>
              <td><?= $k['kodeqr']; ?></td>
              <td>
                <a href="detail.php?id=<?= $k['id']; ?>" class="btn btn-sm btn-success"><i class="fa fa-id-card"></i>
                  Detail</a>
                <a href="" class="btn btn-sm btn-primary"><i class="fas fa-edit"></i> Edit</a>
              </td>
            </tr>
            <?php endforeach; ?>

          </tbody>
        </table> -->

      </div>
    </div>
  </div>







</div>
<!-- </section> -->
<?= $this->endSection(); ?>