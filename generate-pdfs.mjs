import { jsPDF } from 'jspdf';

function headerIES(doc, title, subtitle) {
  doc.setFillColor(0, 113, 227);
  doc.rect(0, 0, 210, 18, 'F');
  doc.setTextColor(255,255,255);
  doc.setFont('helvetica','bold'); doc.setFontSize(9);
  doc.text('IES MANUEL DE FALLA - MOSTOLES  |  CODIGO 28028568', 10, 8);
  doc.setFont('helvetica','normal'); doc.setFontSize(7);
  doc.text('Avda. Olimpica, 16 - 28935 Mostoles (Madrid)  |  ies.manueldefalla.mostoles@educa.madrid.org  |  DPD 91 720 4068', 10, 13);
  doc.setTextColor(29,29,31);
  doc.setFont('helvetica','bold'); doc.setFontSize(18);
  doc.text(title, 10, 30);
  doc.setFont('helvetica','normal'); doc.setFontSize(9);
  doc.setTextColor(112,112,112);
  doc.text(subtitle, 10, 36);
  doc.setDrawColor(214,214,214); doc.line(10, 39, 200, 39);
}

function headerGeneric(doc, title, subtitle) {
  doc.setFillColor(0, 113, 227);
  doc.rect(0, 0, 210, 18, 'F');
  doc.setTextColor(255,255,255);
  doc.setFont('helvetica','bold'); doc.setFontSize(9);
  doc.text('ACUERDO FAMILIAR  |  MEDIACION PARENTAL  |  INCIBE - IS4K.ES', 10, 8);
  doc.setFont('helvetica','normal'); doc.setFontSize(7);
  doc.text('Guia basada en INCIBE Mediacion Parental  |  Linea de ayuda 017  |  112 Emergencias  |  is4k.es', 10, 13);
  doc.setTextColor(29,29,31);
  doc.setFont('helvetica','bold'); doc.setFontSize(18);
  doc.text(title, 10, 30);
  doc.setFont('helvetica','normal'); doc.setFontSize(9);
  doc.setTextColor(112,112,112);
  doc.text(subtitle, 10, 36);
  doc.setDrawColor(214,214,214); doc.line(10, 39, 200, 39);
}

function footerIES(doc, page) {
  doc.setFontSize(7); doc.setTextColor(112,112,112);
  doc.text('Plantilla oficial del Plan de Seguridad Digital  |  INCIBE 017  |  112  |  protecciondatos.educacion@madrid.org  -  Pagina ' + page, 10, 287);
  doc.setTextColor(29,29,31);
}
function footerGeneric(doc, page) {
  doc.setFontSize(7); doc.setTextColor(112,112,112);
  doc.text('Mediacion parental  |  INCIBE 017 (8-23h)  |  112  |  is4k.es  |  No sustituye asesoramiento profesional  -  Pagina ' + page, 10, 287);
  doc.setTextColor(29,29,31);
}

// Caja blanca imprimible con lineas tenues para escribir a mano - sin ejemplos
function labelBoxBlank(doc, x, y, w, h, label, small='') {
  doc.setFont('helvetica','bold'); doc.setFontSize(7); doc.setTextColor(29,29,31);
  doc.text(label.toUpperCase(), x+2, y+4);
  if (small) {
    doc.setFont('helvetica','normal'); doc.setFontSize(6); doc.setTextColor(112,112,112);
    doc.text(small, x+2, y+7);
    doc.setDrawColor(214,214,214); doc.setFillColor(255,255,255);
    doc.roundedRect(x, y+9, w, h-9, 2, 2, 'FD');
    // lineas tenues para escribir
    doc.setDrawColor(230,230,230);
    const lines = 3; // cuantas lineas de escritura caben
    for(let i=1;i<=lines;i++) {
      const ly = y+9 + (h-9)*(i/(lines+1));
      if (ly < y+h-2) doc.line(x+4, ly, x+w-4, ly);
    }
  } else {
    doc.setDrawColor(214,214,214); doc.setFillColor(255,255,255);
    doc.roundedRect(x, y+6, w, h-6, 2, 2, 'FD');
    doc.setDrawColor(230,230,230);
    const lines = Math.max(1, Math.floor((h-10)/6));
    for(let i=1;i<=lines;i++) {
      const ly = y+6 + (h-6)*(i/(lines+1));
      if (ly < y+h-2) doc.line(x+4, ly, x+w-4, ly);
    }
  }
}

