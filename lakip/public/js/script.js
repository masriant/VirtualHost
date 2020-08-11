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


$('#myTable').DataTable({
  ajax: '/api/staff',
  dom: 'Bfrtip',
  columns: [{
      data: 'first_name'
    },
    {
      data: 'last_name'
    },
    // etc
  ],
  select: true,
  buttons: [{
      extend: 'create',
      editor: editor
    },
    {
      extend: 'edit',
      editor: editor
    },
    {
      extend: 'remove',
      editor: editor
    }
  ]
});

new $.fn.dataTable.Editor({
  ajax: '/api/staff',
  table: '#staff'
});

new $.fn.dataTable.Editor({
  ajax: '/api/staff',
  table: '#staff',
  display: 'envelope'
});

$.extend(true, $.fn.dataTable.Editor.defaults, {
  ajax: '/api/staff',
  formOptions: {
    inline: {
      onBlur: true
    }
  }
});


var editor = new $.fn.dataTable.Editor({
  ajax: "php/users.php",
  table: "#users",
  fields: [{
      label: "First name:",
      name: "first_name"
    },
    {
      label: "Last name:",
      name: "last_name"
    },
    {
      label: "Approved:",
      name: "approved"
    }
  ]
});

var table = $('#users').DataTable({
  dom: "Bfrtip",
  ajax: "php/users.php",
  columns: [{
      data: "first_name"
    },
    {
      data: "last_name"
    },
    {
      data: "approved"
    }
  ],
  select: true,
  buttons: [{
      extend: "create",
      editor: editor
    },
    {
      extend: "edit",
      editor: editor
    },
    {
      extend: "remove",
      editor: editor
    }
  ]
});

$('#users').on('click', 'tbody td', function () {
  editor.inline(this);
});

$('#approve').on('click', function () {
  editor
    .edit(table.rows({
      selected: true
    }).indexes(), false)
    .val('approved', 1)
    .submit();
});

editor.on('open', function (e, type) {
  // Type is 'main', 'bubble' or 'inline'
  alert('Editor ' + type + ' form shown');
});

var openVals;
editor
  .on('open', function (e, type) {
    openVals = JSON.stringify(editor.get());
  })
  .on('preBlur', function (e) {
    if (openVals !== JSON.stringify(editor.get())) {
      return confirm('You have unsaved changes. Are you sure you want to exit?');
    }
  });

editor
  .on('open.ns1', function (e, type) {
    alert('Editor form displayed - namespace 1');
  })
  .on('open.ns2', function (e, type) {
    alert('Editor form displayed - namespace 2');
  });

// Then, sometime later, remove the first namespace:
editor.off('open.ns1');

$('#myTable').DataTable({
  responsive: true
});

$('#example').DataTable({
  responsive: true
});

$('#example').DataTable({
  responsive: {
    details: false
  }
});



// table = $('#table_02').DataTable({
//   // "order": [],
//   "processing": true,
//   "serverSide": true,
//   "ajax": {
//     "url": "<?php echo site_url('Data/listdata'); ?>",
//     // "dataSrc": 'staff',
//     "type": "POST",

//   },
//   "columnDefs": [{
//     "targets": [0],
//     "orderable": false
//   }]
// });

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