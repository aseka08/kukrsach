"use client"

import type React from "react"

import Image from "next/image"
import { ChevronDown, Menu, Search, X, ChevronRight, Flag } from "lucide-react"
import { useEffect, useState, useRef } from "react"

// Athlete biography data
const athleteBios = [
  {
    id: 1,
    name: "Геннадий Головкин",
    sport: "Бокс",
    image: "/placeholder.svg?height=400&width=300",
    achievements: "Чемпион мира в среднем весе, олимпийский призер",
    fullBio: `
      <p>Геннадий Геннадьевич Головкин (родился 8 апреля 1982 года) — казахстанский профессиональный боксер. Он является двукратным чемпионом мира в среднем весе, владел титулами IBF, WBA, WBC и IBO.</p>
      
      <p>Головкин считается одним из величайших боксеров среднего веса всех времен. Он известен своей исключительной силой удара, техникой и прессингом на ринге.</p>
      
      <h3>Достижения:</h3>
      <ul>
        <li>Серебряный призер Олимпийских игр 2004 года</li>
        <li>Чемпион мира по версиям WBA, WBC, IBF и IBO</li>
        <li>Рекорд 41-1-1 с 36 нокаутами</li>
        <li>Один из самых высоких процентов нокаутов в истории бокса</li>
      </ul>
      
      <p>Головкин начал заниматься боксом в возрасте 8 лет. Его братья-близнецы также были боксерами. Профессиональную карьеру начал в 2006 году после успешной любительской карьеры.</p>
      
      <p>Геннадий Головкин является национальным героем Казахстана и одним из самых узнаваемых спортсменов страны на международной арене.</p>
    `,
  },
  {
    id: 2,
    name: "Илья Ильин",
    sport: "Тяжелая атлетика",
    image: "/placeholder.svg?height=400&width=300",
    achievements: "Многократный чемпион мира и олимпийский чемпион",
    fullBio: `
      <p>Илья Александрович Ильин (родился 24 мая 1988 года) — казахстанский тяжелоатлет, двукратный олимпийский чемпион и четырехкратный чемпион мира.</p>
      
      <p>Ильин считается одним из величайших тяжелоатлетов своего поколения. Он выступал в весовых категориях до 94 кг и до 105 кг.</p>
      
      <h3>Достижения:</h3>
      <ul>
        <li>Олимпийский чемпион 2008 года (Пекин)</li>
        <li>Олимпийский чемпион 2012 года (Лондон)</li>
        <li>Чемпион мира 2005, 2006, 2011 и 2014 годов</li>
        <li>Многократный рекордсмен мира</li>
      </ul>
      
      <p>Илья начал заниматься тяжелой атлетикой в раннем возрасте. Его талант был замечен тренерами, и уже в 17 лет он стал чемпионом мира среди взрослых.</p>
      
      <p>Ильин известен своей харизмой и патриотизмом. После побед на международных соревнованиях он всегда с гордостью исполнял гимн Казахстана.</p>
    `,
  },
  {
    id: 3,
    name: "Ольга Рыпакова",
    sport: "Легкая атлетика",
    image: "/placeholder.svg?height=400&width=300",
    achievements: "Олимпийская чемпионка в тройном прыжке",
    fullBio: `
      <p>Ольга Сергеевна Рыпакова (родилась 30 ноября 1984 года) — казахстанская легкоатлетка, специализирующаяся в тройном прыжке. Олимпийская чемпионка, серебряный и бронзовый призер Олимпийских игр.</p>
      
      <h3>Достижения:</h3>
      <ul>
        <li>Олимпийская чемпионка 2012 года (Лондон)</li>
        <li>Серебряный призер Олимпийских игр 2008 года (Пекин)</li>
        <li>Бронзовый призер Олимпийских игр 2016 года (Рио-де-Жанейро)</li>
        <li>Чемпионка мира 2010 года в помещении</li>
        <li>Многократная чемпионка Азии</li>
      </ul>
      
      <p>Ольга начала спортивную карьеру как семиборка, но позже сосредоточилась на тройном прыжке, где достигла наибольших успехов.</p>
      
      <p>Рыпакова является одной из самых титулованных легкоатлеток Казахстана и примером для молодых спортсменов. Она продолжает выступать на высоком уровне, несмотря на возраст.</p>
      
      <p>За свои спортивные достижения Ольга Рыпакова была награждена орденом "Барыс" и другими государственными наградами Казахстана.</p>
    `,
  },
]

