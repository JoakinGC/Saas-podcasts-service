import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  // Aseguramos que siempre sea un string válido
  const safeLocale = locale ?? 'es';

  return {
    locale: safeLocale,
    // ← ahora apuntamos a la nueva carpeta
    messages: (await import(`../messages/${safeLocale}.json`)).default
  };
});
