export const riesgos = [
  { id: 1, title: "Sesión abierta", prob: "Alta", impacto: "Alto", desc: "Dejas el ordenador desbloqueado en el aula. Cualquiera puede leer tus notas, tu correo o tus exámenes.", medida: "Bloqueo automático. Win+L / ⌘+Ctrl+Q. Siempre." },
  { id: 2, title: "Contraseña robada", prob: "Alta", impacto: "Alto", desc: "Un correo falso que parece del insti o del banco. Un clic y pierdes tu cuenta.", medida: "MFA y contraseñas distintas. Revisa el remitente real." },
  { id: 3, title: "Ransomware", prob: "Media", impacto: "Crítico", desc: "Un virus que cifra todos tus archivos y pide dinero para devolverlos. Sin copia de seguridad, no hay vuelta atrás.", medida: "Copia verificada cada trimestre. Una copia aislada." },
  { id: 4, title: "Cuenta sin baja", prob: "Media", impacto: "Alto", desc: "Un profesor o alumno que se fue pero su cuenta sigue activa y con acceso a Drive.", medida: "Revisión trimestral de cuentas. Bajas inmediatas." },
  { id: 5, title: "Acceso excesivo", prob: "Media", impacto: "Alto", desc: "Una carpeta de Orientación compartida con todo el profesorado. Datos sensibles expuestos.", medida: "Carpetas por función. Principio de mínimo acceso." },
  { id: 6, title: "Datos en IA no autorizada", prob: "Alta", impacto: "Medio", desc: "Pegaste notas con nombres de alumnos en ChatGPT u otra IA gratuita. Ya no controlas dónde están esos datos.", medida: "Política IA del centro. Usa solo herramientas aprobadas." },
  { id: 7, title: "Red plana", prob: "Baja", impacto: "Alto", desc: "Invitados y alumnos en la misma red que Administración. Un salto y pueden entrar.", medida: "Red segmentada: alumnos / profes / administración / invitados." },
  { id: 8, title: "Pérdida o robo", prob: "Media", impacto: "Medio", desc: "Un portátil o pendrive perdido sin cifrar. Quien lo encuentra puede leer todo.", medida: "FileVault / BitLocker + MDM para borrado remoto." },
  { id: 9, title: "Caída EducaMadrid", prob: "Media", impacto: "Medio", desc: "Sin internet o con EducaMadrid caída en plena evaluación.", medida: "Plan B offline y contacto fuera de la red." },
]

export const medidas22 = [
  { n: 1, title: "Inventario real", resp: "TIC", plazo: "Mes 1", prio: "Alta" },
  { n: 2, title: "Revisión cuentas privilegiadas", resp: "TIC + Dirección", plazo: "Mes 1", prio: "Alta" },
  { n: 3, title: "MFA en Dirección y Secretaría", resp: "TIC", plazo: "Mes 1", prio: "Alta" },
  { n: 4, title: "Copia verificada + prueba restauración", resp: "TIC", plazo: "Mes 1 / Trimestral", prio: "Alta" },
  { n: 5, title: "Piloto bloqueo automático aulas", resp: "TIC", plazo: "Mes 1", prio: "Alta" },
  { n: 6, title: "Formación inicio curso (phishing, bloqueo)", resp: "TIC + Orientación", plazo: "Mes 2", prio: "Media" },
  { n: 7, title: "Carpetas por función (mínimo acceso)", resp: "TIC + Jefatura", plazo: "Mes 2-3", prio: "Alta" },
  { n: 8, title: "Mapa de datos y proveedores", resp: "DPD", plazo: "Mes 2-3", prio: "Media" },
  { n: 9, title: "Política IA generativa del centro", resp: "Dirección + DPD", plazo: "Mes 3", prio: "Media" },
  { n: 10, title: "Diseño segmentación red", resp: "TIC + Ayuntamiento/Consejería", plazo: "Mes 3", prio: "Media" },
  { n: 11, title: "Simulacro phishing docente", resp: "TIC", plazo: "Mes 4", prio: "Media" },
  { n: 12, title: "Bloqueo automático en todas las aulas", resp: "TIC", plazo: "Mes 4-5", prio: "Alta" },
  { n: 13, title: "SPF, DKIM y DMARC en correo", resp: "TIC/Admin Workspace", plazo: "Mes 5", prio: "Media" },
  { n: 14, title: "MDM/EDR en equipos compatibles", resp: "TIC", plazo: "Mes 5-6", prio: "Media" },
  { n: 15, title: "Llaves FIDO2 en cuentas críticas", resp: "TIC", plazo: "Mes 6", prio: "Media" },
  { n: 16, title: "Señuelos (honeytoken) en ficheros críticos", resp: "TIC", plazo: "Mes 4", prio: "Media" },
  { n: 17, title: "Revisión trimestral de accesos", resp: "Jefatura + TIC", plazo: "Trimestral", prio: "Alta" },
  { n: 18, title: "Ejercicio de mesa de incidente", resp: "DPD + TIC", plazo: "Mes 6", prio: "Media" },
  { n: 19, title: "Actualización del inventario", resp: "TIC", plazo: "Trimestral", prio: "Media" },
  { n: 20, title: "Auditoría de logs de Drive", resp: "TIC", plazo: "Mensual", prio: "Media" },
  { n: 21, title: "Comunicación a familias del plan", resp: "Dirección", plazo: "Mes 2", prio: "Media" },
  { n: 22, title: "Aprobación y firma del plan", resp: "Dirección / Consejo", plazo: "Mes 1", prio: "Alta" },
]