// Sport details data
const sportDetails = [
  {
    id: 1,
    title: "Бокс",
    image: "/placeholder.svg?height=300&width=400",
    description: "Казахстанская школа бокса известна во всем мире своими чемпионами",
    fullDescription: `
      <p>Бокс в <span class="text-blue-600">Казахстане</span> имеет богатую историю и традиции. Казахстанская школа бокса считается одной из сильнейших в мире.</p>
      
      <p>На протяжении многих лет казахстанские боксеры демонстрируют высокие результаты на международной арене, завоевывая медали на Олимпийских играх, чемпионатах мира и других престижных соревнованиях.</p>
      
      <h3>Известные боксеры Казахстана:</h3>
      <ul>
        <li>Геннадий Головкин - чемпион мира в среднем весе</li>
        <li>Серик Сапиев - олимпийский чемпион 2012 года</li>
        <li>Бахтияр Артаев - олимпийский чемпион 2004 года</li>
        <li>Василий Жиров - олимпийский чемпион 1996 года</li>
        <li>Данияр Елеусинов - олимпийский чемпион 2016 года</li>
      </ul>
      
      <p>Казахстанская федерация бокса активно развивает этот вид спорта, открывая новые школы и центры подготовки по всей стране. Ежегодно проводятся национальные чемпионаты и международные турниры.</p>
      
      <p>Бокс является одним из приоритетных видов спорта в <span class="text-blue-600">Казахстане</span> и получает значительную поддержку от государства.</p>
    `,
  },
  {
    id: 2,
    title: "Футбол",
    image: "/placeholder.svg?height=300&width=400",
    description: "Развитие футбола и национальной сборной Казахстана",
    fullDescription: `
      <p>Футбол в <span class="text-blue-600">Казахстане</span> активно развивается и становится все более популярным видом спорта. Казахстанская федерация футбола была основана в 1992 году после обретения независимости.</p>
      
      <p>В 2002 году Казахстан перешел из Азиатской конфедерации футбола (AFC) в Европейский футбольный союз (UEFA), что открыло новые возможности для развития этого вида спорта в стране.</p>
      
      <h3>Ключевые футбольные клубы:</h3>
      <ul>
        <li>ФК "Астана" - многократный чемпион Казахстана, участник групповых этапов Лиги Чемпионов и Лиги Европы</li>
        <li>ФК "Кайрат" - один из старейших и титулованных клубов страны</li>
        <li>ФК "Тобол" - чемпион Казахстана</li>
        <li>ФК "Шахтер" Караганда - первый казахстанский клуб, вышедший в групповой этап еврокубков</li>
      </ul>
      
      <p>Национальная сборная <span class="text-blue-600">Казахстана</span> по футболу регулярно участвует в отборочных турнирах чемпионатов мира и Европы. В последние годы команда показывает прогресс, добиваясь положительных результатов в матчах с сильными соперниками.</p>
      
      <p>Развитие детско-юношеского футбола является приоритетным направлением. По всей стране открываются футбольные академии и школы, где молодые таланты получают качественную подготовку.</p>
    `,
  },
  {
    id: 3,
    title: "Борьба",
    image: "/placeholder.svg?height=300&width=400",
    description: "Традиционные и олимпийские виды борьбы в Казахстане",
    fullDescription: `
      <p>Борьба имеет глубокие корни в культуре <span class="text-blue-600">Казахстана</span>. Традиционная казахская борьба "Қазақша күрес" является национальным видом спорта и важной частью культурного наследия.</p>
      
      <p>Помимо национальных видов, в <span class="text-blue-600">Казахстане</span> активно развиваются олимпийские виды борьбы: вольная, греко-римская и женская борьба.</p>
      
      <h3>Достижения казахстанских борцов:</h3>
      <ul>
        <li>Жаксылык Ушкемпиров - первый олимпийский чемпион независимого Казахстана в греко-римской борьбе</li>
        <li>Даулет Турлыханов - серебряный призер Олимпийских игр</li>
        <li>Гюзель Манюрова - серебряный и бронзовый призер Олимпийских игр</li>
        <li>Нурислам Санаев - бронзовый призер Олимпийских игр</li>
      </ul>
      
      <p>Ежегодно в <span class="text-blue-600">Казахстане</span> проводятся международные турниры по различным видам борьбы, в том числе мемориал Каркена Ахметова по греко-римской борьбе и турнир на призы Даулета Турлыханова.</p>
      
      <p>Казахстанская школа борьбы известна своими традициями и методиками подготовки спортсменов высокого класса. Многие тренеры из Казахстана работают в ведущих спортивных центрах мира.</p>
    `,
  },
  {
    id: 4,
    title: "Хоккей",
    image: "/placeholder.svg?height=300&width=400",
    description: "Хоккейные клубы и достижения казахстанских хоккеистов",
    fullDescription: `
      <p>Хоккей с шайбой в <span class="text-blue-600">Казахстане</span> имеет давние традиции. Этот вид спорта начал развиваться еще в советское время и продолжает оставаться популярным в независимом Казахстане.</p>
      
      <p>Национальная сборная <span class="text-blue-600">Казахстана</span> по хоккею регулярно участвует в чемпионатах мира в высшем дивизионе, соревнуясь с сильнейшими командами планеты.</p>
      
      <h3>Ведущие хоккейные клубы:</h3>
      <ul>
        <li>"Барыс" (Астана) - участник Континентальной хоккейной лиги (КХЛ)</li>
        <li>"Сарыарка" (Караганда) - победитель Высшей хоккейной лиги</li>
        <li>"Торпедо" (Усть-Каменогорск) - один из старейших клубов страны</li>
        <li>"Номад" (Астана) - участник Высшей хоккейной лиги</li>
      </ul>
      
      <p>Казахстанские хоккеисты выступают не только в отечественных клубах, но и в ведущих лигах мира, включая НХЛ и КХЛ. Среди известных игроков - Николай Антропов, Евгений Набоков, Ник Антропов.</p>
      
      <p>В <span class="text-blue-600">Казахстане</span> активно развивается детско-юношеский хоккей. Функционируют специализированные школы и академии, где юные спортсмены получают профессиональную подготовку.</p>
      
      <p>Ежегодно в стране проводятся различные хоккейные турниры, включая Кубок Президента Республики Казахстан.</p>
    `,
  },
]

