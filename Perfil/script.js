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

document.addEventListener("DOMContentLoaded", function () {
    const profileDetails = document.getElementById('profileDetails');
    const profileForm = document.getElementById('profileForm');
    const editButton = document.getElementById('editButton');
    const cancelButton = document.getElementById('cancelButton');
    const togglePassword = document.getElementById('togglePassword');
    const senhaInput = document.getElementById('senhaInput');

    function loadProfile() {
        const userEmail = "email_do_usuario"; // Substitua com o email do usuário
        fetch(`http://localhost:3004/Churrasqueiro?Email=${userEmail}`)
            .then(response => response.json())
            .then(data => {
                const user = data[0];
                document.getElementById('nome').textContent = user.Nome;
                document.getElementById('endereco').textContent = user.Endereco;
                document.getElementById('email').textContent = user.Email;
                document.getElementById('telefone').textContent = user.Telefone;
                document.getElementById('senha').textContent = "********";
                document.getElementById('cpf').textContent = user.CPF;

                document.getElementById('nomeInput').value = user.Nome;
                document.getElementById('enderecoInput').value = user.Endereco;
                document.getElementById('emailInput').value = user.Email;
                document.getElementById('telefoneInput').value = user.Telefone;
                document.getElementById('senhaInput').value = user.Senha;
                document.getElementById('cpfInput').value = user.CPF;
            })
            .catch(error => console.error('Erro ao carregar perfil:', error));
    }

    loadProfile();

    editButton.addEventListener('click', function () {
        profileDetails.classList.add('d-none');
        profileForm.classList.remove('d-none');
    });

    cancelButton.addEventListener('click', function () {
        profileDetails.classList.remove('d-none');
        profileForm.classList.add('d-none');
    });

    togglePassword.addEventListener('click', function () {
        const type = senhaInput.getAttribute('type') === 'password' ? 'text' : 'password';
        senhaInput.setAttribute('type', type);
        this.textContent = type === 'password' ? 'Mostrar' : 'Ocultar';
    });

    profileForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);

        fetch(`http://localhost:3004/churrasqueiro/${formData.get('email')}`, {
            method: 'PUT',
            body: JSON.stringify({
                Nome: formData.get('nome'),
                Endereco: formData.get('endereco'),
                Email: formData.get('email'),
                Telefone: formData.get('telefone'),
                Senha: formData.get('senha'),
                CPF: formData.get('cpf')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Perfil atualizado com sucesso!');
                loadProfile();
                profileDetails.classList.remove('d-none');
                profileForm.classList.add('d-none');
            } else {
                throw new Error('Erro ao atualizar perfil');
            }
        })
        .catch(error => console.error('Erro ao atualizar perfil:', error));
    });
});