// Variables globales
let dataTable;
let dataTableIsInitialized = false;

// Hacer desplegarDatos accesible globalmente
window.desplegarDatos = async () => {
    try {
        const response = await fetch('../../controllers/Clientes.controller.php?operacion=getAllClient');
        const data = await response.json();

        let content = '';
        data.forEach((item, index) => {
            content += `
                <tr>
                    <td class="text-center">${index + 1}</td>
                    <td class="text-center">${item.nrodocumento}</td>
                    <td class="text-center">${item.tipodocumento}</td>
                    <td class="text-center">${item.clientes}</td>
                    <td class="text-center">
                        <button class="btn btn-warning btn-sm" onclick="editarCliente(${item.idcliente})">
                            <i class="fa-solid fa-pencil"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarCliente(${item.idcliente})">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                </tr>`;
        });

        const tbodyElement = document.getElementById('tbody-clientes');
        if (tbodyElement) {
            tbodyElement.innerHTML = content;
        }
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        showToast("Error al cargar los clientes", "ERROR", 1500);
    }
};

// Función eliminar cliente
window.eliminarCliente = async (idcliente) => {
    try {
        const confirmacion = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Deseas eliminar este cliente?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        });

        if (confirmacion.isConfirmed) {
            const params = new FormData();
            params.append("operacion", "delete");
            params.append("idcliente", idcliente);

            const response = await fetch('../../controllers/Clientes.controller.php', {
                method: 'POST',
                body: params
            });
            
            const result = await response.json();
            
            if (result.mensaje) {
                showToast(result.mensaje, "SUCCESS", 1500);
                await window.initDataTable();
            }
        } else {
            showToast("Eliminación Cancelada", "WARNING", 1500);
        }
    } catch (error) {
        console.error('Error en la eliminación:', error);
        showToast("Error al eliminar el cliente", "ERROR", 1500);
    }
};

// Función editar cliente
window.editarCliente = async (idcliente) => {
    try {
        const response = await fetch('../../controllers/Clientes.controller.php?operacion=getAllClient');
        const clientes = await response.json();
        const cliente = clientes.find((item) => item.idcliente === idcliente);

        if (cliente) {
            document.querySelector('#idcliente-edit').value = cliente.idcliente;
            document.querySelector('#nrodocumento-edit').value = cliente.nrodocumento;
            document.querySelector('#tipodoc-edit').value = cliente.tipodocumento;
            document.querySelector('#nomcliente-edit').value = cliente.clientes;

            const modal = new bootstrap.Modal(document.getElementById('editarClienteModal'));
            modal.show();
        } else {
            showToast("No se encontró el cliente", "ERROR", 1500);
        }
    } catch (error) {
        console.error('Error:', error);
        showToast("Error al cargar los datos del cliente", "ERROR", 1500);
    }
};

// Hacer initDataTable globalmente accesible
window.initDataTable = async () => {
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    await window.desplegarDatos();

    setTimeout(() => {
        dataTable = $('#tabla-client').DataTable({
            responsive: true,
            dom: 'Bfrtilp',
            buttons: [
                {
                    extend: 'excelHtml5',
                    text: '<i class="fas fa-file-excel"></i> ',
                    titleAttr: 'Exportar a Excel',
                    className: 'btn btn-success',
                    exportOptions: {
                        columns: [0, 1, 2, 3]
                    }
                },
                {
                    extend: 'pdfHtml5',
                    text: '<i class="fas fa-file-pdf"></i> ',
                    titleAttr: 'Exportar a PDF',
                    className: 'btn btn-danger',
                    exportOptions: {
                        columns: [0, 1, 2, 3]
                    }
                },
                {
                    extend: 'print',
                    text: '<i class="fa fa-print"></i> ',
                    titleAttr: 'Imprimir',
                    className: 'btn btn-info',
                    exportOptions: {
                        columns: [0, 1, 2, 3]
                    }
                }
            ],
            lengthMenu: [5, 10, 15, 20, 100, 200, 500],
            columnDefs: [
                { className: 'text-center', targets: '_all' },
                { orderable: false, targets: [2, 4] },
                { searchable: false, targets: [1] },
                { width: '20%', targets: [1] }
            ],
            language: {
                processing: "Procesando...",
                lengthMenu: "Mostrar _MENU_ registros",
                zeroRecords: "No se encontraron resultados",
                emptyTable: "Ningún dato disponible en esta tabla",
                info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
                infoFiltered: "(filtrado de un total de _MAX_ registros)",
                search: "Buscar:",
                paginate: {
                    first: "Primero",
                    last: "Último",
                    next: "Siguiente",
                    previous: "Anterior"
                }
            }
        });
        dataTableIsInitialized = true;
    }, 200);
};

// Evento para el formulario de edición
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#form-editar-cliente').addEventListener('submit', async (event) => {
        event.preventDefault();
        
        try {
            const confirmacion = await Swal.fire({
                title: '¿Estás seguro de que deseas guardar los cambios?',
                text: "Se actualizarán los datos del cliente.",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            });

            if (confirmacion.isConfirmed) {
                const params = new FormData();
                params.append('operacion', 'edit');
                params.append('idcliente', document.querySelector('#idcliente-edit').value);
                params.append('nrodocumento', document.querySelector('#nrodocumento-edit').value);
                params.append('tipodocumento', document.querySelector('#tipodoc-edit').value);
                params.append('cliente_nombre', document.querySelector('#nomcliente-edit').value);

                const response = await fetch('../../controllers/Clientes.controller.php', {
                    method: 'POST',
                    body: params
                });
                
                const result = await response.json();

                if (result.mensaje) {
                    showToast(result.mensaje, 'SUCCESS', 1500);
                    await window.initDataTable();
                    const modalElement = document.getElementById('editarClienteModal');
                    const modal = bootstrap.Modal.getInstance(modalElement);
                    modal.hide();
                } else {
                    showToast('Error al guardar los cambios', 'ERROR', 1500);
                }
            } else {
                showToast("Edición cancelada", "WARNING", 1500);
            }
        } catch (error) {
            console.error('Error en la edición:', error);
            showToast('Error al editar el cliente', 'ERROR', 1500);
        }
    });

    // Inicializar la tabla al cargar la página
    window.initDataTable();
});