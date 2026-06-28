"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
type Language = "en" | "id";

type TranslationKey =
  | "about"
  | "aboutLead"
  | "aboutTitle"
  | "back"
  | "careerHistory"
  | "close"
  | "details"
  | "experience"
  | "footerBuilt"
  | "footerWith"
  | "hiIm"
  | "home"
  | "languageToggle"
  | "next"
  | "page"
  | "portfolio"
  | "portfolioIntro"
  | "portfolioTitle"
  | "previous"
  | "projectLink"
  | "projectNotFoundBody"
  | "projectNotFoundTitle"
  | "projects"
  | "show"
  | "techStack"
  | "themeToggle";

type PreferencesContextValue = {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
  translateText: (text: string) => string;
};

type TranslationPair = {
  en: string;
  id: string;
};

const dictionaries: Record<Language, Record<TranslationKey, string>> = {
  en: {
    about: "About",
    aboutLead: "Here are the Technology Stacks that I am good at:",
    aboutTitle: "About Me",
    back: "Back",
    careerHistory: "Career History",
    close: "Close",
    details: "Details",
    experience: "Work Experience",
    footerBuilt: "A portfolio designed & built by",
    footerWith: "with",
    hiIm: "Hi I'm",
    home: "Home",
    languageToggle: "ID",
    next: "Next",
    page: "Page",
    portfolio: "Portfolio",
    portfolioIntro: "Explore a collection of my several projects, each crafted to deliver seamless, user-centred experiences.",
    portfolioTitle: "My Portfolio",
    previous: "Previous",
    projectLink: "Project Link",
    projectNotFoundBody: "This project is not available in the CMS data.",
    projectNotFoundTitle: "Project not found",
    projects: "Projects",
    show: "Show",
    techStack: "Technology stacks and working skills:",
    themeToggle: "Dark",
  },
  id: {
    about: "Tentang",
    aboutLead: "Berikut teknologi dan skill yang saya kuasai:",
    aboutTitle: "Tentang Saya",
    back: "Kembali",
    careerHistory: "Riwayat Karier",
    close: "Tutup",
    details: "Detail",
    experience: "Pengalaman",
    footerBuilt: "Portofolio dirancang dan dibuat oleh",
    footerWith: "dengan",
    hiIm: "Halo, saya",
    home: "Beranda",
    languageToggle: "EN",
    next: "Berikutnya",
    page: "Halaman",
    portfolio: "Portofolio",
    portfolioIntro: "Lihat kumpulan project saya yang dibuat untuk menghadirkan pengalaman pengguna yang rapi, nyaman, dan mudah digunakan.",
    portfolioTitle: "Portofolio Saya",
    previous: "Sebelumnya",
    projectLink: "Link Project",
    projectNotFoundBody: "Project ini belum tersedia di data CMS.",
    projectNotFoundTitle: "Project tidak ditemukan",
    projects: "Project",
    show: "Lihat",
    techStack: "Teknologi dan skill kerja:",
    themeToggle: "Light",
  },
};

