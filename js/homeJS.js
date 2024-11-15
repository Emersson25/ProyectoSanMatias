document.addEventListener("DOMContentLoaded", () => {

  
    fetch('../controllers/producto.controller.php?operacion=getProductosPendientes')
      .then(response => response.json())
      .then(data => {
          const tbody = document.querySelector("#productos-tbody");
          data.forEach(producto => {
              const row = document.createElement("tr");
              row.innerHTML = `
                  <td>${producto.producto}</td>
                  <td>${producto.stockProducto}</td>
              `;
              tbody.appendChild(row);
          });
        });
          
// Realizar la solicitud fetch para obtener los datos
fetch('../controllers/controlProduccion.controller.php?operacion=ChartLotes&idlote=9')
    .then(response => response.json())
    .then(data => {
        // Crear el gráfico de líneas
        const ctx = document.getElementById('myLineChart').getContext('2d');
        const labels = data.map(producto => producto.fecha); // Asegúrate de que 'fecha' es el campo correcto
        const stockData = data.map(producto => producto.produccion); // Asegúrate de que 'produccion' es el campo correcto

        const myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Producción (%)',
                    data: stockData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + '%'; // Mostrar valores como porcentaje
                            }
                        }
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error al obtener los productos:', error));
        
      
      
});