// News data
const newsData = [
  {
    id: 1,
    title: "Казахстанские боксеры завоевали 5 медалей на международном турнире",
    date: "15 марта 2025",
    image: "/placeholder.svg?height=200&width=400",
    category: "Бокс",
    content: `
      <p>Казахстанские боксеры успешно выступили на международном турнире в Польше, завоевав 5 медалей различного достоинства.</p>
      
      <p>Золотые медали в своих весовых категориях выиграли Айбек Оралбай (63,5 кг) и Нурлан Сапарбай (71 кг). Серебряные медали завоевали Темирлан Шадыкул (51 кг) и Саматали Толтаев (60 кг). Бронзовую медаль в весовой категории 80 кг выиграл Ермахан Жакпеков.</p>
      
      <p>Главный тренер сборной <span class="text-blue-600">Казахстана</span> отметил высокий уровень подготовки спортсменов и их нацеленность на результат. По его словам, этот турнир стал важным этапом подготовки к предстоящему чемпионату мира.</p>
      
      <p>Международный турнир в Польше собрал более 150 спортсменов из 20 стран мира. Казахстанская команда была представлена 10 боксерами в различных весовых категориях.</p>
      
      <p>Следующим важным стартом для казахстанских боксеров станет международный турнир серии А, который пройдет в Болгарии в апреле этого года.</p>
    `,
  },
  {
    id: 2,
    title: "ФК 'Астана' вышел в групповой этап Лиги Европы",
    date: "12 марта 2025",
    image: "/placeholder.svg?height=200&width=400",
    category: "Футбол",
    content: `
      <p>Футбольный клуб "Астана" успешно преодолел квалификационные раунды и вышел в групповой этап Лиги Европы УЕФА.</p>
      
      <p>В решающем матче плей-офф раунда казахстанский клуб одержал победу над шведским "Мальме" со счетом 2:1. Голы в составе "Астаны" забили Абат Аймбетов и Марин Томасов.</p>
      
      <p>Это уже пятый выход "Астаны" в групповой этап еврокубков за последние годы, что является рекордом для казахстанских клубов.</p>
      
      <p>Президент Федерации футбола <span class="text-blue-600">Казахстана</span> поздравил команду с этим достижением и отметил важность участия казахстанских клубов в европейских турнирах для развития футбола в стране.</p>
      
      <p>Жеребьевка группового этапа Лиги Европы состоится в ближайшую пятницу. "Астана" может встретиться с такими грандами европейского футбола, как "Манчестер Юнайтед", "Рома", "Лацио" и другими.</p>
      
      <p>Первые матчи группового этапа пройдут в октябре этого года.</p>
    `,
  },
  {
    id: 3,
    title: "Сборная Казахстана по хоккею готовится к чемпионату мира",
    date: "10 марта 2025",
    image: "/placeholder.svg?height=200&width=400",
    category: "Хоккей",
    content: `
      <p>Национальная сборная <span class="text-blue-600">Казахстана</span> по хоккею начала подготовку к предстоящему чемпионату мира, который пройдет в мае в Чехии.</p>
      
      <p>Тренерский штаб во главе с Андреем Скабелкой объявил расширенный состав команды, в который вошли 32 хоккеиста. Среди них игроки "Барыса", а также казахстанские хоккеисты, выступающие в КХЛ и других зарубежных лигах.</p>
      
      <p>В рамках подготовки к чемпионату мира сборная <span class="text-blue-600">Казахстана</span> проведет серию товарищеских матчей с командами Беларуси, Латвии и Франции.</p>
      
      <p>Капитан сборной Роман Старченко отметил высокий уровень конкуренции в команде и нацеленность всех игроков на успешное выступление на чемпионате мира.</p>
      
      <p>На предстоящем чемпионате мира сборная <span class="text-blue-600">Казахстана</span> сыграет в группе B, где ее соперниками будут команды Швеции, Чехии, Финляндии, Норвегии, Латвии, Франции и Австрии.</p>
      
      <p>Задача команды - сохранить прописку в элитном дивизионе и попытаться выйти в четвертьфинал турнира.</p>
    `,
  },
]

