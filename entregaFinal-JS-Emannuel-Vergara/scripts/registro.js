//alterna forms registro e iniciio
const btnIniciar = document.getElementById("sign-in");
const btnRegistro = document.getElementById("sign-up");
const formRegistros = document.querySelector(".registro");
const formIngresos = document.querySelector(".ingreso");

btnIniciar.addEventListener("click", () => toggleForms(formRegistros, formIngresos));
btnRegistro.addEventListener("click", () => toggleForms(formIngresos, formRegistros));

//oculta form no usado
const toggleForms = (formToHide, formToShow) => {
    formToHide.classList.add("hide");
    formToShow.classList.remove("hide");
};

//valida datos ingresado
const formRegistro = document.getElementById("formNuevo");
const inputs = [
    { element: document.getElementById("usuarioNuevo"), error: 'Campo vacío' },
    { element: document.getElementById("contraseñaNuevo"), error: 'Campo vacío' },
    { element: document.getElementById("contraseña2Nuevo"), error: 'Repite tu contraseña' }
];

formRegistro.addEventListener('submit', (event) => {
    event.preventDefault();
    validarCampos();
});

const validarCampos = () => {
    quitarAvisos();
    let isValid = true;

    //valida campo obligatorio
    inputs.forEach(inputData => {
        const { element, error } = inputData;
        const valor = element.value.trim();

        if (!valor) {
            noValida(element, error);
            isValid = false;
        }
    });

    if (!isValid) {
        return;
    }

    //valida contraseña
    const usuarioValor = inputs[0].element.value.trim();
    const passValor = inputs[1].element.value.trim();
    const passValidaValor = inputs[2].element.value.trim();

    const passInput = inputs[1].element;
    const isPassValid = passValor.length >= 8;

    if (!isPassValid) {
        noValida(passInput, 'Tu contraseña debe tener 8 caracteres');
        isValid = false;
    }

    if (passValor !== passValidaValor) {
        noValida(inputs[2].element, 'Tus contraseñas no coinciden');
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    //valida usuario existente local storage
    if (usuarioExisteEnLocalStorage(usuarioValor)) {
        noValida(inputs[0].element, 'Este usuario ya existe, intenta nuevamente');
    } else {
        //guarda usuario en LocalStorage
        validaOk(inputs.map(inputData => inputData.element));
        const nuevoUsuario = crearUsuario(usuarioValor, passValor);
        guardarUsuarioEnLocalStorage(nuevoUsuario);

        //muestra cartel SweetAlert2
        Swal.fire({
            icon: 'success',
            title: 'inscrito con éxito',
            confirmButtonText: 'Ok'
        }).then(() => {
            mostrarFormularioIngreso();
        });
    }
};

const usuarioExisteEnLocalStorage = (nombreUsuario) => {
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuariosGuardados.some(usuario => usuario.nombre === nombreUsuario);
};

//aviso dato erroneo
const noValida = (input, msje) => {
    const formControl = input.parentElement;
    const aviso = formControl.querySelector('.aviso');
    aviso.innerText = msje;
    formControl.classList.remove('valido');
    formControl.classList.add('falla');
};

//dato correcto
const validaOk = (inputElements) => {
    inputElements.forEach(input => {
        const formControl = input.parentElement;
        formControl.classList.remove('falla');
        formControl.classList.add('valido');
    });
};

//quita aviso cuando reingresa dato
const quitarAvisos = () => {
    const avisos = document.querySelectorAll('.aviso');
    avisos.forEach(aviso => {
        aviso.innerText = '';
    });

    const controles = document.querySelectorAll('.control-form');
    controles.forEach(control => {
        control.classList.remove('falla', 'valido');
    });
};


function crearUsuario(nombre, contraseña) {
    return {
        nombre: nombre,
        contraseña: contraseña
    };
}

function guardarUsuarioEnLocalStorage(usuario) {
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuariosGuardados.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));
}

function mostrarFormularioIngreso() {
    toggleForms(formRegistros, formIngresos);
}