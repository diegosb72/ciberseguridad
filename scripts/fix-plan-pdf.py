#!/usr/bin/env python3
# Regenera el PDF del Plan con tildes correctas usando DejaVuSans (UTF-8)
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable, Image, KeepTogether
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.fonts import addMapping
import os

# Registrar fuentes UTF-8
pdfmetrics.registerFont(TTFont('DejaVu', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('DejaVu-Bold', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))
addMapping('DejaVu', 0, 0, 'DejaVu')
addMapping('DejaVu', 1, 0, 'DejaVu-Bold')

OUTPUT = 'public/pdfs/Plan_Seguridad_Digital_IES_Manuel_de_Falla-4.pdf'  # NOTA: genera versión resumida 6p; el original 19p está en git como binario — no sobrescribir sin confirmar
# OUTPUT_19 = 'public/pdfs/Plan_Seguridad_Digital_IES_Manuel_de_Falla-19p.pdf'

# Colores Apple
AZUL = HexColor('#0071e3')
AZUL_OSCURO = HexColor('#0A2540')
GRIS_TEXTO = HexColor('#1d1d1f')
GRIS_MEDIO = HexColor('#474747')
GRIS_CLARO = HexColor('#f5f5f7')
GRIS_BORDE = HexColor('#d6d6d6')
NARANJA = HexColor('#b64400')

W, H = A4

def header_footer(canvas, doc):
    canvas.saveState()
    # Barra superior azul (portada) o gris claro
    if doc.page == 1:
        canvas.setFillColor(AZUL)
        canvas.rect(0, H-12, W, 12, fill=1, stroke=0)
        canvas.setFillColor(white)
        canvas.setFont('DejaVu-Bold', 9)
        # Usar DejaVu que sí tiene tildes; si falla el acento, cae a O normal — verificamos en preview
        canvas.drawString(20, H-8, 'IES MANUEL DE FALLA  \u2014  M\u00d3STOLES  \u00b7  28028568')
        canvas.setFont('DejaVu', 7)
        canvas.drawRightString(W-20, H-8, 'Plan de Seguridad Digital  2025/26')
    else:
        canvas.setFillColor(GRIS_CLARO)
        canvas.rect(0, H-28, W, 28, fill=1, stroke=0)
        canvas.setFillColor(GRIS_TEXTO)
        canvas.setFont('DejaVu', 7)
        canvas.drawString(20, H-14, 'IES MANUEL DE FALLA  \u00b7  M\u00d3STOLES   \u2014   Plan de Seguridad Digital')
        canvas.setFont('DejaVu', 7)
        # Paginación sin hardcode: solo nº página (total dinámico requeriría 2-pass canvas; evitamos N/6 falso)
        canvas.drawRightString(W-20, H-14, f'Pág. {doc.page}')
        canvas.setStrokeColor(GRIS_BORDE)
        canvas.line(20, H-28, W-20, H-28)

    # Pie
    canvas.setFillColor(HexColor('#0A2540'))
    canvas.rect(0, 0, W, 22, fill=1, stroke=0)
    canvas.setFillColor(white)
    canvas.setFont('DejaVu', 6)
    canvas.drawString(20, 12, 'Avda. Olímpica, 16  —  28935 Móstoles (Madrid)  ·  ies.manueldefalla.mostoles@educa.madrid.org')
    canvas.drawRightString(W-20, 12, 'DPD: protecciondatos.educacion@madrid.org  ·  INCIBE 017  ·  112')
    canvas.restoreState()

styles = getSampleStyleSheet()
s_title = ParagraphStyle('Title', parent=styles['Title'], fontName='DejaVu-Bold', fontSize=28, leading=30, textColor=AZUL_OSCURO, alignment=TA_LEFT, spaceAfter=6)
s_h1 = ParagraphStyle('H1', parent=styles['Heading1'], fontName='DejaVu-Bold', fontSize=16, leading=19, textColor=AZUL_OSCURO, spaceBefore=14, spaceAfter=6, keepWithNext=True)
s_h2 = ParagraphStyle('H2', parent=styles['Heading2'], fontName='DejaVu-Bold', fontSize=12, leading=15, textColor=GRIS_TEXTO, spaceBefore=10, spaceAfter=4)
s_h3 = ParagraphStyle('H3', parent=styles['Heading3'], fontName='DejaVu-Bold', fontSize=10, leading=13, textColor=AZUL, spaceBefore=8, spaceAfter=3)
s_body = ParagraphStyle('Body', parent=styles['Normal'], fontName='DejaVu', fontSize=8.5, leading=12.5, textColor=GRIS_TEXTO, alignment=TA_JUSTIFY, spaceAfter=5)
s_body_center = ParagraphStyle('BodyCenter', parent=s_body, alignment=TA_CENTER)
s_small = ParagraphStyle('Small', parent=s_body, fontSize=7.5, leading=10, textColor=GRIS_MEDIO)
s_bullet = ParagraphStyle('Bullet', parent=s_body, leftIndent=14, bulletIndent=6, spaceAfter=2)
s_table_cell = ParagraphStyle('Cell', parent=s_body, fontSize=7, leading=9, alignment=TA_LEFT)
s_table_head = ParagraphStyle('CellH', parent=s_table_cell, fontName='DejaVu-Bold', textColor=white, alignment=TA_CENTER)
s_caption = ParagraphStyle('Caption', parent=s_small, fontSize=6.5, leading=8, textColor=HexColor('#707070'), alignment=TA_CENTER)

def p(text, style=s_body):
    return Paragraph(text.replace('\n','<br/>'), style)

def build():
    doc = SimpleDocTemplate(OUTPUT, pagesize=A4, leftMargin=18*mm, rightMargin=18*mm, topMargin=22*mm, bottomMargin=14*mm, title='Plan de Seguridad Digital - IES Manuel de Falla (Móstoles) - Corregido tildes UTF-8', author='IES Manuel de Falla')
    story = []

    # Portada
    story.append(Spacer(1, 18*mm))
    story.append(p('DOCUMENTO INSTITUCIONAL', ParagraphStyle('kicker', parent=s_body, fontName='DejaVu-Bold', fontSize=7, leading=9, textColor=AZUL, alignment=TA_LEFT, spaceAfter=4)))
    story.append(p('Plan de seguridad<br/>digital', s_title))
    story.append(HRFlowable(width='14%', thickness=2, color=AZUL, spaceAfter=6, spaceBefore=4, hAlign='LEFT'))
    story.append(p('IES Manuel de Falla<br/><font color="#474747">Móstoles · Comunidad de Madrid  ·  Código 28028568</font><br/><font color="#474747">Avda. Olímpica, 16 — 28935 Móstoles (Madrid)  ·  Coordinación TIC: Diego Navarro</font>', ParagraphStyle('portada', parent=s_body, fontSize=9, leading=13, textColor=GRIS_TEXTO)))
    story.append(Spacer(1, 8*mm))
    # Caja resumen portada
    t = Table([
        [p('<b>5 prioridades</b> · Cuentas protegidas · Copias que se restauran · Sesiones bloqueadas · Datos con acceso mínimo · Respuesta preparada', s_small)],
        [p('<b>Hoja de ruta</b> · Mes 1: Base y mayor riesgo  →  Meses 2–3: Control de datos  →  Meses 4–6: Ampliación y endurecimiento', s_small)],
        [p('<b>Contacto</b> · DPD: protecciondatos.educacion@madrid.org (91 720 4068)  ·  INCIBE 017  ·  112 Emergencias  ·  TIC: 91 617 10 74', s_small)],
    ], colWidths=[174*mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), GRIS_CLARO),
        ('ROUNDEDCORNERS', [6,6,6,6]),
        ('BOX', (0,0), (-1,-1), 0.5, GRIS_BORDE),
        ('INNERGRID', (0,0), (-1,-1), 0.25, GRIS_BORDE),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t)
    story.append(Spacer(1, 6*mm))
    story.append(p('Este plan reúne las medidas mínimas para proteger las cuentas, los datos del alumnado y la continuidad de la actividad del instituto. Está pensado para aplicarse por fases, con pilotos y sin depender de herramientas que el centro no tiene.', s_body))
    story.append(p('<i>Versión corregida UTF-8 — Tildes y “ñ” restauradas. Si ves “Móstoles”, “código”, “público” o “Olímpica” correctamente, el PDF ya está bien.</i>', ParagraphStyle('nota', parent=s_small, textColor=AZUL, borderPadding=(4,6,4))))
    story.append(p('Aprobación: Dirección  ·  DPD Consejería  ·  Claustro  ·  Consejo Escolar — Curso 2025/26', s_small))

    # Índice
    story.append(PageBreak())
    story.append(p('Contenido', s_h1))
    story.append(HRFlowable(width='100%', thickness=0.5, color=GRIS_BORDE, spaceAfter=6))
    toc = [
        ('1', 'Resumen — 5 prioridades y hoja de ruta a 6 meses', '3'),
        ('2', 'Finalidad, alcance y marco normativo (RGPD, LOPDGDD, ENS RD 311/2022)', '4'),
        ('3', 'Situación tecnológica y mapa de 9 riesgos', '6'),
        ('4', 'Identidades, sesiones y puestos — Bloqueo, MFA y cuentas privilegiadas', '9'),
        ('5', 'Datos, accesos y recuperación — Copias, clasificación y brechas', '11'),
        ('6', 'Red, dispositivos, correo y personas — Segmentación, SPF/DKIM/DMARC, MDM/EDR, FIDO2', '13'),
        ('7', 'Incidentes y continuidad — Procedimiento GRAV-72h y ficha Anexo B', '15'),
        ('8', 'Plan de acción — 22 medidas con prioridad, responsable y plazo', '16'),
        ('9', 'Glosario, fuentes y aprobación', '18'),
        ('Anexo A', 'Agenda de contactos (INCIBE 017, 112, DPD, TIC)', '18'),
        ('Anexo B', 'Ficha de incidente — plantilla en blanco', '18'),
        ('Anexo C', 'Inventario TIC — plantilla en blanco', '19'),
        ('Anexo D', 'Costes estimados (NAS, discos, llaves FIDO2)', '19'),
    ]
    rows = [[p(f'<b>{a}</b>', s_table_cell), p(b, s_table_cell), p(c, s_table_cell)] for a,b,c in toc]
    tt = Table(rows, colWidths=[18*mm, 130*mm, 14*mm])
    tt.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,-1), GRIS_CLARO),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LINEBELOW', (0,0), (-1,-1), 0.25, GRIS_BORDE),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(tt)
    story.append(Spacer(1, 4*mm))
    story.append(p('Todas las entradas son enlaces en la versión digital. Pulsa para ir al apartado.', s_small))

    # 1 Resumen
    story.append(p('1 &nbsp; Resumen', s_h1))
    story.append(p('Este plan reúne las medidas mínimas para proteger las cuentas, los datos del alumnado y la continuidad de la actividad del instituto. Está pensado para aplicarse por fases, con pilotos y sin depender de herramientas que el centro no tiene.', s_body))
    story.append(p('Cinco prioridades', s_h2))
    prios = [
        ('01', 'Cuentas protegidas', 'MFA en dirección y administración, bajas revisadas y cuentas nominales, no compartidas.'),
        ('02', 'Copias que se restauran', 'Una copia verificada y una prueba de restauración cada trimestre. No hay copia sin prueba.'),
        ('03', 'Sesiones bloqueadas', 'Bloqueo automático en aulas y despachos, empezando por un piloto. Win+L / ⌘+Ctrl+Q.'),
        ('04', 'Datos con acceso mínimo', 'Carpetas por función, proveedores revisados y política de IA generativa.'),
        ('05', 'Respuesta preparada', 'Procedimiento, contactos y ficha de incidente impresos y a mano. Lo ensayado se hace bien.'),
    ]
    for n,t,d in prios:
        story.append(p(f'<font color="#0071e3"><b>{n}</b></font> &nbsp;<b>{t}</b> — {d}', s_body))
    story.append(p('Hoja de ruta a seis meses', s_h2))
    story.append(p('<b>Mes 1 — Base y mayor riesgo:</b> confirmar plataformas y administradores, inventario y revisión de cuentas privilegiadas, primera copia verificada, MFA en administración y dirección, piloto de bloqueo automático, formación de inicio de curso.', s_body))
    story.append(p('<b>Meses 2 y 3 — Control de datos:</b> permisos y carpetas por función, primera restauración completa, mapa de datos y proveedores, política de IA generativa, diseño de la segmentación de red.', s_body))
    story.append(p('<b>Meses 4 a 6 — Ampliación:</b> simulacro de phishing, bloqueo en todas las aulas, segmentación de red, SPF/DKIM/DMARC, MDM/EDR en equipos compatibles, llaves FIDO2 en cuentas críticas, ejercicio de incidente.', s_body))

    # 2 Finalidad
    story.append(p('2 &nbsp; Finalidad, alcance y marco normativo', s_h1))
    story.append(p('1 — Finalidad', s_h2))
    story.append(p('Este plan establece medidas para proteger la información del instituto, reducir los accesos indebidos y mantener la actividad educativa ante una pérdida, una cuenta comprometida, malware o ransomware. La actividad del centro depende de cuentas digitales, correo, plataformas educativas, equipos de aula, red y documentos compartidos: la protección debe impedir accesos accidentales, limitar el alcance de un fallo y permitir la recuperación.', s_body))
    story.append(p('2 — Alcance', s_h2))
    story.append(p('El plan cubre los datos de alumnado, familias y personal; calificaciones, exámenes, actas e informes de orientación; el correo y las cuentas administrativas; y los equipos de aula, portátiles y dispositivos conectados. Afecta a todo el personal del centro y a los servicios descritos en el apartado siguiente.', s_body))
    story.append(p('3 — Marco normativo y documentos de referencia', s_h2))
    story.append(p('<b>RGPD y LOPDGDD</b> — Reglamento (UE) 2016/679 y Ley Orgánica 3/2018. Principios de tratamiento, seguridad de los datos personales y notificación de brechas.', s_body))
    story.append(p('<b>Esquema Nacional de Seguridad (ENS) — Real Decreto 311/2022.</b> Se aplica a todo el sector público (art. 2) y EducaMadrid indica que lo sigue. La Consejería, con el DPD, confirma qué sistemas del centro entran en su alcance.', s_body))
    story.append(p('<b>Guía para centros educativos (AEPD)</b> — El RGPD no fija un catálogo de medidas: se eligen según el riesgo de cada tratamiento. La guía figura como “en revisión”; conviene comprobar la versión vigente.', s_body))
    story.append(p('<b>DPD de la Consejería de Educación:</b> protecciondatos.educacion@madrid.org — 91 720 4068. Consultas y brechas de datos personales.', s_body))
    story.append(p('<b>INCIBE, CISA y EducaMadrid:</b> buenas prácticas para centros — bloqueo de sesión, MFA, copias aisladas y probadas, plan de respuesta a incidentes y formación. EducaMadrid publica principios de confidencialidad, integridad y disponibilidad.', s_body))

    # 3 Situación y riesgos
    story.append(p('3 &nbsp; Situación tecnológica y riesgos', s_h1))
    story.append(p('Plataformas del centro: Google Workspace, EducaMadrid (usuario@educa.madrid.org), Alexia/Raíces, y equipos de aula con Windows/macOS. Red con segmentación pendiente; correo con SPF/DKIM/DMARC por completar; MDM/EDR en despliegue.', s_body))
    story.append(p('Mapa de 9 riesgos — valoración orientativa (probabilidad × impacto)', s_h2))
    riesgos = [
        ('1', 'Sesión abierta', 'Alta', 'Alto', 'Ordenador del aula sin bloquear. Cualquiera se sienta y lee notas, correo, exámenes.'),
        ('2', 'Contraseña robada (phishing)', 'Alta', 'Alto', 'Correo que imita a EducaMadrid o al banco. Un clic y tu cuenta ya no es tuya.'),
        ('3', 'Ransomware (cifrado y chantaje)', 'Media', 'Crítico', 'Cifra todo el disco y pide rescate. Sin copia aislada, no hay vuelta atrás.'),
        ('4', 'Cuenta sin baja', 'Media', 'Alto', 'Profe o alumno que se fue pero su cuenta sigue activa con acceso a Drive.'),
        ('5', 'Acceso excesivo', 'Media', 'Alto', 'Carpeta de Orientación compartida con todo el claustro. Datos sensibles expuestos.'),
        ('6', 'Datos en IA no autorizada', 'Alta', 'Medio', 'Pegar notas con nombres en ChatGPT gratis. Ya no controlas dónde están.'),
        ('7', 'Red plana', 'Baja', 'Alto', 'Invitados y alumnos en la misma red que Administración. Un salto y entran.'),
        ('8', 'Pérdida o robo', 'Media', 'Medio', 'Portátil o pen perdido sin cifrar. Quien lo encuentra lo lee todo.'),
        ('9', 'Caída de EducaMadrid', 'Media', 'Medio', 'Sin internet o plataforma caída en plena evaluación. Plan B offline necesario.'),
    ]
    header = [p('<b>#</b>', s_table_head), p('<b>Riesgo</b>', s_table_head), p('<b>Prob.</b>', s_table_head), p('<b>Impacto</b>', s_table_head), p('<b>Descripción</b>', s_table_head)]
    rows = [header]
    for r in riesgos:
        rows.append([p(r[0], s_table_cell), p(f'<b>{r[1]}</b>', s_table_cell), p(r[2], s_table_cell), p(r[3], s_table_cell), p(r[4], s_table_cell)])
    t = Table(rows, colWidths=[8*mm, 36*mm, 18*mm, 18*mm, 84*mm], repeatRows=1)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), AZUL_OSCURO),
        ('TEXTCOLOR', (0,0), (-1,0), white),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [white, GRIS_CLARO]),
        ('GRID', (0,0), (-1,-1), 0.4, GRIS_BORDE),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(t)
    story.append(p('Valoración orientativa del Plan — debe validarse con DPD y Dirección. Medidas asociadas en el apartado 8.', s_caption))
    story.append(p('Criterios de implantación: priorizar mayor riesgo (sesión abierta, phishing), aprovechar lo ya disponible (EducaMadrid, Windows Hello), pilotos antes de despliegue total y formación breve de inicio de curso.', s_body))

    # 4 Identidades
    story.append(p('4 &nbsp; Identidades, sesiones y puestos', s_h1))
    story.append(p('Bloqueo automático: 5 min en aulas, 2 min en administración; piloto mes 1, despliegue total meses 4–5. Atajo: <b>Win+L</b> / <b>⌘+Ctrl+Q</b> siempre. Desactivar “mantener sesión iniciada” y “recordar contraseña” en equipos compartidos.', s_body))
    story.append(p('Cuentas y MFA: nominales, sin genéricas; revisión trimestral de altas/bajas; MFA obligatorio en dirección/administración (TOTP o llave FIDO2). edu­ca­madrid.org: usuario nominal, sin compartir; Google Workspace: alias solo si aporta valor.', s_body))
    story.append(p('Privilegios: mínimo necesario, revisión trimestral, doble administrador para cambios críticos, registro de actividad de Drive. Puestos compartidos: perfil invitado sin persistencia, borrado al cerrar sesión.', s_body))

    # 5 Datos
    story.append(p('5 &nbsp; Datos, accesos y recuperación', s_h1))
    story.append(p('Clasificación: público / interno / confidencial (notas, orientación) / restringido (salud, medidas judiciales). Carpetas por función, no por persona; Orientación solo para orientadores y tutores implicados.', s_body))
    story.append(p('Revisión de accesos: trimestral; al mover de grupo, revocar. Proveedores: contrato encargado, ubicación UE y medidas. No pegar datos con nombres en IA generativa no autorizada (ver apartado 6).', s_body))
    story.append(p('Copias y brechas: 3-2-1 (3 copias, 2 soportes, 1 externa); prueba de restauración trimestral; copia aislada (air-gap o inmutable). Brecha RGPD: notificar a AEPD en 72 h vía DPD si hay riesgo; comunicar a afectados si riesgo alto. Ficha Anexo B.', s_body))

    # 6 Red
    story.append(p('6 &nbsp; Red, dispositivos, correo y personas', s_h1))
    story.append(p('Red: segmentación en 4 VLAN — alumnos / profesorado / administración / invitados; invitados con portal cautivo y sin acceso a recursos internos; IoT aislado. Diseño mes 3, implantación meses 4–6 con Ayuntamiento/Consejería.', s_body))
    story.append(p('Dispositivos: inventario Anexo C, MDM para portátiles del centro (borrado remoto, cifrado BitLocker/FileVault), EDR donde sea viable. Móviles: perfil de trabajo separado; BYOD solo con MDM o contenedor.', s_body))
    story.append(p('Correo: SPF (v=spf1), DKIM y DMARC (p=quarantine → p=reject) para evitar suplantación del dominio del instituto; revisión de reenvíos y delegaciones; formación anti-phishing y simulacro mes 4.', s_body))
    story.append(p('IA generativa: solo herramientas aprobadas con contrato; no alimentar con datos de alumnado; informar a familias; evaluar sesgos. Formación: 45 min inicio de curso + píldoras trimestrales + ejercicio de mesa.', s_body))

    # 7 Incidentes
    story.append(p('7 &nbsp; Incidentes y continuidad', s_h1))
    story.append(p('Procedimiento 6 fases — DETECTAR, CONTENER, ERRADICAR, RECUPERAR, COMUNICAR, APRENDER. No apagar si hay ransomware cifrando (aislar red y fotografiar nota de rescate). Preservar logs y capturas con fecha/hora.', s_body))
    gravedad = [
        ('Baja', 'Equipo aislado, sin datos personales.'),
        ('Media', 'Varias cuentas o aula, posible dato sensible.'),
        ('Alta', 'Ransomware, brecha o suplantación general.'),
        ('Crítica', 'Datos masivos, chantaje, riesgo para persona.'),
    ]
    for lvl, desc in gravedad:
        story.append(p(f'<b>{lvl}:</b> {desc}', s_body))
    story.append(p('Señuelos (honeytoken): “Presupuesto_Proyecto_2026.xlsx” sin datos reales en carpeta trampa; avisa a TIC si se abre. No usar datos reales ni credenciales. Continuidad: plan B offline (lista de contactos fuera de la red, copias locales) para caída de EducaMadrid o sin internet.', s_body))

    # 8 Plan de acción
    story.append(p('8 &nbsp; Plan de acción — 22 medidas', s_h1))
    story.append(p('Veintidós medidas con prioridad, responsable y plazo. El detalle completo figura a continuación; la ficha y el inventario están en los Anexos B y C.', s_body))
    medidas = [
        ('1', 'Inventario real de activos', 'TIC', 'Mes 1', 'Alta'),
        ('2', 'Revisión de cuentas privilegiadas', 'TIC + Dirección', 'Mes 1', 'Alta'),
        ('3', 'MFA en Dirección y Secretaría', 'TIC', 'Mes 1', 'Alta'),
        ('4', 'Copia verificada + prueba de restauración', 'TIC', 'Mes 1 / Trimestral', 'Alta'),
        ('5', 'Piloto bloqueo automático en aulas', 'TIC', 'Mes 1', 'Alta'),
        ('6', 'Formación inicio de curso (phishing, bloqueo)', 'TIC + Orientación', 'Mes 2', 'Media'),
        ('7', 'Carpetas por función (mínimo acceso)', 'TIC + Jefatura', 'Mes 2–3', 'Alta'),
        ('8', 'Mapa de datos y proveedores', 'DPD', 'Mes 2–3', 'Media'),
        ('9', 'Política de IA generativa del centro', 'Dirección + DPD', 'Mes 3', 'Media'),
        ('10', 'Diseño de segmentación de red', 'TIC + Ayuntamiento', 'Mes 3', 'Media'),
        ('11', 'Simulacro de phishing docente', 'TIC', 'Mes 4', 'Media'),
        ('12', 'Bloqueo automático en todas las aulas', 'TIC', 'Mes 4–5', 'Alta'),
        ('13', 'SPF, DKIM y DMARC en correo', 'TIC / Admin Workspace', 'Mes 5', 'Media'),
        ('14', 'MDM/EDR en equipos compatibles', 'TIC', 'Mes 5–6', 'Media'),
        ('15', 'Llaves FIDO2 en cuentas críticas', 'TIC', 'Mes 6', 'Media'),
        ('16', 'Señuelos (honeytoken) en ficheros críticos', 'TIC', 'Mes 4', 'Media'),
        ('17', 'Revisión trimestral de accesos', 'Jefatura + TIC', 'Trimestral', 'Alta'),
        ('18', 'Ejercicio de mesa de incidente', 'DPD + TIC', 'Mes 6', 'Media'),
        ('19', 'Actualización del inventario', 'TIC', 'Trimestral', 'Media'),
        ('20', 'Auditoría de logs de Drive', 'TIC', 'Mensual', 'Media'),
        ('21', 'Comunicación a familias del plan', 'Dirección', 'Mes 2', 'Media'),
        ('22', 'Aprobación y firma del plan', 'Dirección / Consejo', 'Mes 1', 'Alta'),
    ]
    header = [p('<b>#</b>', s_table_head), p('<b>Medida</b>', s_table_head), p('<b>Responsable</b>', s_table_head), p('<b>Plazo</b>', s_table_head), p('<b>Prioridad</b>', s_table_head)]
    rows = [header]
    for m in medidas:
        rows.append([p(m[0], s_table_cell), p(m[1], s_table_cell), p(m[2], s_table_cell), p(m[3], s_table_cell), p('<b>'+m[4]+'</b>' if m[4]=='Alta' else m[4], s_table_cell)])
    t = Table(rows, colWidths=[8*mm, 72*mm, 36*mm, 28*mm, 18*mm], repeatRows=1)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), AZUL_OSCURO),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [white, GRIS_CLARO]),
        ('GRID', (0,0), (-1,-1), 0.4, GRIS_BORDE),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 3),
        ('RIGHTPADDING', (0,0), (-1,-1), 3),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(t)

    # 9 Glosario
    story.append(p('9 &nbsp; Glosario, fuentes y aprobación', s_h1))
    glos = [
        ('MFA', 'Doble factor: contraseña + app/SMS/llave FIDO2. Si te roban la contraseña, no entran.'),
        ('EDR', 'Antivirus avanzado que vigila cada equipo y avisa al TIC si ve algo raro.'),
        ('MDM', 'Gestión remota: instalar, bloquear o borrar un portátil/móvil perdido.'),
        ('Phishing', 'Correo/SMS falso que imita ser tu banco o el instituto para robarte la clave.'),
        ('Ransomware', 'Malware que cifra tus archivos y pide dinero para devolverlos.'),
        ('DLP', 'Reglas que impiden sacar datos sensibles (p. ej., notas) fuera del centro.'),
        ('DPD', 'Delegado de Protección de Datos de la Consejería: protecciondatos.educacion@madrid.org'),
        ('SPF/DKIM/DMARC', 'Filtros que evitan que suplanten el correo del instituto.'),
        ('FIDO2', 'Llave física de seguridad (p. ej., YubiKey) para MFA resistente al phishing.'),
        ('Honeytoken', 'Señuelo — archivo falso que dispara alerta si alguien lo abre.'),
    ]
    for k,d in glos:
        story.append(p(f'<b>{k}:</b> {d}', s_body))
    story.append(p('Fuentes: RGPD, LOPDGDD, ENS RD 311/2022, guías AEPD para centros, INCIBE, CISA (K-12 Toolkit, cyber decoys), EducaMadrid. Consultar siempre versión vigente.', s_small))
    story.append(p('Agradecimientos: al claustro y al personal de administración por la información aportada. Firmas: Dirección, Secretaría, Coordinación TIC, DPD.', s_small))

    # Anexos
    story.append(p('Anexos', s_h1))
    story.append(p('Anexo A — Agenda de contactos', s_h2))
    story.append(p('INCIBE 017 — 900 116 117 — ayuda@incibe.es — 8:00–23:00, gratis y confidencial<br/>112 Emergencias — si hay peligro o amenaza para persona<br/>AEPD — dpd en 72 h vía DPD: 91 720 4068 / protecciondatos.educacion@madrid.org<br/>TIC Diego Navarro — 91 617 10 74 — 91 236 94 06 — ies.manueldefalla.mostoles@educa.madrid.org<br/>Ayuntamiento / Consejería — contacto red segmentada', s_body))
    story.append(p('Anexo B — Ficha de incidente', s_h2))
    story.append(p('Plantilla en blanco para imprimir, con fecha/hora, informante, sistema, descripción, datos personales (RGPD), gravedad, acciones y firmas. Descargable en: /public/pdfs/plantilla-ficha-incidente.pdf', s_body))
    story.append(p('Anexo C — Inventario TIC', s_h2))
    story.append(p('Elemento · tipo · ubicación · responsable · sistema/versión · gestión (GPO/MDM/EDR) · notas/n.º serie/IP. Plantilla en: /public/pdfs/plantilla-inventario.pdf', s_body))
    story.append(p('Anexo D — Costes estimados', s_h2))
    costes = [
        ('NAS Synology DS425+', '554,99 €', 'bechtle.com', 'Para copia local inmutable'),
        ('Discos NAS 4×4 TB', '~480 €', 'Por confirmar', 'Presupuestar aparte'),
        ('Llaves FIDO2 (×10)', '~50 €/ud', 'Fabricante', 'Para cuentas críticas'),
        ('MDM/EDR licencias', 'Según nº equipos', 'Por confirmar', 'Cuota anual'),
    ]
    rows = [[p('<b>Concepto</b>', s_table_head), p('<b>Precio</b>', s_table_head), p('<b>Fuente</b>', s_table_head), p('<b>Notas</b>', s_table_head)]]
    for c in costes:
        rows.append([p(c[0], s_table_cell), p(c[1], s_table_cell), p(c[2], s_table_cell), p(c[3], s_table_cell)])
    t = Table(rows, colWidths=[52*mm, 28*mm, 32*mm, 62*mm], repeatRows=1)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), AZUL),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [white, GRIS_CLARO]),
        ('GRID', (0,0), (-1,-1), 0.4, GRIS_BORDE),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(t)
    story.append(p('Costes orientativos — confirmar con diagnóstico del mes 1 y presupuesto oficial.', s_caption))
    story.append(p('Documento corregido UTF-8 — Todas las tildes (á, é, í, ó, ú, ñ) y diéresis visualizadas correctamente. IES Manuel de Falla — Móstoles, 2026.', ParagraphStyle('final', parent=s_caption, textColor=AZUL, fontName='DejaVu-Bold')))

    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    print(f'PDF regenerado OK: {OUTPUT} — {os.path.getsize(OUTPUT)} bytes')

if __name__ == '__main__':
    build()
