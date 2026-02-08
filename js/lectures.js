const lectures = [
  {
    id: 1,
    title: "Вступ до стеганографії",
    description: "Історія, основні поняття та класифікація методів приховування інформації.",
    duration: "2 год",
    badge: "new",
    overview: "У цій лекції ми розглянемо основи стеганографії — мистецтва приховування самого факту передачі інформації. Від давньогрецьких воскових табличок до сучасних цифрових методів — стеганографія пройшла довгий шлях розвитку.",
    overviewExtra: "Ви дізнаєтесь про історію стеганографії, базову термінологію та модель стегосистеми, класифікацію методів за типом носія та доменом вбудовування, а також ключові відмінності між стеганографією та криптографією.",
    topics: [
      { title: "Історія стеганографії", desc: "Розвиток стеганографії від давніх часів через середньовіччя та світові війни до сучасної цифрової ери" },
      { title: "Основні поняття та термінологія", desc: "Базові терміни, модель стеганосистеми, учасники комунікації, ключові метрики" },
      { title: "Класифікація стеганографічних методів", desc: "Категорії методів: за носієм, доменом вбудовування, можливістю витягування, адаптивністю" },
      { title: "Стеганографія vs Криптографія", desc: "Порівняння підходів, відмінності в цілях та моделях безпеки, поєднання обох технологій" }
    ],
    conspect: "lectures/konspekt1.html",
    presentations: [
      { title: "Тема 1.1 — Історія стеганографії", desc: "Від давніх часів до цифрової ери", url: "slides/1-1/tema1.html" },
      { title: "Тема 1.2 — Основні поняття та термінологія", desc: "Модель стегосистеми, учасники, метрики", url: "slides/1-1/tema2.html" },
      { title: "Тема 1.3 — Класифікація методів", desc: "За носієм, доменом, адаптивністю", url: "slides/1-1/tema3.html" },
      { title: "Тема 1.4 — Стеганографія vs Криптографія", desc: "Порівняння підходів та поєднання технологій", url: "slides/1-1/tema4.html" }
    ]
  },
  {
    id: 2,
    title: "Математичні основи стеганографії",
    description: "Теорія інформації, ентропія, статистичні методи та моделі безпеки.",
    duration: "2 год",
    badge: "new",
    overview: "У цій лекції ми розглянемо математичний фундамент стеганографії. Теорія інформації Шеннона дає нам інструменти для аналізу ємності прихованих каналів та оцінки безпеки стегосистем.",
    overviewExtra: "Ви дізнаєтесь про ентропію та надлишковість цифрових носіїв, статистичні характеристики контейнерів, марківські моделі, а також моделі безпеки стегосистем — від інформаційно-теоретичної безпеки до ε-безпеки.",
    topics: [
      { title: "Теорія інформації", desc: "Теорія Шеннона, ентропія, спільна та умовна ентропія, взаємна інформація" },
      { title: "Ентропія та надлишковість", desc: "Надлишковість у цифрових носіях, типи надлишковості, експлуатація для стеганографії" },
      { title: "Статистичні характеристики", desc: "Статистичні моделі контейнерів, марківські моделі, закон квадратного кореня" },
      { title: "Моделі безпеки", desc: "Інформаційно-теоретична безпека, модель Кашина, KL-дивергенція, ε-безпека" }
    ],
    conspect: "lectures/konspekt2.html",
    presentations: [
      { title: "Тема 2.1 — Теорія інформації", desc: "Ентропія Шеннона, взаємна інформація", url: "slides/1-2/tema1.html" },
      { title: "Тема 2.2 — Ентропія та надлишковість", desc: "Типи надлишковості у цифрових носіях", url: "slides/1-2/tema2.html" },
      { title: "Тема 2.3 — Статистичні характеристики", desc: "Марківські моделі, закон квадратного кореня", url: "slides/1-2/tema3.html" },
      { title: "Тема 2.4 — Моделі безпеки", desc: "KL-дивергенція, ε-безпека", url: "slides/1-2/tema4.html" }
    ]
  },
  {
    id: 3,
    title: "Принципи побудови стегосистем",
    description: "Архітектура стегосистем, вимоги та методологія проектування.",
    duration: "2 год",
    badge: "new",
    overview: "У цій лекції ми розглянемо принципи побудови стеганографічних систем — від визначення вимог до тестування та валідації готових рішень.",
    overviewExtra: "Ви дізнаєтесь про компоненти та архітектурні патерни стегосистем, функціональні та нефункціональні вимоги, етапи розробки, вибір контейнерів та алгоритми генерації ключів.",
    topics: [
      { title: "Архітектура стегосистем", desc: "Визначення, компоненти, ролі учасників та архітектурні патерни стеганографічних систем" },
      { title: "Вимоги до стегосистем", desc: "Функціональні та нефункціональні вимоги, компроміси між основними характеристиками" },
      { title: "Методологія проектування", desc: "Етапи розробки, вибір контейнерів, алгоритми генерації ключів, тестування та валідація" }
    ],
    conspect: "lectures/konspekt3.html",
    presentations: [
      { title: "Тема 3.1 — Архітектура стегосистем", desc: "Компоненти, ролі, архітектурні патерни", url: "slides/1-3/tema1.html" },
      { title: "Тема 3.2 — Вимоги до стегосистем", desc: "Функціональні та нефункціональні вимоги", url: "slides/1-3/tema2.html" },
      { title: "Тема 3.3 — Методологія проектування", desc: "Етапи розробки, тестування, валідація", url: "slides/1-3/tema3.html" }
    ]
  },
  {
    id: 4,
    title: "Фундаментальні компроміси стеганографії",
    description: "Трикутник компромісів: ємність, непомітність, стійкість.",
    duration: "2 год",
    badge: "new",
    overview: "У цій лекції ми розглянемо фундаментальні обмеження та компроміси, з якими стикається будь-яка стеганографічна система. Неможливо одночасно максимізувати ємність, непомітність та стійкість.",
    overviewExtra: "Ви дізнаєтесь про інформаційно-теоретичні обмеження, статистичні межі виявлення, обчислювальну асиметрію між вбудовуванням та виявленням, а також трикутник ємність-непомітність-стійкість.",
    topics: [
      { title: "Інформаційно-теоретичні обмеження", desc: "Пропускна здатність стегоканалу, теорема Шеннона в контексті стеганографії" },
      { title: "Статистичні межі виявлення", desc: "Критерій Качина, ROC-криві для стегоаналізу, парадокс досконалої стеганографії" },
      { title: "Обчислювальні обмеження", desc: "Складність вбудовування vs складність виявлення, асиметрія обчислювальних ресурсів" },
      { title: "Фундаментальні компроміси", desc: "Трикутник ємність-непомітність-стійкість, теорема про неможливість, оптимальні точки" }
    ],
    conspect: "lectures/konspekt4.html",
    presentations: [
      { title: "Тема 4.1 — Інформаційно-теоретичні обмеження", desc: "Пропускна здатність стегоканалу", url: "slides/1-4/tema1.html" },
      { title: "Тема 4.2 — Статистичні межі виявлення", desc: "ROC-криві, парадокс досконалої стеганографії", url: "slides/1-4/tema2.html" },
      { title: "Тема 4.3 — Обчислювальні обмеження", desc: "Асиметрія обчислювальних ресурсів", url: "slides/1-4/tema3.html" },
      { title: "Тема 4.4 — Фундаментальні компроміси", desc: "Трикутник ємність-непомітність-стійкість", url: "slides/1-4/tema4.html" }
    ]
  },
  {
    id: 5,
    title: "LSB стеганографія",
    description: "Метод найменшого значущого біта та його варіації.",
    duration: "2 год",
    badge: "new",
    overview: "У цій лекції ми розглянемо LSB (Least Significant Bit) стеганографію — найпоширеніший та найпростіший метод приховування інформації в цифрових зображеннях.",
    overviewExtra: "Ви дізнаєтесь про принцип найменшого значущого біта, алгоритми вбудовування (послідовний, псевдовипадковий, багатобітовий LSB), метрики якості стего-зображень (MSE, PSNR, SSIM) та методи стегоаналізу LSB.",
    topics: [
      { title: "Основи LSB методу", desc: "Принцип найменшого значущого біта, бітові площини зображень, RGB канали та їх особливості" },
      { title: "Алгоритми вбудовування", desc: "Послідовний LSB, псевдовипадковий з ключем, багатобітовий LSB та техніка 3-3-2" },
      { title: "Метрики якості", desc: "Оцінка якості стего-зображень: MSE, PSNR, SSIM — формули, інтерпретація та порівняння" },
      { title: "Стегоаналіз LSB", desc: "Методи виявлення LSB стеганографії: хі-квадрат атака, RS-аналіз, візуальний та гістограмний аналіз" }
    ],
    conspect: "lectures/konspekt5.html",
    presentations: [
      { title: "Тема 5.1 — Основи LSB методу", desc: "Бітові площини, RGB канали", url: "slides/1-5/tema1.html" },
      { title: "Тема 5.2 — Алгоритми вбудовування", desc: "Послідовний, псевдовипадковий, багатобітовий LSB", url: "slides/1-5/tema2.html" },
      { title: "Тема 5.3 — Метрики якості", desc: "MSE, PSNR, SSIM", url: "slides/1-5/tema3.html" },
      { title: "Тема 5.4 — Стегоаналіз LSB", desc: "Хі-квадрат атака, RS-аналіз", url: "slides/1-5/tema4.html" }
    ]
  },
  {
    id: 6,
    title: "Частотні методи стеганографії",
    description: "DCT, DWT, розширення спектру та квантова індексна модуляція.",
    duration: "2 год",
    badge: "new",
    overview: "У цій лекції ми розглянемо методи стеганографії в частотній області — більш стійкі та складні для виявлення порівняно з просторовими методами.",
    overviewExtra: "Ви дізнаєтесь про стеганографію на основі DCT (JSteg, OutGuess, F5), DWT-методи з багатомасштабним аналізом, методи розширення спектру (DSSS, FHSS) та квантову індексну модуляцію (QIM, DC-QIM).",
    topics: [
      { title: "Методи на основі DCT", desc: "Стеганографія в JPEG: дискретне косинусне перетворення, JSteg, OutGuess, F5" },
      { title: "Методи на основі DWT", desc: "Дискретне вейвлет-перетворення: багатомасштабний аналіз, типи вейвлетів, вбудовування" },
      { title: "Розширення спектру", desc: "Методи Spread Spectrum: DSSS, FHSS, псевдовипадкові послідовності, кореляційне детектування" },
      { title: "Квантова індексна модуляція", desc: "QIM методи: принципи квантування, dither модуляція, DC-QIM, порівняння з LSB" }
    ],
    conspect: "lectures/konspekt6.html",
    presentations: [
      { title: "Тема 6.1 — Методи на основі DCT", desc: "JSteg, OutGuess, F5", url: "slides/1-6/tema1.html" },
      { title: "Тема 6.2 — Методи на основі DWT", desc: "Багатомасштабний аналіз, вейвлети", url: "slides/1-6/tema2.html" },
      { title: "Тема 6.3 — Розширення спектру", desc: "DSSS, FHSS, кореляційне детектування", url: "slides/1-6/tema3.html" },
      { title: "Тема 6.4 — Квантова індексна модуляція", desc: "QIM, DC-QIM, dither модуляція", url: "slides/1-6/tema4.html" }
    ]
  },
  {
    id: 7,
    title: "Адаптивні методи стеганографії",
    description: "HUGO, WOW, S-UNIWARD та інші сучасні адаптивні методи.",
    duration: "2 год",
    badge: "new",
    overview: "У цій лекції ми розглянемо сучасні адаптивні методи стеганографії, які мінімізують ймовірність виявлення шляхом вбудовування інформації у найменш помітні ділянки зображення.",
    overviewExtra: "Ви дізнаєтесь про HUGO (Highly Undetectable steGO), WOW (Wavelet Obtained Weights), S-UNIWARD та інші методи, що використовують аналіз локальної складності для вибору оптимальних позицій вбудовування.",
    topics: [
      { title: "HUGO — Highly Undetectable steGO", desc: "Адаптивний метод на основі аналізу локальної складності: принципи, алгоритм, стійкість" },
      { title: "WOW — Wavelet Obtained Weights", desc: "Вейвлет-орієнтований метод з адаптивним визначенням вагових коефіцієнтів" },
      { title: "S-UNIWARD", desc: "Універсальний метод на основі вейвлет-спотворень: багаторівнева декомпозиція" },
      { title: "Порівняльний аналіз методів", desc: "Оцінка та порівняння адаптивних методів: метрики безпеки, швидкодія" }
    ],
    conspect: "lectures/konspekt7.html",
    presentations: [
      { title: "Тема 7.1 — HUGO", desc: "Аналіз локальної складності, алгоритм", url: "slides/1-7/tema1.html" },
      { title: "Тема 7.2 — WOW", desc: "Вейвлет-орієнтовані вагові коефіцієнти", url: "slides/1-7/tema2.html" },
      { title: "Тема 7.3 — S-UNIWARD", desc: "Багаторівнева вейвлет-декомпозиція", url: "slides/1-7/tema3.html" },
      { title: "Тема 7.4 — Порівняльний аналіз", desc: "Метрики безпеки, швидкодія", url: "slides/1-7/tema4.html" }
    ]
  },
  {
    id: 8,
    title: "Стегоаналіз зображень",
    description: "Методи виявлення прихованої інформації в цифрових зображеннях.",
    duration: "2 год",
    badge: "new",
    overview: "У цій лекції ми розглянемо стегоаналіз — науку про виявлення прихованої інформації. Стегоаналіз є зворотною стороною стеганографії та критично важливий для оцінки безпеки стегосистем.",
    overviewExtra: "Ви дізнаєтесь про візуальний стегоаналіз, виявлення вбудовування в DCT та DWT, розширені моделі ознак (SRM, SPAM), а також ML-класифікатори та CNN-детектори для автоматичного стегоаналізу.",
    topics: [
      { title: "Вступ та візуальний стегоаналіз", desc: "Основи стегоаналізу: типи атак, моделі противника, візуальні методи" },
      { title: "Стегоаналіз частотних методів", desc: "Виявлення вбудовування в DCT та DWT: калібраційні техніки, аномалії" },
      { title: "Розширені моделі ознак", desc: "SRM, SPAM та інші багаті моделі: екстракція ознак, високорозмірні простори" },
      { title: "ML-класифікатори та метрики", desc: "Машинне навчання в стегоаналізі: ensemble класифікатори, CNN-детектори" }
    ],
    conspect: "lectures/konspekt8.html",
    presentations: [
      { title: "Тема 8.1 — Візуальний стегоаналіз", desc: "Типи атак, моделі противника", url: "slides/1-8/tema1.html" },
      { title: "Тема 8.2 — Стегоаналіз частотних методів", desc: "Калібраційні техніки, аномалії", url: "slides/1-8/tema2.html" },
      { title: "Тема 8.3 — Розширені моделі ознак", desc: "SRM, SPAM, високорозмірні простори", url: "slides/1-8/tema3.html" },
      { title: "Тема 8.4 — ML-класифікатори", desc: "Ensemble класифікатори, CNN-детектори", url: "slides/1-8/tema4.html" }
    ]
  },
  {
    id: 9,
    title: "Аудіо стеганографія",
    description: "LSB, фазове кодування, розширення спектру та echo hiding.",
    duration: "2 год",
    badge: "new",
    overview: "У цій лекції ми розглянемо методи приховування інформації в аудіосигналах. Аудіо стеганографія використовує особливості людського слуху для непомітного вбудовування даних.",
    overviewExtra: "Ви дізнаєтесь про LSB-методи в аудіо, фазове кодування з FFT-перетворенням, методи розширення спектру з кореляційним декодуванням, а також echo hiding — приховування через ехо-сигнали з кепстральним аналізом.",
    topics: [
      { title: "LSB методи в аудіо", desc: "Приховування у найменших значущих бітах аудіо: формати WAV/PCM, ємність, перцептивна якість" },
      { title: "Фазове кодування", desc: "Модуляція фази аудіосигналу: FFT перетворення, фазові зсуви, синхронізація декодера" },
      { title: "Розширення спектру", desc: "Методи розширення спектру в аудіо: псевдовипадкові послідовності, кореляційне декодування" },
      { title: "Echo Hiding", desc: "Приховування через ехо-сигнали: параметри затримки, змішувач, кепстральний аналіз" }
    ],
    conspect: "lectures/konspekt9.html",
    presentations: [
      { title: "Тема 9.1 — LSB методи в аудіо", desc: "WAV/PCM, ємність, перцептивна якість", url: "slides/2-1/tema1.html" },
      { title: "Тема 9.2 — Фазове кодування", desc: "FFT, фазові зсуви, синхронізація", url: "slides/2-1/tema2.html" },
      { title: "Тема 9.3 — Розширення спектру", desc: "Псевдовипадкові послідовності, кореляція", url: "slides/2-1/tema3.html" },
      { title: "Тема 9.4 — Echo Hiding", desc: "Ехо-сигнали, кепстральний аналіз", url: "slides/2-1/tema4.html" }
    ]
  },
  {
    id: 10,
    title: "Відео стеганографія",
    description: "Методи для відеопотоків: просторові, темпоральні та стиснуті формати.",
    duration: "2 год",
    badge: "new",
    overview: "У цій лекції ми розглянемо стеганографію у відеопотоках — найбільш ємних цифрових контейнерах. Відео поєднує просторову та часову надмірність, що створює унікальні можливості для приховування.",
    overviewExtra: "Ви дізнаєтесь про відео як контейнер, просторові методи вбудовування в окремі кадри, темпоральні методи з використанням векторів руху, стеганографію в стиснутому відео (H.264/H.265), а також практичні приклади та інструменти.",
    topics: [
      { title: "Основи відео стеганографії", desc: "Відео як контейнер: формати, кадри, надмірність, унікальні властивості" },
      { title: "Просторові методи", desc: "Вбудовування в окремі кадри: LSB, адаптивні методи, міжкадрова різниця" },
      { title: "Темпоральні методи", desc: "Використання часової структури відео: векторів руху, GOP структури" },
      { title: "Стиснуте відео", desc: "Стеганографія в H.264/H.265: DCT коефіцієнти, квантування, таблиці руху" },
      { title: "Практичні приклади", desc: "Детальні розрахунки, реальні кейси використання, інструменти та порівняння" }
    ],
    conspect: "lectures/konspekt10.html",
    presentations: [
      { title: "Тема 10.1 — Основи відео стеганографії", desc: "Формати, кадри, надмірність", url: "slides/2-2/tema1.html" },
      { title: "Тема 10.2 — Просторові методи", desc: "LSB, адаптивні методи, міжкадрова різниця", url: "slides/2-2/tema2.html" },
      { title: "Тема 10.3 — Темпоральні методи", desc: "Вектори руху, GOP структура", url: "slides/2-2/tema3.html" },
      { title: "Тема 10.4 — Стиснуте відео", desc: "H.264/H.265, DCT коефіцієнти", url: "slides/2-2/tema4.html" },
      { title: "Тема 10.5 — Практичні приклади", desc: "Розрахунки, кейси, інструменти", url: "slides/2-2/tema5.html" }
    ]
  },
  {
    id: 11,
    title: "Мережева стеганографія",
    description: "Приховування інформації в мережевих протоколах та комунікаціях.",
    duration: "2 год",
    badge: "new",
    overview: "У цій лекції ми розглянемо мережеву стеганографію — приховування інформації безпосередньо в мережевому трафіку. Цей напрямок використовує надмірність мережевих протоколів для створення прихованих каналів.",
    overviewExtra: "Ви дізнаєтесь про приховані канали та їх класифікацію, протокольні методи (TCP/IP, DNS tunneling, HTTP, ICMP), часові канали з модуляцією затримок пакетів, а також методи виявлення та протидії мережевій стеганографії.",
    topics: [
      { title: "Основи мережевої стеганографії", desc: "Приховані канали, класифікація методів, модель OSI та можливості" },
      { title: "Протокольні методи", desc: "Вбудовування в заголовки TCP/IP, DNS tunneling, HTTP стеганографія, ICMP методи" },
      { title: "Часові канали", desc: "Модуляція затримок пакетів, IPD кодування, джиттер та синхронізація" },
      { title: "Виявлення та протидія", desc: "Методи детекції, статистичний аналіз трафіку, нормалізація" }
    ],
    conspect: "lectures/konspekt11.html",
    presentations: [
      { title: "Тема 11.1 — Основи мережевої стеганографії", desc: "Приховані канали, класифікація, OSI", url: "slides/2-3/tema1.html" },
      { title: "Тема 11.2 — Протокольні методи", desc: "TCP/IP, DNS tunneling, HTTP, ICMP", url: "slides/2-3/tema2.html" },
      { title: "Тема 11.3 — Часові канали", desc: "IPD кодування, джиттер, синхронізація", url: "slides/2-3/tema3.html" },
      { title: "Тема 11.4 — Виявлення та протидія", desc: "Детекція, аналіз трафіку, нормалізація", url: "slides/2-3/tema4.html" }
    ]
  },
  {
    id: 12,
    title: "Текстова стеганографія",
    description: "Лінгвістичні методи приховування інформації в текстових документах.",
    duration: "2 год",
    badge: "new",
    overview: "У цій лекції ми розглянемо текстову стеганографію — приховування інформації в текстових документах. Текст є одним з найскладніших контейнерів через його низьку надлишковість та високу чутливість до змін.",
    overviewExtra: "Ви дізнаєтесь про форматні методи (маніпуляція пробілами, Unicode zero-width символи, HTML/CSS стеганографія), лінгвістичні методи (заміна синонімів, синтаксичні трансформації, NLG), а також методи стегоаналізу тексту.",
    topics: [
      { title: "Основи текстової стеганографії", desc: "Вступ до текстової стеганографії, історичні методи, особливості та виклики" },
      { title: "Форматні методи", desc: "Маніпуляція пробілами, Unicode zero-width символи, HTML/CSS стеганографія" },
      { title: "Лінгвістичні методи", desc: "Заміна синонімів, синтаксичні трансформації, семантичні методи, NLG" },
      { title: "Стегоаналіз тексту", desc: "Методи виявлення прихованих даних, статистичний аналіз, ML-детектори" }
    ],
    conspect: "lectures/konspekt12.html",
    presentations: [
      { title: "Тема 12.1 — Основи текстової стеганографії", desc: "Історичні методи, особливості", url: "slides/2-4/tema1.html" },
      { title: "Тема 12.2 — Форматні методи", desc: "Unicode zero-width, HTML/CSS стеганографія", url: "slides/2-4/tema2.html" },
      { title: "Тема 12.3 — Лінгвістичні методи", desc: "Синоніми, синтаксис, NLG", url: "slides/2-4/tema3.html" },
      { title: "Тема 12.4 — Стегоаналіз тексту", desc: "Статистичний аналіз, ML-детектори", url: "slides/2-4/tema4.html" }
    ]
  },
  {
    id: 13,
    title: "Машинне навчання в стеганографії",
    description: "GAN, нейронні мережі та їх застосування в стеганографії та стегоаналізі.",
    duration: "2 год",
    badge: "locked",
    overview: "",
    overviewExtra: "",
    topics: [],
    conspect: null,
    presentations: []
  },
  {
    id: 14,
    title: "Цифрові водяні знаки",
    description: "Захист авторських прав, робастні та крихкі водяні знаки.",
    duration: "2 год",
    badge: "locked",
    overview: "",
    overviewExtra: "",
    topics: [],
    conspect: null,
    presentations: []
  },
  {
    id: 15,
    title: "Практичні застосування стеганографії",
    description: "Реальні кейси використання стеганографії в безпеці, медицині та захисті IP.",
    duration: "2 год",
    badge: "locked",
    overview: "",
    overviewExtra: "",
    topics: [],
    conspect: null,
    presentations: []
  }
];

