let http;
let imagenUrl;
let btn_search = document.getElementById("btn_search");
function obtenerData() {
    inicializar();
    var id = document.getElementById('ID').value;
    requestSend('https://rickandmortyapi.com/api/character/', id, action, 'GET');
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
    var name = document.getElementById('name');
    var status = document.getElementById('status');
    var species = document.getElementById('species');
    var type = document.getElementById('type');
    var gender = document.getElementById('gender');
    console.log(http.readyState);
    if (http.readyState == 4 && http.status == 200) {
        var respuesta = JSON.parse(http.response)

        name.innerHTML = respuesta.name
        status.innerHTML = respuesta.status
        species.innerHTML = respuesta.species
        type.innerHTML = respuesta.type
        gender.innerHTML = respuesta.gender
        imagenUrl = respuesta.image;

    } else {

        if (http.readyState == 4) {

            document.getElementById("NotFound").innerHTML = "Personaje inexistente,vuelva a intentar...";

        }else{
            document.getElementById("NotFound").innerHTML ="";
        }
    }

}


function backPage() {
    window.location.href = "./index.html";
}

function getImage() {


    window.location.href = imagenUrl;
}


