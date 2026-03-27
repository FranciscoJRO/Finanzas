import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import {
  Building2,
  MapPin,
  Briefcase,
  Target,
  Menu,
  X,
  Moon,
  Sun,
  Printer,
  FileText,
  Newspaper,
  Search,
  CheckCircle2,
  Images,
  ListOrdered,
} from 'lucide-react'

type Theme = 'light' | 'dark'

type MarketChartRow = {
  category: string
  projectValue: number
  marketValue: number
}

type Amenity = {
  name: string
  image: string
  description: string
}

type SimilarProject = {
  name: string
  location: string
  summary: string
}

type SourceLink = {
  label: string
  url: string
}

const project = {
  name: 'Asís PerSe',
  developer: 'PerSe Capital',
  location: 'C. Asís 776, Italia Providencia, Guadalajara, Jalisco',
  shortLocation: 'Providencia, Guadalajara',
  units: 38,
  floors: 9,
  amenities: ['Roof garden 200 m²', 'Gimnasio', 'Terrazas', 'Lobby', 'Elevadores'],
  totalInvestment: 81898223,
  annualRate: 18.25,
  estimatedIRR: 19.52,
  guaranteeRatio: 2.7,
  occupancy: 70,
  marketOccupancy: 68,
  nightlyRate: 1350,
  marketNightlyRate: 801,
  annualIncomePerUnit: 347760,
  monthlyIncomePerUnit: 28980,
  soldParticipations: 34,
  totalParticipations: 85,
  operationModel: 'Rentas de corta y larga estancia',
  constructionProgress: 42,
  developerRaised: '$191.4M',
  campaigns: 67,
  projects: 6,
  previousWithBriq: 'cuarto proyecto en colaboración con briq.mx',
}

const amenityDetails: Amenity[] = [
  {
    name: 'Roof garden 200 m²',
    image: '/project-1.jpeg.webp',
    description: 'Espacio panorámico para convivencia, descanso y vistas abiertas en la parte alta del desarrollo.',
  },
  {
    name: 'Gimnasio',
    image: '/gym.jpg.webp',
    description: 'Área enfocada en bienestar y actividad física, alineada con el perfil ejecutivo del proyecto.',
  },
  {
    name: 'Terrazas',
    image: '/image.png',
    description: 'Zonas abiertas que suman valor a la estancia y refuerzan la experiencia premium del edificio.',
  },
  {
    name: 'Lobby',
    image: '/loby.webp',
    description: 'Acceso principal con una imagen cuidada para recepción, circulación y primera impresión del usuario.',
  },
  {
    name: 'Elevadores',
    image: '/elevadores.png',
    description: 'Elemento funcional clave para la comodidad diaria y el flujo eficiente entre niveles.',
  },
]

const similarProjects: SimilarProject[] = [
  {
    name: 'Alarcón PerSe',
    location: 'Mexicaltzingo 2334, Guadalajara',
    summary: 'Desarrollo diseñado bajo esquema de pool de rentas temporales, con una propuesta enfocada en ubicación urbana, movilidad y rendimiento para inversionistas.',
  },
  {
    name: 'San Martín PerSe',
    location: 'General San Martín 584, Col. Lafayette',
    summary: 'Proyecto residencial construido a partir del análisis de demanda de la zona Chapultepec, con una mezcla de diseño, plusvalía y enfoque en rentabilidad.',
  },
  {
    name: 'Monraz PerSe',
    location: 'Huicholes 305, Guadalajara',
    summary: 'Desarrollo habitacional de menor escala y perfil exclusivo, orientado a usuarios que priorizan diseño, seguridad y ubicación dentro de una zona consolidada.',
  },
]

const teamInfo = {
  title: 'Avance del proyecto | Evaluación Financiera',
  subject: 'Finanzas',
  professor: 'Alfredo Uribe Aranda',
  university: 'UNAM Facultad de Ingenieria',
  group: '06',
  date: '27/03/2026',
  members: [
    'Hernández Cázares Rosario Marah',
    'Onofre Gutiérrez Guillermo Angel',
    'Reynoso Ortega Francisco Javier',
    'Ríos Rivera Alejandro',
    'Sotomayor Suárez Edgar Antonio',
  ],
}

