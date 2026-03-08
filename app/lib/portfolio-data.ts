export type SocialLink = {
  label: "LinkedIn" | "GitHub";
  href: string;
  icon: "linkedin" | "github";
};

export type CareerItem = {
  side: "left" | "right";
  title: string;
  company: string;
  summary: string;
  period: string;
};

export type PortfolioItem = {
  id: number;
  title: string;
  url: string;
  tag?: string;
  img: string;
};

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bobbyanhp/",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com/bobbyanhp",
    icon: "github",
  },
];

export const techStacks: string[][] = [
  ["PHP", "Java", "JavaScript", "React", "Python", "Git"],
  ["HTML", "CSS", "Laravel", "Next.js", "MySQL", "MS Word"],
  [
    "MS Excel",
    "Visual Studio Code",
    "PyCharm",
    "Figma",
    "Canva",
    "Spreadsheets",
  ],
];

export const careerItems: CareerItem[] = [
  {
    side: "left",
    title: "Technical Data Administrator Intern",
    company: "PT. Perusahaan Listrik Negara (PLN) - Bandung, Indonesia",
    summary:
      "Processed and input data for electricity meter changes from analog to token for more than 200 customers per month, handled power increase and decrease requests for about 100 customers each month, and organized customer physical documents chronologically and systematically to streamline searching and archiving.",
    period: "January 2020 - March 2020",
  },
  {
    side: "right",
    title: "Insurance Administration Part Time",
    company: "PT. Asuransi Allianz Utama - Bandung, Indonesia",
    summary:
      "Processed and entered travel insurance policy data for 50-70 customers each month, ensuring accuracy and completeness by cross-verifying information with agents and customers.",
    period: "January 2022 - January 2024",
  },
  {
    side: "left",
    title: "Front-End Development Intern",
    company: "PT. Xirka Dama Persada - Bandung, Indonesia",
    summary:
      "Designed the UI for the Fish Feeder web app using HTML, CSS, and JavaScript, and developed a responsive layout optimized for desktop, tablet, and mobile.",
    period: "July 2024 - September 2024",
  },
  {
    side: "right",
    title: "Full-stack Development Intern",
    company: "PT. Winnicode Garuda Teknologi - Bandung, Indonesia",
    summary:
      "Designed, developed, and implemented a full-stack news portal, participating end to end from conceptualization through launch while continuously analyzing the platform to identify opportunities for improvement and innovation.",
    period: "September 2024 - December 2024",
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Website Save Dental AI",
    url: "https://github.com/bobbyanhp",
    img: "/assets/savedental.jpg",
  },
  {
    id: 2,
    title: "Website Portal Berita Winni News Network",
    url: "https://github.com/bobbyanhp/wnn",
    img: "/assets/winni.jpg",
  },
  {
    id: 3,
    title: "Website Fish Feeder",
    url: "https://github.com/bobbyanhp",
    img: "/assets/fishfeed.jpg",
  },
];