export const quiz = [
  {
    q: "Recibes un correo de 'soporte@educa-madrid-urgente.com' diciendo que tu cuenta se bloquea hoy si no haces clic. Remitente real: noreply@g.educa.madrid.org es el oficial. ¿Qué haces?",
    opts: ["Hago clic rápido, no quiero perder la cuenta", "Paso el ratón por el enlace, veo dominio raro y lo reporto", "Reenvío a mis compañeros para avisar"],
    ok: 1,
    why: "El dominio no coincide. EducaMadrid nunca pide datos urgentes por enlace. Reporta a TIC."
  },
  {
    q: "Te llega un DM en Instagram: '¡Has ganado un iPhone! Solo paga 1€ de envío aquí: bit.ly/iphone-free-2026'.",
    opts: ["Es phishing/tienda falsa. El cebo barato es la trampa", "Pago 1€, total son solo 1€", "Comparto para que otros ganen"],
    ok: 0,
    why: "Chollo imposible + link acortado + urgencia = estafa. Cierra y bloquea."
  },
  {
    q: "Un compañero te pide tu contraseña de EducaMadrid 'para subir un trabajo por ti' porque está enfermo.",
    opts: ["Se la paso, es mi amigo", "Le doy una temporal", "No. Cada cuenta es nominal. Que contacte al profe"],
    ok: 2,
    why: "Cuenta nominal del Plan: nunca se comparten credenciales. Ni entre amigos."
  },
  {
    q: "Ves en TikTok un vídeo que dice que una app nueva filtra exámenes del instituto. Pide acceso a tus contactos y ubicación.",
    opts: ["Acepto todo para ver el vídeo", "Instalo y luego miro permisos", "Deniego permisos innecesarios y verifico la fuente"],
    ok: 2,
    why: "Principio de mínimo: una app de vídeo no necesita tus contactos. Fake news + permisos = trampa."
  },
  {
    q: "Tu móvil te pide actualizar iOS/Android. Estás en medio de un juego.",
    opts: ["Actualizar hoy. Los parches cierran puertas al ransomware", "Posponer una semana", "Desactivar actualizaciones automáticas"],
    ok: 0,
    why: "Del PDF: mantener sistema actualizado es medida 1. Las actualizaciones cierran vulnerabilidades usadas por malware."
  },
  {
    q: "En clase, un profe deja su sesión abierta y se va. Tú necesitas imprimir.",
    opts: ["Uso su sesión, es más rápido", "Cierro todo lo que tiene abierto", "Bloqueo (Win+L) y aviso al profe. Luego inicio la mía"],
    ok: 2,
    why: "Riesgo 1 del Plan: sesión abierta. Bloquear y avisar es el protocolo. No usar ni cerrar."
  },
]

export const dispositivos = {
  windows: [
    "Comprueba Windows Update → todo al día",
    "Seguridad de Windows → antivirus activo, firewall activado",
    "Inicio (Ctrl+Shift+Esc → Inicio) → desactiva lo desconocido",
    "No instales sin autorización en equipos del centro",
    "BitLocker activado si hay datos sensibles"
  ],
  macos: [
    "macOS actualizado (Ajustes → General → Actualización)",
    "Revisa permisos apps (Ubicación/Cámara/Micrófono)",
    "FileVault activado para cifrar disco",
    "Firewall de macOS activado",
    "Coordina con TIC antes de tocar seguridad"
  ],
  android: [
    "Play Protect activo (Play Store → Perfil)",
    "Revisa permisos: ubicación/cámara solo si toca",
    "Actualizaciones automáticas activadas",
    "Family Link si eres menor (con acuerdo familiar)",
    "Desconfía si un juego pide desactivar protecciones"
  ],
  ios: [
    "iOS actualizado (Ajustes → General)",
    "Comprobación de seguridad → revisa accesos",
    "Tiempo de Uso con límites pactados",
    "Ojo al 'Añadir límite / Pedir más tiempo' → puede saltarse control",
    "FaceID/código siempre activo"
  ]
}

