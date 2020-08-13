<?= $this->extend('layout/template'); ?>
<?= $this->section('content'); ?>
<!-- Main content -->

<section class="content">
  <div class="container">


    <div class="row">
      <div class="col-6">
        <div class="card-body">

          <form class="form-horizontal" action="/lakip/save" method="post" enctype="multipart/form-data">
            <?= csrf_field(); ?>

            <div class="form-group row">
              <label for="nama" class="col-sm-2 col-form-label">Nama</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="nama" name="nama" autofocus value="<?= old('nama'); ?>">
                <div class="invalid-feedback">
                  <?= $validation->getError('nama'); ?>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="alamat" class="col-sm-2 col-form-label">Alamat</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="alamat" name="alamat" placeholder="alamat"
                  value="<?= old('alamat'); ?>">
                <div class="invalid-feedback">
                  <?= $validation->getError('alamat'); ?>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="kodeqr" class="col-sm-2 col-form-label">Kode QR</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="kodeqr" name="kodeqr" placeholder="kodeqr"
                  value="<?= old('kodeqr'); ?>">
                <div class="invalid-feedback">
                  <?= $validation->getError('kodeqr'); ?>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="offset-sm-2 col-sm-10">
                <button type="submit" class="btn btn-sm btn-danger"><i class="far fa-save"></i>
                  Save</button>
                <button type="reset" class="btn btn-sm btn-primary"><i class="fas fa-undo-alt"></i> Reset</button>
              </div>
            </div>
          </form>


        </div>
      </div>
    </div>









  </div>
</section>
<?= $this->endSection(); ?>