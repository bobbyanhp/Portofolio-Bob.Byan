export type Experience = {
  id: string;
  side: "left" | "right";
  title: string;
  company: string;
  description: string;
  period: string;
  sortOrder: number;
  published: boolean;
};

export const experiences: Experience[] = [
  {
    id: "10000000-0000-4000-8000-000000000001",
    side: "left",
    title: "Project Support Staff Intern",
    company: "PT. Bhakti Unggul Teknovasi - Bandung, Indonesia",
    description:
      "Support the provision of IT services including software license management, server maintenance, and web application implementation to meet user and company project requirements, while also managing procurement processes by ensuring the accuracy of quotations and purchase orders, verifying distributor stock availability, and confirming the completeness of client contract or purchase order documents before processing orders.",
    period: "November 2025 - May 2026",
    sortOrder: 0,
    published: true,
  },
  {
    id: "10000000-0000-4000-8000-000000000002",
    side: "right",
    title: "Full-stack Development Intern",
    company: "PT. Winnicode Garuda Teknologi - Bandung, Indonesia",
    description:
      "Designed, developed, and implemented a full-stack news portal, participating end to end from conceptualization through launch while continuously analyzing the platform to identify opportunities for improvement and innovation.",
    period: "September 2024 - Desember 2024",
    sortOrder: 1,
    published: true,
  },
  {
    id: "10000000-0000-4000-8000-000000000003",
    side: "left",
    title: "Front-End Development Intern",
    company: "PT. Xirka Dama Persada - Bandung, Indonesia",
    description: "Designed the UI for the Fish Feeder web app using HTML, CSS, and JavaScript, and developed a responsive layout optimized for desktop, tablet, and mobile.",
    period: "July 2024 - September 2024",
    sortOrder: 2,
    published: true,
  },
  {
    id: "10000000-0000-4000-8000-000000000004",
    side: "right",
    title: "Insurance Administration Part Time",
    company: "PT. Asuransi Allianz Utama - Bandung, Indonesia",
    description: "Processed and entered travel insurance policy data for 50-70 customers each month, ensuring accuracy and completeness by cross-verifying information with agents and customers.",
    period: "January 2022 - January 2024",
    sortOrder: 3,
    published: true,
  },
  {
    id: "10000000-0000-4000-8000-000000000005",
    side: "left",
    title: "Technical Data Administrator Intern",
    company: "PT. Perusahaan Listrik Negara (PLN) - Bandung, Indonesia",
    description:
      "Processed and input data for electricity meter changes from analog to token for more than 200 customers per month, handled power increase and decrease requests for about 100 customers each month, and organized customer physical documents chronologically and systematically to streamline searching and archiving.",
    period: "January 2020 - March 2020",
    sortOrder: 4,
    published: true,
  },
];
