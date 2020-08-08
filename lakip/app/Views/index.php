<!doctype html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"
    integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I" crossorigin="anonymous">
  <script>
  fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    }
  });

  $.ajax({
    url: "your url",
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  });
  </script>

  <script type="text/javascript">
  function SearchAjax() {
    var isi = $('#search_inponow').val();
    console.log(isi);
    $.ajax({
      method: 'POST',
      dataType: 'json',
      url: 'http://localhost:8080/lakip',
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
  <title>V5 Bootstrap </title>
</head>

<body>
  <div class="container">
    <h1>Bootstrap v5</h1>
    <a href="http://localhost:8080/lakip">Project</a>
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


  </div>
  <!-- Optional JavaScript -->
  <!-- Popper.js first, then Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
  </script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"
    integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/" crossorigin="anonymous">
  </script>
</body>

</html>