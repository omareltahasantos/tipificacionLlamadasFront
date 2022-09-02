
$( document ).ready(function() {
    console.log( "ready!" );
    var data = JSON.parse(sessionStorage.getItem('user'));
    console.log(data)
    if (data === null){
      window.location.href = './index-login-tipificacion.html';
      
    }
    let sessionUser = $('#user').text(data[0].name)
    
});

function logout() {
  sessionStorage.removeItem('user');
  window.location.href = './index-login-tipificacion.html';
}

function startTime() {
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth()+1;
  var year = today.getFullYear();

  day = checkTime(day)
  month =checkTime(month)
  let date = $('#fecha').text(day + "/" + month + "/" + year) 

  var hr = today.getHours();
  var min = today.getMinutes();
  var sec = today.getSeconds();
  //Add a zero in front of numbers<10
  min = checkTime(min);
  sec = checkTime(sec);
  document.getElementById("hora").innerHTML = hr + " : " + min + " : " + sec;
  setTimeout(function(){ startTime() }, 500);
}
function checkTime(i) {
  if (i < 10) {
      i = "0" + i;
  }
  return i;
}

$('#submit').click(submitInfo)

function onlyOne(checkbox) {
  var checkboxes = document.getElementsByName('check')
  checkboxes.forEach((item) => {
    if (item !== checkbox) {
      item.checked = false

      if ($('input[name="check"]').attr('checked', true)) {
        let checkboxes2 = $('input[name="check"]:checked').attr('id')
        return checkboxes2
      }

    }

})
}

function submitInfo(event){

  event.preventDefault()
  let idioma = $("#idioma:checked").val()
  let checkboxes2 = $('input[name="check"]:checked').attr('id')

  if (idioma === 'idioma') {
    idioma = 1
  }else if (idioma === undefined) {
    idioma = 0
  }

  if (checkboxes2 !== undefined) {

    let user = JSON.parse(sessionStorage.getItem('user'))
    let userId = user[0].id

    axios.get(`https://tipificaciones-backend.herokuapp.com/api/tipificacion?user_id=${userId}&marker_option=${checkboxes2}&language=${idioma}`)
    .then(response => {
      const mensaje = response.data;

      console.log(mensaje);

    })
    .catch(error => console.error(error));
   
  }else{
    
    alert('No has seleccionado ningun tipo de consulta')
  }
}


function output(){
  let array =[
    {
      id:1,
      value:'name'
    },
    {
      id:2,
      value:'password'
    }
  ]
  axios.get(`https://tipificaciones-backend.herokuapp.com/api/tipificaciones`)
  .then(response => {
    const tipificaciones = response.data;
    downloadExcel(tipificaciones)

  })
  .catch(error => console.error(error));

  
}


function downloadExcel(tipificacionesExcel){
  const fileName = 'output.xlsx';
  const ws = XLSX.utils.json_to_sheet(tipificacionesExcel);
  const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'output');
    XLSX.writeFile(wb, fileName);
  }

  /*
  $(document).ready(function() {
    $('#example').DataTable( {
        dom: 'Bfrtip',
        button: [
            'excel'
        ]
    } );
} );

*/
/*
var userTest = localStorage.getItem("user");
  if (userTest == null) {
    window.location.href = './index-login-tipificacion'
  }

  function loadUser() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://tipificaciones-backend.herokuapp.com/api/tipificacion?user_id=${userId}&marker_option=${checkboxes2}&language=${idioma}");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Authorization", "Bearer "+jwt);
    xhttp.send();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      if (objects["status"] == "ok") {
        const user = objects["user"]
        document.getElementById("fname").innerHTML = user["fname"];
        document.getElementById("username").innerHTML = password["password"];
      }
    }
  };
}

loadUser();

function logout() {
  localStorage.removeItem("userTest");
  window.location.href = './login.html'
}
*/

