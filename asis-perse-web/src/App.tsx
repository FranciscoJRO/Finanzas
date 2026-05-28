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
  Landmark,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Wallet,
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

type PortfolioProject = SimilarProject & {
  image: string
  focus: string
}

type SourceLink = {
  label: string
  url: string
}

type FinancialMetric = {
  label: string
  value: string
  tone: 'sky' | 'violet' | 'emerald' | 'amber'
}

type MonthlyFlowRow = {
  month: number
  unitsSold: number
  revenue: number
  bankPayment: number
  freeCash: number
  debtStart: number
  interest: number
  amortization: number
  debtEnd: number
  cumulativeFreeCash: number
}

const currency = (n: number) =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(n)

const percent = (n: number, digits = 2) =>
  `${new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n)}%`

const millions = (n: number) => `$${(n / 1_000_000).toFixed(2)} M`

const project = {
  name: 'Asis PerSe',
  developer: 'PerSe Capital',
  location: 'C. Asis 776, Italia Providencia, Guadalajara, Jalisco',
  shortLocation: 'Providencia, Guadalajara',
  units: 38,
  floors: 9,
  amenities: ['Roof garden 200 m²', 'Gimnasio', 'Terrazas', 'Lobby', 'Elevadores'],
  totalInvestment: 81_898_223,
  annualRate: 18.25,
  estimatedIRR: 63.5,
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
  previousWithBriq: 'cuarto proyecto en colaboracion con briq.mx',
}

const amenityDetails: Amenity[] = [
  {
    name: 'Roof garden 200 m²',
    image: '/project-1.jpeg.webp',
    description: 'Espacio panoramico para convivencia, descanso y vistas abiertas en la parte alta del desarrollo.',
  },
  {
    name: 'Gimnasio',
    image: '/gym.jpg.webp',
    description: 'Area enfocada en bienestar y actividad fisica, alineada con el perfil ejecutivo del proyecto.',
  },
  {
    name: 'Terrazas',
    image: '/image.png',
    description: 'Zonas abiertas que suman valor a la estancia y refuerzan la experiencia premium del edificio.',
  },
  {
    name: 'Lobby',
    image: '/loby.webp',
    description: 'Acceso principal con una imagen cuidada para recepcion, circulacion y primera impresion del usuario.',
  },
  {
    name: 'Elevadores',
    image: '/elevadores.png',
    description: 'Elemento funcional clave para la comodidad diaria y el flujo eficiente entre niveles.',
  },
]

const similarProjects: SimilarProject[] = [
  {
    name: 'Alarcon PerSe',
    location: 'Mexicaltzingo 2334, Guadalajara',
    summary: 'Desarrollo disenado bajo esquema de pool de rentas temporales, con una propuesta enfocada en ubicacion urbana, movilidad y rendimiento para inversionistas.',
  },
  {
    name: 'San Martin PerSe',
    location: 'General San Martin 584, Col. Lafayette',
    summary: 'Proyecto residencial construido a partir del analisis de demanda de la zona Chapultepec, con una mezcla de diseno, plusvalia y enfoque en rentabilidad.',
  },
  {
    name: 'Monraz PerSe',
    location: 'Huicholes 305, Guadalajara',
    summary: 'Desarrollo habitacional de menor escala y perfil exclusivo, orientado a usuarios que priorizan diseno, seguridad y ubicacion dentro de una zona consolidada.',
  },
]

const interiorLayout = {
  title: 'Distribucion interior del departamento',
  image: '/depa.png',
  note: 'Vista referencial del departamento para explicar mejor la ubicacion de los espacios interiores y la logica de distribucion del estudio.',
  details: [
    'Superficie base comparada: 33 m²',
    'Distribucion compacta y funcional',
    'Aprovechamiento eficiente del espacio interior',
    'Referencia visual util para exponer la configuracion del departamento',
  ],
}

const portfolioProjects: PortfolioProject[] = [
  {
    name: 'Alarcon PerSe',
    location: 'Mexicaltzingo 2334, Guadalajara',
    summary: 'Desarrollo disenado bajo esquema de pool de rentas temporales, con una propuesta enfocada en ubicacion urbana, movilidad y rendimiento para inversionistas.',
    image: '/Alarcon-Portada.jpg',
    focus: 'Enfoque en rentabilidad y operacion urbana',
  },
  {
    name: 'San Martin PerSe',
    location: 'General San Martin 584, Col. Lafayette',
    summary: 'Proyecto residencial construido a partir del analisis de demanda de la zona Chapultepec, con una mezcla de diseno, plusvalia y enfoque en rentabilidad.',
    image: '/Espana-portada.jpg',
    focus: 'Enfoque en plusvalia y ubicacion estrategica',
  },
  {
    name: 'Monraz PerSe',
    location: 'Huicholes 305, Guadalajara',
    summary: 'Desarrollo habitacional de menor escala y perfil exclusivo, orientado a usuarios que priorizan diseno, seguridad y ubicacion dentro de una zona consolidada.',
    image: '/Monraz_4-3_01.jpg',
    focus: 'Enfoque en diseno, exclusividad y escala controlada',
  },
]

const teamInfo = {
  title: 'Avance del proyecto | Evaluacion Financiera',
  subject: 'Finanzas',
  professor: 'Alfredo Uribe Aranda',
  university: 'UNAM Facultad de Ingenieria',
  group: '06',
  date: '28/05/2026',
  members: [
    'Hernandez Cazares Rosario Marah',
    'Onofre Gutierrez Guillermo Angel',
    'Reynoso Ortega Francisco Javier',
    'Rios Rivera Alejandro',
    'Sotomayor Suarez Edgar Antonio',
  ],
}

const marketRentData: MarketChartRow[] = [
  { category: 'Area (m²)', projectValue: 33, marketValue: 79 },
  { category: 'Renta mensual', projectValue: 28980, marketValue: 25337 },
  { category: 'Renta anual', projectValue: 347760, marketValue: 304038 },
  { category: 'Precio por m²/mes', projectValue: 878, marketValue: 321 },
]

