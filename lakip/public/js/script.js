$(function () {
  $("#example1").DataTable({
    "responsive": true,
    "autoWidth": false,
  });
  $('#example2').DataTable({
    "paging": true,
    "lengthChange": false,
    "searching": false,
    "ordering": true,
    "info": true,
    "autoWidth": false,
    "responsive": true,
  });
});

// js grid: 
// $(function () {
//   $("#jsGrid1").jsGrid({
//     height: "100%",
//     width: "100%",

//     sorting: true,
//     paging: true,

//     data: db.clients,

//     fields: [{
//         name: "Name",
//         type: "text",
//         width: 150
//       },
//       {
//         name: "Age",
//         type: "number",
//         width: 50
//       },
//       {
//         name: "Address",
//         type: "text",
//         width: 200
//       },
//       {
//         name: "Country",
//         type: "select",
//         items: db.countries,
//         valueField: "Id",
//         textField: "Name"
//       },
//       {
//         name: "Married",
//         type: "checkbox",
//         title: "Is Married"
//       }
//     ]
//   });
// });

// previewImg
function previewImg() {

  const sampul = document.querySelector('#sampul');
  const sampulLabel = document.querySelector('.custom-file-label');
  const imgPreview = document.querySelector('.img-preview');

  sampulLabel.textContent = sampul.files[0].name;

  const fileSampul = new FileReader();
  fileSampul.readAsDataURL(sampul.files[0]);

  fileSampul.onload = function (e) {
    imgPreview.src = e.target.result;
  }
}

// editor
// $(function () {
//   // Summernote
//   $('.textarea').summernote()
// })

// reset btnResetForm
// $(function () {
//   bsCustomFileInput.init();

// });

// var btn = document.getElementById('btnResetForm')
// var form = document.querySelector('form')
// btn.addEventListener('click', function () {
//   form.reset()
// });

// AJAX cari
const tombolCari = document.querySelector('.tombol-cari');
const keyword = document.querySelector('.keyword');
const container = document.querySelector('.container');

// hilangkan tombol cari
// tombolCari.style.display = 'none';

// event ketika kita menuliskan keyword
keyword.addEventListener('keyup', function () {
  // ajax
  // xmlhttprequest
  // const xhr = new XMLHttpRequest();
  // xhr.onreadystatechange = function () {
  //   if (xhr.readyState == 4 && xhr.status == 200) {
  //     container.innerHTML = xhr.responseText;
  //   }
  // };
  // xhr.open('get', 'ajax/ajax_cari.php?keyword=' + keyword.value);
  // xhr.send();

  // fetch()
  fetch('/ajax/ajax_cari.php?keyword=' + keyword.value)
    .then((response) => response.text())
    .then((response) => (container.innerHTML = response));
});

// Preview Image untuk Tambah dan Ubah
function previewImage() {
  const gambar = document.querySelector('.gambar');
  const imgPreview = document.querySelector('.img-preview');

  const oFReader = new FileReader();
  oFReader.readAsDataURL(gambar.files[0]);

  oFReader.onload = function (oFREvent) {
    imgPreview.src = oFREvent.target.result;
  };
}