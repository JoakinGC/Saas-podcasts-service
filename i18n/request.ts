import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {

  const safeLocale = locale ?? 'es';

  return {
    locale: safeLocale,

    messages: (await import(`../messages/${safeLocale}.json`)).default
  };
});
