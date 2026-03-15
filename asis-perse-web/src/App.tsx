import React, { useMemo, useState } from 'react'
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
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts'
import {
  Building2,
  MapPin,
  TrendingUp,
  Wallet,
  Landmark,
  ShieldCheck,
  Briefcase,
  Calendar,
  BarChart3,
  Target,
  AlertTriangle,
  CheckCircle2,
  Moon,
  Sun,
  Printer,
  Menu,
  X,
  Images,
  FileText,
} from 'lucide-react'

type Theme = 'light' | 'dark'

const currency = (n: number) =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(n)

const tooltipCurrencyFormatter = (value: unknown) =>
  typeof value === 'number' ? currency(value) : String(value ?? '')

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
  guaranteeValue: 52875668,
  guaranteeRatio: 2.7,
  occupancy: 70,
  marketOccupancy: 68,
  nightlyRate: 1350,
  marketNightlyRate: 801,
  annualIncomePerUnit: 347760,
  monthlyIncomePerUnit: 28980,
  soldParticipations: 34,
  totalParticipations: 85,
  seniorDebt: 27350000,
  developerCapital: 27091223,
  presales: 27457000,
  operationModel: 'Rentas de corta y larga estancia',
  constructionProgress: 42,
  marketSaleArea: 88,
  projectArea: 33,
  zonePriceDept: 5744018,
  projectPriceDept: 2500000,
  zonePriceM2: 66730,
  projectPriceM2: 75097,
}

const teamInfo = {
  title: 'Evaluación Financiera del Proyecto Asís PerSe',
  subject: 'Finanzas',
  professor: 'Alfredo Uribe',
  university: 'UNAM',
  group: '06',
  date: '27/03/2026',
  members: [
    'Francisco Javier Reynoso Ortega',
    'Integrante 2',
    'Integrante 3',
  ],
}

const capitalData = [
  { name: 'Deuda Senior', value: 27350000, share: 33 },
  { name: 'Capital del desarrollador', value: 27091223, share: 33 },
  { name: 'Preventa', value: 27457000, share: 34 },
]

const marketRentData = [
  { category: 'Costo por noche', principal: 1350, comparativo: 801 },
  { category: 'Ocupación', principal: 70, comparativo: 68 },
  { category: 'Ingreso mensual', principal: 28980, comparativo: 16618 },
  { category: 'Ingreso anual', principal: 347760, comparativo: 199498 },
]

const marketSaleData = [
  { category: 'Área (m²)', principal: 33, comparativo: 88 },
  { category: 'Precio depa', principal: 2500000, comparativo: 5744018 },
  { category: 'Precio por m²', principal: 75097, comparativo: 66730 },
  { category: 'Recámaras', principal: 1, comparativo: 2 },
]

const scenarioData = {
  optimista: { occupancy: 78, nightly: 1450, annualIncome: 15713520, verdict: 'Muy rentable' },
  base: { occupancy: 70, nightly: 1350, annualIncome: 13214880, verdict: 'Rentable' },
  pesimista: { occupancy: 58, nightly: 1200, annualIncome: 9653520, verdict: 'Rentabilidad presionada' },
}

const foda = {
  fortalezas: [
    'Ubicación estratégica cerca de Midtown y zona financiera',
    'Desarrollador con trayectoria en proyectos similares',
    'Garantía hipotecaria sólida',
    'Producto enfocado en renta ejecutiva y turística',
  ],
  oportunidades: [
    'Crecimiento del turismo de negocios en Guadalajara',
    'Alta demanda de estancias cortas y medias',
    'Plusvalía en Providencia',
    'Posibilidad de alianzas con empresas y plataformas de hospedaje',
  ],
  debilidades: [
    'Dependencia de mantener niveles de ocupación altos',
    'Precio por m² superior al promedio de la zona',
    'Concentración del proyecto en estudios',
  ],
  amenazas: [
    'Mayor competencia en rentas temporales',
    'Cambios regulatorios',
    'Baja en la demanda turística',
    'Aumento de costos operativos',
  ],
}

const timeline = [
  {
    title: 'Planeación y fondeo',
    desc: 'Estructuración de capital con deuda senior, capital del desarrollador y preventa.',
    tag: 'Financiamiento',
  },
  {
    title: 'Construcción',
    desc: 'Avance de obra reportado de 42%, con estructuras, albañilería e instalaciones.',
    tag: 'Obra',
  },
  {
    title: 'Comercialización',
    desc: 'Venta de participaciones e integración del esquema de inversión.',
    tag: 'Mercado',
  },
  {
    title: 'Operación',
    desc: 'Explotación del inmueble mediante rentas de corta y larga estancia.',
    tag: 'Operación',
  },
]

