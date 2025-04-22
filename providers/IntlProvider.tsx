'use client';

import {NextIntlClientProvider} from 'next-intl';

type Props = {
  locale: string;
  messages: Record<string, any>;
  children: React.ReactNode;
};

export default function IntlProvider({locale, messages, children}: Props) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
