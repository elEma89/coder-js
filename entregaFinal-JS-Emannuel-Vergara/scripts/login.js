document.addEventListener("DOMContentLoaded", () => {
    const formIngreso = document.querySelector(".form2");

    formIngreso.addEventListener('submit', (event) => {
        event.preventDefault();
        validarInicioSesion();
    });
});

const validarInicioSesion = () => {
    const usuarioValor = document.getElementById("usuario").value.trim();
    const passValor = document.getElementById("contraseña").value.trim();

    if (usuarioExiste(usuarioValor)) {
        const usuarioGuardado = obtenerUsuarioPorNombre(usuarioValor);

        //redirige a nuevo html si es valido -> si no
        if (usuarioGuardado.contraseña === passValor) {
            window.location.href = './landing.html';  
        } else {
            mostrarErrorInicioContraseña('La contraseña ingresada es incorrecta, intente nuevamente');
        }
    } else {
        mostrarErrorInicio('El usuario no existe');
    }
};

const mostrarErrorInicio = (mensaje) => {
    const incorrectoElement = document.querySelector(".incorrecto");
    incorrectoElement.innerText = mensaje;
    incorrectoElement.style.display = 'block'; 
};

const mostrarErrorInicioContraseña = (mensaje) => {
    const incorrectoContraseñaElement = document.querySelector(".incorrecto-contraseña");
    incorrectoContraseñaElement.innerText = mensaje;
    incorrectoContraseñaElement.style.display = 'block'; 
};

//valida usuario guardado
const usuarioExiste = (nombreUsuario) => {
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuariosGuardados.some(usuario => usuario.nombre === nombreUsuario);
};

function obtenerUsuarioPorNombre(nombreUsuario) {
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuariosGuardados.find(usuario => usuario.nombre === nombreUsuario);
}