const marketRentData: MarketChartRow[] = [
  { category: 'Área (m²)', projectValue: 33, marketValue: 79 },
  { category: 'Renta mensual', projectValue: 28980, marketValue: 25337 },
  { category: 'Renta anual', projectValue: 347760, marketValue: 304038 },
  { category: 'Precio por m²/mes', projectValue: 878, marketValue: 321 },
]

const saleData: MarketChartRow[] = [
  { category: 'Área (m²)', projectValue: 33, marketValue: 66 },
  { category: 'Precio depa', projectValue: 2500000, marketValue: 5284185 },
  { category: 'Precio por m²', projectValue: 75758, marketValue: 80429 },
]

const rentSources: SourceLink[] = [
  {
    label: 'Inmuebles24: renta de 1 recámara en Providencia',
    url: 'https://www.inmuebles24.com/inmuebles-en-renta-en-providencia-con-area-de-juegos-infantiles-con-1-recamara.html',
  },
  {
    label: 'Inmuebles24: renta de 1 recámara en Prados de Providencia',
    url: 'https://www.inmuebles24.com/inmuebles-en-renta-en-prados-de-providencia-con-1-recamara.html',
  },
  {
    label: 'Inmuebles24: renta amueblada en Colomos Providencia',
    url: 'https://www.inmuebles24.com/inmuebles-en-renta-en-fraccionamiento-colomos-providencia-con-amueblado-con-1-recamara.html',
  },
]

const saleSources: SourceLink[] = [
  {
    label: 'Inmuebles24: venta de 1 recámara en Providencia',
    url: 'https://www.inmuebles24.com/departamentos-en-venta-en-providencia-con-1-recamara.html',
  },
  {
    label: 'Inmuebles24: venta en Providencia 1a Sección',
    url: 'https://www.inmuebles24.com/departamentos-en-venta-en-providencia-1a-secc-con-1-recamara.html',
  },
  {
    label: 'Inmuebles24: venta a estrenar en Providencia 1a Sección',
    url: 'https://www.inmuebles24.com/departamentos-en-venta-en-providencia-1a-secc-con-1-recamara-a-estrenar.html',
  },
]

const participationsData = [
  {
    name: 'Vendidas',
    value: 34,
  },
  {
    name: 'Disponibles',
    value: 51,
  },
]

const foda = {
  fortalezas: [
    'Ubicación privilegiada cerca de Midtown y la zona financiera',
    'Desarrollador con experiencia previa y buen historial en briq.mx',
    'Amenidades atractivas para el mercado ejecutivo y turístico',
    'Modelo de operación orientado a rentas de corta y larga estancia',
  ],
  oportunidades: [
    'Crecimiento del turismo de negocios en Guadalajara',
    'Mayor demanda de estancias temporales en zonas premium',
    'Plusvalía de Providencia',
    'Alianzas con plataformas y canales de renta',
  ],
  debilidades: [
    'Dependencia de una alta ocupación para sostener ingresos',
    'Precio por m² superior al promedio del mercado',
    'Concentración del proyecto en estudios de menor tamaño',
  ],
  amenazas: [
    'Competencia de nuevos desarrollos similares',
    'Posibles cambios regulatorios en rentas temporales',
    'Variación en la demanda turística o ejecutiva',
    'Incremento de costos operativos o de mantenimiento',
  ],
}

const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'indice', label: 'Índice' },
  { id: 'objetivo', label: 'Objetivo' },
  { id: 'antecedentes', label: 'Antecedentes' },
  { id: 'resumen', label: 'Resumen ejecutivo' },
  { id: 'descripcion', label: 'Descripción' },
  { id: 'foda', label: 'FODA' },
  { id: 'mercado', label: 'Mercado' },
  { id: 'creditos', label: 'Créditos' },
]

