'use client';

import React from 'react';
import RadarChart from './_components/GLRadarChart';
import Link from 'next/link';
import Image from 'next/image';
import { ekmukta } from '@/assets/fonts';

export default function Home() {
  const linkRef = React.useRef<HTMLAnchorElement>(null);
  const [inputFocused, setInputFocused] = React.useState(false);
  const [search, setSearch] = React.useState<string>('');

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search) {
      linkRef.current?.click();
    }
  };

  return (
    <main className={'flex min-h-screen flex-col items-center py-24'}>
      <Link href={'/'} className={`text-4xl tracking-tighter text-zinc-400 ${ ekmukta.className }`}>
        <div className={'clip-hexagon inline-block h-4 w-3 bg-green-500'} />
        {'Hexa.Loa'}
      </Link>

      <h2 className={'mt-2 text-xl text-zinc-400'}>
        <div className={'h-8'}>
          {'당신의 로아 능력치를 확인해보세요!'}
        </div>
      </h2>

      <div className={'mt-2 flex'}>
        <input
          onKeyDown={(e) => handleOnKeyDown(e)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          onChange={(e) => setSearch(e.target.value)}
          className={'ml-2 box-border h-8 w-48 rounded-md border-zinc-200 bg-zinc-100 p-2 text-center text-[1rem] outline-none ring-green-400 placeholder:text-center focus:ring-2 focus:ring-inset'}
          placeholder={'닉네임 입력'}
        />
        <Link
          ref={linkRef}
          title={'검색'}
          aria-description={'검색'}
          aria-disabled={search === ''}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          tabIndex={search ? 0 : -1}
          className={
            'box-border flex justify-center items-center ml-2 rounded-md h-8 transition-all text-[1rem] text-white cursor-pointer fill-white focus:ring-2 focus:ring-inset outline-none ring-green-400'
            + (inputFocused ? ' w-8' : ' w-0')
            + (search ? ' bg-green-400' : ' bg-green-200 pointer-events-none')
          }
          href={'/search' + (search ? `/${ search }` : '')}
        >
          <Image className={'transition-all' + (inputFocused ? ' opacity-100' : ' opacity-0')} src={'search.svg'} alt={'search'} width={16} height={16} />
        </Link>
      </div>

      <RadarChart className={'mt-6'} breathe />
    </main>
  );
}
