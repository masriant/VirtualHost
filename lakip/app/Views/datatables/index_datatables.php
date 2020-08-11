<!DOCTYPE html>
<html>

  <head>
    <title>Datatables</title>
    <!-- jquery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- bootstrap -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
      integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <!-- datatables -->
    <link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css">
    <script type="text/javascript" src="//cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
  </head>

  <body>
    <div class="container">
      <h2>Menampilkan Data MySql Kedalam Datatables ServerSide</h2>
      <hr>
      <table class="table" id="table_01">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Teman</th>
            <th>Alamat</th>
            <th>JenisKelamin</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>

    <script type="text/javascript">
    table = $('#table_01').DataTable({
      // "order": [],
      "processing": true,
      "serverSide": true,
      "ajax": {
        "url": "<?php echo site_url('Datatables/table_data'); ?>",
        // "dataSrc": 'staff',
        "type": "POST",

      },
      "columnDefs": [{
        "targets": [0],
        "orderable": false
      }]
    });
    </script>
  </body>

</html>