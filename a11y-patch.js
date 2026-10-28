/* a11y-patch.js — parche runtime auditoría WCAG 2026-10-28 — idempotente */
(function(){
  var ran=false;
  function patch(){
    if(ran) return; ran=true;
    try{
      console.log('[a11y-patch] aplicando correcciones de accesibilidad');
      // 1. Select Diceware sin nombre
      var sel=document.querySelector('select');
      if(sel && !sel.getAttribute('aria-label') && !sel.id){
        sel.setAttribute('aria-label','Separador entre palabras de la frase contraseña');
        console.log('[a11y] select aria-label añadido');
      }
      // 2. Progressbar protocolo sin nombre
      var pb=document.querySelector('[role="progressbar"]');
      if(pb && !pb.getAttribute('aria-label')){
        pb.setAttribute('aria-label','Progreso de los 6 pasos del protocolo');
        if(!pb.getAttribute('aria-valuemin')) pb.setAttribute('aria-valuemin','0');
        if(!pb.getAttribute('aria-valuemax')) pb.setAttribute('aria-valuemax','6');
        console.log('[a11y] progressbar aria-label añadido');
      }
      // 3. Cuatro inputs acuerdo familiar solo placeholder -> aria-label
      var placeholders=["Ej: Familia García","Ej: L-V 17:00","Ej: TikTok","Ej: móvil fuera"];
      placeholders.forEach(function(ph){
        var el=document.querySelector('input[placeholder*="'+ph.slice(0,10)+'"]');
        if(el && !el.getAttribute('aria-label') && !el.id){
          el.setAttribute('aria-label', ph.replace('Ej:','').trim());
        }
      });
      // fallback: todos los inputs sin label en #familia
      document.querySelectorAll('#familia input[placeholder]:not([aria-label]):not([id])').forEach(function(inp){
        inp.setAttribute('aria-label', inp.placeholder);
      });
      // 4. Enlaces distinguibles sin color -> subrayado
      document.querySelectorAll('footer a[href^="tel:"] , footer a[href^="mailto:"]').forEach(function(a){
        a.classList.add('underline'); a.style.textUnderlineOffset='4px';
      });
      // 5. Contraste azul eléctrico #0071e3 (4.31:1) -> #0056b3 (7:1)
      var style=document.createElement('style');
      style.textContent='.text-electric-blue{color:#0056b3!important} .text-\\[\\#0071e3\\]{color:#0056b3!important} .bg-electric-blue{background:#0056b3!important}';
      document.head.appendChild(style);
      // 6. Roles tab falsos en modo proyector
      document.querySelectorAll('[role="tablist"] [role="tab"]').forEach(function(tab){
        if(tab.tagName==='SPAN'){
          tab.removeAttribute('role'); tab.removeAttribute('aria-selected'); tab.setAttribute('aria-hidden','true');
        }
      });
      console.log('[a11y-patch] OK');
    }catch(e){console.warn('[a11y-patch] error',e)}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', patch);
  else patch();
  // re-run tras SPA nav
  var obs=new MutationObserver(function(){patch(); ran=false; patch();});
  try{obs.observe(document.body,{childList:true,subtree:true})}catch(e){}
})();
