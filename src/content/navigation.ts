import telegram from "@/assets/images/icons/telegram.svg";
import instagram from "@/assets/images/icons/instagram.svg";

// Section anchors used for on-page navigation.
export const anchors = {
  top: "top",
  stats: "stats",
  about: "about",
  directions: "directions",
  contact: "contact",
  leaders: "leaders",
  partners: "partners",
  news: "news",
} as const;

export type NavKey =
  | "home"
  | "media"
  | "history"
  | "leadership"
  | "projects"
  | "career"
  | "partners"
  | "contacts";

// Hrefs for the locale-aware `Link` from "@/i18n/navigation". A hash link stays on the current page.
export type NavHref = string | { pathname: string; hash?: string };

export const routes = {
  projects: "/projects",
  blog: "/blog",
  contacts: "/contacts",
  vacancies: "/vacancies",
} as const;

export function blogPostPath(id: string) {
  return `${routes.blog}/${id}`;
}

// Sections of the home page, reachable from any page.
export function homeSection(anchor: (typeof anchors)[keyof typeof anchors]): NavHref {
  return { pathname: "/", hash: anchor };
}

// Order matches the footer grid read column by column.
// Pages that don't exist yet ("history") are "#" placeholders.
export const navLinks: { key: NavKey; href: NavHref }[] = [
  { key: "home", href: homeSection(anchors.top) },
  { key: "media", href: homeSection(anchors.news) },
  { key: "history", href: "#" },
  { key: "leadership", href: homeSection(anchors.leaders) },
  { key: "projects", href: routes.projects },
  { key: "career", href: routes.vacancies },
  { key: "partners", href: homeSection(anchors.partners) },
  { key: "contacts", href: routes.contacts },
];

export const contacts = {
  phone: "+998 71 200 00 00",
  phoneHref: "tel:+998712000000",
  email: "info@autodoc.uz",
  // Social profile URLs are not in the design yet.
  telegram: "#",
  instagram: "#",
};

export const socials = [
  { name: "Telegram", href: contacts.telegram, icon: telegram },
  { name: "Instagram", href: contacts.instagram, icon: instagram },
];

// Map pin for the head office on the contacts page. Placed where the design shows it;
// replace with the exact coordinates of the address once confirmed.
export const headOffice = { lat: 41.3203, lon: 69.2673 };

// Set to a YouTube or MP4 URL to enable the play button in the video section.
export const showreelUrl = "";