const saleData: MarketChartRow[] = [
  { category: 'Area (m²)', projectValue: 33, marketValue: 66 },
  { category: 'Precio depa', projectValue: 2500000, marketValue: 5284185 },
  { category: 'Precio por m²', projectValue: 75758, marketValue: 80429 },
]

const rentSources: SourceLink[] = [
  {
    label: 'Inmuebles24: renta de 1 recamara en Providencia',
    url: 'https://www.inmuebles24.com/inmuebles-en-renta-en-providencia-con-area-de-juegos-infantiles-con-1-recamara.html',
  },
  {
    label: 'Inmuebles24: renta de 1 recamara en Prados de Providencia',
    url: 'https://www.inmuebles24.com/inmuebles-en-renta-en-prados-de-providencia-con-1-recamara.html',
  },
  {
    label: 'Inmuebles24: renta amueblada en Colomos Providencia',
    url: 'https://www.inmuebles24.com/inmuebles-en-renta-en-fraccionamiento-colomos-providencia-con-amueblado-con-1-recamara.html',
  },
]

const saleSources: SourceLink[] = [
  {
    label: 'Inmuebles24: venta de 1 recamara en Providencia',
    url: 'https://www.inmuebles24.com/departamentos-en-venta-en-providencia-con-1-recamara.html',
  },
  {
    label: 'Inmuebles24: venta en Providencia 1a Seccion',
    url: 'https://www.inmuebles24.com/departamentos-en-venta-en-providencia-1a-secc-con-1-recamara.html',
  },
  {
    label: 'Inmuebles24: venta a estrenar en Providencia 1a Seccion',
    url: 'https://www.inmuebles24.com/departamentos-en-venta-en-providencia-1a-secc-con-1-recamara-a-estrenar.html',
  },
]

const participationsData = [
  { name: 'Vendidas', value: 34 },
  { name: 'Disponibles', value: 51 },
]

const foda = {
  fortalezas: [
    'Ubicacion privilegiada cerca de Midtown y la zona financiera',
    'Desarrollador con experiencia previa y buen historial en briq.mx',
    'Amenidades atractivas para el mercado ejecutivo y turistico',
    'Modelo de operacion orientado a rentas de corta y larga estancia',
  ],
  oportunidades: [
    'Crecimiento del turismo de negocios en Guadalajara',
    'Mayor demanda de estancias temporales en zonas premium',
    'Plusvalia de Providencia',
    'Alianzas con plataformas y canales de renta',
  ],
  debilidades: [
    'Dependencia de una alta ocupacion para sostener ingresos',
    'Precio por m² superior al promedio del mercado',
    'Concentracion del proyecto en estudios de menor tamano',
  ],
  amenazas: [
    'Competencia de nuevos desarrollos similares',
    'Posibles cambios regulatorios en rentas temporales',
    'Variacion en la demanda turistica o ejecutiva',
    'Incremento de costos operativos o de mantenimiento',
  ],
}

const financialInputs = {
  totalInvestment: 81_898_223,
  bankShare: 0.7,
  bankAmount: 57_328_756,
  investorShare: 0.3,
  investorAmount: 24_569_467,
  units: 38,
  totalSales: 127_965_973,
  baseUnitsPerMonth: 2,
  annualCreditRate: 0.1825,
  mar: 0.12,
  vpn: 15_275_260,
  tir: 0.635,
  debtClearedMonth: 11,
  freeCashMonth: 11,
  decision: 'VIABLE',
}

// Editable base array to simulate scenarios: change each month to 0, 1 o 2 unidades.
const ventasMensuales = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]

const waterfallSteps = [
  '1. Impuestos y permisos',
  '2. Gastos administrativos',
  '3. Agencia inmobiliaria',
  '4. Oficinas',
  '5. Amortizacion al banco',
  '6. Flujo libre de caja',
]

const scenarioAlternatives = [
  'Crear una reserva de liquidez para cubrir intereses en meses sin ventas.',
  'Fortalecer la preventa antes de terminar la construccion.',
  'Usar campanas de marketing digital enfocadas en inversionistas y compradores.',
  'Ofrecer descuentos controlados por pronto pago.',
  'Negociar con el banco periodos de gracia o pagos ligados a ventas.',
  'Mantener control estricto de gastos administrativos y de comercializacion.',
  'Diversificar canales de venta: brokers, agencias, plataformas digitales y alianzas corporativas.',
]

const improvementProposals = [
  'Aumentar la velocidad de ventas mediante preventas.',
  'Reducir meses sin ventas con estrategias comerciales anticipadas.',
  'Negociar mejores condiciones de credito o una tasa menor.',
  'Controlar gastos administrativos y comisiones.',
  'Crear escenarios pesimista, base y optimista.',
  'Agregar una reserva financiera para cubrir meses sin flujo.',
  'Reforzar la estrategia comercial antes de que termine la construccion.',
  'Evaluar si conviene vender unidades o mantener parte del proyecto bajo modelo de rentas.',
]

const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'indice', label: 'Indice' },
  { id: 'objetivo', label: 'Objetivo' },
  { id: 'antecedentes', label: 'Antecedentes' },
  { id: 'resumen', label: 'Resumen' },
  { id: 'descripcion', label: 'Descripcion' },
  { id: 'interiores', label: 'Interiores' },
  { id: 'foda', label: 'FODA' },
  { id: 'mercado', label: 'Mercado' },
  { id: 'consideraciones', label: 'Finanzas' },
  { id: 'evaluacion', label: 'Evaluacion' },
  { id: 'escenario', label: 'Escenario' },
  { id: 'resultado-final', label: 'Resultado' },
  { id: 'mejoras', label: 'Mejoras' },
  { id: 'creditos', label: 'Creditos' },
]