// ============ 1. FICHA INCIDENTE (mantiene cabecera IES, sin ejemplos) ============
{
  const doc = new jsPDF({ format: 'a4' });
  headerIES(doc, 'Ficha de incidente', 'Rellena en el momento de detectar. No apagues equipos cifrados ni borres evidencias.');
  labelBoxBlank(doc, 10, 44, 91, 18, 'Fecha y hora de deteccion');
  labelBoxBlank(doc, 109, 44, 91, 18, 'Persona que informa');
  labelBoxBlank(doc, 10, 66, 190, 22, 'Sistema, cuenta o equipo afectado', 'URL, IP, usuario, aula si se conoce');
  labelBoxBlank(doc, 10, 92, 190, 32, 'Descripcion de lo ocurrido', 'Como se detecto, capturas, testigos. Maximo detalle.');
  // Datos y gravedad - sin ejemplos, solo casillas vacias
  doc.setFont('helvetica','bold'); doc.setFontSize(7); doc.setTextColor(29,29,31);
  doc.text('DATOS PERSONALES AFECTADOS?', 12, 132);
  doc.setDrawColor(214,214,214);
  ['Si','No','No se sabe'].forEach((t,i)=>{
    const x=10+i*30;
    doc.setFillColor(255,255,255); doc.roundedRect(x, 135, 26, 10, 3,3,'FD');
    doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor(29,29,31);
    doc.text(t, x+4, 141);
    doc.circle(x+20, 140, 2, 'D');
  });
  doc.setFont('helvetica','bold'); doc.setFontSize(7); doc.text('GRAVEDAD', 110, 132);
  ['Baja','Media','Alta','Critica'].forEach((t,i)=>{
    const x=110+i*22;
    doc.setFillColor(255,255,255); doc.roundedRect(x, 135, 20, 10, 3,3,'FD');
    doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(29,29,31);
    doc.text(t, x+3, 141);
    doc.setDrawColor(214,214,214); doc.circle(x+16, 140, 2, 'D');
  });
  labelBoxBlank(doc, 10, 152, 190, 28, 'Acciones de contencion realizadas');
  labelBoxBlank(doc, 10, 186, 91, 28, 'Responsable TIC avisado', 'Nombre / hora / canal');
  labelBoxBlank(doc, 109, 186, 91, 28, 'Direccion / DPD avisado', 'Nombre / hora / canal');
  // checklist
  doc.setFont('helvetica','bold'); doc.setFontSize(7); doc.setTextColor(29,29,31);
  doc.text('CHECKLIST RAPIDO (marca)', 12, 224);
  const checks=['Fotos/capturas guardadas','Equipo aislado (red cortada, no apagado si cifra)','Logs preservados','Familias afectadas avisadas (si datos)','AEPD notificada en 72h (si brecha)','Ficha firmada y archivada'];
  checks.forEach((c,i)=>{
    const y=228+i*7;
    doc.setDrawColor(214,214,214); doc.rect(12, y-3, 4,4,'D');
    doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(71,71,71);
    doc.text(c, 18, y);
  });
  doc.setFillColor(29,29,31); doc.roundedRect(10, 268, 190, 14, 3,3,'F');
  doc.setTextColor(255,255,255); doc.setFont('helvetica','bold'); doc.setFontSize(8);
  doc.text('CONTACTOS:  INCIBE 017 (8-23h)  |  112 Emergencias  |  DPD 91 720 4068', 14, 277);
  footerIES(doc, 1);
  doc.save('public/pdfs/plantilla-ficha-incidente.pdf');
  console.log('Ficha incidente OK');
}

// ============ 2. ACUERDO FAMILIAR (GENERICO, SIN IES, SIN EJEMPLOS) ============
{
  const doc = new jsPDF({ format: 'a4' });
  headerGeneric(doc, 'Acuerdo familiar', 'Pacta el uso de dispositivos entre familia y menor. Revisar cada mes.');
  doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor(71,71,71);
  doc.text('Este acuerdo se firma libremente, explicando el motivo (no es castigo, es entrenamiento).', 10, 44);
  labelBoxBlank(doc, 10, 50, 91, 18, 'Familia de');
  labelBoxBlank(doc, 109, 50, 91, 18, 'Participantes (menor / adulto responsable)');
  labelBoxBlank(doc, 10, 72, 190, 18, 'Horario pactado');
  labelBoxBlank(doc, 10, 94, 190, 22, 'Apps, juegos y limites');
  // Normas - 7 lineas en blanco para escribir, sin texto predefinido
  doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(29,29,31);
  doc.text('NORMAS PACTADAS (elegid 4-6, claras y medibles)', 10, 123);
  doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(112,112,112);
  doc.text('Marcar cumplida', 175, 123);
  doc.setFillColor(255,255,255); doc.setDrawColor(214,214,214);
  doc.roundedRect(10, 126, 190, 74, 3,3,'FD');
  doc.setDrawColor(230,230,230);
  for(let i=0;i<7;i++){
    const y = 132 + i*9;
    doc.setDrawColor(214,214,214); doc.rect(14, y-3, 4,4,'D');
    doc.setDrawColor(230,230,230);
    doc.line(20, y+1, 196, y+1);
  }
  doc.setFont('helvetica','normal'); doc.setFontSize(6); doc.setTextColor(180,180,180);
  doc.text('Escribe aqui cada norma a mano. Ej. sin copiar: horarios, pantallas noche, revision semanal...', 20, 193);
  labelBoxBlank(doc, 10, 206, 91, 22, 'Si se cumple');
  labelBoxBlank(doc, 109, 206, 91, 22, 'Si no se cumple');
  // Firmas
  doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(29,29,31);
  doc.text('FIRMAS', 10, 240);
  doc.setDrawColor(214,214,214);
  doc.line(10, 255, 90, 255); doc.line(110, 255, 190, 255);
  doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(112,112,112);
  doc.text('Hijo/a', 10, 260);
  doc.text('Madre / Padre / Tutor/a', 110, 260);
  doc.text('Fecha:  ____ / ____ / ________', 10, 268);
  doc.text('Revision prevista:  ____ / ____ / ________', 110, 268);
  doc.setFillColor(232,240,255); doc.roundedRect(10, 272, 190, 10, 2,2,'F');
  doc.setFont('helvetica','normal'); doc.setFontSize(6.5); doc.setTextColor(0,113,227);
  doc.text('Tip INCIBE: acompanar sin espiar. Explica por que instalas cada control y revisa el acuerdo cada mes.', 14, 278);
  footerGeneric(doc, 1);
  doc.save('public/pdfs/plantilla-acuerdo-familiar.pdf');
  console.log('Acuerdo familiar OK');
}

