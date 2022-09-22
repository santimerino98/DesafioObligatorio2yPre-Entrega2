const emailInput = document.getElementById('email');
const passInput = document.getElementById('pass');
const nombreInput = document.getElementById('nombre');
const rolInput = document.getElementById('rol');
const contenidoTabla = document.getElementById('contenidoTabla');
const detalleUsuarioDiv = document.getElementById('detalleUsuario');
const nombreEditadoInput = document.getElementById('nombreEditado');
const rolEditadoInput = document.getElementById('rolEditado');

const usuarioJson = localStorage.getItem('usuarios'); 
let usuarios = JSON.parse(usuarioJson) || []; 

let usuarioEditadoId = '';

function ID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}


function guardarEnLocalStorage(objeto) {
    const datosJson = JSON.stringify(objeto.value);
    localStorage.setItem(objeto.key, datosJson);
}

function agregarUsuario(event) {
    event.preventDefault();
    const email = emailInput.value;
    const pass = passInput.value;
    const nombre = nombreInput.value;
    const rol = rolInput.value;

    const nuevoUsuario = {
        email: email,
        pass: pass,
        nombre: nombre,
        rol: rol,
        registro: Date.now(),
        id: ID(),
    };

    usuarios.push(nuevoUsuario);
    mostrarUsuarios();
    guardarEnLocalStorage({ key: 'usuarios', value: usuarios });

    console.log('Se registró exitosamente un usuario. 👨‍💻');
    event.target.reset();
}

function mostrarUsuarios() {
    function armarFilasDeUsuarios(usuario) {
        const tr = `
        <tr>
            <td>${usuario.nombre}</td>
            <td>${usuario.rol}</td>
            <td>
                <!-- Button trigger modal -->
                <button onclick="mostrarDetalleUsuario('${usuario.id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalDetalleUsuario"> Ver detalle </button>
                <button onclick="cargarModalEditar('${usuario.id}')" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalEditarUsuario">Editar</button>
                <button onclick="eliminarUsuario('${usuario.id}')" class="btn btn-danger">Eliminar</button>
            </td>
        </tr>
        `;
        return tr;
    }

    const contenido = usuarios.map(armarFilasDeUsuarios);

    contenidoTabla.innerHTML = contenido.join('');
}

function eliminarUsuario(id) {
    function usuariosFilter(usuario) {
        return usuario.id !== id;
    }
    const usuariosFiltrados = usuarios.filter(usuariosFilter);
    usuarios = usuariosFiltrados;
    mostrarUsuarios();
    guardarEnLocalStorage({key: 'usuarios', value: usuarios });
}

function mostrarDetalleUsuario(id) {
    const usuarioEncontrado = usuarios.find(function (usuario) {
        return usuario.id === id;
    });

    const fecha = new Date(usuarioEncontrado.registro);

    const contenido = `
    <p>Nombre: ${usuarioEncontrado.nombre}</p>
    <p>Correo: ${usuarioEncontrado.email}</p>
    <p>Rol: ${usuarioEncontrado.rol}</p>
    <p>Fecha de registro: ${fecha.toLocaleString()}</p>
    `;
    detalleUsuarioDiv.innerHTML = contenido;
}

function cargarModalEditar(id) {

    const usuarioEncontrado = usuarios.find(function (usuario) {
        return usuario.id === id;
    });
    nombreEditadoInput.value = usuarioEncontrado.nombre;
    rolEditadoInput.value = usuarioEncontrado.rol;
    usuarioEditadoId = id;
}

function editarUsuario(event) {
    event.preventDefault();
    const nombreEditado = nombreEditadoInput.value;
    const rolEditado = rolEditadoInput.value;
    const usuarioEditado = { rol: rolEditado, nombre: nombreEditado };

    function usuariosActualizadoMap(usuario) {
        if (usuario.id === usuarioEditadoId) {
            return { ...usuario, ...usuarioEditado };
        } else {
            return usuario;
        }
    }

    const usuariosActualizado = usuarios.map(usuariosActualizadoMap);
    usuarios = usuariosActualizado;
    mostrarUsuarios();

    const usuariosJson = JSON.stringify(usuarios);
    localStorage.setItem('usuarios', usuariosJson);

    const myModal = document.getElementById('modalEditarUsuario');
    const modalBootstrap = bootstrap.Modal.getInstance(myModal);
    modalBootstrap.hide();
}

mostrarUsuarios();
