'use client';

import React from 'react';
import RadarChart from '@/app/_components/GLRadarChart';
import Link from 'next/link';
import Image from 'next/image';
import { ekmukta } from '@/assets/fonts';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Search({ params }: { params: { slug: string } }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchPage slug={params.slug} />
    </QueryClientProvider>
  );
}

function SearchPage({ slug }: { slug: string }) {
  const [inputFocused, setInputFocused] = React.useState(false);
  const [search, setSearch] = React.useState<string>(slug);

  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('/api/getArmories').then((res) =>
        res.json(),
      ),
  });

  console.log(data, isPending, error);

  return (
    <main className={'flex flex-col items-center p-24 min-h-screen'}>
      <Link href={'/'} className={`text-zinc-400 text-4xl tracking-tighter ${ ekmukta.className }`}>
        <div className={'inline-block bg-green-500 clip-hexagon w-3 h-4'} />
        {'Hexa.Loa'}
      </Link>

      <h2 className={'mt-2 text-xl text-zinc-400'}>
        <div className={'flex h-8 items-center'}>
          <div className={'w-2 h-2 rounded-full bg-zinc-400 animate-bounce'} />
          <div className={'w-2 h-2 ml-2 rounded-full bg-zinc-400 animate-bounce'} />
          <div className={'w-2 h-2 ml-2 rounded-full bg-zinc-400 animate-bounce'} />
        </div>
      </h2>

      <div className={'flex mt-2'}>
        <input
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          onChange={(e) => setSearch(e.target.value)}
          className={'box-border border-zinc-200 bg-zinc-100 p-2 rounded-md w-48 h-8 text-[1rem] text-center focus:ring-2 focus:ring-inset placeholder:text-center outline-none ring-green-400'}
          placeholder={'닉네임 입력'}
          value={search}
        />
        <Link
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

      <RadarChart className={'mt-6'} targetData={[0.6, 0.4, 0.8, 0.6, 0.3, 0.9]} labelData={['장비레벨', '무품', '각인합', '카드합', '엘릭서효율', '초월합']} init />
    </main>
  );
}
