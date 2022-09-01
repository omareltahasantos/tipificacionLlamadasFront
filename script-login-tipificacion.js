
$( document ).ready(function() {
    console.log( "ready!" );
    var data = JSON.parse(sessionStorage.getItem('user'));
    if (data){
      if (data.length !== 0 ){
        window.location.href = './index-sp-tipificacion.html';
      }
    }  
});

$("#button").click(function() {
    var usuario = $("#usuario").val()
    var password = $("#password").val()
    console.log(usuario, password)
    axios.get(`https://tipificaciones-backend.herokuapp.com/api/check?email=${usuario}&password=${password}`)
      .then(response => {
        const users = response.data;
        console.log(users)
        console.log(response)
        if (users.length !== 0){
          sessionStorage.setItem('user', JSON.stringify(users));
          window.location.href = './index-sp-tipificacion.html';

        }
      })
      .catch(error => console.error(error));
      })





// https://tipificaciones-backend.herokuapp.com/api/tipificaciones
