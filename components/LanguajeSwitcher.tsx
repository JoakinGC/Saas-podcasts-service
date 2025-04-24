'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales } from '@/constants';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const changeLocale = (newLocale: string) => {
    if (newLocale === currentLocale) return;
  
    const segments = pathname.split('/');
    if (!segments[1]) {
      router.push(`/${newLocale}`);
    } else {
      segments[1] = newLocale;
      router.push(segments.join('/'));
    }
  };
  

  return (
    <select
      value={currentLocale}
      onChange={(e) => changeLocale(e.target.value)}
      className="mt-4 bg-white dark:bg-black text-black dark:text-white  pr-1 rounded"
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
