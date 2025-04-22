
import { defaultLocale, locales } from '@/constants';
import IntlProvider from '@/providers/IntlProvider';


export async function generateStaticParams() {
  return locales.map(l => ({lang: l}));
}

export default async function LangLayout({
  children,
  params: {lang}
}: {
  children: React.ReactNode;
  params: {lang: string};
}) {
  const locale   = locales.includes(lang as any) ? lang : defaultLocale;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
