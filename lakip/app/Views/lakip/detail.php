<?= $this->extend('layout/template'); ?>
<?= $this->section('content'); ?>
<!-- Main content -->

<!-- <section class="content"> -->
<div class="container">


  <div class="card card-solid">
    <div class="card-body pb-0">
      <div class="row d-flex align-items-stretch">
        <div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
          <div class="card bg-light">
            <div class="card-header text-muted border-bottom-0">
              Digital Strategist
            </div>
            <div class="card-body pt-0">
              <div class="row">
                <div class="col-7">
                  <h2 class="lead"><b><?= $lakip['nama']; ?></b></h2>
                  <p class="text-muted text-sm"><b>About: </b> <?= $lakip['alamat']; ?>
                  </p>
                  <ul class="ml-4 mb-0 fa-ul text-muted">
                    <li class="small"><span class="fa-li"><i class="fas fa-lg fa-building"></i></span> Address:
                      <?= $lakip['kodeqr']; ?> </li>
                    <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> Phone #:
                      <?= $lakip['kodeqr']; ?></li>
                  </ul>
                </div>
                <div class="col-5 text-center">
                  <img src="/assets/lakip.jpeg" alt="" class="img-circle img-fluid">
                </div>
              </div>
            </div>
            <div class="card-footer">
              <div class="text-right">
                <a href="<?= base_url(); ?>/lakip/edit/<?= $lakip['id']; ?>" class="btn btn-sm btn-primary">
                  <i class="fas fa-edit"></i>
                </a>
                <a href="<?= base_url(); ?>/pdf" target="_blank" class="btn btn-sm btn-warning">
                  <i class="fas fa-print"></i>
                </a>
                <a href="#" class="btn btn-sm bg-teal">
                  <i class="fas fa-comments"></i>
                </a>

                </a>
                <a href="#" class="btn btn-sm btn-primary">
                  <i class="fas fa-user"></i> View Profile
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- <div class="row">
    <div class="col">
      <caption>Hasil cari : </caption>
      <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title"><?= $lakip['nama']; ?></h5>
              <p class="card-text"><?= $lakip['alamat']; ?></p>
              <p class="card-text"><small class="text-muted"><?= $lakip['kodeqr']; ?></small><br><a
                  href="<?= base_url(); ?>/lakip/edit/<?= $lakip['id']; ?>" class="btn btn-sm btn-primary"><i
                    class="fas fa-edit"></i> Edit</a>
                <button type="reset" class="btn btn-sm btn-primary"><i class="fas fa-undo-alt"></i> Reset</button>
              </p>
            </div>
          </div>
          <div class="col-md-4">
            <img src="/assets/lakip.jpeg" class="img-circle img-fluid" width="100" alt="...">
          </div>
        </div>
      </div>
    </div>
  </div> -->

  <div class="row">
    <div class="col">
      <!-- this row will not appear when printing -->
      <div class="row no-print">
        <div class="col-12">
          <a href="<?= base_url(); ?>/lakip/print/<?= $lakip['id']; ?>" target="_blank" class="btn btn-default"><i
              class="fas fa-print"></i>
            Print</a>

          <a href="<?= base_url(); ?>/pdf/<?= $lakip['id']; ?>" target="_blank" class="btn btn-primary float-right"
            style="margin-right: 5px;">
            <i class="fas fa-download"></i> Generate PDF</a>

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







</div>
<!-- </section> -->
<?= $this->endSection(); ?>