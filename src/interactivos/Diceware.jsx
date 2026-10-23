import { useState, useMemo } from 'react'

// Lista Diceware ES simplificada 80 palabras (para demo sin fetch 7776)
const WORDS = ["casa","luz","mar","bosque","rio","nube","sol","luna","viento","tierra","fuego","agua","camino","puente","jardin","escuela","libro","musica","tiempo","ciudad","montaña","playa","estrella","cielo","arból","piedra","flor","viento","nieve","lluvia","trueno","bosque","sendero","viaje","memoria","historia","futuro","presente","pasado","amigo","familia","corazón","mente","sueño","realidad","verdad","paz","alegría","esperanza","valor","fuerza","libertad","justicia","palabra","silencio","mirada","sonrisa","abrazo","viajero","destino","horizonte","aventura","misterio","secreto","tesoro","llave","puerta","ventana","espejo","sombra","luz","eco","voz","canto","ritmo","color","brisa","aurora","cometa","galaxia","universo","infinito","eternidad","destello"]

function randomWords(n){
  const out=[]
  const arr = new Uint32Array(n)
  crypto.getRandomValues(arr)
  for(let i=0;i<n;i++) out.push(WORDS[arr[i] % WORDS.length])
  return out
}

function estimateCrackTime(words){
  // entropía: log2(80^n) bits
  const bits = Math.log2(Math.pow(WORDS.length, words.length))
  // asume 1e9 intentos/s (offline rápido)
  const seconds = Math.pow(2, bits) / 1e9
  if(seconds < 60) return `${Math.round(seconds)} s`
  if(seconds < 3600) return `${Math.round(seconds/60)} min`
  if(seconds < 86400) return `${Math.round(seconds/3600)} h`
  if(seconds < 31536000) return `${Math.round(seconds/86400)} días`
  if(seconds < 315360000) return `${Math.round(seconds/31536000)} años`
  return `${(seconds/31536000).toExponential(1)} años`
}

export default function Diceware(){
  const [words, setWords] = useState(()=> randomWords(4))
  const [sep, setSep] = useState('-')
  const phrase = useMemo(()=> words.join(sep), [words, sep])
  // crack time via simple calc (podría usar @zxcvbn-ts pero demo rápida)
  const crack = estimateCrackTime(words)
  const bits = Math.log2(Math.pow(WORDS.length, words.length)).toFixed(1)

  const copy = async()=> { await navigator.clipboard.writeText(phrase); }
  return (
    <div className="rounded-[28px] bg-canvas dark:bg-[#000000] p-6">
      <div className="flex items-center justify-between">
        <div className="text-[12px] font-semibold tracking-[0.06em] text-primary-ink dark:text-[#f5f5f7]">FRASE DE PASO</div>
        <span className="text-[11px] px-2 py-1 rounded-full bg-paper dark:bg-[#1c1c1e] border border-hairline dark:border-white/10 text-primary-ink dark:text-[#f5f5f7]">{bits} bits</span>
      </div>
      <p className="text-[12px] leading-5 text-deep-gray dark:text-[#a1a1a6] mt-1">Diceware ES: 4 palabras aleatorias con <code className="bg-paper dark:bg-[#1c1c1e] px-1 py-0.5 rounded border border-hairline dark:border-white/10">crypto.getRandomValues</code>. Sustituye a IES-Mostoles-2026!</p>
      <div className="mt-4 rounded-[16px] bg-paper dark:bg-[#1c1c1e] border border-hairline dark:border-white/10 p-4">
        <div className="text-[15px] font-mono font-medium text-primary-ink dark:text-[#f5f5f7] break-all text-center" aria-live="polite">{phrase}</div>
        <div className="mt-3 flex gap-2 justify-center flex-wrap">
          <button onClick={()=> setWords(randomWords(4))} className="px-4 py-2 rounded-full bg-primary-ink text-white text-[12px] font-medium">Nueva frase</button>
          <button onClick={copy} className="px-4 py-2 rounded-full bg-paper dark:bg-[#1c1c1e] border border-hairline dark:border-white/10 text-primary-ink dark:text-[#f5f5f7] text-[12px]">Copiar</button>
          <select value={sep} onChange={e=> setSep(e.target.value)} className="px-3 py-2 rounded-full bg-paper dark:bg-[#1c1c1e] border border-hairline dark:border-white/10 text-[12px]">
            <option value="-">-</option><option value=" ">espacio</option><option value="">sin</option><option value="_">_</option>
          </select>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
          <div className="rounded-[12px] bg-canvas dark:bg-[#000000] p-3 text-center">
            <div className="font-semibold text-primary-ink dark:text-[#f5f5f7]">Tiempo crackeo</div>
            <div className="text-electric-blue font-mono font-medium">{crack}</div>
          </div>
          <div className="rounded-[12px] bg-canvas dark:bg-[#000000] p-3 text-center">
            <div className="font-semibold text-primary-ink dark:text-[#f5f5f7]">Longitud</div>
            <div className="text-electric-blue font-mono">{phrase.length} car.</div>
          </div>
        </div>
        <p className="mt-3 text-[11px] leading-4 text-mid-gray text-center">Añade un número o símbolo solo si te lo pide el servicio. Con MFA, esta frase es excelente.</p>
      </div>
    </div>
  )
}
