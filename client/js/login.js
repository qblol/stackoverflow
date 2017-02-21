$(document).ready(function(){
  $('ul.tabs').tabs();
  let decoded = jwt_decode(localStorage.getItem('token')).username
  if(decoded != null){
    window.location.href = 'http://localhost:8080'
  }
});
function login() {
  $.ajax({
    url: 'http://localhost:3000/api/users/login',
    type: 'POST',
    data: {
      username: $('#login-username').val(),
      password: $('#login-password').val()
    },
    success: data => {
      if(data == 'Wrong password'){
        alert(data)
      } else if(data == 'Wrong username'){
        alert(data)
      } else {
        localStorage.setItem('token', data);
        window.location.href = 'http://localhost:8080'
      }
    }
  })
}

function register() {
  $.ajax({
    url: 'http://localhost:3000/api/users',
    type: 'POST',
    data: {
      username: $('#register-username').val(),
      password: $('#register-password').val(),
    },
    success: data => {
      if(data == 'Username is already taken'){
        alert(data)
      } else {
        window.location.href = 'http://localhost:8080/login.html'
      }
    }
  })
}