const translationPairs: TranslationPair[] = [
  { en: "Ready to Grow and Contribute.", id: "Siap Berkembang dan Berkontribusi." },
  { en: "\"Ready to Grow and Contribute.\"", id: "\"Siap Berkembang dan Berkontribusi.\"" },
  {
    en: "I'm a software developer based in West Java, specializing in building amazing websites, and everything in between.",
    id: "Saya adalah software developer yang berbasis di Jawa Barat, berfokus pada pembuatan website yang menarik, rapi, dan fungsional.",
  },
  {
    en: "Fresh Graduate from National Institute of Technology Bandung, majoring in Informatics with a focus on data science and software engineering. I have valuable internship experience in system and data analysis, as well as expertise in Python for data science, SQL, Machine Learning, and Laravel. I am highly motivated to continue developing my skills in the fields I pursue. I can work under pressure, both individually and in a team. I am confident that my abilities can provide significant and tangible contributions.",
    id: "Fresh graduate dari Institut Teknologi Nasional Bandung jurusan Informatika dengan fokus pada data science dan software engineering. Saya memiliki pengalaman magang di bidang analisis sistem dan data, serta keahlian dalam Python untuk data science, SQL, Machine Learning, dan Laravel. Saya termotivasi untuk terus mengembangkan kemampuan, mampu bekerja di bawah tekanan baik secara individu maupun tim, dan siap memberikan kontribusi nyata.",
  },
  {
    en: "Fresh graduate with a Bachelor's Degree in Informatics from Institut Teknologi Nasional Bandung, with a strong interest in administrative operations, business support, and organizational management. Experienced in administrative support, procurement documentation, project coordination, and data management through internship and freelance assignments. Skilled in managing records, preparing and verifying documents, organizing data, supporting operational processes, and ensuring administrative accuracy and completeness. A highly motivated, detail-oriented, and fast-learning individual who is adaptable to change and able to work effectively both independently and collaboratively in a dynamic work environment.",
    id: "Fresh graduate dengan gelar Sarjana Informatika dari Institut Teknologi Nasional Bandung, memiliki minat kuat pada operasional administrasi, dukungan bisnis, dan manajemen organisasi. Berpengalaman dalam dukungan administrasi, dokumentasi pengadaan, koordinasi proyek, dan pengelolaan data melalui magang serta pekerjaan freelance. Terampil dalam mengelola arsip, menyiapkan dan memverifikasi dokumen, menyusun data, mendukung proses operasional, serta memastikan akurasi dan kelengkapan administrasi. Pribadi yang sangat termotivasi, teliti, cepat belajar, adaptif terhadap perubahan, dan mampu bekerja efektif secara mandiri maupun kolaboratif dalam lingkungan kerja yang dinamis.",
  },
  { en: "Web Development", id: "Pengembangan Web" },
  { en: "Supply Chain Management", id: "Manajemen Rantai Pasok" },
  { en: "Project Mangement", id: "Manajemen Project" },
  { en: "Project Management", id: "Manajemen Project" },
  { en: "Data Administration", id: "Administrasi Data" },
  { en: "Document Controller", id: "Pengendali Dokumen" },
  { en: "Data Entery", id: "Entri Data" },
  { en: "Tech Savvy", id: "Melek Teknologi" },
  { en: "CMS Ready", id: "Siap CMS" },
  { en: "Growth Mindset", id: "Pola Pikir Berkembang" },
  { en: "Problem Solver", id: "Pemecah Masalah" },
  { en: "Teamwork", id: "Kerja Tim" },
  { en: "Adaptable", id: "Adaptif" },
  { en: "Digital Archiving", id: "Pengarsipan Digital" },
  { en: "Microsoft Office 365", id: "Microsoft Office 365" },
  { en: "Google Workspace", id: "Google Workspace" },
  { en: "Full-stack Development", id: "Pengembangan Full-stack" },
  { en: "Front-end Development", id: "Pengembangan Front-end" },
  { en: "Full Stack", id: "Full Stack" },
  { en: "Data Science", id: "Data Science" },
  { en: "Project Support Staff Intern", id: "Magang Project Support Staff" },
  { en: "Full-stack Development Intern", id: "Magang Pengembangan Full-stack" },
  { en: "Front-End Development Intern", id: "Magang Pengembangan Front-End" },
  { en: "Insurance Administration Part Time", id: "Paruh Waktu Administrasi Asuransi" },
  { en: "Technical Data Administrator Intern", id: "Magang Administrator Data Teknis" },
  { en: "PT. Bhakti Unggul Teknovasi - Bandung, Indonesia", id: "PT. Bhakti Unggul Teknovasi - Bandung, Indonesia" },
  { en: "PT. Winnicode Garuda Teknologi - Bandung, Indonesia", id: "PT. Winnicode Garuda Teknologi - Bandung, Indonesia" },
  { en: "PT. Xirka Dama Persada - Bandung, Indonesia", id: "PT. Xirka Dama Persada - Bandung, Indonesia" },
  { en: "PT. Asuransi Allianz Utama - Bandung, Indonesia", id: "PT. Asuransi Allianz Utama - Bandung, Indonesia" },
  { en: "PT. Perusahaan Listrik Negara (PLN) - Bandung, Indonesia", id: "PT. Perusahaan Listrik Negara (PLN) - Bandung, Indonesia" },
  { en: "November 2025 - May 2026", id: "November 2025 - Mei 2026" },
  { en: "September 2024 - Desember 2024", id: "September 2024 - Desember 2024" },
  { en: "July 2024 - September 2024", id: "Juli 2024 - September 2024" },
  { en: "January 2022 - January 2024", id: "Januari 2022 - Januari 2024" },
  { en: "January 2020 - March 2020", id: "Januari 2020 - Maret 2020" },
  {
    en: "Support the provision of IT services including software license management, server maintenance, and web application implementation to meet user and company project requirements, while also managing procurement processes by ensuring the accuracy of quotations and purchase orders, verifying distributor stock availability, and confirming the completeness of client contract or purchase order documents before processing orders.",
    id: "Mendukung penyediaan layanan IT termasuk pengelolaan lisensi software, pemeliharaan server, dan implementasi aplikasi web untuk memenuhi kebutuhan user serta project perusahaan. Selain itu, mengelola proses pengadaan dengan memastikan akurasi quotation dan purchase order, memverifikasi ketersediaan stok distributor, serta memastikan kelengkapan dokumen kontrak atau purchase order klien sebelum pesanan diproses.",
  },
  {
    en: "Designed, developed, and implemented a full-stack news portal, participating end to end from conceptualization through launch while continuously analyzing the platform to identify opportunities for improvement and innovation.",
    id: "Merancang, mengembangkan, dan mengimplementasikan portal berita full-stack dari tahap konsep hingga peluncuran, sekaligus menganalisis platform secara berkelanjutan untuk menemukan peluang perbaikan dan inovasi.",
  },
  {
    en: "Designed the UI for the Fish Feeder web app using HTML, CSS, and JavaScript, and developed a responsive layout optimized for desktop, tablet, and mobile.",
    id: "Merancang UI untuk web app Fish Feeder menggunakan HTML, CSS, dan JavaScript, serta mengembangkan layout responsif yang optimal untuk desktop, tablet, dan mobile.",
  },
  {
    en: "Processed and entered travel insurance policy data for 50-70 customers each month, ensuring accuracy and completeness by cross-verifying information with agents and customers.",
    id: "Memproses dan memasukkan data polis asuransi perjalanan untuk 50-70 pelanggan setiap bulan, dengan memastikan akurasi dan kelengkapan melalui verifikasi silang informasi bersama agen dan pelanggan.",
  },
  {
    en: "Processed and input data for electricity meter changes from analog to token for more than 200 customers per month, handled power increase and decrease requests for about 100 customers each month, and organized customer physical documents chronologically and systematically to streamline searching and archiving.",
    id: "Memproses dan menginput data perubahan meter listrik dari analog ke token untuk lebih dari 200 pelanggan per bulan, menangani permintaan tambah dan turun daya untuk sekitar 100 pelanggan setiap bulan, serta mengelola dokumen fisik pelanggan secara kronologis dan sistematis agar pencarian dan pengarsipan lebih efisien.",
  },
  { en: "Website Save Dental AI", id: "Website Save Dental AI" },
  { en: "Winni News Network News Portal Website", id: "Website Portal Berita Winni News Network" },
  { en: "Website Fish Feeder", id: "Website Fish Feeder" },
  { en: "Aquarium Website", id: "Website Aquarium" },
  { en: "Aquarium Project", id: "Project Aquarium" },
  { en: "SIAKAD V2 Website", id: "Website SIAKAD V2" },
  { en: "SIAKAD V2 Academic Information System", id: "Sistem Informasi Akademik SIAKAD V2" },
  { en: "FINAL PROJECT", id: "PROYEK AKHIR" },
  { en: "Final Project", id: "Proyek Akhir" },
  {
    en: "Save Dental AI is a website that helps users get a more practical dental health consultation and information experience through a clean and easy-to-use interface.",
    id: "Save Dental AI adalah website yang membantu pengguna mendapatkan pengalaman konsultasi dan informasi kesehatan gigi secara lebih praktis melalui tampilan yang bersih dan mudah digunakan.",
  },
  {
    en: "Save Dental AI is a website designed to help users understand dental health needs through a simple digital flow. This project focuses on a clean interface, easy-to-scan information structure, and a comfortable user experience on desktop and mobile devices.",
    id: "Save Dental AI adalah website yang dirancang untuk membantu pengguna memahami kebutuhan kesehatan gigi dengan alur digital yang sederhana. Project ini berfokus pada tampilan yang bersih, struktur informasi yang mudah dipindai, dan pengalaman pengguna yang nyaman pada perangkat desktop maupun mobile.",
  },
  {
    en: "Winni News Network is a full-stack news portal that displays news content, categories, and a responsive reading experience across various screen sizes.",
    id: "Winni News Network adalah portal berita full-stack yang menampilkan konten berita, kategori, dan pengalaman membaca yang responsif untuk berbagai ukuran layar.",
  },
  {
    en: "Winni News Network is a news portal developed from planning to implementation. The main focus of this project is building a neat content publishing system, clear navigation, and consistent news presentation so readers can find information quickly.",
    id: "Winni News Network adalah portal berita yang dikembangkan dari tahap perancangan hingga implementasi. Fokus utama project ini adalah membangun sistem publikasi konten yang rapi, navigasi yang jelas, dan tampilan berita yang konsisten agar pembaca dapat menemukan informasi dengan cepat.",
  },
  {
    en: "Fish Feeder is a web app with a responsive layout that helps users monitor and manage fish feeding features digitally.",
    id: "Fish Feeder adalah web app dengan layout responsif untuk membantu pengguna memantau dan mengelola fitur pemberian pakan ikan secara digital.",
  },
  {
    en: "Fish Feeder is a web app built with HTML, CSS, and JavaScript. This project emphasizes responsive UI design, clear information structure, and a simple dashboard interface so monitoring and control features are easier to use.",
    id: "Fish Feeder adalah web app yang dibuat dengan HTML, CSS, dan JavaScript. Project ini menekankan desain UI yang responsif, susunan informasi yang jelas, dan tampilan dashboard sederhana agar fitur monitoring dan kontrol lebih mudah digunakan.",
  },
  {
    en: "Developing a DenseNet-201 transfer learning model to classify seven dental and oral diseases with class balancing using SMOTE, optimizing the training process using Adam optimization, and evaluating the resulting model using metrics such as accuracy, precision, recall, and F1-score.",
    id: "Mengembangkan model transfer learning DenseNet-201 untuk mengklasifikasikan tujuh penyakit gigi dan mulut dengan penyeimbangan kelas menggunakan SMOTE, mengoptimalkan proses pelatihan menggunakan Adam optimization, serta mengevaluasi model dengan metrik accuracy, precision, recall, dan F1-score.",
  },
];