const kazakhPatterns = [
  "/placeholder.svg?height=200&width=200", // Placeholder for Kazakh ornament 1
  "/placeholder.svg?height=200&width=200", // Placeholder for Kazakh ornament 2
  "/placeholder.svg?height=200&width=200", // Placeholder for Kazakh ornament 3
]

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedAthlete, setSelectedAthlete] = useState<(typeof athleteBios)[0] | null>(null)
  const [selectedSport, setSelectedSport] = useState<(typeof sportDetails)[0] | null>(null)
  const [selectedNews, setSelectedNews] = useState<(typeof newsData)[0] | null>(null)

  // Refs for animation sections
  const sportsRef = useRef<HTMLDivElement>(null)
  const athletesRef = useRef<HTMLDivElement>(null)
  const newsRef = useRef<HTMLDivElement>(null)
  const eventsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  // Refs for scrolling to sections
  const homeRef = useRef<HTMLDivElement>(null)
  const contactSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Check if elements are in viewport for animations
      const elements = [sportsRef, athletesRef, newsRef, eventsRef, contactRef]
      elements.forEach((ref) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect()
          const isInViewport = rect.top < window.innerHeight - 100

          if (isInViewport) {
            ref.current.classList.add("animate-in")
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Function to scroll to section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 relative mr-2 kazakh-corner-ornament">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Kazakhstan Sports Logo"
                  width={40}
                  height={40}
                  className="relative z-10"
                />
              </div>
              <span className="text-xl font-bold text-blue-700 kazakh-title">KazSport</span>
            </div>

            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection(homeRef)}
                className="text-gray-700 hover:text-blue-700 font-medium transition-colors relative group"
              >
                Главная
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection(sportsRef)}
                className="text-gray-700 hover:text-blue-700 font-medium transition-colors relative group"
              >
                Виды спорта
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection(athletesRef)}
                className="text-gray-700 hover:text-blue-700 font-medium transition-colors relative group"
              >
                Спортсмены
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection(newsRef)}
                className="text-gray-700 hover:text-blue-700 font-medium transition-colors relative group"
              >
                Новости
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection(contactSectionRef)}
                className="text-gray-700 hover:text-blue-700 font-medium transition-colors relative group"
              >
                Контакты
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center relative">
                <input
                  type="text"
                  placeholder="Поиск..."
                  className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute right-3 text-gray-400" size={18} />
              </div>

              <LanguageSelectorComponent />

              <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-gray-700 hover:text-blue-700">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed top-0 right-0 w-64 h-full bg-white z-50 shadow-lg p-4 transition-transform duration-300 kazakh-card-pattern ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-700 to-blue-800 rounded-full flex items-center justify-center mr-2 border-2 border-yellow-400">
                <Flag className="w-4 h-4 text-yellow-400" />
              </div>
              <span className="text-xl font-bold text-blue-700">KazSport</span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Поиск..."
              className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <nav className="space-y-4">
            <button
              onClick={() => scrollToSection(homeRef)}
              className="block text-gray-700 hover:text-blue-700 font-medium transition-colors pl-2 border-l-2 border-transparent hover:border-blue-600 w-full text-left"
            >
              Главная
            </button>
            <button
              onClick={() => scrollToSection(sportsRef)}
              className="block text-gray-700 hover:text-blue-700 font-medium transition-colors pl-2 border-l-2 border-transparent hover:border-blue-600 w-full text-left"
            >
              Виды спорта
            </button>
            <button
              onClick={() => scrollToSection(athletesRef)}
              className="block text-gray-700 hover:text-blue-700 font-medium transition-colors pl-2 border-l-2 border-transparent hover:border-blue-600 w-full text-left"
            >
              Спортсмены
            </button>
            <button
              onClick={() => scrollToSection(newsRef)}
              className="block text-gray-700 hover:text-blue-700 font-medium transition-colors pl-2 border-l-2 border-transparent hover:border-blue-600 w-full text-left"
            >
              Новости
            </button>
            <button
              onClick={() => scrollToSection(contactSectionRef)}
              className="block text-gray-700 hover:text-blue-700 font-medium transition-colors pl-2 border-l-2 border-transparent hover:border-blue-600 w-full text-left"
            >
              Контакты
            </button>
          </nav>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex space-x-4 mb-4">
              <button className="px-4 py-1 text-sm border border-gray-300 rounded-md">RU</button>
              <button className="px-4 py-1 text-sm border border-gray-300 rounded-md">KZ</button>
              <button className="px-4 py-1 text-sm border border-gray-300 rounded-md">EN</button>
            </div>
          </div>

          {/* Казахский орнамент в нижней части меню */}
          <div className="absolute bottom-0 left-0 w-full h-20 kazakh-su opacity-30"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section
        id="home"
        ref={homeRef}
        className="relative h-[90vh] bg-gradient-to-r from-blue-900 to-black overflow-hidden kazakh-landscape"
      >
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Kazakhstan Sports"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Animated flag-like elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-20 bg-blue-600 opacity-20 animate-wave"></div>
          <div className="absolute top-20 left-0 w-full h-20 bg-yellow-400 opacity-20 animate-wave-delayed"></div>
        </div>

        {/* Казахские орнаментальные элементы */}
        <div className="absolute top-10 right-10 w-40 h-40 opacity-30 rotate-12 hidden md:block animate-float-kazakh">
          <div className="w-full h-full kazakh-koshkar-muiiz"></div>
        </div>
        <div className="absolute bottom-10 left-10 w-40 h-40 opacity-30 -rotate-12 hidden md:block animate-float-kazakh">
          <div className="w-full h-full kazakh-baldak"></div>
        </div>

        {/* Shanyrak symbol */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full shanyrak-symbol animate-ornament"></div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 mr-4 relative animate-pulse-kazakh">
                <div className="absolute inset-0 bg-blue-600 rounded-full"></div>
                <div className="absolute inset-0 bg-yellow-400 rounded-full scale-90"></div>
                <Flag className="w-10 h-10 text-blue-900 absolute inset-0 m-auto" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-yellow-400 kazakh-title">Республика Казахстан</h2>
                <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-yellow-400 rounded-full mt-1"></div>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Спортивные команды и лиги <span className="text-blue-400">Казахстана</span>
            </h1>
            <p className="text-xl text-white max-w-2xl mb-8 drop-shadow-md">
              <span className="text-yellow-300 font-semibold">Гордость нации</span>, сила духа и{" "}
              <span className="text-yellow-300 font-semibold">воля к победе</span> – спортивное наследие нашей страны
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection(sportsRef)}
                className="btn-kazakh-ornament px-6 py-3 rounded-md flex items-center font-medium"
              >
                <span className="mr-2">Узнать больше</span>
                <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
                  <ChevronRight size={16} className="text-blue-900" />
                </div>
              </button>
              <button
                onClick={() => scrollToSection(eventsRef)}
                className="btn-kazakh-alt px-6 py-3 rounded-md flex items-center font-medium relative overflow-hidden"
              >
                <span className="mr-2 relative z-10">Календарь событий</span>
                <div className="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center relative z-10">
                  <ChevronRight size={16} className="text-yellow-400" />
                </div>
                <div className="absolute inset-0 kazakh-tuye-taban opacity-20"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-1 h-3 bg-white rounded-full animate-scroll-indicator"></div>
          </div>
        </div>

        {/* Decorative mountains */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
      </section>

      {/* Sports Categories */}
      <section
        id="sports"
        ref={sportsRef}
        className="py-16 bg-gray-50 opacity-0 transition-all duration-1000 transform translate-y-10 kazakh-card-pattern"
      >
        <div className="container mx-auto px-4">
          <SectionHeaderComponent
            title={
              <>
                Виды спорта <span className="text-blue-600">Казахстана</span>
              </>
            }
            subtitle="Узнайте больше о популярных видах спорта в нашей стране"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {sportDetails.map((sport) => (
              <SportCardComponent
                key={sport.id}
                title={sport.title}
                image={sport.image}
                description={sport.description}
                onClick={() => setSelectedSport(sport)}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setSelectedSport(sportDetails[0])}
              className="btn-kazakh-ornament px-6 py-2 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center mx-auto"
            >
              Все виды спорта <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* National Pride Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white overflow-hidden relative kazakh-koshkar-muiiz">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-8 bg-yellow-400 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-full h-8 bg-yellow-400 opacity-20"></div>

          {/* Казахские орнаментальные узоры */}
          <div className="absolute right-0 top-0 w-64 h-full opacity-10">
            <div className="w-full h-full kazakh-kyzgaldak"></div>
          </div>
          <div className="absolute left-0 bottom-0 w-64 h-full opacity-10">
            <div className="w-full h-full kazakh-baldak"></div>
          </div>
        </div>

        {/* National symbol background */}
        <div className="absolute inset-0 national-symbol"></div>

        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mr-3 shadow-lg animate-pulse-kazakh">
                  <Flag className="w-7 h-7 text-blue-900" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold kazakh-title">
                    Гордость <span className="text-yellow-300">Казахстана</span>
                  </h2>
                  <div className="h-1 w-32 bg-gradient-to-r from-yellow-400 to-transparent rounded-full mt-1"></div>
                </div>
              </div>
              <p className="text-lg max-w-xl">
                Наши спортсмены представляют страну на международной арене, демонстрируя{" "}
                <span className="text-yellow-300 font-semibold">силу духа</span> и{" "}
                <span className="text-yellow-300 font-semibold">волю к победе</span>
              </p>
              <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                <span className="px-3 py-1 bg-blue-800 rounded-full text-sm font-medium border border-yellow-400">
                  Олимпийские чемпионы
                </span>
                <span className="px-3 py-1 bg-blue-800 rounded-full text-sm font-medium border border-yellow-400">
                  Мировые рекордсмены
                </span>
                <span className="px-3 py-1 bg-blue-800 rounded-full text-sm font-medium border border-yellow-400">
                  Национальные герои
                </span>
              </div>
            </div>
            <button
              onClick={() => scrollToSection(athletesRef)}
              className="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 font-bold px-8 py-4 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center border-2 border-yellow-300 group"
            >
              <span className="mr-2 relative z-10">Национальная сборная</span>
              <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center relative z-10 group-hover:bg-blue-800 transition-colors">
                <ChevronRight size={20} className="text-yellow-400" />
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-500 to-yellow-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <div className="absolute inset-0 kazakh-tuye-taban opacity-20"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Athletes */}
      <section
        id="athletes"
        ref={athletesRef}
        className="py-16 bg-white opacity-0 transition-all duration-1000 transform translate-y-10"
      >
        <div className="container mx-auto px-4">
          <SectionHeaderComponent
            title={
              <>
                Выдающиеся спортсмены <span className="text-blue-600">Казахстана</span>
              </>
            }
            subtitle="Гордость казахстанского спорта"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {athleteBios.map((athlete) => (
              <AthleteCardComponent
                key={athlete.id}
                name={athlete.name}
                sport={athlete.sport}
                image={athlete.image}
                achievements={athlete.achievements}
                onClick={() => setSelectedAthlete(athlete)}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setSelectedAthlete(athleteBios[0])}
              className="btn-kazakh-ornament px-6 py-2 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center mx-auto"
            >
              Все спортсмены <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section
        id="news"
        ref={newsRef}
        className="py-16 bg-gray-50 opacity-0 transition-all duration-1000 transform translate-y-10 kazakh-card-pattern"
      >
        <div className="container mx-auto px-4">
          <SectionHeaderComponent
            title={
              <>
                Последние новости спорта <span className="text-blue-600">Казахстана</span>
              </>
            }
            subtitle="Будьте в курсе последних событий в мире казахстанского спорта"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {newsData.map((news) => (
              <NewsCardComponent
                key={news.id}
                title={news.title}
                date={news.date}
                image={news.image}
                category={news.category}
                onClick={() => setSelectedNews(news)}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setSelectedNews(newsData[0])}
              className="btn-kazakh-ornament px-6 py-2 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center mx-auto"
            >
              Все новости <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section
        id="events"
        ref={eventsRef}
        className="py-16 bg-gradient-to-r from-blue-800 to-blue-900 text-white opacity-0 transition-all duration-1000 transform translate-y-10 relative overflow-hidden kazakh-baldak"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-12 bg-yellow-400 opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-12 bg-yellow-400 opacity-10"></div>

          {/* Казахские орнаментальные узоры */}
          <div className="absolute left-0 top-0 w-full h-full opacity-5">
            <div className="grid grid-cols-3 gap-4">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-full h-40 flex items-center justify-center">
                  <div className="w-full h-full kazakh-koshkar-muiiz"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative">
          <SectionHeaderComponent
            title={
              <>
                Предстоящие события в <span className="text-yellow-300">Казахстане</span>
              </>
            }
            subtitle="Не пропустите важные спортивные мероприятия"
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <EventCard title="Чемпионат Казахстана по боксу" date="5-12 апреля 2025" location="Алматы" />
            <EventCard title="Матч ФК 'Астана' - ФК 'Кайрат'" date="18 апреля 2025" location="Астана" />
            <EventCard title="Международный турнир по борьбе" date="22-25 апреля 2025" location="Шымкент" />
            <EventCard title="Хоккей: Казахстан - Беларусь" date="30 апреля 2025" location="Астана" />
          </div>
        </div>
      </section>

      {/* Contact & Subscribe */}
      <section
        id="contact"
        ref={contactSectionRef}
        className="py-16 bg-white opacity-0 transition-all duration-1000 transform translate-y-10"
      >
        <div className="container mx-auto px-4" ref={contactRef}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="kazakh-container p-6">
              <h2 className="text-3xl font-bold mb-6 kazakh-title">Свяжитесь с нами</h2>
              <p className="text-gray-600 mb-8">
                Есть вопросы или предложения? Напишите нам, и мы обязательно ответим.
              </p>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Имя
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Тема
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Сообщение
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="btn-kazakh-ornament px-6 py-2 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center"
                >
                  Отправить
                </button>
              </form>
            </div>

            <div className="kazakh-container p-6">
              <h2 className="text-3xl font-bold mb-6 kazakh-title">Подпишитесь на новости</h2>
              <p className="text-gray-600 mb-8">
                Получайте последние новости и обновления о спортивных событиях в{" "}
                <span className="text-blue-600">Казахстане</span>.
              </p>

              <div className="flex mb-8">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="btn-kazakh px-6 py-2 rounded-r-md transition-all duration-300 transform hover:scale-105">
                  Подписаться
                </button>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-600 kazakh-corner-ornament">
                <h3 className="text-xl font-semibold mb-4">Контактная информация</h3>
                <div className="space-y-3 kazakh-list">
                  <p className="flex items-center">
                    <span className="font-medium mr-2">Адрес:</span>
                    <span className="text-gray-600">г. Астана, пр. Туран, 18</span>
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium mr-2">Телефон:</span>
                    <span className="text-gray-600">+7 (7172) 12-34-56</span>
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium mr-2">Email:</span>
                    <span className="text-gray-600">info@kazsport.kz</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-black text-white py-12 relative overflow-hidden kazakh-koshkar-muiiz">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-8 bg-yellow-400 opacity-10"></div>

          {/* Казахские орнаментальные узоры */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-full h-40 flex items-center justify-center">
                  <div className="w-full h-full kazakh-baldak"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-700 to-blue-800 rounded-full flex items-center justify-center mr-3 border-2 border-yellow-400 shadow-lg">
                  <Flag className="w-7 h-7 text-yellow-400" />
                </div>
                <div>
                  <span className="text-xl font-bold kazakh-title">KazSport</span>
                  <div className="h-0.5 w-20 bg-gradient-to-r from-yellow-400 to-transparent rounded-full mt-1"></div>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Ваш надежный источник информации о спортивных командах и лигах{" "}
                <span className="text-blue-400">Казахстана</span>.
              </p>
              <div className="flex space-x-4">
                <SocialIcon name="facebook" />
                <SocialIcon name="twitter" />
                <SocialIcon name="instagram" />
                <SocialIcon name="youtube" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                Виды спорта
              </h3>
              <ul className="space-y-2 kazakh-list">
                <FooterLink href="#" onClick={() => setSelectedSport(sportDetails[1])}>
                  Футбол
                </FooterLink>
                <FooterLink href="#" onClick={() => setSelectedSport(sportDetails[0])}>
                  Бокс
                </FooterLink>
                <FooterLink href="#" onClick={() => setSelectedSport(sportDetails[2])}>
                  Борьба
                </FooterLink>
                <FooterLink href="#" onClick={() => setSelectedSport(sportDetails[3])}>
                  Хоккей
                </FooterLink>
                <FooterLink href="#">Легкая атлетика</FooterLink>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                Быстрые ссылки
              </h3>
              <ul className="space-y-2 kazakh-list">
                <FooterLink href="#" onClick={() => scrollToSection(homeRef)}>
                  О нас
                </FooterLink>
                <FooterLink href="#" onClick={() => scrollToSection(newsRef)}>
                  Новости
                </FooterLink>
                <FooterLink href="#" onClick={() => scrollToSection(eventsRef)}>
                  События
                </FooterLink>
                <FooterLink href="#">Галерея</FooterLink>
                <FooterLink href="#" onClick={() => scrollToSection(contactSectionRef)}>
                  Контакты
                </FooterLink>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                Правовая информация
              </h3>
              <ul className="space-y-2 kazakh-list">
                <FooterLink href="#">Условия использования</FooterLink>
                <FooterLink href="#">Политика конфиденциальности</FooterLink>
                <FooterLink href="#">Правила сайта</FooterLink>
                <FooterLink href="#">Карта сайта</FooterLink>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="px-4 py-1 bg-gradient-to-r from-blue-800 to-blue-900 rounded-full flex items-center border border-yellow-400 shadow-md">
                <span className="text-yellow-400 mr-2 font-medium">Республика Казахстан</span>
                <Flag className="w-4 h-4 text-yellow-400" />
              </div>
            </div>
            <p className="text-gray-400">&copy; {new Date().getFullYear()} KazSport. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Athlete Biography Modal */}
      {selectedAthlete && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative modal-kazakh kazakh-card-pattern">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-blue-800"></div>
            <div className="absolute top-2 left-0 w-full h-1 bg-yellow-400"></div>

            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-800 rounded-full flex items-center justify-center mr-3 border-2 border-yellow-400 shadow-md">
                  <Flag className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-blue-800 kazakh-title">{selectedAthlete.name}</h2>
                  <div className="h-0.5 w-24 bg-gradient-to-r from-blue-600 to-transparent rounded-full mt-1"></div>
                </div>
              </div>
              <button
                onClick={() => setSelectedAthlete(null)}
                className="text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="rounded-lg overflow-hidden border-4 border-blue-100 shadow-md kazakh-image-frame">
                    <Image
                      src={selectedAthlete.image || "/placeholder.svg"}
                      alt={selectedAthlete.name}
                      width={300}
                      height={400}
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center mb-2">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {selectedAthlete.sport}
                      </span>
                      <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold flex items-center">
                        <Flag className="w-3 h-3 mr-1" />
                        Казахстан
                      </span>
                    </div>
                    <div className="mt-2 p-3 bg-gray-50 rounded-md border-l-2 border-blue-600 kazakh-corner-ornament">
                      <h4 className="text-sm font-semibold text-gray-700 mb-1">Достижения:</h4>
                      <p className="text-gray-700">{selectedAthlete.achievements}</p>
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: selectedAthlete.fullBio }} />
                </div>
              </div>
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-end">
              <button onClick={() => setSelectedAthlete(null)} className="btn-kazakh-ornament px-6 py-2 rounded-md">
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sport Details Modal */}
      {selectedSport && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative modal-kazakh kazakh-card-pattern">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-blue-800"></div>
            <div className="absolute top-2 left-0 w-full h-1 bg-yellow-400"></div>

            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-800 rounded-full flex items-center justify-center mr-3 border-2 border-yellow-400 shadow-md">
                  <Flag className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-blue-800 kazakh-title">{selectedSport.title}</h2>
                  <div className="h-0.5 w-24 bg-gradient-to-r from-blue-600 to-transparent rounded-full mt-1"></div>
                </div>
              </div>
              <button
                onClick={() => setSelectedSport(null)}
                className="text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-6">
                <div className="rounded-lg overflow-hidden border-4 border-blue-100 relative shadow-md kazakh-image-frame">
                  <Image
                    src={selectedSport.image || "/placeholder.svg"}
                    alt={selectedSport.title}
                    width={800}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-blue-700 text-white px-4 py-2 rounded-bl-lg shadow-md">
                    <div className="flex items-center">
                      <Flag className="w-4 h-4 mr-1 text-yellow-400" />
                      <span className="font-bold">Казахстан</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedSport.fullDescription }}
                  />
                </div>
              </div>
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-end">
              <button onClick={() => setSelectedSport(null)} className="btn-kazakh-ornament px-6 py-2 rounded-md">
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* News Details Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative modal-kazakh kazakh-card-pattern">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-blue-800"></div>
            <div className="absolute top-2 left-0 w-full h-1 bg-yellow-400"></div>

            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <div>
                <div className="flex items-center mb-2">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mr-2">
                    {selectedNews.category}
                  </span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold flex items-center">
                    <Flag className="w-3 h-3 mr-1" />
                    Казахстан
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-blue-800 kazakh-title">{selectedNews.title}</h2>
                  <div className="h-0.5 w-24 bg-gradient-to-r from-blue-600 to-transparent rounded-full mt-1"></div>
                </div>
              </div>
              <button
                onClick={() => setSelectedNews(null)}
                className="text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-6">
                <div className="rounded-lg overflow-hidden border-4 border-blue-100 relative shadow-md kazakh-image-frame">
                  <Image
                    src={selectedNews.image || "/placeholder.svg"}
                    alt={selectedNews.title}
                    width={800}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-blue-700 text-white px-4 py-2 rounded-bl-lg shadow-md">
                    <div className="flex items-center">
                      <Flag className="w-4 h-4 mr-1 text-yellow-400" />
                      <span className="font-bold">Казахстан</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mb-4 flex items-center bg-gray-50 p-2 rounded-md">
                  <span className="mr-2 font-medium">Опубликовано:</span>
                  <span className="font-semibold">{selectedNews.date}</span>
                </div>
                <div>
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: selectedNews.content }} />
                </div>
              </div>
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-end">
              <button onClick={() => setSelectedNews(null)} className="btn-kazakh-ornament px-6 py-2 rounded-md">
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Component for language selector
function LanguageSelectorComponent() {
  return (
    <div className="relative group">
      <button className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-700">
        <span>RU</span>
        <ChevronDown size={16} className="ml-1" />
      </button>
      <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 kazakh-card-pattern">
        <button className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-blue-50 hover:text-blue-700">
          KZ
        </button>
        <button className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-blue-50 hover:text-blue-700">
          EN
        </button>
      </div>
    </div>
  )
}

// Component for section headers
function SectionHeaderComponent({
  title,
  subtitle,
  light = false,
}: {
  title: React.ReactNode
  subtitle: string
  light?: boolean
}) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h2 className={`text-3xl font-bold mb-4 ${light ? "text-white" : "text-gray-900"} kazakh-title`}>{title}</h2>
      <div className="kazakh-divider w-32 mx-auto mb-4"></div>
      <p className={`${light ? "text-gray-200" : "text-gray-600"} text-lg`}>{subtitle}</p>
    </div>
  )
}

