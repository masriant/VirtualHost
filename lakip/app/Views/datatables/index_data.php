<!DOCTYPE html>
<html>

  <head>
    <title>Datatables</title>
    <!-- jquery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"
      integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css"
      href="https://cdn.datatables.net/v/dt/jqc-1.12.4/dt-1.10.21/b-1.6.2/sl-1.3.1/datatables.min.css" />
    <link rel="stylesheet" type="text/css" href="Editor-1.9.4/css/editor.dataTables.css">
    <script src="//cdn.datatables.net/plug-ins/1.10.21/sorting/enum.js"></script>
    <script type="text/javascript"
      src="https://cdn.datatables.net/v/dt/jqc-1.12.4/dt-1.10.21/b-1.6.2/sl-1.3.1/datatables.min.js"></script>
    <script type="text/javascript" src="Editor-1.9.4/js/dataTables.editor.js"></script>
    <link rel="stylesheet" type="text/css" href="DataTables/datatables.min.css" />
    <script type="text/javascript" src="DataTables/datatables.min.js"></script>
    <script type="text/javascript" src="jquery.dataTables.js"></script>
    <script type="text/javascript" src="jquery.dataTables.js"></script>
    <script type="text/javascript" src="dataTables.filter.range.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {
      var table = $('#example').DataTable();

      /* Add event listeners to the two range filtering inputs */
      $('#min, #max').keyup(function() {
        table.draw();
      });
    });
    </script>
    <script type="text/javascript" src="dataTables.filter.html.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {
      $('#example').dataTable({
        "columnDefs": [{
          type: "phoneNumber",
          targets: 0
        }]
      });
    });
    </script>

    <!-- bootstrap -->
    <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
      integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"> -->
    <!-- datatables -->
    <link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css">
    <script type="text/javascript" src="//cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
  </head>

  <body>
    <div class="container">
      <div class="row">
        <div class="col">
          <!-- <h2>Menampilkan Data</h2> -->
          <caption>List of users</caption>
          <div class="float-right d-none d-sm-inline-block">
            <b>Update :</b> <?= date('d M Y'); ?>
          </div>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-sm-4">
          <!-- <select class="form-select" aria-label="Default select example"> -->
          <select class="form-select form-select-sm" aria-label=".form-select-sm">
            <option selected>Open this select menu</option>
            <option value="1">2018</option>
            <option value="2">2019</option>
            <option value="3">2020</option>
          </select>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col">
          <div class="table-responsive{-sm|-md|-lg|-xl|-xxl}">
            <!-- <table class="display responsive nowrap" width="100%"> -->
            <table class="table table-responsive{-sm|-md|-lg|-xl|-xxl} table-striped table-hover align-middle"
              id="table_02">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Alamat</th>
                  <th>Kode QR</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
            <!-- </div> -->
          </div>
        </div>
      </div>

      <footer class="main-footer">
        <strong>Copyright &copy; 2018-<?= date('Y'); ?> <a href="http://lakip.co.id">Lakip.co.id</a>.</strong>
        All rights reserved.
        <div class="float-right d-none d-sm-inline-block">
          <b>Version</b> 3.0.5
        </div>
      </footer>
    </div>
    <!-- Optional JavaScript -->
    <!-- Popper.js first, then Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
      integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"
      integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/" crossorigin="anonymous">
    </script>
    <script type="text/javascript"
      src="https://cdn.datatables.net/v/dt/jqc-1.12.4/dt-1.10.21/b-1.6.2/sl-1.3.1/datatables.min.js"></script>
    <script type="text/javascript" src="Editor-1.9.4/js/dataTables.editor.js"></script>

    <!-- My  javascript -->
    <script src="<?= base_url(); ?>/js/script.js"></script>

    <script type="text/javascript">
    table = $('#table_02').DataTable({
      // "order": [],
      "processing": true,
      "serverSide": true,
      "responsive": true,
      "ajax": {
        "url": "<?php echo site_url('Data/listdata'); ?>",
        // "dataSrc": 'staff',
        "type": "POST",

      },
      "columnDefs": [{
        "targets": [0],
        "orderable": false
      }]
    });
    </script>
    <script>
    var $ = require('jquery');
    var dt = require('datatables.net')();
    var editor = require('datatables.net-editor')();
    </script>
    <script>
    var $ = require('jquery');
    var dt = require('datatables.net')(window, $);
    var editor = require('datatables.net-editor')(window, $);
    </script>
  </body>

</html>