export const htmlTemplate = `
<html>
  <head>
    <title>Reporte DMR</title>
    <meta charset="UTF-8" />
    <style type="text/css">
      * {
        font-family: Arial, sans-serif;
      }
      .mb-2 {
        margin-bottom: 0.5rem
      }
      .center-cell{
text-align: center;
}
      .image {
        width: 40%;
        margin-right: 1rem;
      }
      .title {
        text-align: center;
        text-decoration: underline;
        font-size: 2rem;
        font-weight: 700;
        display: inline;
      }

      .image-right {
        width: 5rem;
        position: absolute;
        top: 1rem;
        right: 1rem;
      }

      .title-container {
        width: 100%;
      }
      .header-container {
        width: 100%;
      }
      .date-container {
        margin: 1rem 0;
      }

      .tg {
        border-collapse: collapse;
        border-spacing: 0;
        font-size: 0.8rem;
        border: 2px solid black
      }
      td {
        padding: 0.5rem 0.75rem;
      }
      table {
        width: 100%; margin-bottom: 25px
      }

      .tg td {
        border-color: black;
        border-style: solid;
        border-width: 1px;
        overflow: hidden;
        word-break: break-all;
        border-collapse: collapse;
      }

      .tg th {
        border-color: black;
        border-style: solid;
        border-width: 1px;
        font-weight: normal;
        overflow: hidden;
        word-break: normal;
      }

      .tg .tg-pvwk {
        background-color: #fff;
        border-color: inherit;
        text-align: left;
        vertical-align: bottom;
      }

      .tg .tg-h2a7 {
        font-weight: bold;
        text-align: center;
        vertical-align: bottom;
      }

      .tg .tg-gnn2 {
        background-color: #fff;
        border-color: inherit;
        text-align: center;
        vertical-align: bottom;
      }


    </style>
  </head>
  <body>
    <div class="header-container">
      <div class="title-container">
<table style="width:100%">
<tbody>
<tr><td class="center-cell"><img class="image" src="{{imgSystem}}" data-iml="5230848.099999994" /></td></tr>
<tr><td class="center-cell"><div class="title">REPORTE DE {{type}}</div></td></tr>
</tbody>
</table>
      </div>
      <div class="date-container">
        <div class="mb-2">
          <strong>Fecha de emision:</strong> {{date}}
        </div>
        <div>
          <strong>Fecha de la busqueda:</strong> {{dateRange}}
        </div>
      </div>
    </div>

    <div class="table-container">

      {{#ifCond type "==" 'CUENTAS'}}
      {{#each source}}
<table class="tg">
<tbody>
<tr>
<td class="tg-0lax" colspan="2"><strong>Serial</strong></td>
<td class="tg-0lax" colspan="2">{{this.serial}}</td>
<td class="tg-0lax" colspan="2">Feha de elaboración</td>
<td class="tg-0lax" colspan="2">{{this.date}}</td>
</tr>
  <tr>
    <td class="tg-0lax" colspan="4"><strong>Nombre del cliente</strong></td>
    <td class="tg-0lax" colspan="4">{{this.client.firstName}} {{this.client.lastName}}</td>
  </tr>
  {{#ifCond this.request "!==" null}}
  <tr>
    <td class="tg-0lax" colspan="4"><strong>Solicitud</strong></td>
    <td class="tg-0lax" colspan="4">{{this.request.description}}</td>
  </tr>
  {{/ifCond}}

  <tr>
    <td class="tg-0lax" colspan="4"><strong>Subtotal</strong></td>
    <td class="tg-0lax" colspan="4">{{this.subtotal}}</td>
  </tr>
<tr>
<td class="tg-0lax" style= "padding: 0" colspan="8">
<table class="tg" style = "width: 100%; margin-bottom:0">
<tbody>
{{#each this.billItems}}
 <tr>
  {{#ifCond this.product.name "!==" null}}
  <td class="tg-0lax"><strong>Producto</servicio></td>
   <td class="tg-0lax">{{this.product.name}}</td>
{{/ifCond}}
{{#ifCond this.service.name "!==" null}}
    <td class="tg-0lax"><strong>Servicio<strong></td>
    <td class="tg-0lax">{{this.service.name}}</td>
{{/ifCond}}
<tr>
<td class="tg-0lax"><strong>Cantidad</strong></td>
    <td class="tg-0lax">{{this.quantity}}</td>
</tr>
<tr>
<td class="tg-0lax"><strong>Total por item</strong></td>
    <td class="tg-0lax">{{this.itemTotal}}</td>
</tr>
</tr>

{{/each}}
</tbody>
</table>
</td>
</tr>
  <tr>
    <td class="tg-0lax" colspan="4"><strong>Descuento</strong></td>
    <td class="tg-0lax" colspan="4">{{this.discount}}</td>
  </tr>
  <tr>
    <td class="tg-0lax" colspan="4"><strong>Total</strong></td>
    <td class="tg-0lax" colspan="4">{{this.total}}</td>
  </tr>
</tbody>
</table>
      {{/each}}
      {{/ifCond}}
      {{#ifCond type "==" 'CLIENTES'}}
      {{#each source}}
  <table class="tg">
<tbody>
  <tr>
    <td class="tg-0pky" colspan="3"><strong>Nombre(s)</strong></td>
    <td class="tg-0pky" colspan="3">{{this.firstName}}</td>
    <td class="tg-0pky" colspan="3"><strong>Apellido(s)</strong></td>
    <td class="tg-0pky" colspan="3">{{this.lastName}}</td>
  </tr>
  <tr>
    <td class="tg-0pky" colspan="3"><strong>Telefono</strong></td>
    <td class="tg-0pky" colspan="3">{{this.phone}}</td>
    <td class="tg-0pky" colspan="3"><strong>Documento de identidad</strong></td>
    <td class="tg-0pky" colspan="3">{{this.identityNumber}}</td>
  </tr>
  <tr>
    <td class="tg-0lax" colspan="12" style="text-align: center"><strong>Observaciones</strong></td>
  </tr>
  <tr>
    <td class="tg-0lax" colspan="12">{{this.observation}}</td>
  </tr>
  <tr>
    <td class="tg-0lax" colspan="12" style="text-align: center"><strong>Dirección</strong></td>
  </tr>
  <tr>
    <td class="tg-0lax" colspan="3"><strong>Local N</strong></td>
    <td class="tg-0lax" colspan="3">{{this.address.local}}</td>
    <td class="tg-0lax" colspan="3">Calle N</td>
    <td class="tg-0lax" colspan="3">{{this.address.street}}</td>
  </tr>
  <tr>
    <td class="tg-0lax" colspan="2"><strong>Sector</strong></td>
    <td class="tg-0lax" colspan="2">{{this.address.zone}}</td>
    <td class="tg-0lax" colspan="2"><strong>Ciudad</strong></td>
    <td class="tg-0lax" colspan="2">{{this.address.city}}</td>
    <td class="tg-0lax" colspan="2"><strong>Estado</strong></td>
    <td class="tg-0lax" colspan="2">{{this.address.state}}</td>
  </tr>
</tbody>
</table>
      {{/each}}
      {{/ifCond}}
      {{#ifCond type "==" 'PEDIDOS'}}
      {{#each source}}
  <table class="tg">
<tbody>
<tr>
<td class="tg-0pky" colspan="3"><strong>Fecha de pedido</strong></td>
<td class="tg-0pky" colspan="3">{{this.date}}</td>
<td class="tg-0lax" colspan="3"><strong>Estatus</strong></td>
{{#ifCond this.completed "==" true }}
<td class="tg-0lax" colspan="3">Completado</td>
{{/ifCond}}
{{#ifCond this.completed "==" false }}
<td class="tg-0lax" colspan="3">No completado</td>
{{/ifCond}}
</tr>
  <tr>
    <td class="tg-0pky" colspan="3"><strong>Nombre(s) del proveedor</strong></td>
    <td class="tg-0pky" colspan="3">{{this.providerFirstName}}</td>
    <td class="tg-0pky" colspan="3"><strong>Apellido(s) del proveedor</strong></td>
    <td class="tg-0pky" colspan="3">{{this.providerLastName}}</td>
  </tr>
  <tr>
    <td class="tg-0pky" colspan="3"><strong>Telefono del proveedor</strong></td>
    <td class="tg-0pky" colspan="3">{{this.providerPhone}}</td>
    <td class="tg-0pky" colspan="3"><strong>Monto del producto</strong></td>
    <td class="tg-0pky" colspan="3">{{this.price}}</td>
  </tr>
  <tr>
    <td class="tg-0lax" colspan="12" style="text-align: center"><strong>Observaciones</strong></td>
  </tr>
  <tr>
    <td class="tg-0lax" colspan="12">{{this.observation}}</td>
  </tr>
  <tr>
    <td class="tg-0lax" colspan="12" style="text-align: center"><strong>Dirección del proveedor</strong></td>
  </tr>
  <tr>
    <td class="tg-0lax" colspan="3"><strong>Local</strong></td>
    <td class="tg-0lax" colspan="3">{{this.address.local}}</td>
    <td class="tg-0lax" colspan="3">Calle</td>
    <td class="tg-0lax" colspan="3">{{this.address.street}}</td>
  </tr>
  <tr>
    <td class="tg-0lax" colspan="2"><strong>Sector</strong></td>
    <td class="tg-0lax" colspan="2">{{this.address.zone}}</td>
    <td class="tg-0lax" colspan="2"><strong>Ciudad</strong></td>
    <td class="tg-0lax" colspan="2">{{this.address.city}}</td>
    <td class="tg-0lax" colspan="2"><strong>Estado</strong></td>
    <td class="tg-0lax" colspan="2">{{this.address.state}}</td>
  </tr>
</tbody>
</table>
      {{/each}}
      {{/ifCond}}
      {{#ifCond type "==" 'PRODUCTOS'}}
{{#each source}}
<table class = "tg">
<tbody>
  <tr>
    <td class="tg-0lax" ><strong>Nombre del producto</strong></td>
    <td class="tg-0lax" colspan="2">{{this.name}}</td>
    <td class="tg-0lax"><strong>Precio</strong></td>
    <td class="tg-0lax" colspan="2">{{this.price}}</td>
    <td class="tg-0lax" ><strong>Inventario</strong></td>
    <td class="tg-0lax" colspan="2">{{this.stock}}</td>
  </tr>
  <tr>
    <td class="tg-0lax" colspan="2"><strong>Marca</strong></td>
    <td class="tg-0lax" colspan="2">{{this.brand}}</td>
    <td class="tg-0lax" colspan="2"><strong>Modelo</strong></td>
    <td class="tg-0lax" colspan="2">{{this.model}}</td>
  </tr>
  <tr>
    <td class="tg-0lax" colspan="8"><strong>Descripción</strong></td>
  </tr>
  <tr>
    <td class="tg-0lax" colspan="8">{{this.description}}</td>
  </tr>
</tbody></table>
{{/each}}
      {{/ifCond}}
      {{#ifCond type "==" 'SERVICIOS'}}
      {{#each source}}
<table class = "tg">
<tbody>
  <tr>
    <td class="tg-0lax" colspan="2"><strong>Nombre del servicio</strong></td>
    <td class="tg-0lax" colspan="2">{{this.name}}</td>
    <td class="tg-0lax" colspan="2"><strong>Precio</strong></td>
    <td class="tg-0lax" colspan="2">{{this.price}}</td>
  </tr>
  <tr>
    <td class="tg-0lax" colspan="8"><strong>Descripción</strong></td>
  </tr>
  <tr>
    <td class="tg-0lax" colspan="8">{{this.description}}</td>
  </tr>
</tbody></table>
      {{/each}}
      {{/ifCond}}
      {{#ifCond type "==" 'SOLICITUDES'}}
      {{#each source}}
      <table class="tg">

<tbody>
<tr>
<td class="tg-0lax" colspan="2"><strong>Fecha</strong></td>
<td class="tg-0lax" colspan="2">{{this.date}}</td>
<td class="tg-0lax" colspan="2"><strong>Estatus</strong></td>
{{#ifCond this.completed "==" true }}
<td class="tg-0lax" colspan="2">Completado</td>
{{/ifCond}}
{{#ifCond this.completed "==" false }}
<td class="tg-0lax" colspan="2">No completado</td>
{{/ifCond}}
</tr>
<tr>
<td class="tg-0lax" colspan="4"><strong>Nombre del cliente</strong></td>
<td class="tg-0lax" colspan="4">{{this.client.firstName}} {{this.client.lastName}}</td>
</tr>
  <tr>
    <td class="tg-0lax" colspan="8"><strong>Descripción</strong></td>
  </tr>

  <tr>
    <td class="tg-0lax"  colspan="8">{{this.description}}</td>
  </tr>
  <tr>
    <td class="tg-0lax" style="text-align: center"colspan="8"><strong>Vehiculo</strong></td>
  </tr>
  <tr>
    <td class="tg-0lax" colspan="2"><strong>Marca</strong></td>
    <td class="tg-0lax" colspan="2">{{this.vehicle.brand}}</td>
    <td class="tg-0lax" colspan="2"><strong>Modelo</strong></td>
    <td class="tg-0lax" colspan="2">{{this.vehicle.model}}</td>
  </tr>
  <tr>
  <td class="tg-0lax" colspan="2"><strong>Año</strong></td>
  <td class="tg-0lax" colspan="2">{{this.vehicle.year}}</td>
<td class="tg-0lax" colspan="2"><strong>Placa</strong></td>
<td class="tg-0lax" colspan="2">{{this.vehicle.plate}}</td>
</tr>
  <tr>
    <td class="tg-0lax" colspan="8"><strong>Observaciones</strong></td>
  </tr>

  <tr>
    <td class="tg-0lax" colspan="8">{{this.observation}}</td>
  </tr>
</tbody>
</table>
      {{/each}}
      {{/ifCond}}
    </div>
  </body>
</html>
`;
