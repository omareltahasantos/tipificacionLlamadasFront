
$( document ).ready(function() {
    console.log( "ready!" );
    var data = JSON.parse(sessionStorage.getItem('user'));
    console.log(data)
    if (data === null){
      window.location.href = './index-login-tipificacion.html';
      
    }
});


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
 

/*
  let checkboxes = $('input[name="check"]:checked').attr('id')

console.log(checkboxes);
*/
  
  
  
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




/*
$('input[type="checkbox"]').on('change', function() {
  $(this).siblings('input[type="checkbox"]').prop('checked', false);
});

$("input:checkbox").on('click', function() {

  var $box = $(this);
  if ($box.is(":checked")) {

    var group = "input:checkbox[name='" + $box.attr("name") + "']";
   
    $(group).prop("checked", false);
    $box.prop("checked", true);
  } else {
    $box.prop("checked", false);
  }
});
*/





