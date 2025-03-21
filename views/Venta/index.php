<?php require_once '../../Header.php'; ?>
        <!-- Page content-->
        <div class="container">
            <div class="text-center mt-5">
                <h1>VENTAS</h1>
            </div>

            <div class="card mb-4">
                <div class="card-header">
                    Datos del Cliente

                </div>
                <div class="card-body">
                    <form action="" id="form-Venta" autocomplete="off">
                                <div class="row g-2">
                                    <div class="col-md-6 mb-3">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" minlength="8" maxlength="11"  id="nrodocumento" autofocus required>
                                            <label for="nrodocumento"><i class="fa-regular fa-id-card"></i> Numero de Documento</label>
                                        </div>
                                    </div>

                                    <div class="col-md-6 mb-3">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="tipodocumento" disabled>
                                            <label for="tipodocumento"><i class="fa-solid fa-id-card-clip"></i> Tipo de Documento</label>
                                        </div>
                                    </div>

                                </div>


                            <!-- Datos del Cliente -->
                                <div class="row g-2">
                                    <div class="col-md-6 mb-3">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="cliente"  disabled>
                                            <label for="cliente"><i class="fa-solid fa-circle-user"></i> Cliente </label>
                                        </div>
                                    </div>

                                    <div class="col-md-6 mb-3">
                                        <div class="form-floating">
                                            <input type="text" id="direccion" maxlength="150" class="form-control" disabled>
                                            <label for="direccion"><i class="fa-regular fa-compass"></i> Direccion del Cliente</label>
                                        </div>
                                    </div>

                                </div>

                                <div class="row g-2">
                                    <div class="col-md-6 mb-3">
                                        <div class="form-floating">
                                            <input type="text" id="email" maxlength="150" class="form-control" disabled>
                                            <label for="email"><i class="fa-solid fa-at"></i> Email</label>
                                        </div>
                                    </div>

                                    <div class="col-md-6 mb-3">
                                        <div class="form-floating">
                                            <input type="number" id="telefono" maxlength="150" class="form-control" disabled>
                                            <label for="telefono"><i class="fa-solid fa-mobile-screen"></i> Telefono</label>
                                        </div>
                                    </div>

                                    <div class="col-md invisible">
                                        <div class="form-floating">
                                            <input type="text" name="idcolaborador" id="idcolaborador" class="form-control" value="<?= $_SESSION['login']['idcolaborador'] ?>" disabled>
                                            <label for="idcolaborador">Colaborador</label>
                                        </div>
                                    </div>
                                </div>

                            <div class="card-header">
                                Detalle de Venta
                            </div>
                            <div class="card-body">
                            <div class="container mt-5">
                                <div>
                                <button id="agregar-item" _ngcontent-ng-c943880071="" tooltipposition="top" ptooltip="Agregar item" pbutton="" type="button" icon="fa fa-plus" class="btn btn-success p-element p-button-success p-button p-component p-button-icon-only ng-star-inserted" disabled>
                                        <span aria-hidden="true"><i class="fa-solid fa-plus"></i> Agregar Producto a la Lista</span>
                                </button>
                                <br>
                                <hr>
                                </div>
                                <div class="table-responsive">
                                <table class="tabla-detalle table table-bordered table-striped table-hover mt-3">
                                    <thead>
                                        <tr>
                                            <th class="text-center">Unidad Medida</th>
                                            <th class="text-center">Stock</th>
                                            <th class="text-center">Producto</th>
                                            <th class="text-center">Cantidad</th>
                                            <th class="text-center">Peso Total</th>
                                            <th class="text-center">Precio Unitario</th>
                                            <th class="text-center">Total</th>
                                            <th class="text-center">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody id="detalles">
                                        <!-- Las filas se agregarán aquí -->
                                    </tbody>
                                </table>
                                </div>
                                <br>
                                <br>
                                    <div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col mb-1">
                                                    <strong>IGV 18.00%</strong> <br>
                                                    <label for="" id="igv_venta">S/0.00</label>
                                                </div>
                                                <div class="col mb-1">
                                                    <strong>SUBTOTAL</strong> <br>
                                                    <label for="" id="subtotal_venta">S/0.00</label>
                                                </div>
                                                <div class="col mb-1">
                                                    <strong>TOTAL</strong> <br>
                                                    <label for="" id="total_venta">S/0.00</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            </div>
                        <div class="card-footer">
                            <div class="text-end">
                                <button type="submit" id="registrar-venta" class="btn btn-primary btn-sm" disabled><i class="fa-regular fa-bookmark"></i> Registrar Venta</button>
                                <button type="reset" id="cancelar" class="btn btn-secondary btn-sm"><i class="fa-solid fa-xmark"></i> Cancelar Venta</button>
                            </div>
                        </div>
                    </form>

                
            </div>

        </div>
        <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Core theme JS-->
        <script src="<?= $host ?>/js/scripts.js"></script>


        <!-- Sweet Alert Simplificado-->
         <script src="<?= $host ?>js/swalcustom.js"></script>
         <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script> <!-- SweetAlert2 -->

         <script src="<?= $host ?>js/ventas/agregarDetalle.js"></script>
         <script src="<?= $host ?>js/clientes/buscarClienteRegistrado.js"></script>
         <script src="<?= $host ?>js/Ventas/registrarVenta.js"></script>
         <footer>
            <div class="container">
                <div class="text-center mt-5">
                    <p>&copy; 2024 Granja Avícola "San Matias" S.A.C.</p>
                    <p>VERSION 1.0.0</p>
                </div>
            </div>
         </footer>
    </body>
</html>
