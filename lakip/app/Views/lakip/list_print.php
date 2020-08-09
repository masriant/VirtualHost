<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Invoice Print</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Bootstrap 4 -->

  <!-- Font Awesome -->
  <link rel="stylesheet" href="<?= base_url(); ?>/template/plugins/fontawesome-free/css/all.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="<?= base_url(); ?>/template/dist/css/adminlte.min.css">

  <!-- Google Font: Source Sans Pro -->
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
</head>

<body>
  <div class="wrapper">
    <!-- Main content -->
    <section class="invoice">

      <div class="row">
        <div class="col-12">
          <h4>
            <i class="fas fa-globe"></i> LAKIP
            <small class="float-right">Date: <?= date('d M Y'); ?></small>
          </h4>
        </div>
        <!-- /.col -->
      </div>
      <!-- info row -->
      <div class="row invoice-info">
        <div class="col-sm-4 invoice-col">
          From
          <address>
            <strong>LAKIP</strong><br>
            Kemayoran<br>
            Jakarta 10650<br>
            Phone: (021) 4288-5718<br>
            Email: admin@lakip.co.id
          </address>
        </div>
        <!-- /.col -->
        <div class="col-sm-4 invoice-col">
          To
          <address>
            <strong><?= $lakip['nama']; ?></strong><br>
            <?= $lakip['alamat']; ?><br>
            <!-- San Francisco, CA 94107 --><br>
            <!-- Phone: (555) 539-1037 --><br>
            <!-- Email: john.doe@example.com -->
          </address>
        </div>
        <!-- /.col -->
        <div class="col-sm-4 invoice-col">
          <b>Invoice #00<?= $lakip['id']; ?></b><br>
          <br>
          <b>Order ID:</b> <?= $lakip['kodeqr']; ?><br>
          <b>Payment Due:</b> <?= date('d M Y'); ?><br>
          <b>Account:</b> <?= date('Ym'); ?><?= $lakip['id']; ?>
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->

      <!-- Table row -->
      <div class="row">
        <div class="col-12 table-responsive">
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
        <!-- /.col -->
      </div>
      <!-- /.row -->

      <div class="row">
        <!-- accepted payments column -->
        <div class="col-6">
          <p class="lead">Payment Methods:</p>
          <img src="<?= base_url(); ?>/template/dist/img/credit/visa.png" alt="Visa">
          <img src="<?= base_url(); ?>/template/dist/img/credit/mastercard.png" alt="Mastercard">


          <p class="text-muted well well-sm shadow-none" style="margin-top: 10px;">
            Pembayaran via Bank Mandiri a.n Lembaga Administrasi Keuangan dan Ilmu Pemerintahan
          </p>
        </div>
        <!-- /.col -->
        <div class="col-6">
          <p class="lead">Jakarta, <?= date('d M Y'); ?></p>

          <div class="table-responsive">
            <table class="table">
              <tr>
                <th style="width:50%">Subtotal:</th>
                <td>$250.30</td>
              </tr>
              <tr>
                <th>Tax (9.3%)</th>
                <td>$10.34</td>
              </tr>
              <tr>
                <th>Shipping:</th>
                <td>$5.80</td>
              </tr>
              <tr>
                <th>Total:</th>
                <td>$265.24</td>
              </tr>
            </table>
          </div>
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </section>
    <!-- /.content -->
  </div>
  <!-- ./wrapper -->



  <script type="text/javascript">
  window.addEventListener("load", window.print());
  </script>
</body>

</html>