// ============ 3. INVENTARIO (mantiene cabecera IES, sin ejemplos) ============
{
  const doc = new jsPDF({ format: 'a4', orientation: 'landscape' });
  doc.setFillColor(0,113,227); doc.rect(0,0,297,14,'F');
  doc.setTextColor(255,255,255); doc.setFont('helvetica','bold'); doc.setFontSize(8);
  doc.text('INVENTARIO TIC  (Anexo C)  -  Plantilla en blanco para imprimir', 10, 9);
  doc.setFont('helvetica','normal'); doc.setFontSize(6);
  doc.text('Una fila por portatil, punto de acceso, switch, impresora, IoT, servicio y cuenta con privilegios.', 190, 9);
  doc.setTextColor(29,29,31); doc.setFont('helvetica','bold'); doc.setFontSize(12);
  doc.text('Inventario de activos', 10, 22);
  doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(112,112,112);
  doc.text('Fecha inventario: ____ / ____ / ________     Responsable: ________________________     Revision: trimestral', 10, 27);
  doc.setDrawColor(214,214,214); doc.line(10, 30, 287, 30);
  const cols=[
    {w:48, t:'ELEMENTO'},
    {w:28, t:'TIPO'},
    {w:40, t:'UBICACION / AULA'},
    {w:32, t:'RESPONSABLE'},
    {w:42, t:'SISTEMA Y VERSION'},
    {w:32, t:'GESTION'},
    {w:65, t:'NOTAS / N SERIE / IP'},
  ];
  let x=10; const y=33; const h=12;
  doc.setFillColor(245,245,247);
  cols.forEach(c=>{
    doc.setDrawColor(214,214,214); doc.rect(x, y, c.w, h,'FD');
    doc.setFont('helvetica','bold'); doc.setFontSize(6); doc.setTextColor(29,29,31);
    const lines=doc.splitTextToSize(c.t, c.w-2);
    doc.text(lines, x+1, y+5);
    x+=c.w;
  });
  for(let r=0;r<10;r++){
    x=10; const yy=y+h+r*10;
    cols.forEach(c=>{
      doc.setFillColor(255,255,255); doc.rect(x, yy, c.w, 10,'FD');
      x+=c.w;
    });
  }
  doc.setFont('helvetica','normal'); doc.setFontSize(6); doc.setTextColor(112,112,112);
  doc.text('Instrucciones: inventariar tambien servicios y cuentas con privilegios. Guardar copia impresa en armario TIC.', 10, 155);
  doc.setFont('helvetica','bold'); doc.setFontSize(7); doc.setTextColor(29,29,31);
  doc.text('Costes orientativos  -  completar presupuesto', 10, 162);
  const costCols=[
    {w:80, t:'Concepto'},
    {w:50, t:'Precio'},
    {w:30, t:'IVA'},
    {w:60, t:'Fuente'},
    {w:67, t:'Notas'},
  ];
  x=10; const yy2=165; const hh=8;
  doc.setFillColor(245,245,247);
  costCols.forEach(c=>{
    doc.rect(x, yy2, c.w, hh,'FD');
    doc.setFont('helvetica','bold'); doc.setFontSize(6); doc.text(c.t, x+1, yy2+5);
    x+=c.w;
  });
  // Filas en blanco para rellenar a mano (sin ejemplos Synology/FIDO2)
  for(let r=0;r<4;r++){
    x=10; const yy=yy2+hh+r*7;
    costCols.forEach(c=>{
      doc.setFillColor(255,255,255); doc.rect(x, yy, c.w, 7,'FD');
      // linea tenue para escribir
      doc.setDrawColor(230,230,230);
      if (r>=0) doc.line(x+2, yy+5, x+c.w-2, yy+5);
      x+=c.w;
    });
  }
  doc.setFont('helvetica','normal'); doc.setFontSize(6); doc.setTextColor(112,112,112);
  doc.text('INCIBE 017  |  112  |  DPD 91 720 4068  -  Plantilla imprimible en blanco', 10, 202);
  doc.save('public/pdfs/plantilla-inventario.pdf');
  console.log('Inventario OK');
}

console.log('All PDFs done - imprimibles en blanco');
