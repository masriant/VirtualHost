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
      <div class="row no-print">
        <div class="col-12">
          <!-- <a href="<?= base_url(); ?>/lakip/print/<?= $lakip['id']; ?>" target="_blank" class="btn btn-default"><i
              class="fas fa-print"></i>
            Print</a> -->

          <a href="<?= base_url(); ?>/pdf/<?= $lakip['id']; ?>" target="_blank" class="btn btn-danger float-right"
            style="margin-right: 5px;">
            <i class="fas fa-download">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-book" fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M3.214 1.072C4.813.752 6.916.71 8.354 2.146A.5.5 0 0 1 8.5 2.5v11a.5.5 0 0 1-.854.354c-.843-.844-2.115-1.059-3.47-.92-1.344.14-2.66.617-3.452 1.013A.5.5 0 0 1 0 13.5v-11a.5.5 0 0 1 .276-.447L.5 2.5l-.224-.447.002-.001.004-.002.013-.006a5.017 5.017 0 0 1 .22-.103 12.958 12.958 0 0 1 2.7-.869zM1 2.82v9.908c.846-.343 1.944-.672 3.074-.788 1.143-.118 2.387-.023 3.426.56V2.718c-1.063-.929-2.631-.956-4.09-.664A11.958 11.958 0 0 0 1 2.82z" />
                <path fill-rule="evenodd"
                  d="M12.786 1.072C11.188.752 9.084.71 7.646 2.146A.5.5 0 0 0 7.5 2.5v11a.5.5 0 0 0 .854.354c.843-.844 2.115-1.059 3.47-.92 1.344.14 2.66.617 3.452 1.013A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.276-.447L15.5 2.5l.224-.447-.002-.001-.004-.002-.013-.006-.047-.023a12.582 12.582 0 0 0-.799-.34 12.96 12.96 0 0 0-2.073-.609zM15 2.82v9.908c-.846-.343-1.944-.672-3.074-.788-1.143-.118-2.387-.023-3.426.56V2.718c1.063-.929 2.631-.956 4.09-.664A11.956 11.956 0 0 1 15 2.82z" />
              </svg>
            </i> Generate PDF</a>
          <a href="<?= base_url(); ?>/pdf/<?= $lakip['id']; ?>" target="_blank" class="btn btn-success float-right"
            style="margin-right: 5px;">
            <i class="fas fa-download">

              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-file-spreadsheet" fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M4 1h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4z" />
                <path fill-rule="evenodd" d="M13 6H3V5h10v1zm0 3H3V8h10v1zm0 3H3v-1h10v1z" />
                <path fill-rule="evenodd" d="M5 14V6h1v8H5zm4 0V6h1v8H9z" />
              </svg>
            </i> Generate xlsx</a>

          <!-- <button type="reset" class="btn btn-sm btn-primary"><i class="fas fa-undo-alt"></i> Reset</button> -->

          <!-- <button type="button" class="btn btn-success float-right"><i class="far fa-credit-card"></i> Submit
            Payment
          </button> -->



          <!-- <button type="submit" class="btn btn-primary float-right" style="margin-right: 5px;">
            <i class="fas fa-download"></i> Generate PDF
          </button> -->

        </div>
      </div>
    </div>
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