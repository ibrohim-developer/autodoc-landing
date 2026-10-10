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
  about: "/about",
  projects: "/projects",
  blog: "/blog",
  contacts: "/contacts",
  vacancies: "/vacancies",
  partners: "/partners",
} as const;

export function blogPostPath(id: string) {
  return `${routes.blog}/${id}`;
}

// Sections of the home page, reachable from any page.
export function homeSection(anchor: (typeof anchors)[keyof typeof anchors]): NavHref {
  return { pathname: "/", hash: anchor };
}

// Order matches the footer grid read column by column.
export const navLinks: { key: NavKey; href: NavHref }[] = [
  { key: "home", href: homeSection(anchors.top) },
  { key: "media", href: routes.blog },
  { key: "history", href: routes.about },
  { key: "leadership", href: homeSection(anchors.leaders) },
  { key: "projects", href: routes.projects },
  { key: "career", href: routes.vacancies },
  { key: "partners", href: routes.partners },
  { key: "contacts", href: routes.contacts },
];

export const contacts = {
  phone: "+998 55 505 75 75",
  phoneHref: "tel:+998555057575",
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