function App() {
  const [theme, setTheme] = useState<Theme>('light')
  const [menuOpen, setMenuOpen] = useState(false)
  const [marketView, setMarketView] = useState<'rentas' | 'venta'>('rentas')

  const isDark = theme === 'dark'

  const bgMain = isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
  const bgCard = isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'
  const muted = isDark ? 'text-slate-300' : 'text-slate-600'
  const title = isDark ? 'text-white' : 'text-slate-900'
  const soft = isDark ? 'bg-slate-800' : 'bg-slate-100'
  const heroOverlay = isDark
    ? 'bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.15),transparent_30%),radial-gradient(circle_at_left,rgba(168,85,247,0.12),transparent_25%)]'
    : 'bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.18),transparent_30%),radial-gradient(circle_at_left,rgba(168,85,247,0.10),transparent_25%)]'

  const chartColors = ['#0ea5e9', '#8b5cf6', '#14b8a6', '#f59e0b']

  const handlePrint = () => window.print()
  const marketChartData = marketView === 'rentas' ? marketRentData : saleData
  const marketLegend = marketView === 'rentas'
    ? { project: 'Proyecto', market: 'Mercado' }
    : { project: 'Asís', market: 'Zona' }
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.location)}`

  return (
    <div className={bgMain}>
      <header className={`no-print sticky top-0 z-50 backdrop-blur ${isDark ? 'bg-slate-950/85 border-b border-slate-800' : 'bg-white/85 border-b border-slate-200'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-sky-500 px-3 py-2 text-sm font-bold text-white shadow-md">AP</div>
            <div>
              <p className={`text-sm font-semibold ${title}`}>Asís PerSe</p>
              <p className={`text-xs ${muted}`}>Avance 1 al 7</p>
            </div>
          </div>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={`rounded-xl px-3 py-2 text-sm transition ${isDark ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'}`}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={handlePrint} className={`no-print inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${isDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
              <Printer className="h-4 w-4" /> PDF
            </button>
            <button onClick={() => setTheme(isDark ? 'light' : 'dark')} className={`no-print rounded-xl px-3 py-2 transition ${isDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`} aria-label="Cambiar tema">
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className={`no-print rounded-xl px-3 py-2 lg:hidden ${isDark ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-900'}`}>
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className={`no-print border-t px-4 py-3 lg:hidden ${isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'}`}>
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)} className={`rounded-xl px-3 py-2 text-sm ${isDark ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'}`}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <section id="inicio" className="relative overflow-hidden">
        <div className={`absolute inset-0 ${heroOverlay}`} />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex rounded-full bg-sky-500 px-4 py-1 text-sm font-semibold text-white shadow-md">Entrega parcial</span>
              <h1 className={`mt-5 text-4xl font-bold tracking-tight lg:text-6xl ${title}`}>{project.name}</h1>
              <p className={`mt-4 max-w-2xl text-lg leading-8 ${muted}`}>
                Sitio interactivo para presentar el avance solicitado del proyecto de evaluación financiera, enfocado únicamente en índice, objetivo, antecedentes, resumen ejecutivo, descripción del proyecto, análisis FODA y estudio de mercado.
              </p>
            </motion.div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Badge icon={Building2} text={`${project.floors} niveles / ${project.units} estudios`} isDark={isDark} />
              <Badge icon={MapPin} text={project.shortLocation} isDark={isDark} />
              <Badge icon={Briefcase} text={project.developer} isDark={isDark} />
            </div>
          </div>

          <div className={`rounded-[2rem] p-5 shadow-2xl ${bgCard}`}>
            <HoverImage src="/project-1.jpg.webp" alt="Proyecto Asís PerSe" className="h-72 w-full rounded-[1.5rem]" />
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <MiniInfo title="Ubicación" value={project.shortLocation} isDark={isDark} href={mapsUrl} />
              <MiniInfo title="Amenidades" value="5 principales" isDark={isDark} />
              <MiniInfo title="Participaciones vendidas" value={`${project.soldParticipations}/${project.totalParticipations}`} isDark={isDark} />
              <MiniInfo title="Avance de obra" value={`${project.constructionProgress}%`} isDark={isDark} />
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl space-y-16 px-4 py-12 lg:px-8">
        <section id="indice">
          <SectionTitle icon={ListOrdered} title="1. Índice" subtitle="Contenido considerado en esta primera entrega." isDark={isDark} />
          <Card isDark={isDark}>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                '1. Índice',
                '2. Objetivo',
                '3. Antecedentes',
                '4. Resumen ejecutivo',
                '5. Descripción del proyecto',
                '6. Análisis FODA',
                '7. Estudio de mercado',
              ].map((item) => (
                <div key={item} className={`rounded-2xl px-4 py-3 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                  <span className={`${title} font-medium`}>{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section id="objetivo">
          <SectionTitle icon={Target} title="2. Objetivo" subtitle="Propósito del análisis del proyecto Asís PerSe." isDark={isDark} />
          <Card isDark={isDark}>
            <p className={`leading-8 ${muted}`}>
              Analizar la viabilidad del proyecto inmobiliario Asís PerSe a partir de sus características generales, la trayectoria del desarrollador, su ubicación, el mercado al que se dirige y sus principales ventajas estratégicas, con el fin de sustentar de manera cualitativa si se trata de una propuesta atractiva dentro del sector inmobiliario en Guadalajara.
            </p>
          </Card>
        </section>

        <section id="antecedentes">
          <SectionTitle icon={Newspaper} title="3. Antecedentes" subtitle="Contexto del proyecto y del tipo de desarrollo inmobiliario." isDark={isDark} />
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <Card isDark={isDark}>
              <p className={`leading-8 ${muted}`}>
                Asís PerSe surge dentro de un contexto de crecimiento del mercado de rentas temporales y medias en Guadalajara, especialmente en zonas premium como Providencia. Este tipo de desarrollos ha ganado relevancia por atender la demanda de ejecutivos, turistas y profesionistas que buscan ubicaciones céntricas, amenidades y periodos de estancia flexibles.
              </p>
              <p className={`mt-4 leading-8 ${muted}`}>
                El proyecto también se apoya en un modelo inmobiliario que combina operación, administración y comercialización de participaciones, lo cual le da un enfoque distinto frente a desarrollos habitacionales tradicionales orientados solamente a la venta de departamentos.
              </p>
            </Card>
            <Card isDark={isDark}>
              <h3 className={`mb-4 text-lg font-semibold ${title}`}>Contexto visual</h3>
              <HoverImage src="/project-2.jpeg.png" alt="Ubicación del proyecto" className="h-64 w-full rounded-3xl" />
              <p className={`mt-4 text-sm leading-7 ${muted}`}>
                La ubicación en Providencia y la cercanía con Midtown y la zona financiera fortalecen el posicionamiento del desarrollo para el mercado de rentas ejecutivas y estancias cortas.
              </p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className={`mt-4 inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition ${isDark ? 'bg-sky-500/15 text-sky-300 hover:bg-sky-500/25' : 'bg-sky-50 text-sky-700 hover:bg-sky-100'}`}
              >
                <MapPin className="h-4 w-4" />
                Abrir ubicación en Google Maps
              </a>
            </Card>
          </div>
        </section>

        <section id="resumen">
          <SectionTitle icon={FileText} title="4. Resumen ejecutivo" subtitle="Síntesis general del proyecto para exponerlo de forma rápida." isDark={isDark} />
          <Card isDark={isDark}>
            <p className={`leading-8 ${muted}`}>
              Asís PerSe es un desarrollo inmobiliario de 9 niveles con 38 estudios, ubicado en la colonia Providencia de Guadalajara. El proyecto está diseñado para operar bajo un esquema de rentas de corta y larga estancia, enfocado principalmente en ejecutivos y turistas. Entre sus principales amenidades se encuentran roof garden, gimnasio, terrazas, lobby y elevadores. El desarrollo es impulsado por PerSe Capital, empresa con experiencia previa en proyectos similares y participación en campañas anteriores dentro de briq.mx. La propuesta destaca por su ubicación, sus amenidades y su orientación a un nicho con demanda creciente dentro de la ciudad. En esta primera entrega se analiza el contexto general del proyecto, su descripción, sus fortalezas y su comportamiento frente al mercado.
            </p>
          </Card>
        </section>

        <section id="descripcion" className="print-break">
          <SectionTitle icon={Building2} title="5. Descripción del proyecto" subtitle="Empresa, historial, noticias y características del desarrollo." isDark={isDark} />
          <div className="grid gap-6 lg:grid-cols-2">
            <Card isDark={isDark}>
              <h3 className={`text-lg font-semibold ${title}`}>Empresa desarrolladora</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <DataPair label="Empresa" value={project.developer} isDark={isDark} />
                <DataPair label="Trayectoria visible en briq.mx" value={`${project.campaigns} campañas / ${project.projects} proyectos`} isDark={isDark} />
                <DataPair label="Monto recaudado" value={project.developerRaised} isDark={isDark} />
                <DataPair label="Historial" value={project.previousWithBriq} isDark={isDark} />
              </div>
              <div className={`mt-6 rounded-2xl p-4 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                <p className={`font-semibold ${title}`}>Noticias e información relevante</p>
                <p className={`mt-2 text-sm leading-7 ${muted}`}>
                  PerSe Capital reporta una trayectoria acumulada de {project.campaigns} campañas y {project.projects} proyectos publicados en briq.mx, con un monto recaudado de {project.developerRaised}. Esto respalda la percepción de experiencia operativa, capacidad de estructuración financiera y continuidad dentro de la plataforma.
                </p>
              </div>
              <div className={`mt-6 rounded-2xl p-5 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                <p className={`text-lg font-semibold ${title}`}>Descripción detallada del proyecto</p>
                <p className={`mt-3 text-sm leading-8 ${muted}`}>
                  Asís PerSe es un desarrollo vertical ubicado en Providencia, una de las zonas con mayor consolidación urbana y plusvalía de Guadalajara. El proyecto contempla la construcción de un edificio de 9 niveles con 38 estudios, pensados para atender un segmento que demanda espacios compactos, bien ubicados y con amenidades funcionales para estancias cortas y medias. Su cercanía con Midtown, la zona financiera y corredores comerciales lo vuelve especialmente atractivo para ejecutivos, profesionistas desplazados temporalmente, turistas de negocios y usuarios que valoran la conectividad dentro de la ciudad.
                </p>
                <p className={`mt-3 text-sm leading-8 ${muted}`}>
                  A nivel operativo, el proyecto no se limita a vender unidades tradicionales, sino que integra un modelo de administración y explotación orientado a rentas. Los 38 estudios se dividen en 85 participaciones, lo que permite estructurar la inversión y la fuente de repago a partir de la comercialización de esas participaciones y del desempeño esperado del inmueble. Este enfoque le da al desarrollo un perfil híbrido entre producto inmobiliario y vehículo de inversión, con una propuesta diferenciada frente a esquemas convencionales de compraventa de departamentos.
                </p>
                <p className={`mt-3 text-sm leading-8 ${muted}`}>
                  En términos de propuesta de valor, Asís PerSe busca competir mediante ubicación, diseño compacto, amenidades y operación especializada. El roof garden, gimnasio, terrazas, lobby y elevadores complementan una experiencia pensada para usuarios que priorizan practicidad, imagen y servicios dentro de un solo inmueble. Por ello, el proyecto puede considerarse atractivo para un nicho que busca flexibilidad en la ocupación y, al mismo tiempo, para inversionistas interesados en un activo con potencial de rentabilidad dentro del mercado de estancias urbanas en Guadalajara.
                </p>
              </div>
              <div className="mt-6">
                <p className={`text-lg font-semibold ${title}`}>Proyectos comparables del desarrollador</p>
                <div className="mt-4 space-y-4">
                  {similarProjects.map((item) => (
                    <div key={item.name} className={`rounded-2xl border p-4 ${isDark ? 'border-slate-800 bg-slate-800/70' : 'border-slate-200 bg-slate-50'}`}>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className={`font-semibold ${title}`}>{item.name}</p>
                        <span className={`text-xs ${muted}`}>{item.location}</span>
                      </div>
                      <p className={`mt-2 text-sm leading-7 ${muted}`}>{item.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card isDark={isDark}>
              <h3 className={`text-lg font-semibold ${title}`}>Características del proyecto</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <DataPair label="Descripción" value={`${project.floors} niveles y ${project.units} estudios`} isDark={isDark} />
                <DataPair label="Localización" value={project.location} isDark={isDark} href={mapsUrl} />
                <DataPair label="Periodo de construcción" value={`En proceso · avance reportado ${project.constructionProgress}%`} isDark={isDark} />
                <DataPair label="Periodo de operación" value={project.operationModel} isDark={isDark} />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {amenityDetails.map((amenity) => (
                  <AmenityCard key={amenity.name} amenity={amenity} isDark={isDark} />
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section id="foda" className="print-break">
          <SectionTitle icon={CheckCircle2} title="6. Análisis FODA" subtitle="Diagnóstico estratégico del proyecto." isDark={isDark} />
          <div className="grid gap-5 md:grid-cols-2">
            <FodaCard title="Fortalezas" items={foda.fortalezas} tone="emerald" isDark={isDark} />
            <FodaCard title="Oportunidades" items={foda.oportunidades} tone="sky" isDark={isDark} />
            <FodaCard title="Debilidades" items={foda.debilidades} tone="amber" isDark={isDark} />
            <FodaCard title="Amenazas" items={foda.amenazas} tone="rose" isDark={isDark} />
          </div>
        </section>

        <section id="mercado" className="print-break">
          <SectionTitle icon={Search} title="7. Estudio de mercado" subtitle="Comparación del proyecto frente al mercado de rentas y venta." isDark={isDark} />
          <div className="grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="self-start">
              <Card isDark={isDark}>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h3 className={`text-lg font-semibold ${title}`}>Comparativos del mercado</h3>
                <div className={`rounded-2xl p-1 ${soft}`}>
                  <button onClick={() => setMarketView('rentas')} className={`rounded-xl px-4 py-2 text-sm font-medium transition ${marketView === 'rentas' ? 'bg-sky-500 text-white shadow-sm' : isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    Rentas
                  </button>
                  <button onClick={() => setMarketView('venta')} className={`rounded-xl px-4 py-2 text-sm font-medium transition ${marketView === 'venta' ? 'bg-violet-500 text-white shadow-sm' : isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    Venta
                  </button>
                </div>
              </div>
              <div className="h-[360px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marketChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar name={marketLegend.project} dataKey="projectValue" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                    <Bar name={marketLegend.market} dataKey="marketValue" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card isDark={isDark}>
                <h3 className={`mb-4 text-lg font-semibold ${title}`}>Participaciones comercializadas</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={participationsData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={4}>
                        {participationsData.map((_, i) => (
                          <Cell key={i} fill={chartColors[i]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <p className={`mt-3 text-sm leading-7 ${muted}`}>
                  A partir del avance reportado, se observa que ya existe tracción comercial, lo cual ayuda a validar el interés del mercado por el proyecto.
                </p>
              </Card>

              <Card isDark={isDark}>
                <h3 className={`mb-3 text-lg font-semibold ${title}`}>Lectura del mercado</h3>
                <p className={`text-sm leading-7 ${muted}`}>
                  Para que este comparativo se sostenga con referencias públicas, la vista de rentas se recalculó con anuncios activos de 1 recámara en Providencia, Prados de Providencia y Colomos Providencia. La vista de venta se ajustó con listados de departamentos de 1 recámara en Providencia y Providencia 1a Sección. Así, los datos del mercado ya no son ejemplos genéricos, sino promedios redondeados de comparables reales.
                </p>
                <p className={`mt-3 text-sm leading-7 ${muted}`}>
                  Corte de consulta: 26 de marzo de 2026. En renta se usaron 6 comparables y en venta 20 comparables. Los valores de Asís corresponden al proyecto, mientras que los valores del mercado son promedios observados en los listados revisados.
                </p>
                <div className="mt-4 grid gap-4">
                  <div className={`rounded-2xl p-4 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                    <p className={`text-sm font-semibold ${title}`}>Fuentes de renta</p>
                    <div className="mt-2 flex flex-col gap-2">
                      {rentSources.map((source) => (
                        <a
                          key={source.url}
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                          className={`text-sm underline-offset-4 hover:underline ${isDark ? 'text-sky-300' : 'text-sky-700'}`}
                        >
                          {source.label}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className={`rounded-2xl p-4 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                    <p className={`text-sm font-semibold ${title}`}>Fuentes de venta</p>
                    <div className="mt-2 flex flex-col gap-2">
                      {saleSources.map((source) => (
                        <a
                          key={source.url}
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                          className={`text-sm underline-offset-4 hover:underline ${isDark ? 'text-sky-300' : 'text-sky-700'}`}
                        >
                          {source.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section id="creditos" className="print-break">
          <SectionTitle icon={Images} title="Datos de entrega" subtitle="Personaliza esta parte con la información final de tu equipo." isDark={isDark} />
          <div className={`rounded-4xl p-8 shadow-xl ${bgCard}`}>
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">Primera entrega</p>
                <h2 className={`mt-3 text-3xl font-bold ${title}`}>{teamInfo.title}</h2>
                <div className={`mt-6 grid gap-3 text-sm ${muted}`}>
                  <p><span className={`font-semibold ${title}`}>Materia:</span> {teamInfo.subject}</p>
                  <p><span className={`font-semibold ${title}`}>Profesor(a):</span> {teamInfo.professor}</p>
                  <p><span className={`font-semibold ${title}`}>Universidad:</span> {teamInfo.university}</p>
                  <p><span className={`font-semibold ${title}`}>Grupo:</span> {teamInfo.group}</p>
                  <p><span className={`font-semibold ${title}`}>Fecha:</span> {teamInfo.date}</p>
                </div>
              </div>
              <div className={`rounded-3xl p-6 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                <h3 className={`text-lg font-semibold ${title}`}>Integrantes</h3>
                <ul className={`mt-4 space-y-3 text-sm ${muted}`}>
                  {teamInfo.members.map((member) => (
                    <li key={member}>• {member}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function Badge({ icon: Icon, text, isDark }: { icon: React.ElementType; text: string; isDark: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 shadow-sm ${isDark ? 'bg-slate-900 text-slate-100 border border-slate-800' : 'bg-white text-slate-800 border border-slate-200'}`}>
      <Icon className="h-4 w-4 text-sky-500" />
      <span className="text-sm">{text}</span>
    </div>
  )
}

function HoverImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`group overflow-hidden ${className ?? ''}`}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full rounded-inherit object-cover transition duration-500 ease-out group-hover:scale-110"
      />
    </div>
  )
}

function MiniInfo({ title, value, isDark, href }: { title: string; value: string; isDark: boolean; href?: string }) {
  const content = (
    <>
      <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>{title}</p>
      <p className={`mt-1 text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</p>
    </>
  )

  return (
    href ? (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`block rounded-2xl p-4 transition hover:-translate-y-0.5 hover:shadow-md ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-50 hover:bg-slate-100'}`}
      >
        {content}
      </a>
    ) : (
      <div className={`rounded-2xl p-4 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
        {content}
      </div>
    )
  )
}

function SectionTitle({ icon: Icon, title, subtitle, isDark }: { icon: React.ElementType; title: string; subtitle: string; isDark: boolean }) {
  return (
    <div className="mb-6 flex items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 text-white shadow-sm">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className={`text-2xl font-semibold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
        <p className={`mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{subtitle}</p>
      </div>
    </div>
  )
}

function Card({ children, isDark }: { children: React.ReactNode; isDark: boolean }) {
  return <div className={`rounded-[2rem] p-6 shadow-sm ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'}`}>{children}</div>
}

function DataPair({ label, value, isDark, href }: { label: string; value: string; isDark: boolean; href?: string }) {
  const content = (
    <>
      <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>{label}</p>
      <p className={`mt-1 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</p>
    </>
  )

  return (
    href ? (
      <a href={href} target="_blank" rel="noreferrer" className="block rounded-2xl p-2 transition hover:bg-slate-500/5">
        {content}
      </a>
    ) : (
      <div>{content}</div>
    )
  )
}

function AmenityCard({ amenity, isDark }: { amenity: Amenity; isDark: boolean }) {
  return (
    <div className={`overflow-hidden rounded-[1.75rem] border transition hover:-translate-y-1 hover:shadow-xl ${isDark ? 'border-slate-800 bg-slate-800/70' : 'border-slate-200 bg-slate-50'}`}>
      <HoverImage src={amenity.image} alt={amenity.name} className="h-40 w-full" />
      <div className="p-4">
        <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{amenity.name}</p>
        <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{amenity.description}</p>
      </div>
    </div>
  )
}

function FodaCard({ title, items, tone, isDark }: { title: string; items: string[]; tone: 'emerald' | 'sky' | 'amber' | 'rose'; isDark: boolean }) {
  const tones: Record<string, string> = {
    emerald: isDark ? 'bg-emerald-950/30 border border-emerald-900' : 'bg-emerald-50 border border-emerald-200',
    sky: isDark ? 'bg-sky-950/30 border border-sky-900' : 'bg-sky-50 border border-sky-200',
    amber: isDark ? 'bg-amber-950/30 border border-amber-900' : 'bg-amber-50 border border-amber-200',
    rose: isDark ? 'bg-rose-950/30 border border-rose-900' : 'bg-rose-50 border border-rose-200',
  }

  return (
    <div className={`rounded-3xl p-5 ${tones[tone]}`}>
      <h3 className={`mb-4 text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
      <ul className={`space-y-3 text-sm ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