// Component for sport cards
function SportCardComponent({
  title,
  image,
  description,
  onClick,
}: {
  title: string
  image: string
  description: string
  onClick: () => void
}) {
  return (
    <div
      className="card-kazakh bg-white overflow-hidden transition-all duration-300 cursor-pointer group kazakh-corner-ornament"
      onClick={onClick}
    >
      <div className="h-48 overflow-hidden relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={400}
          height={300}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-blue-700 text-white px-3 py-1 rounded-bl-lg shadow-md">
          <div className="flex items-center">
            <Flag className="w-3 h-3 mr-1 text-yellow-400" />
            <span className="text-sm font-medium">Казахстан</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 text-white">
            <p className="font-medium">{description}</p>
          </div>
        </div>
      </div>
      <div className="p-6 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-transparent"></div>
        <h3 className="text-xl font-bold mb-2 text-blue-800 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <button className="inline-flex items-center text-blue-700 font-medium hover:text-blue-800 transition-colors">
          <span className="border-b border-transparent group-hover:border-blue-700 transition-colors">Подробнее</span>
          <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}

// Component for athlete cards
function AthleteCardComponent({
  name,
  sport,
  image,
  achievements,
  onClick,
}: {
  name: string
  sport: string
  image: string
  achievements: string
  onClick: () => void
}) {
  return (
    <div
      className="card-kazakh bg-white overflow-hidden transition-all duration-300 cursor-pointer group kazakh-corner-ornament"
      onClick={onClick}
    >
      <div className="h-64 overflow-hidden relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={300}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-500 to-yellow-600 text-blue-900 px-3 py-1 rounded-bl-lg shadow-md">
          <div className="flex items-center">
            <Flag className="w-3 h-3 mr-1 text-blue-900" />
            <span className="text-sm font-bold">Казахстан</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 text-white">
            <p className="font-medium">{achievements}</p>
          </div>
        </div>
      </div>
      <div className="p-6 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-transparent"></div>
        <div className="flex items-center mb-3">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mr-2">
            {sport}
          </span>
          <div className="h-0.5 flex-grow bg-gradient-to-r from-blue-200 to-transparent"></div>
        </div>
        <h3 className="text-xl font-bold mb-2 text-blue-800 group-hover:text-blue-600 transition-colors">{name}</h3>
        <button className="inline-flex items-center text-blue-700 font-medium hover:text-blue-800 transition-colors">
          <span className="border-b border-transparent group-hover:border-blue-700 transition-colors">Биография</span>
          <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}

// Component for news cards
function NewsCardComponent({
  title,
  date,
  image,
  category,
  onClick,
}: {
  title: string
  date: string
  image: string
  category: string
  onClick: () => void
}) {
  return (
    <div
      className="card-kazakh bg-white overflow-hidden transition-all duration-300 cursor-pointer group kazakh-corner-ornament"
      onClick={onClick}
    >
      <div className="h-48 overflow-hidden relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={400}
          height={200}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-blue-700 text-white px-3 py-1 rounded-bl-lg shadow-md">
          <div className="flex items-center">
            <Flag className="w-3 h-3 mr-1 text-yellow-400" />
            <span className="text-sm font-medium">Казахстан</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 text-white">
            <p className="font-medium">
              {category} • {date}
            </p>
          </div>
        </div>
      </div>
      <div className="p-6 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-transparent"></div>
        <div className="flex justify-between items-center mb-3">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {category}
          </span>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-blue-800 group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>
        <button className="inline-flex items-center text-blue-700 font-medium hover:text-blue-800 transition-colors">
          <span className="border-b border-transparent group-hover:border-blue-700 transition-colors">
            Читать далее
          </span>
          <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}

// Component for event cards
function EventCard({
  title,
  date,
  location,
}: {
  title: string
  date: string
  location: string
}) {
  return (
    <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg p-6 transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:-translate-y-2 border-l-4 border-yellow-400 relative overflow-hidden group kazakh-corner-ornament">
      <div className="absolute top-0 right-0 w-16 h-16">
        <div className="absolute transform rotate-45 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold py-1 text-xs text-center w-24 top-3 right-[-20px] shadow-md">
          Казахстан
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10">
        <div className="w-full h-full kazakh-koshkar-muiiz"></div>
      </div>

      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-300 transition-colors">{title}</h3>
      <div className="space-y-2 text-gray-200">
        <p className="flex items-center">
          <span className="font-medium mr-2 text-yellow-300">Дата:</span>
          <span>{date}</span>
        </p>
        <p className="flex items-center">
          <span className="font-medium mr-2 text-yellow-300">Место:</span>
          <span>{location}</span>
        </p>
      </div>
      <button className="mt-4 inline-flex items-center text-white font-medium hover:text-yellow-300 transition-colors">
        <span className="border-b border-transparent group-hover:border-yellow-300 transition-colors">Подробнее</span>
        <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
      </button>

      {/* Decorative corner */}
      <div className="absolute bottom-0 left-0 w-8 h-8">
        <div className="absolute bottom-0 left-0 w-0 h-0 border-l-8 border-b-8 border-yellow-400 opacity-30"></div>
      </div>
    </div>
  )
}

// Component for social icons
function SocialIcon({ name }: { name: string }) {
  return (
    <button className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-800 to-blue-900 flex items-center justify-center hover:from-yellow-500 hover:to-yellow-600 hover:text-blue-900 transition-all duration-300 border border-yellow-400 text-yellow-400 shadow-md transform hover:scale-110">
      <span className="sr-only">{name}</span>
      {/* Icon would go here */}
    </button>
  )
}

// Component for footer links
function FooterLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <li>
      <button
        onClick={onClick}
        className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center group w-full text-left"
      >
        <span className="w-0 h-0.5 bg-yellow-400 transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-1"></span>
        <span className="border-b border-transparent group-hover:border-yellow-400 transition-colors">{children}</span>
      </button>
    </li>
  )
}

