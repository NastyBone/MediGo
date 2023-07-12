export const recordTemplate = `

<html>
  <head>
    <title>Reporte MediGO</title>
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
        width: 20%;
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
        width: 8rem;
        position: absolute;
        top: -2rem;
        right: 1rem;
      }

      .title-container {
        width: 100%;
        margin-top: 1rem;
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
        border: 2px solid #dfd9d9
      }
      td {
        padding: 0.5rem 0.75rem;
      }
      table {
        width: 100%; margin-bottom: 25px
      }


      .tg td {
        border-color: #dfd9d9;
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
      .text{
        text-align: center;
      }


    </style>
  </head>
  <body>
  <img class="image-right" src="{{imgSystem}}" data-iml="5230848.099999994" />
    <div class="header-container">
      <div class="title-container">
 
<table style="width:100%">
<tbody>
<tr>
  <td class="center-cell"><div class="title">REPORTE MEDICO</div></td></tr>
</tbody>
</table>
      </div>
      <div class="date-container">
        <div class="mb-2">
          <strong>Nombre de la organizacíon:</strong> {{this.source.name}}
        </div>
           <div class="mb-2">
          <strong>Tipo de organización:</strong> {{this.source.type}}
        </div>
           <div class="mb-2">
          <strong>R.I.F:</strong> {{this.source.rif}}
        </div>
           <div class="mb-2">
          <strong>Fecha de emision:</strong> {{date}}
        </div>
        <div>
        </div>
      </div>
    </div>

    <div class="table-container">
      
<table class="tg">
<tbody>
<tr>
<td class="tg-0lax" colspan="2"><strong>Fecha</strong></td>
<td class="tg-0lax" colspan="6">{{this.source.date}}</td>

</tr>
  <tr>
    <td class="tg-0lax" colspan="8" style="text-align:center" ><strong>Datos Del Paciente</strong></td>
  </tr>
  
  <tr>
    <td class="tg-0lax" colspan="2"><strong>Nombre</strong></td>
    <td class="tg-0lax" colspan="6">{{this.source.patient.user.firstName}} {{this.source.patient.user.lastName}} </td>
  </tr>
    <tr>
    <td class="tg-0lax" colspan="2"><strong>Telefono</strong></td>
    <td class="tg-0lax" colspan="6">{{this.source.patient.phone}} </td>
  </tr>
  <tr>
    <td class="tg-0lax" colspan="2"><strong>Dirección</strong></td>
    <td class="tg-0lax" colspan="6">{{this.source.patient.address}} </td>
  </tr>

<tr>
<td class="tg-0lax" style= "padding: 0" colspan="8">
</td>
  
</tr>

  </tr>
  <tr>
    <td class="tg-0lax" colspan="8" style="text-align:center" ><strong>Datos Del Doctor</strong></td>
    </tr>
    <tr>
    <td class="tg-0lax" colspan="2"><strong>Nombre</strong></td>
    <td class="tg-0lax" colspan="6">{{this.source.doctor.user.firstName}} {{this.source.doctor.user.lastName}} </td>
  </tr>
    <tr>
    <td class="tg-0lax" colspan="2"><strong>Especialidad</strong></td>
    <td class="tg-0lax" colspan="6">{{this.source.doctor.speciality.name}}</td>
  </tr>
    <tr>
    <td class="tg-0lax" colspan="2"><strong>Telefono</strong></td>
    <td class="tg-0lax" colspan="6">{{this.source.doctor.phone}} </td>
  </tr>
  <tr>
    <td class="tg-0lax" colspan="8" style="text-align:center"><strong>Resultado Del Informe</strong></td><tr/>
      <tr>
    <td class="tg-0lax" colspan="8">{{this.source.description}}</td><tr/>
    
<tr>
<td class="tg-0lax" style= "padding: 0" colspan="8">
</td>
  
</tr>
</tbody>
</table>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

<p class="text">___________________________________</p>
<h2 class="text">FIRMA Y SELLO</h1>
  </body>
</html>
`;