export const fases = [
  { n: 1, t: "DETECTAR", d: "¿Qué ocurrió, cuándo y qué está afectado? Anota todo, no toques nada.", icon: "Eye" },
  { n: 2, t: "CONTENER", d: "Aísla el equipo o cuenta. Desconecta de la red, pero NO apagues si sospechas de ransomware.", icon: "Shield" },
  { n: 3, t: "ERRADICAR", d: "Elimina la causa (virus, cuenta robada). Cambia todas las contraseñas.", icon: "Trash" },
  { n: 4, t: "RECUPERAR", d: "Restaura desde una copia verificada. Comprueba que el problema no vuelve.", icon: "ArrowsClockwise" },
  { n: 5, t: "COMUNICAR", d: "Avisa a Dirección, DPD y, si hay datos personales, a la AEPD en 72h. Llama al 017 de INCIBE.", icon: "Megaphone" },
  { n: 6, t: "APRENDER", d: "Documenta todo en la ficha, actualiza el inventario y mejora el plan. Haz un simulacro.", icon: "GraduationCap" },
]

export const glosario = [
  { k: "MFA / 2FA", d: "Doble factor: contraseña + app/SMS/llave. Si te roban la pass, no entran." },
  { k: "EDR", d: "Antivirus avanzado que vigila cada equipo y avisa al TIC si ve algo raro." },
  { k: "MDM", d: "Gestión remota: instalar, bloquear o borrar un portátil/móvil perdido." },
  { k: "Phishing", d: "Correo/SMS falso que imita ser tu banco o el insti para robarte la clave." },
  { k: "Ransomware", d: "Malware que cifra tus archivos y pide dinero para devolverlos." },
  { k: "DLP", d: "Reglas que impiden sacar datos sensibles (ej: notas) fuera del centro." },
  { k: "DPD", d: "Delegado Protección de Datos de la Consejería: protecciondatos.educacion@madrid.org" },
  { k: "SPF/DKIM/DMARC", d: "Filtros que evitan que suplanten el correo del insti." },
  { k: "Cifrado", d: "Convertir datos en código ilegible. Solo quien tiene la clave puede leerlos." },
  { k: "Ingeniería social", d: "Técnicas para engañar a personas y que revelen información o hagan clic." },
  { k: "Brecha de datos", d: "Acceso no autorizado a información personal. Se notifica a la AEPD en 72h. Ej: web que pierde usuarios." },
  { k: "Zero-day", d: "Vulnerabilidad desconocida por el fabricante. No hay parche todavía." },
]
export const recursos = [
  { tipo: "Herramienta", titulo: "Have I Been Pwned", desc: "Comprueba si tu correo o contraseñas han sido comprometidos en brechas de seguridad. Oficial y gratuito.", url: "https://haveibeenpwned.com/", icon: "ShieldCheck", tiempo: "1 min", nuevo: true },
  { tipo: "Herramienta", titulo: "VirusTotal", desc: "Analiza archivos sospechosos o URLs con más de 70 antivirus. Gratis y sin registro.", url: "https://www.virustotal.com/", icon: "Bug", tiempo: "2 min", nuevo: true },
  { tipo: "Herramienta", titulo: "Mozilla Observatory", desc: "Analiza la seguridad de cualquier página web. Ideal para verificar sitios sospechosos.", url: "https://observatory.mozilla.org/", icon: "Globe", tiempo: "2 min", nuevo: true },
  { tipo: "Herramienta", titulo: "Password Monster", desc: "Comprueba cuánto tardaría en crackearse tu contraseña. Educativo y sin guardar datos.", url: "https://www.passwordmonster.com/", icon: "Key", tiempo: "1 min", nuevo: true },
  { tipo: "Guía", titulo: "INCIBE - Guía de contraseñas seguras", desc: "Cómo crear y gestionar contraseñas fuertes. Guía oficial con ejemplos prácticos.", url: "https://www.incibe.es/empresas/fichas/contrasenas-seguras", icon: "FileText", tiempo: "5 min" },
  { tipo: "Interactivo", titulo: "Phishing Quiz de Google", desc: "Pon a prueba tu capacidad para detectar phishing con este quiz interactivo oficial de Google.", url: "https://phishingquiz.withgoogle.com/", icon: "GameController", tiempo: "5 min", nuevo: true },
  { tipo: "Herramienta", titulo: "2FA Directory", desc: "Directorio de servicios que soportan autenticación en dos pasos. Comprueba los tuyos.", url: "https://2fa.directory/", icon: "LockKey", tiempo: "2 min", nuevo: true },
  { tipo: "Herramienta", titulo: "URLScan.io", desc: "Analiza URLs sospechosas sin visitarlas. Te dice a dónde redirigen y si son maliciosas.", url: "https://urlscan.io/", icon: "Link", tiempo: "2 min", nuevo: true }
]
