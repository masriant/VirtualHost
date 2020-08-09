<!-- Main content -->
<?= $this->extend('layout/print'); ?>
<?= $this->section('content'); ?>
<!-- Main content -->

<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">



        <!-- Main content -->
        <div class="invoice p-3 mb-3">
          <!-- title row -->
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
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Qty</th>
                    <th>Product</th>
                    <th>Serial #</th>
                    <th>Description</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Call of Duty</td>
                    <td>455-981-221</td>
                    <td>El snort testosterone trophy driving gloves handsome</td>
                    <td>$64.50</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Need for Speed IV</td>
                    <td>247-925-726</td>
                    <td>Wes Anderson umami biodiesel</td>
                    <td>$50.00</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Monsters DVD</td>
                    <td>735-845-642</td>
                    <td>Terry Richardson helvetica tousled street art master</td>
                    <td>$10.70</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Grown Ups Blue Ray</td>
                    <td>422-568-642</td>
                    <td>Tousled lomo letterpress</td>
                    <td>$25.99</td>
                  </tr>
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

          <!-- this row will not appear when printing -->
          <div class="row no-print">
            <div class="col-12">
              <a href="<?= base_url(); ?>/lakip/printer/<?= $lakip['id']; ?>" class="btn btn-default"><i
                  class="fas fa-print"></i>
                Print</a>
              <!-- <button type="button" class="btn btn-success float-right"><i class="far fa-credit-card"></i> Submit
                Payment
              </button>
              <button type="button" class="btn btn-primary float-right" style="margin-right: 5px;">
                <i class="fas fa-download"></i> Generate PDF
              </button> -->
            </div>
          </div>
        </div>
        <!-- /.invoice -->
      </div><!-- /.col -->
    </div><!-- /.row -->
  </div><!-- /.container-fluid -->
</section>


<!-- <script type="text/javascript">
window.addEventListener("load", window.print());
</script> -->




<?= $this->endSection(); ?>