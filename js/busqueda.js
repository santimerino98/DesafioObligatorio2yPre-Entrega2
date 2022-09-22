function buscarUsuario(event) {
    event.preventDefault();
    const busquedaInput = document.getElementById('busqueda');
    const usuariosAll = JSON.parse(localStorage.getItem('usuarios'));

    function usuariosFilter(usuario) {
        return usuario.nombre.includes(busquedaInput.value);
    }

    const usuariosFiltrados = usuariosAll.filter(usuariosFilter);
    usuarios = usuariosFiltrados;
    mostrarUsuarios();

}

function limpiarBusqueda() {
    usuarios = JSON.parse(localStorage.getItem('usuarios'));
    mostrarUsuarios();
    console.log('Sin filtro en la tabla  👍')
}
