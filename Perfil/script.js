function previewPhoto(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
        var dataURL = reader.result;
        var img = document.getElementById('user-photo');
        img.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
}

function editDescription() {
    // Implemente a lógica para editar a descrição aqui
    alert("Implemente a lógica para editar a descrição aqui.");
}