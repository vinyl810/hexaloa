import type { Metadata } from 'next';
import './globals.css';

import { pretandard } from '@/assets/fonts';

export const metadata: Metadata = {
  title: '헥사로아',
  description: '로스트아크 전투정보실 레이더차트',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={'en'}>
      <body className={pretandard.className}>
        {children}
      </body>
    </html>
  );
}
