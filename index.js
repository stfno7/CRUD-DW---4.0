const nombreInput = document.getElementById('nombre');
const categoriaInput = document.getElementById('categoria');
const modificarNombreInput = document.getElementById('nombre-modificacion');
const modificarCategoriaInput = document.getElementById('categoria-modificacion');
const pagoRealizadoInput = document.getElementById('pago-realizado');
const accesoIndiceInput = document.getElementById('indice-acceso');
const afiliarBtn = document.getElementById('btnAfiliar');
const listaSociosDiv = document.getElementById('lista-socios');


// Lista de socios almacenamiento local
function iniciarListaSocios() {
  const socios = localStorage.getItem('socios');

  if (socios) {
    return JSON.parse(socios);
  } else {
    return [];
  }
}

// Guardar lista de socios
function guardarListaSocios(socios) {
  localStorage.setItem('socios', JSON.stringify(socios));
}


// Afiliar un nuevo socio
function afiliarSocio() {
  const nombre = nombreInput.value;
  const categoria = categoriaInput.value;
  const pagoMensual = pagoRealizadoInput.value === 'true';
  const accesoAutorizado = accesoIndiceInput.value === 'autorizar';

  const socio = {
    nombre: nombre,
    categoria: categoria,
    pagoMensual: pagoMensual,
    accesoAutorizado: accesoAutorizado
  };

  const socios = iniciarListaSocios();
  socios.push(socio);

  guardarListaSocios(socios);
  mostrarListaSocios(socios);

  // Reestablecer los campos
  nombreInput.value = '';
  categoriaInput.value = 'Cadete';
  pagoRealizadoInput.value = 'false';
  accesoIndiceInput.value = 'denegar';
}

// Función para mostrar el formulario de modificación con los datos del socio seleccionado
function mostrarFormularioModificacion(indice) {
  const socios = iniciarListaSocios();
  const socio = socios[indice];

  modificarNombreInput.value = socio.nombre;
  modificarCategoriaInput.value = socio.categoria;

  const formularioModificacion = document.getElementById('formulario-modificacion');
  formularioModificacion.onsubmit = function(event) {
    event.preventDefault();

    const nuevoNombre = modificarNombreInput.value;
    const nuevaCategoria = modificarCategoriaInput.value;

    socio.nombre = nuevoNombre;
    socio.categoria = nuevaCategoria;

    guardarListaSocios(socios);
    mostrarListaSocios(socios);

    // Restablecer los campos del formulario de modificación
    modificarNombreInput.value = '';
    modificarCategoriaInput.value = 'Cadete';
  };
}

// Dar de baja
function eliminarSocio(indice) {
  const socios = iniciarListaSocios();
  socios.splice(indice, 1);

  guardarListaSocios(socios);
  mostrarListaSocios(socios);
}


// Evento boton afiliar
afiliarBtn.addEventListener('click', afiliarSocio);


// Iniciar la lista de socios
const socios = iniciarListaSocios();
mostrarListaSocios(socios);


// Mostrar socios en lista-socios
function mostrarListaSocios(socios) {
  listaSociosDiv.innerHTML = '';

  socios.forEach(function(socio, indice) {
    const socioDiv = document.createElement('div');
    socioDiv.innerHTML = `
      <p>Nombre: ${socio.nombre}</p>
      <p>Categoría: ${socio.categoria}</p>
      <p>Pago mensual: ${socio.pagoMensual ? 'Realizado' : 'Pendiente'}</p>
      <p>Acceso: ${socio.accesoAutorizado ? 'Autorizado' : 'Denegado'}</p>
      <button onclick="mostrarFormularioModificacion(${indice})">Modificar</button>
      <button onclick="eliminarSocio(${indice})">Eliminar</button>
    `;

    listaSociosDiv.appendChild(socioDiv);
  });
}