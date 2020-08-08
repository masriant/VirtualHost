<?= $this->extend('layout/template'); ?>
<?= $this->section('content'); ?>
<!-- Main content -->
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

    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="table-responsive{-sm|-md|-lg|-xl|-xxl}">
        <caption>Hasil cari : </caption>

        <table class="table table-bordered table-hover caption-top">
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
                <a href="<?= base_url(); ?>/lakip/<?= $k['id']; ?>" class="btn btn-sm btn-success"><i
                    class="fa fa-id-card"></i>
                  Detail</a>

              </td>
            </tr>
            <?php endforeach; ?>
          </tbody>
        </table>

      </div>
    </div>
  </div>







</div>
<!-- </section> -->
<?= $this->endSection(); ?>