const photoCards = [
  {
    src: '/project-1.jpg.webp',
    title: 'Vista del proyecto',
    text: 'Usa aquí una captura del render o portada del desarrollo.',
  },
  {
    src: '/project-2.jpeg.png',
    title: 'Ubicación estratégica',
    text: 'Aquí puedes colocar una imagen del mapa o localización.',
  },
  {
    src: '/INTERIOR_02.jpg.webp',
    title: 'Datos del proyecto',
    text: 'Aquí puedes poner una captura con amenidades o estructura de capital.',
  },
]

const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'descripcion', label: 'Descripción' },
  { id: 'finanzas', label: 'Finanzas' },
  { id: 'mercado', label: 'Mercado' },
  { id: 'foda', label: 'FODA' },
  { id: 'escenarios', label: 'Escenarios' },
  { id: 'resultados', label: 'Resultados' },
  { id: 'creditos', label: 'Créditos' },
]

function App() {
  const [theme, setTheme] = useState<Theme>('light')
  const [menuOpen, setMenuOpen] = useState(false)
  const [marketView, setMarketView] = useState<'rentas' | 'venta'>('rentas')
  const [scenario, setScenario] = useState<keyof typeof scenarioData>('base')

  const isDark = theme === 'dark'

  const bgMain = isDark
    ? 'bg-slate-950 text-slate-100'
    : 'bg-slate-50 text-slate-900'

  const bgCard = isDark
    ? 'bg-slate-900 border border-slate-800'
    : 'bg-white border border-slate-200'

  const muted = isDark ? 'text-slate-300' : 'text-slate-600'
  const title = isDark ? 'text-white' : 'text-slate-900'
  const soft = isDark ? 'bg-slate-800' : 'bg-slate-100'
  const heroOverlay = isDark
    ? 'bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.15),transparent_30%),radial-gradient(circle_at_left,rgba(168,85,247,0.12),transparent_25%)]'
    : 'bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.18),transparent_30%),radial-gradient(circle_at_left,rgba(168,85,247,0.10),transparent_25%)]'

  const annualProjectIncome = project.annualIncomePerUnit * project.units
  const participationProgress = Math.round(
    (project.soldParticipations / project.totalParticipations) * 100
  )

  const scenarioSeries = useMemo(
    () => [
      { name: 'Optimista', ingreso: scenarioData.optimista.annualIncome },
      { name: 'Base', ingreso: scenarioData.base.annualIncome },
      { name: 'Pesimista', ingreso: scenarioData.pesimista.annualIncome },
    ],
    []
  )

  const chartColors = ['#0ea5e9', '#8b5cf6', '#14b8a6', '#f59e0b']

  const stats = [
    { label: 'Inversión total', value: currency(project.totalInvestment), icon: Wallet },
    { label: 'Tasa anual fija', value: `${project.annualRate}%`, icon: Landmark },
    { label: 'TIR estimada', value: `${project.estimatedIRR}%`, icon: TrendingUp },
    { label: 'Garantía / crédito', value: `${project.guaranteeRatio} a 1`, icon: ShieldCheck },
  ]

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className={bgMain}>
      <header
        className={`no-print sticky top-0 z-50 backdrop-blur ${isDark ? 'bg-slate-950/85 border-b border-slate-800' : 'bg-white/85 border-b border-slate-200'}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-sky-500 px-3 py-2 text-sm font-bold text-white shadow-md">
              AP
            </div>
            <div>
              <p className={`text-sm font-semibold ${title}`}>Asís PerSe</p>
              <p className={`text-xs ${muted}`}>Evaluación financiera interactiva</p>
            </div>
          </div>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-xl px-3 py-2 text-sm transition ${isDark ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className={`no-print inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${isDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}
            >
              <Printer className="h-4 w-4" />
              PDF
            </button>

            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`no-print rounded-xl px-3 py-2 transition ${isDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}
              aria-label="Cambiar tema"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`no-print rounded-xl px-3 py-2 lg:hidden ${isDark ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-900'}`}
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className={`no-print border-t px-4 py-3 lg:hidden ${isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'}`}>
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-3 py-2 text-sm ${isDark ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'}`}
                >
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
              <span className="inline-flex rounded-full bg-sky-500 px-4 py-1 text-sm font-semibold text-white shadow-md">
                Proyecto de Finanzas
              </span>
              <h1 className={`mt-5 text-4xl font-bold tracking-tight lg:text-6xl ${title}`}>
                {project.name}
              </h1>
              <p className={`mt-4 max-w-2xl text-lg leading-8 ${muted}`}>
                Plataforma web interactiva para sustituir la presentación tradicional y mostrar
                la evaluación financiera, el mercado, los escenarios y la rentabilidad del
                proyecto inmobiliario.
              </p>
            </motion.div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Badge icon={Building2} text={`${project.floors} niveles / ${project.units} estudios`} isDark={isDark} />
              <Badge icon={MapPin} text={project.shortLocation} isDark={isDark} />
              <Badge icon={Briefcase} text={project.developer} isDark={isDark} />
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item) => (
                <StatCard
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  Icon={item.icon}
                  isDark={isDark}
                />
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-5 shadow-2xl ${bgCard}`}>
            <img
              src="/project-1.jpeg.webp"
              alt="Proyecto Asís PerSe"
              className="h-72 w-full rounded-[1.5rem] object-cover"
            />
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <MiniInfo title="Ingreso anual estimado" value={currency(annualProjectIncome)} isDark={isDark} />
              <MiniInfo title="Avance de obra" value={`${project.constructionProgress}%`} isDark={isDark} />
              <MiniInfo title="Participaciones vendidas" value={`${project.soldParticipations}/${project.totalParticipations}`} isDark={isDark} />
              <MiniInfo title="Ocupación estimada" value={`${project.occupancy}%`} isDark={isDark} />
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl space-y-16 px-4 py-12 lg:px-8">
        <section id="descripcion">
          <SectionTitle
            icon={FileText}
            title="Descripción general"
            subtitle="Resumen ejecutivo, ubicación, amenidades y datos relevantes."
            isDark={isDark}
          />
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <Card isDark={isDark}>
              <div className="grid gap-4 sm:grid-cols-2">
                <DataPair label="Desarrollador" value={project.developer} isDark={isDark} />
                <DataPair label="Ubicación" value={project.location} isDark={isDark} />
                <DataPair label="Modelo de operación" value={project.operationModel} isDark={isDark} />
                <DataPair label="Amenidades" value={project.amenities.join(', ')} isDark={isDark} />
              </div>

              <div className="mt-6">
                <p className={`text-sm ${muted}`}>Avance comercial</p>
                <div className={`mt-2 h-3 overflow-hidden rounded-full ${soft}`}>
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-violet-500"
                    style={{ width: `${participationProgress}%` }}
                  />
                </div>
                <p className={`mt-2 text-sm font-semibold ${title}`}>{participationProgress}%</p>
              </div>

              <div className="mt-6 rounded-2xl bg-gradient-to-r from-sky-500 to-violet-600 p-5 text-white">
                <p className="text-sm uppercase tracking-wide text-white/80">Conclusión ejecutiva</p>
                <p className="mt-2 leading-7">
                  El proyecto combina ubicación premium, amenidades atractivas y un esquema de
                  rentas que busca aprovechar la demanda ejecutiva y turística en Guadalajara.
                </p>
              </div>
            </Card>

            <Card isDark={isDark}>
              <div className="grid gap-4 md:grid-cols-2">
                {photoCards.map((photo) => (
                  <div key={photo.title} className="overflow-hidden rounded-3xl">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="h-48 w-full rounded-3xl object-cover"
                    />
                    <div className={`mt-3 rounded-2xl p-4 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                      <p className={`font-semibold ${title}`}>{photo.title}</p>
                      <p className={`mt-1 text-sm ${muted}`}>{photo.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section id="finanzas" className="print-break">
          <SectionTitle
            icon={BarChart3}
            title="Consideraciones financieras"
            subtitle="Origen de recursos, estructura de capital y lectura de inversión."
            isDark={isDark}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <Card isDark={isDark}>
              <h3 className={`mb-4 text-lg font-semibold ${title}`}>Estructura de financiamiento</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={capitalData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={4}
                    >
                      {capitalData.map((_, i) => (
                        <Cell key={i} fill={chartColors[i % chartColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={tooltipCurrencyFormatter} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card isDark={isDark}>
              <h3 className={`mb-4 text-lg font-semibold ${title}`}>Desglose del capital</h3>
              <div className="space-y-4">
                {capitalData.map((item, i) => (
                  <div key={item.name} className={`rounded-2xl p-4 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className={`font-medium ${title}`}>{item.name}</span>
                      <span className={`text-sm font-semibold ${muted}`}>{item.share}%</span>
                    </div>
                    <div className={`mb-3 h-3 overflow-hidden rounded-full ${soft}`}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${item.share}%`, backgroundColor: chartColors[i] }}
                      />
                    </div>
                    <p className={`text-sm ${muted}`}>{currency(item.value)}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <KpiBlock label="Inversión total" value={currency(project.totalInvestment)} isDark={isDark} />
            <KpiBlock label="Deuda senior" value={currency(project.seniorDebt)} isDark={isDark} />
            <KpiBlock label="Valor de la garantía" value={currency(project.guaranteeValue)} isDark={isDark} />
          </div>
        </section>

        <section id="mercado" className="print-break">
          <SectionTitle
            icon={TrendingUp}
            title="Estudio de mercado"
            subtitle="Comparativo entre el proyecto y el comportamiento promedio del mercado."
            isDark={isDark}
          />
          <Card isDark={isDark}>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h3 className={`text-lg font-semibold ${title}`}>Comparativos</h3>
              <div className={`rounded-2xl p-1 ${soft}`}>
                <button
                  onClick={() => setMarketView('rentas')}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                    marketView === 'rentas'
                      ? 'bg-sky-500 text-white shadow-sm'
                      : isDark
                        ? 'text-slate-200'
                        : 'text-slate-700'
                  }`}
                >
                  Rentas
                </button>
                <button
                  onClick={() => setMarketView('venta')}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                    marketView === 'venta'
                      ? 'bg-violet-500 text-white shadow-sm'
                      : isDark
                        ? 'text-slate-200'
                        : 'text-slate-700'
                  }`}
                >
                  Venta
                </button>
              </div>
            </div>

            <div className="h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marketView === 'rentas' ? marketRentData : marketSaleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={tooltipCurrencyFormatter} />
                  <Legend />
                  <Bar
                    dataKey="principal"
                    name={marketView === 'rentas' ? 'Proyecto' : 'Asís'}
                    fill="#0ea5e9"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    dataKey="comparativo"
                    name={marketView === 'rentas' ? 'Mercado' : 'Zona'}
                    fill="#8b5cf6"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        <section id="foda" className="print-break">
          <SectionTitle
            icon={Target}
            title="Análisis FODA"
            subtitle="Diagnóstico estratégico del proyecto."
            isDark={isDark}
          />
          <div className="grid gap-5 md:grid-cols-2">
            <FodaCard title="Fortalezas" items={foda.fortalezas} tone="emerald" isDark={isDark} />
            <FodaCard title="Oportunidades" items={foda.oportunidades} tone="sky" isDark={isDark} />
            <FodaCard title="Debilidades" items={foda.debilidades} tone="amber" isDark={isDark} />
            <FodaCard title="Amenazas" items={foda.amenazas} tone="rose" isDark={isDark} />
          </div>
        </section>

        <section id="escenarios" className="print-break">
          <SectionTitle
            icon={Calendar}
            title="Evaluación de escenarios"
            subtitle="Comparación entre escenarios optimista, base y pesimista."
            isDark={isDark}
          />
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <Card isDark={isDark}>
              <div className="mb-5 flex flex-wrap gap-2">
                {Object.keys(scenarioData).map((key) => (
                  <button
                    key={key}
                    onClick={() => setScenario(key as keyof typeof scenarioData)}
                    className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                      scenario === key
                        ? 'bg-slate-900 text-white'
                        : isDark
                          ? 'bg-slate-800 text-slate-200'
                          : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <MiniInfo
                  title="Ocupación"
                  value={`${scenarioData[scenario].occupancy}%`}
                  isDark={isDark}
                />
                <MiniInfo
                  title="Tarifa por noche"
                  value={currency(scenarioData[scenario].nightly)}
                  isDark={isDark}
                />
                <MiniInfo
                  title="Ingreso anual"
                  value={currency(scenarioData[scenario].annualIncome)}
                  isDark={isDark}
                />
              </div>

              <div className={`mt-5 rounded-2xl p-4 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                <p className={`text-sm ${muted}`}>Lectura del escenario</p>
                <p className={`mt-1 text-lg font-semibold ${title}`}>
                  {scenarioData[scenario].verdict}
                </p>
              </div>
            </Card>

            <Card isDark={isDark}>
              <h3 className={`mb-4 text-lg font-semibold ${title}`}>Sensibilidad de ingresos</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={scenarioSeries}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={tooltipCurrencyFormatter} />
                    <Area type="monotone" dataKey="ingreso" stroke="#0ea5e9" fill="#38bdf8" fillOpacity={0.25} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </section>

        <section className="print-break">
          <SectionTitle
            icon={AlertTriangle}
            title="Problemática y alternativas de solución"
            subtitle="Riesgos principales y acciones para mejorar la rentabilidad."
            isDark={isDark}
          />
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <Card isDark={isDark}>
              <h3 className={`mb-4 text-lg font-semibold ${title}`}>Radar cualitativo</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    data={[
                      { factor: 'Ubicación', value: 9 },
                      { factor: 'Garantía', value: 9 },
                      { factor: 'Mercado', value: 8 },
                      { factor: 'Precio/m²', value: 6 },
                      { factor: 'Ocupación', value: 6 },
                      { factor: 'Experiencia', value: 8 },
                    ]}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="factor" />
                    <PolarRadiusAxis domain={[0, 10]} />
                    <Radar dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.35} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card isDark={isDark}>
              <div className="space-y-5">
                <div className={`rounded-2xl p-4 ${isDark ? 'bg-rose-950/40 border border-rose-900' : 'bg-rose-50 border border-rose-200'}`}>
                  <p className={`font-semibold ${title}`}>Problemática principal</p>
                  <p className={`mt-2 text-sm leading-6 ${muted}`}>
                    La rentabilidad depende en gran medida de mantener una ocupación suficiente
                    y una tarifa por noche competitiva. Si la demanda baja, los ingresos anuales
                    se reducen de forma importante.
                  </p>
                </div>

                <div className={`rounded-2xl p-4 ${isDark ? 'bg-emerald-950/40 border border-emerald-900' : 'bg-emerald-50 border border-emerald-200'}`}>
                  <p className={`font-semibold ${title}`}>Alternativas de solución</p>
                  <ul className={`mt-2 space-y-2 text-sm leading-6 ${muted}`}>
                    <li>• Aplicar precios dinámicos por temporada.</li>
                    <li>• Mezclar rentas cortas con estancias medias.</li>
                    <li>• Crear convenios con empresas y ejecutivos.</li>
                    <li>• Fortalecer marketing digital en varios canales.</li>
                    <li>• Controlar costos operativos desde el inicio.</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section id="resultados" className="print-break">
          <SectionTitle
            icon={CheckCircle2}
            title="Resultados y conclusión"
            subtitle="Síntesis final de rentabilidad y mejora propuesta."
            isDark={isDark}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <Card isDark={isDark}>
              <h3 className={`text-lg font-semibold ${title}`}>¿Es rentable o no?</h3>
              <p className={`mt-4 leading-7 ${muted}`}>
                Con la información disponible, el proyecto puede considerarse
                <span className={`font-semibold ${title}`}> rentable en el escenario base</span>,
                respaldado por una TIR estimada de {project.estimatedIRR}%,
                una ubicación atractiva y una estructura de capital equilibrada.
              </p>

              <ul className={`mt-5 space-y-3 text-sm ${muted}`}>
                <li>• Inversión total: <span className={title}>{currency(project.totalInvestment)}</span></li>
                <li>• Ingreso anual estimado: <span className={title}>{currency(annualProjectIncome)}</span></li>
                <li>• Tasa anual fija: <span className={title}>{project.annualRate}%</span></li>
                <li>• Garantía / crédito: <span className={title}>{project.guaranteeRatio} a 1</span></li>
              </ul>
            </Card>

            <Card isDark={isDark}>
              <h3 className={`text-lg font-semibold ${title}`}>Propuesta de mejora</h3>
              <ul className={`mt-4 space-y-3 text-sm ${muted}`}>
                <li>• Incrementar ocupación con alianzas corporativas.</li>
                <li>• Optimizar tarifas según temporada y eventos.</li>
                <li>• Ofrecer servicios premium para justificar precios mayores.</li>
                <li>• Reforzar publicidad digital y diversificación de plataformas.</li>
                <li>• Monitorear mensualmente la rentabilidad real contra proyecciones.</li>
              </ul>
            </Card>
          </div>
        </section>

        <section className="print-break">
          <SectionTitle
            icon={Images}
            title="Ruta del proyecto"
            subtitle="Línea de tiempo visual para cerrar la exposición."
            isDark={isDark}
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {timeline.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`rounded-3xl p-5 shadow-sm ${bgCard}`}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-500">
                  {item.tag}
                </p>
                <h3 className={`mt-2 text-lg font-semibold ${title}`}>{item.title}</h3>
                <p className={`mt-2 text-sm leading-6 ${muted}`}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="creditos" className="print-break">
          <SectionTitle
            icon={FileText}
            title="Créditos"
            subtitle=""
            isDark={isDark}
          />
          <div className={`rounded-[2rem] p-8 shadow-xl ${bgCard}`}>
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">
                  Proyecto académico
                </p>
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

function Badge({
  icon: Icon,
  text,
  isDark,
}: {
  icon: React.ElementType
  text: string
  isDark: boolean
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 shadow-sm ${isDark ? 'bg-slate-900 text-slate-100 border border-slate-800' : 'bg-white text-slate-800 border border-slate-200'}`}
    >
      <Icon className="h-4 w-4 text-sky-500" />
      <span className="text-sm">{text}</span>
    </div>
  )
}

function StatCard({
  label,
  value,
  Icon,
  isDark,
}: {
  label: string
  value: string
  Icon: React.ElementType
  isDark: boolean
}) {
  return (
    <div className={`rounded-3xl p-5 shadow-sm ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'}`}>
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 text-white">
        <Icon className="h-5 w-5" />
      </div>
      <p className={`${isDark ? 'text-slate-300' : 'text-slate-500'} text-sm`}>{label}</p>
      <p className={`mt-1 text-2xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {value}
      </p>
    </div>
  )
}

function MiniInfo({
  title,
  value,
  isDark,
}: {
  title: string
  value: string
  isDark: boolean
}) {
  return (
    <div className={`rounded-2xl p-4 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
      <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>{title}</p>
      <p className={`mt-1 text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {value}
      </p>
    </div>
  )
}

function SectionTitle({
  icon: Icon,
  title,
  subtitle,
  isDark,
}: {
  icon: React.ElementType
  title: string
  subtitle: string
  isDark: boolean
}) {
  return (
    <div className="mb-6 flex items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 text-white shadow-sm">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className={`text-2xl font-semibold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {title}
        </h2>
        <p className={`mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{subtitle}</p>
      </div>
    </div>
  )
}

function Card({
  children,
  isDark,
}: {
  children: React.ReactNode
  isDark: boolean
}) {
  return (
    <div className={`rounded-[2rem] p-6 shadow-sm ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'}`}>
      {children}
    </div>
  )
}

function DataPair({
  label,
  value,
  isDark,
}: {
  label: string
  value: string
  isDark: boolean
}) {
  return (
    <div>
      <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>{label}</p>
      <p className={`mt-1 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</p>
    </div>
  )
}

function KpiBlock({
  label,
  value,
  isDark,
}: {
  label: string
  value: string
  isDark: boolean
}) {
  return (
    <div className={`rounded-3xl p-5 shadow-sm ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'}`}>
      <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>{label}</p>
      <p className={`mt-2 text-2xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {value}
      </p>
    </div>
  )
}

function FodaCard({
  title,
  items,
  tone,
  isDark,
}: {
  title: string
  items: string[]
  tone: 'emerald' | 'sky' | 'amber' | 'rose'
  isDark: boolean
}) {
  const tones: Record<string, string> = {
    emerald: isDark ? 'bg-emerald-950/30 border border-emerald-900' : 'bg-emerald-50 border border-emerald-200',
    sky: isDark ? 'bg-sky-950/30 border border-sky-900' : 'bg-sky-50 border border-sky-200',
    amber: isDark ? 'bg-amber-950/30 border border-amber-900' : 'bg-amber-50 border border-amber-200',
    rose: isDark ? 'bg-rose-950/30 border border-rose-900' : 'bg-rose-50 border border-rose-200',
  }

  return (
    <div className={`rounded-3xl p-5 ${tones[tone]}`}>
      <h3 className={`mb-4 text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h3>
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