export const citeTemplate = `<html>
<head>
  <title>Reporte MediGO</title>
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
      width: 20%;
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
      width: 8rem;
      position: absolute;
      top: -2rem;
      right: 1rem;
    }

    .title-container {
      width: 100%;
      margin-top: 1rem;
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
      border: 2px solid #999
    }
    td {
      padding: 0.5rem 0.75rem;
    }
    table {
      width: 100%; margin-bottom: 25px
    }


    .tg td {
      border-color: #dfd9d9;
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
    .text{
      text-align: center;
    }


  </style>
</head>
<body>
<img class="image-right" src="{{imgSystem}}" data-iml="5230848.099999994" />
  <div class="header-container">
    <div class="title-container">

<table style="width:100%; margin-bottom: 10px; z-index:100">
<tbody>
<tr>
<td class="center-cell"><div class="title">REPORTE DE CITAS</div></td></tr>
</tbody>
</table>
    </div>
    <div class="date-container">
      <div class="mb-2">
        <strong>Nombre de la organizacíon:</strong> {{this.source.name}}
      </div>
         <div class="mb-2">
        <strong>Tipo de organización:</strong> {{this.source.type}}
      </div>
         <div class="mb-2">
        <strong>R.I.F:</strong> {{this.source.rif}}
      </div>
         <div class="mb-2">
        <strong>Fecha de emision:</strong> {{date}}
      </div>
      <div>
      </div>
    </div>
  </div>

  <div class="table-container">
    
{{#each this.source.cites}}
<table class="tg">
<tbody>
<tr>
<td class="tg-0lax" colspan="1"><strong>Fecha</strong></td>
<td class="tg-0lax" colspan="3">{{this.date}}</td>
<td class="tg-0lax" colspan="1"><strong>Estado</strong></td>
{{#ifCond this.patientConfirm "==" true}}
<td class="tg-0lax" colspan="3">Confirmada</td>
{{/ifCond}}
{{#ifCond this.patientConfirm "==" false}}
<td class="tg-0lax" colspan="3">No Confirmada</td>
{{/ifCond}}
</tr>
<tr>
  <td class="tg-0lax" colspan="8" style="text-align:center" ><strong>Datos De Cita</strong></td>
</tr>

<tr>
  <td class="tg-0lax" colspan="1"><strong>Dia</strong></td>
  <td class="tg-0lax" colspan="3"> {{this.time.day}} </td>

  <td class="tg-0lax" colspan="1"><strong>Inicio</strong></td>
  <td class="tg-0lax" colspan="1">{{this.time.start}} </td>

  <td class="tg-0lax" colspan="1"><strong>Fin</strong></td>
  <td class="tg-0lax" colspan="1">{{this.time.end}}</td>
</tr>


<tr>
  <td class="tg-0lax" colspan="8" style="text-align:center" ><strong>Datos Del Paciente</strong></td>
</tr>

<tr>
  <td class="tg-0lax" colspan="2"><strong>Nombre</strong></td>
  <td class="tg-0lax" colspan="6">{{this.patient.user.firstName}} {{this.patient.user.lastName}} </td>
</tr>
  <tr>
  <td class="tg-0lax" colspan="2"><strong>Telefono</strong></td>
  <td class="tg-0lax" colspan="6">{{this.patient.phone}} </td>
</tr>
<tr>
  <td class="tg-0lax" colspan="2"><strong>Dirección</strong></td>
  <td class="tg-0lax" colspan="6">{{this.patient.address}} </td>
</tr>

<tr>
<td class="tg-0lax" style= "padding: 0" colspan="8">
</td>

</tr>

</tr>
<tr>
  <td class="tg-0lax" colspan="8" style="text-align:center" ><strong>Datos Del Doctor</strong></td>
  </tr>
  <tr>
  <td class="tg-0lax" colspan="2"><strong>Nombre</strong></td>
  <td class="tg-0lax" colspan="6">{{this.doctor.user.firstName}} {{this.doctor.user.lastName}} </td>
</tr>
  <tr>
  <td class="tg-0lax" colspan="2"><strong>Especialidad</strong></td>
  <td class="tg-0lax" colspan="6">{{this.doctor.speciality.name}}</td>
</tr>
  <tr>
  <td class="tg-0lax" colspan="2"><strong>Telefono</strong></td>
  <td class="tg-0lax" colspan="6">{{this.doctor.phone}} </td>
</tr>
<tr>
  <td class="tg-0lax" colspan="8" style="text-align:center"><strong>Descripción de la Cita</strong></td><tr/>
    <tr>
  <td class="tg-0lax" colspan="8">{{this.subject}}</td><tr/>
  
<tr>
<td class="tg-0lax" style= "padding: 0" colspan="8">
</td>

</tr>
</tbody>
</table>
{{/each}}
</body>
</html>`
