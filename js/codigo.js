let credenciales = {
    user: false,
    password: false

}


let http;

let intentos = 3;

let regExpMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var expresionRegular = /^\d{1,2}$/;

let clave = document.getElementById("password");
let mail = document.getElementById("mail");


function verificarUsuario() {

    let mailErrado = document.getElementById("mailErrado");


    if (regExpMail.test(mail.value)) {

        console.log("Mail valido");
        credenciales.user = true;
        mailErrado.innerHTML = "";
    } else {
        mailErrado.innerHTML = "*El usuario debe ser un correo electronico*";
    }

}

function verificarPassword() {

    let passwordErrado = document.getElementById("passwordErrado");

    if (expresionRegular.test(clave.value)) {

        console.log("Password valido");
        credenciales.password = true;
        passwordErrado.innerHTML = "";
    } else {
        passwordErrado.innerHTML = "*El Password debe contener uno o dos digitos!*";
    }
}



function validarCredenciales() {

    inicializar();
    let id = document.getElementById('password').value;
    requestSend('https://jsonplaceholder.typicode.com/users/', id, action, 'GET');

}


function inicializar() {
    if (window.XMLHttpRequest) {
        http = new XMLHttpRequest();
    } else {
        http = new ActiveXObject();
    }
}


function requestSend(url, id, funcionActuadora, metodo) {

    http.onreadystatechange = funcionActuadora;
    http.open(metodo, url + id, true);
    http.send();

}

function action() {

    if (http.readyState == 4 && http.status == 200) {
        var respuesta = JSON.parse(http.response)

        let user = document.getElementById("mail").value;
     
        if (respuesta.email == user) {
            alert("Logueo exitosoo,Bienvenido!");

            window.location.href = "./tabla.html";

        } else{
            intentos -= 1;

            alert("te restan " + intentos + " intentos.");
            if (intentos <= 0) {
                document.getElementById('claveBloqueada').innerHTML = "<p>Atencion*tus credenciales fueron bloqueadas*.<br>Recargue el sitio para volver a intentar</p>";

                document.getElementById('formulario').style.visibility = "hidden";
            }
        }

    }

}