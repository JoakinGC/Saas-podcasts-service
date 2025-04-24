import { locales } from "@/constants";

export const getLocale = (path: string) =>
  locales.find(l => path === `/${l}` || path.startsWith(`/${l}/`));