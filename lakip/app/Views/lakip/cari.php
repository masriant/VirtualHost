<?= $this->extend('layout/template'); ?>
<?= $this->section('content'); ?>
<!-- Main content -->
<section class="content">
  <div class="container">

    <div class="row">
      <div class="col">
        <div class="row no-print">
          <div class="col-12">
            <div class="row">
              <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-info">
                  <div class="inner">
                    <h3>150</h3>

                    <p>New Orders</p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-bag"></i>
                  </div>
                  <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                </div>
              </div>
              <!-- ./col -->
              <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-success">
                  <div class="inner">
                    <h3>53<sup style="font-size: 20px">%</sup></h3>

                    <p>Bounce Rate</p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-stats-bars"></i>
                  </div>
                  <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                </div>
              </div>
              <!-- ./col -->
              <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-warning">
                  <div class="inner">
                    <h3>44</h3>

                    <p>User Registrations</p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-person-add"></i>
                  </div>
                  <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                </div>
              </div>
              <!-- ./col -->
              <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-danger">
                  <div class="inner">
                    <h3>65</h3>

                    <p>Unique Visitors</p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-pie-graph"></i>
                  </div>
                  <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                </div>
              </div>
              <!-- ./col -->
            </div>







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
</section>
<?= $this->endSection(); ?>