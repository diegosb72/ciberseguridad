export default function Footer() {
  return (
    <footer className="bg-paper dark:bg-[#1c1c1e] dark:bg-[#0a0a0a] border-t border-hairline/40 dark:border-white/10">
      <div className="apple-shell py-8">
        <div className="flex flex-col md:flex-row justify-between gap-6 text-[12px] leading-5 text-mid-gray">
          <div className="max-w-[640px]">
            <div className="text-[12px] font-semibold text-primary-ink dark:text-[#f5f5f7]">IES Manuel de Falla · Móstoles</div>
            <p className="mt-1">
              Avda. Olímpica, 16 — 28935 Móstoles · Tel. 91 617 10 74 · 91 236 94 06 (cód. 28028568) · Plan 2026/27 · Coord. TIC Diego Navarro · CC BY-SA educativo · Basado en RGPD, ENS RD 311/2022, INCIBE/CISA/AEPD
            </p>
            <p className="mt-2">
              <a href="tel:017" className="text-link-blue underline underline-offset-4">017</a> 8-23h gratis y confidencial · <a href="tel:112" className="text-link-blue underline underline-offset-4">112</a> · DPD 91 720 4068 · <a href="mailto:protecciondatos.educacion@madrid.org" className="text-link-blue underline underline-offset-4">DPD</a> · Todo se genera en tu navegador, sin tracking.
            </p>
          </div>
          <div className="text-right md:text-left shrink-0">
            <div className="text-primary-ink dark:text-[#f5f5f7] font-medium">España · 2026</div>
            <div className="mt-1 flex gap-3 justify-end md:justify-start">
              <a href={import.meta.env.BASE_URL + 'pdfs/Plan_Seguridad_Digital_IES_Manuel_de_Falla-4.pdf'} download="Plan_Seguridad_Digital_IES_Manuel_de_Falla.pdf" className="text-link-blue underline underline-offset-4">Plan PDF</a>
              <span className="text-hairline">·</span>
              <a href={import.meta.env.BASE_URL + 'pdfs/CONTROL_PARENTAL_compressed.pdf'} download="CONTROL_PARENTAL.pdf" className="text-link-blue underline underline-offset-4">Control Parental</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