function buildMonthlyFinancialModel(): MonthlyFlowRow[] {
  const unitSalePrice = financialInputs.totalSales / financialInputs.units
  const monthlyRate = financialInputs.annualCreditRate / 12
  const bankSweepShareBeforeDebtFree = 0.85

  let debt = financialInputs.bankAmount
  let cumulativeFreeCash = 0

  return ventasMensuales.map((unitsSold, index) => {
    const month = index + 1
    const revenue = unitsSold * unitSalePrice
    const debtStart = debt
    const interest = debtStart * monthlyRate
    const bankPayment = debtStart > 0
      ? Math.min(revenue * bankSweepShareBeforeDebtFree, debtStart + interest)
      : 0
    const amortization = Math.max(0, bankPayment - interest)
    debt = Math.max(0, debtStart + interest - bankPayment)
    const freeCash = Math.max(0, revenue - bankPayment)
    cumulativeFreeCash += freeCash

    return {
      month,
      unitsSold,
      revenue,
      bankPayment,
      freeCash,
      debtStart,
      interest,
      amortization,
      debtEnd: debt,
      cumulativeFreeCash,
    }
  })
}

function App() {
  const [theme, setTheme] = useState<Theme>('light')
  const [menuOpen, setMenuOpen] = useState(false)
  const [marketView, setMarketView] = useState<'rentas' | 'venta'>('rentas')
  const [showInteriorModal, setShowInteriorModal] = useState(false)

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
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.location)}`
  const excelDownloadUrl = '/Proyecto_Final_excel.xlsx'
  const marketChartData = marketView === 'rentas' ? marketRentData : saleData
  const marketLegend = marketView === 'rentas'
    ? { project: 'Proyecto', market: 'Mercado' }
    : { project: 'Asis', market: 'Zona' }

  const monthlyFinancialModel = buildMonthlyFinancialModel()
  const unitSalePrice = financialInputs.totalSales / financialInputs.units

  const financingData = [
    { name: 'Banco 70%', value: financialInputs.bankAmount },
    { name: 'Inversionistas 30%', value: financialInputs.investorAmount },
  ]

  const financialDashboard: FinancialMetric[] = [
    { label: 'Inversion total', value: millions(financialInputs.totalInvestment), tone: 'sky' },
    { label: 'Banco 70%', value: millions(financialInputs.bankAmount), tone: 'violet' },
    { label: 'Inversionistas 30%', value: millions(financialInputs.investorAmount), tone: 'emerald' },
    { label: 'Unidades', value: `${financialInputs.units}`, tone: 'amber' },
    { label: 'Venta estimada', value: millions(financialInputs.totalSales), tone: 'sky' },
    { label: 'MAR', value: percent(financialInputs.mar * 100, 0), tone: 'violet' },
    { label: 'VPN', value: millions(financialInputs.vpn), tone: 'emerald' },
    { label: 'TIR anualizada', value: percent(financialInputs.tir * 100), tone: 'emerald' },
    { label: 'Mes deuda liquidada', value: `${financialInputs.debtClearedMonth}`, tone: 'amber' },
    { label: 'Mes de flujo libre', value: `${financialInputs.freeCashMonth}`, tone: 'amber' },
    { label: 'Decision', value: financialInputs.decision, tone: 'emerald' },
  ]

  const handlePrint = () => window.print()

  return (
    <div className={bgMain}>
      <header className={`no-print sticky top-0 z-50 backdrop-blur ${isDark ? 'bg-slate-950/85 border-b border-slate-800' : 'bg-white/85 border-b border-slate-200'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-sky-500 px-3 py-2 text-sm font-bold text-white shadow-md">AP</div>
            <div>
              <p className={`text-sm font-semibold ${title}`}>Asis PerSe</p>
              <p className={`text-xs ${muted}`}>Entrega completa 1 al 12</p>
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
              <span className="inline-flex rounded-full bg-sky-500 px-4 py-1 text-sm font-semibold text-white shadow-md">Entrega final · Evaluacion financiera completa</span>
              <h1 className={`mt-5 text-5xl font-bold tracking-tight lg:text-7xl ${title}`}>{project.name}</h1>
              <p className={`mt-4 max-w-2xl text-xl leading-9 ${muted}`}>
                Sitio interactivo para presentar el proyecto inmobiliario desde su contexto general hasta la evaluacion financiera, el analisis de escenario y la conclusion de rentabilidad bajo el escenario base de ventas.
              </p>
            </motion.div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Badge icon={Building2} text={`${project.floors} niveles / ${project.units} estudios`} isDark={isDark} />
              <Badge icon={MapPin} text={project.shortLocation} isDark={isDark} />
              <Badge icon={Briefcase} text={project.developer} isDark={isDark} />
            </div>
            <div className="mt-6">
              <a
                href={excelDownloadUrl}
                download="Proyecto_Final_excel.xlsx"
                className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-base font-medium transition ${isDark ? 'bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
              >
                <FileText className="h-5 w-5" />
                Descargar archivo de Excel
              </a>
            </div>
          </div>

          <div className={`rounded-[2rem] p-5 shadow-2xl ${bgCard}`}>
            <HoverImage src="/project-1.jpg.webp" alt="Proyecto Asis PerSe" className="h-72 w-full rounded-[1.5rem]" />
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <MiniInfo title="Ubicacion" value={project.shortLocation} isDark={isDark} href={mapsUrl} />
              <MiniInfo title="Amenidades" value="5 principales" isDark={isDark} />
              <MiniInfo title="Deuda liquidada" value={`Mes ${financialInputs.debtClearedMonth}`} isDark={isDark} />
              <MiniInfo title="Decision financiera" value={financialInputs.decision} isDark={isDark} />
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl space-y-16 px-4 py-12 lg:px-8">
        <section id="indice">
          <SectionTitle icon={ListOrdered} title="1. Indice" subtitle="Contenido considerado en esta presentacion." isDark={isDark} />
          <Card isDark={isDark}>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[
                '1. Indice',
                '2. Objetivo',
                '3. Antecedentes',
                '4. Resumen ejecutivo',
                '5. Descripcion del proyecto',
                'Visualizacion interior y distribucion',
                '6. Analisis FODA',
                '7. Estudio de mercado',
                '8. Consideraciones financieras',
                '9. Evaluacion financiera',
                '10. Evaluacion de escenario',
                '11. Resultados: rentable o no',
                '12. Propuestas de mejora',
              ].map((item) => (
                <div key={item} className={`rounded-2xl px-4 py-3 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                  <span className={`${title} font-medium`}>{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section id="objetivo">
          <SectionTitle icon={Target} title="2. Objetivo" subtitle="Proposito del analisis del proyecto Asis PerSe." isDark={isDark} />
          <Card isDark={isDark}>
            <p className={`leading-8 ${muted}`}>
              Analizar la viabilidad del proyecto inmobiliario Asis PerSe a partir de sus caracteristicas generales, la trayectoria del desarrollador, su ubicacion, el mercado al que se dirige y, especialmente, su comportamiento financiero bajo una estructura de financiamiento 70% banco y 30% inversionistas, con el fin de sustentar si el proyecto genera valor y puede considerarse rentable.
            </p>
          </Card>
        </section>

        <section id="antecedentes">
          <SectionTitle icon={Newspaper} title="3. Antecedentes" subtitle="Contexto del proyecto y del tipo de desarrollo inmobiliario." isDark={isDark} />
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <Card isDark={isDark}>
              <p className={`leading-8 ${muted}`}>
                Asis PerSe surge dentro de un contexto de crecimiento del mercado de rentas temporales y medias en Guadalajara, especialmente en zonas premium como Providencia. Este tipo de desarrollos ha ganado relevancia por atender la demanda de ejecutivos, turistas y profesionistas que buscan ubicaciones centricas, amenidades y periodos de estancia flexibles.
              </p>
              <p className={`mt-4 leading-8 ${muted}`}>
                El proyecto tambien se apoya en un modelo inmobiliario que combina operacion, administracion y comercializacion de participaciones, lo cual le da un enfoque distinto frente a desarrollos habitacionales tradicionales orientados solamente a la venta de departamentos.
              </p>
            </Card>
            <Card isDark={isDark}>
              <h3 className={`mb-4 text-lg font-semibold ${title}`}>Contexto visual</h3>
              <HoverImage src="/project-2.jpeg.png" alt="Ubicacion del proyecto" className="h-64 w-full rounded-3xl" />
              <p className={`mt-4 text-sm leading-7 ${muted}`}>
                La ubicacion en Providencia y la cercania con Midtown y la zona financiera fortalecen el posicionamiento del desarrollo para el mercado de rentas ejecutivas y estancias cortas.
              </p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className={`mt-4 inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition ${isDark ? 'bg-sky-500/15 text-sky-300 hover:bg-sky-500/25' : 'bg-sky-50 text-sky-700 hover:bg-sky-100'}`}
              >
                <MapPin className="h-4 w-4" />
                Abrir ubicacion en Google Maps
              </a>
            </Card>
          </div>
          <div className="mt-6 grid gap-6">
            <Card isDark={isDark}>
              <p className={`text-lg leading-8 ${muted}`}>
                Como antecedente adicional, tambien es relevante mostrar otros proyectos desarrollados por la empresa, ya que permiten contextualizar la trayectoria de PerSe Capital y su experiencia en desarrollos comparables dentro de Guadalajara.
              </p>
            </Card>
            <div className="grid gap-6 lg:grid-cols-3">
              {portfolioProjects.map((item) => (
                <Card key={item.name} isDark={isDark}>
                  <HoverImage src={item.image} alt={item.name} className="h-56 w-full rounded-[1.5rem]" />
                  <div className="mt-5 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className={`text-2xl font-semibold ${title}`}>{item.name}</h3>
                      <p className={`mt-1 text-base ${muted}`}>{item.location}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${isDark ? 'bg-slate-800 text-sky-300' : 'bg-sky-50 text-sky-700'}`}>
                      {item.focus}
                    </span>
                  </div>
                  <p className={`mt-4 text-base leading-7 ${muted}`}>{item.summary}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="resumen">
          <SectionTitle icon={FileText} title="4. Resumen ejecutivo" subtitle="Sintesis general del proyecto." isDark={isDark} />
          <Card isDark={isDark}>
            <p className={`leading-8 ${muted}`}>
              Asis PerSe es un desarrollo inmobiliario de 9 niveles con 38 estudios, ubicado en la colonia Providencia de Guadalajara. Para su evaluacion financiera se considera una inversion total de {currency(financialInputs.totalInvestment)}, una venta total estimada de {currency(financialInputs.totalSales)} y una estructura de capital de 70% deuda bancaria y 30% aportacion de inversionistas. Bajo el escenario base de venta de 2 unidades por mes, el modelo genera un VPN aproximado de {currency(financialInputs.vpn)} y una TIR anualizada de {percent(financialInputs.tir * 100)}, lo que permite concluir que el proyecto es viable.
            </p>
          </Card>
        </section>

        <section id="descripcion" className="print-break">
          <SectionTitle icon={Building2} title="5. Descripcion del proyecto" subtitle="Empresa, historial, noticias y caracteristicas del desarrollo." isDark={isDark} />
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
                <p className={`font-semibold ${title}`}>Noticias e informacion relevante</p>
                <p className={`mt-2 text-sm leading-7 ${muted}`}>
                  PerSe Capital reporta una trayectoria acumulada de {project.campaigns} campañas y {project.projects} proyectos publicados en briq.mx, con un monto recaudado de {project.developerRaised}. Esto respalda la percepcion de experiencia operativa, capacidad de estructuracion financiera y continuidad dentro de la plataforma.
                </p>
              </div>
              <div className={`mt-6 rounded-2xl p-5 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                <p className={`text-lg font-semibold ${title}`}>Descripcion detallada del proyecto</p>
                <p className={`mt-3 text-sm leading-8 ${muted}`}>
                  Asis PerSe es un desarrollo vertical ubicado en Providencia, una de las zonas con mayor consolidacion urbana y plusvalia de Guadalajara. El proyecto contempla la construccion de un edificio de 9 niveles con 38 estudios, pensados para atender un segmento que demanda espacios compactos, bien ubicados y con amenidades funcionales para estancias cortas y medias.
                </p>
                <p className={`mt-3 text-sm leading-8 ${muted}`}>
                  A nivel operativo, el proyecto no se limita a vender unidades tradicionales, sino que integra un modelo de administracion y explotacion orientado a rentas y comercializacion estructurada. Este enfoque le da al desarrollo un perfil hibrido entre producto inmobiliario y vehiculo de inversion, con una propuesta diferenciada frente a esquemas convencionales de compraventa de departamentos.
                </p>
                <p className={`mt-3 text-sm leading-8 ${muted}`}>
                  En terminos de propuesta de valor, Asis PerSe busca competir mediante ubicacion, diseno compacto, amenidades y operacion especializada. Por ello, puede considerarse atractivo para un nicho que busca flexibilidad en la ocupacion y, al mismo tiempo, para inversionistas interesados en un activo con potencial de rentabilidad dentro del mercado de estancias urbanas en Guadalajara.
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
              <h3 className={`text-lg font-semibold ${title}`}>Caracteristicas del proyecto</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <DataPair label="Descripcion" value={`${project.floors} niveles y ${project.units} estudios`} isDark={isDark} />
                <DataPair label="Localizacion" value={project.location} isDark={isDark} href={mapsUrl} />
                <DataPair label="Periodo de construccion" value={`En proceso · avance reportado ${project.constructionProgress}%`} isDark={isDark} />
                <DataPair label="Periodo de operacion" value={project.operationModel} isDark={isDark} />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {amenityDetails.map((amenity) => (
                  <AmenityCard key={amenity.name} amenity={amenity} isDark={isDark} />
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section id="interiores" className="print-break">
          <SectionTitle icon={Images} title="Visualizacion interior y distribucion" subtitle="Seccion independiente para apreciar mejor los espacios interiores del proyecto." isDark={isDark} />
          <div className="grid gap-6">
            <Card isDark={isDark}>
              <p className={`text-lg leading-8 ${muted}`}>
                Esta galeria ayuda a mostrar como podrian verse por dentro los departamentos y amenidades del proyecto. Funciona como apoyo visual para explicar la distribucion general, la percepcion espacial y la logica de uso de los estudios.
              </p>
            </Card>

            <Card isDark={isDark}>
              <div className={`overflow-hidden rounded-[2rem] border p-5 ${isDark ? 'border-slate-800 bg-slate-800/60' : 'border-slate-200 bg-slate-50'}`}>
                <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                  <button
                    type="button"
                    onClick={() => setShowInteriorModal(true)}
                    className="group overflow-hidden rounded-[1.5rem] text-left"
                  >
                    <div className="relative">
                      <HoverImage src={interiorLayout.image} alt={interiorLayout.title} className="h-[460px] w-full rounded-[1.5rem]" />
                      <div className="absolute inset-0 bg-slate-950/0 transition group-hover:bg-slate-950/10" />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-[1.5rem] bg-gradient-to-t from-slate-950/75 to-transparent p-6">
                        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-sky-300">Haz clic para ampliar</p>
                        <h4 className="mt-2 text-3xl font-semibold text-white">{interiorLayout.title}</h4>
                      </div>
                    </div>
                  </button>

                  <div className="flex flex-col">
                    <div className={`rounded-[1.5rem] p-5 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
                      <p className="text-sm font-semibold uppercase tracking-[0.15em] text-sky-500">Lectura espacial</p>
                      <h4 className={`mt-3 text-3xl font-semibold ${title}`}>{interiorLayout.title}</h4>
                      <p className={`mt-4 text-lg leading-8 ${muted}`}>{interiorLayout.note}</p>
                    </div>
                    <div className="mt-4 space-y-3">
                      {interiorLayout.details.map((detail) => (
                        <div key={detail} className={`rounded-2xl px-4 py-3 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
                          <span className={`text-base ${muted}`}>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card isDark={isDark}>
              <div className={`rounded-[1.75rem] border p-6 ${isDark ? 'border-amber-900 bg-amber-950/20' : 'border-amber-200 bg-amber-50'}`}>
                <p className={`text-xl font-semibold ${title}`}>Siguiente paso natural</p>
                <div className="mt-4 space-y-3">
                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                    <p className={`text-base leading-7 ${muted}`}>Que te ayude a poner planos reales si los subes a <code className="rounded bg-slate-500/10 px-1 py-0.5 text-sm">public</code>.</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                    <p className={`text-base leading-7 ${muted}`}>Que haga todavia mas premium la seccion interior con una composicion tipo galeria arquitectonica.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section id="foda" className="print-break">
          <SectionTitle icon={CheckCircle2} title="6. Analisis FODA" subtitle="Diagnostico estrategico del proyecto." isDark={isDark} />
          <div className="grid gap-5 md:grid-cols-2">
            <FodaCard title="Fortalezas" items={foda.fortalezas} tone="emerald" isDark={isDark} />
            <FodaCard title="Oportunidades" items={foda.oportunidades} tone="sky" isDark={isDark} />
            <FodaCard title="Debilidades" items={foda.debilidades} tone="amber" isDark={isDark} />
            <FodaCard title="Amenazas" items={foda.amenazas} tone="rose" isDark={isDark} />
          </div>
        </section>

        <section id="mercado" className="print-break">
          <SectionTitle icon={Search} title="7. Estudio de mercado" subtitle="Comparacion del proyecto frente al mercado de rentas y venta." isDark={isDark} />
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
                  A partir del avance reportado, se observa que ya existe traccion comercial, lo cual ayuda a validar el interes del mercado por el proyecto.
                </p>
              </Card>

              <Card isDark={isDark}>
                <h3 className={`mb-3 text-lg font-semibold ${title}`}>Lectura del mercado</h3>
                <p className={`text-sm leading-7 ${muted}`}>
                  Para que este comparativo se sostenga con referencias publicas, la vista de rentas se recalculo con anuncios activos de 1 recamara en Providencia, Prados de Providencia y Colomos Providencia. La vista de venta se ajusto con listados de departamentos de 1 recamara en Providencia y Providencia 1a Seccion. Asi, los datos del mercado ya no son ejemplos genericos, sino promedios redondeados de comparables reales.
                </p>
                <p className={`mt-3 text-sm leading-7 ${muted}`}>
                  Corte de consulta: 26 de marzo de 2026. En renta se usaron 6 comparables y en venta 20 comparables. Los valores de Asis corresponden al proyecto, mientras que los valores del mercado son promedios observados en los listados revisados.
                </p>
                <div className="mt-4 grid gap-4">
                  <SourceCard title="Fuentes de renta" isDark={isDark} titleClassName={title} sources={rentSources} />
                  <SourceCard title="Fuentes de venta" isDark={isDark} titleClassName={title} sources={saleSources} />
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section id="consideraciones" className="print-break">
          <SectionTitle icon={Landmark} title="8. Consideraciones financieras" subtitle="Supuestos base y logica de flujo del proyecto inmobiliario." isDark={isDark} />
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <Card isDark={isDark}>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {financialDashboard.map((metric) => (
                  <MetricCard key={metric.label} metric={metric} isDark={isDark} />
                ))}
              </div>
            </Card>

            <Card isDark={isDark}>
              <h3 className={`text-lg font-semibold ${title}`}>Cascada de pagos del proyecto</h3>
              <p className={`mt-3 text-sm leading-7 ${muted}`}>
                En este modelo inmobiliario las ventas no necesariamente se comportan como una mensualidad fija. Puede haber meses con 0, 1 o 2 unidades vendidas, por lo que el pago al banco se estructura como una cascada cada vez que entra dinero por ventas.
              </p>
              <div className="mt-4 space-y-3">
                {waterfallSteps.map((step, index) => (
                  <div key={step} className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">{index + 1}</div>
                    <p className={`${muted}`}>{step}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Card isDark={isDark}>
              <h3 className={`text-lg font-semibold ${title}`}>Lectura del modelo financiero</h3>
              <p className={`mt-3 text-sm leading-8 ${muted}`}>
                El proyecto considera una inversion total de {currency(financialInputs.totalInvestment)}, de la cual {percent(financialInputs.bankShare * 100, 0)} proviene de credito bancario y {percent(financialInputs.investorShare * 100, 0)} de inversionistas. Mientras la deuda bancaria no este liquidada, una parte importante del ingreso por ventas se utiliza para cubrir intereses y amortizar el credito. Una vez liquidada la deuda, el excedente se convierte en flujo libre de caja para inversionistas y desarrollador.
              </p>
              <p className={`mt-3 text-sm leading-8 ${muted}`}>
                El arreglo <code className="rounded bg-slate-500/10 px-1 py-0.5 text-xs">ventasMensuales</code> al inicio del archivo permite simular escenarios distintos cambiando cada mes a 0, 1 o 2 unidades vendidas. Esto vuelve el modelo facil de explicar y facil de ajustar para escenarios pesimista, base u optimista.
              </p>
            </Card>

            <Card isDark={isDark}>
              <h3 className={`text-lg font-semibold ${title}`}>Base editable de ventas mensuales</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className={`${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      <th className="pb-3 text-left font-medium">Mes</th>
                      <th className="pb-3 text-left font-medium">Unidades vendidas</th>
                    </tr>
                  </thead>
                  <tbody className={`${muted}`}>
                    {monthlyFinancialModel.map((row) => (
                      <tr key={row.month} className={`border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                        <td className="py-2 pr-6">{row.month}</td>
                        <td className="py-2">{row.unitsSold}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>

        <section id="evaluacion" className="print-break">
          <SectionTitle icon={TrendingUp} title="9. Evaluacion financiera" subtitle="Metodologia aplicada, financiamiento, proyecciones y resultados." isDark={isDark} />

          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <Card isDark={isDark}>
              <h3 className={`text-lg font-semibold ${title}`}>Metodologia aplicada</h3>
              <div className="mt-4 space-y-3">
                {[
                  'Se proyectaron los ingresos por venta de las 38 unidades.',
                  'Se considero una venta base de 2 unidades por mes.',
                  'Se aplico una estructura de financiamiento 70% banco y 30% inversionistas.',
                  'Se considero el costo financiero del credito bancario con tasa anual del 18.25%.',
                  'Se aplico una MAR del 12% anual para evaluar la rentabilidad.',
                  'Se calcularon indicadores como VPN, TIR y mes objetivo de flujo libre.',
                  'El VPN positivo indica que el proyecto genera valor por encima de la tasa minima exigida.',
                  'La TIR anualizada de 63.50% supera la MAR del 12%, por lo que el proyecto es financieramente atractivo.',
                ].map((item) => (
                  <div key={item} className={`flex gap-3 rounded-2xl p-4 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-500" />
                    <p className={`text-sm leading-7 ${muted}`}>{item}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card isDark={isDark}>
              <h3 className={`text-lg font-semibold ${title}`}>Estructura de financiamiento</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={financingData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={105} paddingAngle={5}>
                      {financingData.map((_, i) => (
                        <Cell key={i} fill={i === 0 ? '#0ea5e9' : '#8b5cf6'} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className={`mt-3 text-sm leading-7 ${muted}`}>
                La estructura 70/30 permite apalancar el proyecto con deuda bancaria mientras los inversionistas cubren la aportacion patrimonial. Esta mezcla eleva el rendimiento del capital propio siempre que la comercializacion mantenga el ritmo base de ventas.
              </p>
            </Card>
          </div>

          <div className="mt-6 grid gap-6">
            <Card isDark={isDark}>
              <h3 className={`mb-4 text-lg font-semibold ${title}`}>Proyecciones financieras: flujo mensual</h3>
              <div className="h-[360px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyFinancialModel}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${Math.round(value / 1_000_000)}M`} />
                    <Tooltip />
                    <Legend />
                    <Bar name="Ingresos por venta" dataKey="revenue" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                    <Bar name="Pagos al banco" dataKey="bankPayment" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                    <Bar name="Flujo libre de caja" dataKey="freeCash" fill="#14b8a6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className={`mt-3 text-sm leading-7 ${muted}`}>
                Bajo el escenario base de 2 unidades por mes, el modelo concentra una parte significativa de los ingresos en servicio y amortizacion de deuda durante los primeros 11 meses. A partir del mes 11, al quedar liquidado el banco, el excedente comienza a reflejarse como flujo libre de caja.
              </p>
            </Card>

            <div className="grid gap-6 xl:grid-cols-2">
              <Card isDark={isDark}>
                <h3 className={`mb-4 text-lg font-semibold ${title}`}>Deuda bancaria por mes</h3>
                <div className="h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyFinancialModel}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${Math.round(value / 1_000_000)}M`} />
                    <Tooltip />
                    <Legend />
                    <Bar name="Saldo inicial" dataKey="debtStart" fill="#334155" radius={[8, 8, 0, 0]} />
                    <Bar name="Intereses acumulados" dataKey="interest" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                    <Bar name="Amortizacion" dataKey="amortization" fill="#22c55e" radius={[8, 8, 0, 0]} />
                    <Bar name="Saldo final" dataKey="debtEnd" fill="#ef4444" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card isDark={isDark}>
                <h3 className={`mb-4 text-lg font-semibold ${title}`}>Acumulado del proyecto</h3>
                <div className="h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyFinancialModel}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `${Math.round(value / 1_000_000)}M`} />
                      <Tooltip />
                      <Legend />
                      <Bar name="Flujo acumulado" dataKey="cumulativeFreeCash" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className={`mt-3 text-sm leading-7 ${muted}`}>
                  El mes objetivo donde se logra flujo libre de caja es el mes {financialInputs.freeCashMonth}, mismo punto en el que se liquida la deuda bancaria en el escenario base.
                </p>
              </Card>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Card isDark={isDark}>
              <h3 className={`text-lg font-semibold ${title}`}>Resultados financieros clave</h3>
              <div className="mt-4 space-y-4">
                <ResultRow label="Precio estimado por unidad" value={currency(unitSalePrice)} isDark={isDark} />
                <ResultRow label="Inversion total del proyecto" value={currency(financialInputs.totalInvestment)} isDark={isDark} />
                <ResultRow label="Monto financiado por el banco" value={currency(financialInputs.bankAmount)} isDark={isDark} />
                <ResultRow label="Aportacion de inversionistas" value={currency(financialInputs.investorAmount)} isDark={isDark} />
                <ResultRow label="Venta total estimada" value={currency(financialInputs.totalSales)} isDark={isDark} />
                <ResultRow label="VPN con MAR del 12%" value={currency(financialInputs.vpn)} isDark={isDark} />
                <ResultRow label="TIR anualizada" value={percent(financialInputs.tir * 100)} isDark={isDark} />
              </div>
            </Card>

            <Card isDark={isDark}>
              <h3 className={`text-lg font-semibold ${title}`}>Interpretacion de resultados</h3>
              <p className={`mt-3 text-sm leading-8 ${muted}`}>
                El proyecto recupera la deuda bancaria en el mes {financialInputs.debtClearedMonth}. Esto significa que el flujo operativo deja de estar presionado por el servicio del credito a partir de ese punto y comienza a liberarse valor economico para los inversionistas y el desarrollador.
              </p>
              <p className={`mt-3 text-sm leading-8 ${muted}`}>
                El VPN positivo confirma que el proyecto genera valor por encima de la tasa minima exigida del {percent(financialInputs.mar * 100, 0)}. A su vez, la TIR anualizada de {percent(financialInputs.tir * 100)} supera de manera amplia la MAR, por lo que el proyecto resulta financieramente atractivo bajo el escenario base analizado.
              </p>
            </Card>
          </div>
        </section>

        <section id="escenario" className="print-break">
          <SectionTitle icon={AlertTriangle} title="10. Evaluacion de escenario" subtitle="Problematicas del flujo y alternativas de solucion." isDark={isDark} />
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <Card isDark={isDark}>
              <h3 className={`text-lg font-semibold ${title}`}>Problematica</h3>
              <p className={`mt-4 text-sm leading-8 ${muted}`}>
                La principal problematica del proyecto es que las ventas de las unidades no son completamente constantes. Aunque el escenario base considera vender 2 unidades por mes, en la realidad puede haber meses con 0, 1 o 2 unidades vendidas. Esto genera presion sobre el flujo de efectivo, ya que el credito bancario sigue generando intereses aunque no existan ventas suficientes en determinados meses.
              </p>
              <div className={`mt-5 rounded-2xl p-4 ${isDark ? 'bg-rose-950/30 border border-rose-900' : 'bg-rose-50 border border-rose-200'}`}>
                <p className={`font-semibold ${title}`}>Riesgo operativo central</p>
                <p className={`mt-2 text-sm leading-7 ${muted}`}>
                  Si la velocidad de ventas cae por debajo del escenario base, la deuda se mantiene viva por mas tiempo, los intereses acumulados crecen y se retrasa el momento en el que el proyecto comienza a generar flujo libre de caja.
                </p>
              </div>
            </Card>

            <Card isDark={isDark}>
              <h3 className={`text-lg font-semibold ${title}`}>Alternativas de solucion</h3>
              <div className="mt-4 grid gap-3">
                {scenarioAlternatives.map((item) => (
                  <div key={item} className={`flex gap-3 rounded-2xl p-4 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                    <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                    <p className={`text-sm leading-7 ${muted}`}>{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section id="resultado-final" className="print-break">
          <SectionTitle icon={Wallet} title="11. Resultados claros y fundamentados" subtitle="Conclusion: rentable o no rentable." isDark={isDark} />
          <Card isDark={isDark}>
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <div className={`rounded-[1.75rem] border p-6 ${isDark ? 'border-emerald-900 bg-emerald-950/30' : 'border-emerald-200 bg-emerald-50'}`}>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-500">Decision</p>
                <h3 className={`mt-3 text-3xl font-bold ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>{financialInputs.decision}</h3>
                <p className={`mt-4 text-sm leading-7 ${muted}`}>
                  VPN positivo, TIR superior a la MAR y deuda liquidada en el mes {financialInputs.debtClearedMonth}.
                </p>
              </div>
              <div>
                <p className={`text-sm leading-8 ${muted}`}>
                  Con base en el escenario financiero analizado, el proyecto Asis PerSe si puede considerarse rentable. El VPN calculado con una MAR del 12% es positivo, con un valor aproximado de $15.28 millones de pesos. Ademas, la TIR anualizada estimada es de 63.50%, superior a la MAR exigida. Esto significa que el proyecto no solo recupera la inversion inicial de los inversionistas, sino que tambien genera valor adicional. El mes objetivo se alcanza en el mes 11, momento en el que la deuda bancaria queda liquidada y comienza a generarse flujo libre de caja.
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section id="mejoras" className="print-break">
          <SectionTitle icon={Lightbulb} title="12. Alternativas o propuestas de mejora" subtitle="Acciones para volverlo rentable o mas rentable." isDark={isDark} />
          <div className="grid gap-5 md:grid-cols-2">
            {improvementProposals.map((item) => (
              <Card key={item} isDark={isDark}>
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                    <Lightbulb className="h-5 w-5" />
                  </div>
                  <p className={`text-sm leading-7 ${muted}`}>{item}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="creditos" className="print-break">
          <SectionTitle icon={Images} title="Datos de entrega" subtitle="Informacion final del equipo." isDark={isDark} />
          <div className={`rounded-[2rem] p-8 shadow-xl ${bgCard}`}>
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">Entrega final</p>
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

      {showInteriorModal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/85 p-4" onClick={() => setShowInteriorModal(false)}>
          <div className="relative max-h-[92vh] max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setShowInteriorModal(false)}
              className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-slate-900 shadow-lg transition hover:bg-white"
              aria-label="Cerrar imagen ampliada"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={interiorLayout.image}
              alt={interiorLayout.title}
              className="max-h-[92vh] w-auto rounded-[1.5rem] object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  )
}

function Badge({ icon: Icon, text, isDark }: { icon: React.ElementType; text: string; isDark: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 shadow-sm ${isDark ? 'bg-slate-900 text-slate-100 border border-slate-800' : 'bg-white text-slate-800 border border-slate-200'}`}>
      <Icon className="h-4 w-4 text-sky-500" />
      <span className="text-base">{text}</span>
    </div>
  )
}

function HoverImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`group overflow-hidden ${className ?? ''}`}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-110"
      />
    </div>
  )
}

function MiniInfo({ title, value, isDark, href }: { title: string; value: string; isDark: boolean; href?: string }) {
  const content = (
    <>
      <p className={`text-base ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>{title}</p>
      <p className={`mt-1 text-2xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</p>
    </>
  )

  return href ? (
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
}

function SectionTitle({ icon: Icon, title, subtitle, isDark }: { icon: React.ElementType; title: string; subtitle: string; isDark: boolean }) {
  return (
    <div className="mb-6 flex items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 text-white shadow-sm">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className={`text-3xl font-semibold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
        <p className={`mt-2 text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{subtitle}</p>
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
      <p className={`text-base ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>{label}</p>
      <p className={`mt-1 text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</p>
    </>
  )

  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="block rounded-2xl p-2 transition hover:bg-slate-500/5">
      {content}
    </a>
  ) : (
    <div>{content}</div>
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

function MetricCard({ metric, isDark }: { metric: FinancialMetric; isDark: boolean }) {
  const tones = {
    sky: isDark ? 'border-sky-900 bg-sky-950/30 text-sky-200' : 'border-sky-200 bg-sky-50 text-sky-800',
    violet: isDark ? 'border-violet-900 bg-violet-950/30 text-violet-200' : 'border-violet-200 bg-violet-50 text-violet-800',
    emerald: isDark ? 'border-emerald-900 bg-emerald-950/30 text-emerald-200' : 'border-emerald-200 bg-emerald-50 text-emerald-800',
    amber: isDark ? 'border-amber-900 bg-amber-950/30 text-amber-200' : 'border-amber-200 bg-amber-50 text-amber-800',
  }

  return (
    <div className={`rounded-3xl border p-4 ${tones[metric.tone]}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.15em]">{metric.label}</p>
      <p className="mt-3 text-2xl font-bold">{metric.value}</p>
    </div>
  )
}

function ResultRow({ label, value, isDark }: { label: string; value: string; isDark: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-4 rounded-2xl px-4 py-3 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
      <p className={`text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{label}</p>
      <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</p>
    </div>
  )
}

function SourceCard({
  title,
  isDark,
  titleClassName,
  sources,
}: {
  title: string
  isDark: boolean
  titleClassName: string
  sources: SourceLink[]
}) {
  return (
    <div className={`rounded-2xl p-4 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
      <p className={`text-sm font-semibold ${titleClassName}`}>{title}</p>
      <div className="mt-2 flex flex-col gap-2">
        {sources.map((source) => (
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
  )
}

export default App