(function () {
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id'), 10) || 1;
  const lecture = lectures.find(function (l) { return l.id === id; });

  if (!lecture) {
    document.getElementById('lecture-title').textContent = 'Лекцію не знайдено';
    document.getElementById('lecture-badge-top').textContent = 'Помилка';
    document.getElementById('lecture-info').style.display = 'none';
    document.getElementById('lecture-locked').style.display = 'none';
    document.getElementById('lecture-overview').style.display = 'none';
    document.getElementById('lecture-materials').style.display = 'none';
    document.getElementById('lecture-presentations').style.display = 'none';
    const prevBtn = document.getElementById('nav-prev');
    const nextBtn = document.getElementById('nav-next');
    prevBtn.classList.add('disabled');
    prevBtn.removeAttribute('href');
    nextBtn.classList.add('disabled');
    nextBtn.removeAttribute('href');
    return;
  }

  const isLocked = lecture.badge === 'locked';

  document.title = 'Лекція ' + lecture.id + ' — ДКК: Стеганографія';
  document.getElementById('lecture-badge-top').textContent = 'Лекція ' + lecture.id + ' з ' + lectures.length;
  document.getElementById('lecture-title').textContent = lecture.title;

  const infoEl = document.getElementById('lecture-info');
  const durationSpan = document.createElement('span');
  durationSpan.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-2px;margin-right:4px"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>' + lecture.duration;
  infoEl.appendChild(durationSpan);

  const badgeSpan = document.createElement('span');
  if (isLocked) {
    badgeSpan.className = 'badge badge-locked';
    badgeSpan.textContent = 'Скоро';
  } else {
    badgeSpan.className = 'badge badge-new';
    badgeSpan.textContent = 'Готова';
  }
  infoEl.appendChild(badgeSpan);

  if (isLocked) {
    document.getElementById('lecture-locked').style.display = 'block';
    document.getElementById('lecture-locked-desc').textContent = lecture.description;
    document.getElementById('lecture-overview').style.display = 'none';
    document.getElementById('lecture-materials').style.display = 'none';
    document.getElementById('lecture-presentations').style.display = 'none';
  } else {
    document.getElementById('lecture-locked').style.display = 'none';

    const overviewSection = document.getElementById('lecture-overview');
    const overviewH2 = document.createElement('h2');
    overviewH2.textContent = 'Огляд лекції';
    overviewSection.appendChild(overviewH2);

    const overviewP = document.createElement('p');
    overviewP.textContent = lecture.overview;
    overviewSection.appendChild(overviewP);

    if (lecture.overviewExtra) {
      const extraP = document.createElement('p');
      extraP.textContent = lecture.overviewExtra;
      overviewSection.appendChild(extraP);
    }

    if (lecture.topics && lecture.topics.length) {
      const topicsH3 = document.createElement('h3');
      topicsH3.textContent = 'Теми лекції';
      overviewSection.appendChild(topicsH3);

      const ol = document.createElement('ol');
      for (let t = 0; t < lecture.topics.length; t++) {
        const topic = lecture.topics[t];
        const li = document.createElement('li');
        const strong = document.createElement('strong');
        strong.textContent = topic.title;
        li.appendChild(strong);
        li.appendChild(document.createTextNode(' — ' + topic.desc));
        ol.appendChild(li);
      }
      overviewSection.appendChild(ol);
    }

    const materialsSection = document.getElementById('lecture-materials');
    if (lecture.conspect) {
      const matH2 = document.createElement('h2');
      matH2.textContent = 'Матеріали лекції';
      materialsSection.appendChild(matH2);

      const matList = document.createElement('div');
      matList.className = 'lecture-materials';

      const matLink = document.createElement('a');
      matLink.href = lecture.conspect;
      matLink.className = 'material-item';
      matLink.innerHTML =
        '<span class="material-icon"><svg viewBox="0 0 24 24"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg></span>' +
        '<div class="material-info">' +
          '<h3>Конспект лекції ' + lecture.id + '</h3>' +
          '<p>Повний текст лекції з усіх тем</p>' +
        '</div>' +
        '<span class="material-type">Конспект</span>';
      matList.appendChild(matLink);
      materialsSection.appendChild(matList);
    } else {
      materialsSection.style.display = 'none';
    }

    const presSection = document.getElementById('lecture-presentations');
    if (lecture.presentations && lecture.presentations.length) {
      const presH2 = document.createElement('h2');
      presH2.textContent = 'Презентації';
      presSection.appendChild(presH2);

      const presList = document.createElement('div');
      presList.className = 'lecture-materials';

      for (let p = 0; p < lecture.presentations.length; p++) {
        const pres = lecture.presentations[p];
        const presLink = document.createElement('a');
        presLink.href = pres.url;
        presLink.target = '_blank';
        presLink.className = 'material-item';
        presLink.innerHTML =
          '<span class="material-icon"><svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg></span>' +
          '<div class="material-info">' +
            '<h3>' + pres.title + '</h3>' +
            '<p>' + pres.desc + '</p>' +
          '</div>' +
          '<span class="material-type">Слайди</span>';
        presList.appendChild(presLink);
      }
      presSection.appendChild(presList);
    } else {
      presSection.style.display = 'none';
    }
  }

  const prevBtn = document.getElementById('nav-prev');
  const nextBtn = document.getElementById('nav-next');

  if (id <= 1) {
    prevBtn.classList.add('disabled');
    prevBtn.removeAttribute('href');
  } else {
    prevBtn.href = 'lecture.html?id=' + (id - 1);
  }

  if (id >= lectures.length) {
    nextBtn.classList.add('disabled');
    nextBtn.removeAttribute('href');
  } else {
    nextBtn.href = 'lecture.html?id=' + (id + 1);
  }
})();