function normalizeText(text: string) {
  return text.replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/[‐‑‒–—]/g, "-").replace(/\s+/g, " ").trim();
}

function withoutTerminalPeriod(text: string) {
  return text.replace(/\.$/, "");
}

function buildKnownText() {
  const records: Record<Language, Record<string, string>> = { en: {}, id: {} };

  function addRecord(language: Language, from: string, to: string) {
    const normalizedFrom = normalizeText(from);
    const normalizedTo = normalizeText(to);
    const noPeriodFrom = withoutTerminalPeriod(normalizedFrom);
    const noPeriodTo = withoutTerminalPeriod(normalizedTo);

    records[language][normalizedFrom] = to;
    records[language][normalizedFrom.toLowerCase()] = to;
    records[language][noPeriodFrom] = noPeriodTo;
    records[language][noPeriodFrom.toLowerCase()] = noPeriodTo;
  }

  for (const pair of translationPairs) {
    addRecord("id", pair.en, pair.id);
    addRecord("en", pair.id, pair.en);
  }

  return records;
}

const knownText = buildKnownText();

const fallbackReplacements: Record<Language, TranslationPair[]> = {
  en: [
    { en: "January", id: "Januari" },
    { en: "March", id: "Maret" },
    { en: "May", id: "Mei" },
    { en: "July", id: "Juli" },
    { en: "December", id: "Desember" },
    { en: "Project", id: "Project" },
    { en: "Administration", id: "Administrasi" },
    { en: "Management", id: "Manajemen" },
  ],
  id: [
    { en: "January", id: "Januari" },
    { en: "March", id: "Maret" },
    { en: "May", id: "Mei" },
    { en: "July", id: "Juli" },
    { en: "December", id: "Desember" },
    { en: "Project", id: "Project" },
    { en: "Administration", id: "Administrasi" },
    { en: "Management", id: "Manajemen" },
  ],
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function translateWithFallback(text: string, language: Language) {
  let translated = normalizeText(text);
  const lowerText = translated.toLowerCase();

  if (language === "id") {
    if (/^final project$/i.test(translated)) return "Proyek Akhir";
    if (lowerText.includes("aquarium")) {
      if (translated.length <= 80) return translated.replace(/aquarium website/gi, "Website Aquarium").replace(/aquarium project/gi, "Project Aquarium").replace(/application/gi, "Aplikasi").replace(/system/gi, "Sistem");
      return "Project Aquarium adalah aplikasi berbasis web untuk membantu pengguna memantau dan mengelola kebutuhan akuarium secara lebih praktis melalui tampilan yang responsif, informasi yang terstruktur, dan alur penggunaan yang mudah dipahami.";
    }
    if (lowerText.includes("siakad")) {
      if (translated.length <= 80) return translated.replace(/siakad v2 website/gi, "Website SIAKAD V2").replace(/academic information system/gi, "Sistem Informasi Akademik").replace(/academic system/gi, "Sistem Akademik");
      return "SIAKAD V2 adalah sistem informasi akademik berbasis web yang membantu pengelolaan data akademik, jadwal, mahasiswa, dosen, dan proses administrasi kampus melalui tampilan yang rapi, responsif, dan mudah digunakan.";
    }
    if (/DenseNet-201/i.test(translated) && /SMOTE/i.test(translated) && /dental|oral/i.test(translated)) {
      return "Mengembangkan model transfer learning DenseNet-201 untuk mengklasifikasikan tujuh penyakit gigi dan mulut dengan penyeimbangan kelas menggunakan SMOTE, mengoptimalkan proses pelatihan menggunakan Adam optimization, serta mengevaluasi model dengan metrik accuracy, precision, recall, dan F1-score.";
    }
  }

  if (language === "en") {
    if (/^proyek akhir$/i.test(translated)) return "Final Project";
    if (lowerText.includes("aquarium") || lowerText.includes("akuarium")) {
      if (translated.length <= 80) return translated.replace(/website aquarium/gi, "Aquarium Website").replace(/project aquarium/gi, "Aquarium Project").replace(/akuarium/gi, "Aquarium").replace(/aplikasi/gi, "Application").replace(/sistem/gi, "System");
      return "The Aquarium project is a web-based application that helps users monitor and manage aquarium needs more practically through a responsive interface, structured information, and an easy-to-understand user flow.";
    }
    if (lowerText.includes("siakad") || lowerText.includes("sistem informasi akademik")) {
      if (translated.length <= 80) return translated.replace(/website siakad v2/gi, "SIAKAD V2 Website").replace(/sistem informasi akademik/gi, "Academic Information System").replace(/sistem akademik/gi, "Academic System");
      return "SIAKAD V2 is a web-based academic information system that helps manage academic data, schedules, students, lecturers, and campus administration processes through a clean, responsive, and easy-to-use interface.";
    }
    if (/DenseNet-201/i.test(translated) && /SMOTE/i.test(translated) && /gigi|mulut/i.test(translated)) {
      return "Developing a DenseNet-201 transfer learning model to classify seven dental and oral diseases with class balancing using SMOTE, optimizing the training process using Adam optimization, and evaluating the resulting model using metrics such as accuracy, precision, recall, and F1-score.";
    }
  }

  for (const pair of fallbackReplacements[language]) {
    const from = language === "id" ? pair.en : pair.id;
    const to = language === "id" ? pair.id : pair.en;
    translated = translated.replace(new RegExp(escapeRegExp(from), "g"), to);
  }

  return translated;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("portfolio-theme");
    const storedLanguage = window.localStorage.getItem("portfolio-language");
    const initialTheme = storedTheme === "dark" || storedTheme === "light" ? storedTheme : "light";
    const initialLanguage = storedLanguage === "id" || storedLanguage === "en" ? storedLanguage : "en";

    setTheme(initialTheme);
    setLanguage(initialLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("portfolio-language", language);
  }, [language]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage((current) => (current === "en" ? "id" : "en"));
  }, []);

  const t = useCallback(
    (key: TranslationKey) => {
      return dictionaries[language][key];
    },
    [language],
  );

  const translateText = useCallback(
    (text: string) => {
      const normalizedText = normalizeText(text);
      return knownText[language][normalizedText] ?? knownText[language][normalizedText.toLowerCase()] ?? translateWithFallback(normalizedText, language);
    },
    [language],
  );

  const value = useMemo(
    () => ({ theme, language, toggleTheme, toggleLanguage, t, translateText }),
    [language, t, theme, toggleLanguage, toggleTheme, translateText],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error("usePreferences must be used inside PreferencesProvider");
  }

  return context;
}
