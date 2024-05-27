'use client';

import React from 'react';
import RadarChart from '@/app/_components/GLRadarChart';
import Link from 'next/link';
import Image from 'next/image';
import { ekmukta } from '@/assets/fonts';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { CharacterProfileResponse } from '@/app/api/getCharacterProfile/route';

const queryClient = new QueryClient();

export default function Search({ params }: { params: { slug: string } }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchPage slug={params.slug} />
    </QueryClientProvider>
  );
}

function SearchPage({ slug }: { slug: string }) {
  const linkRef = React.useRef<HTMLAnchorElement>(null);
  const [inputFocused, setInputFocused] = React.useState(false);
  const [search, setSearch] = React.useState<string>(decodeURI(slug));

  const { isPending, error, data } = useQuery<CharacterProfileResponse>({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('/api/getCharacterProfile?charname=' + search).then((res) =>
        res.json(),
      ),
  });

  const noData = data?.status === 401;

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search) {
      linkRef.current?.click();
    }
  };

  console.log(isPending, error);

  const mockData = React.useMemo(() => {
    return {
      targetSlug: slug,
      targetData: [0.6, 0.4, 0.8, 0.6, 0.3, 0.9],
      labelData: ['장비레벨', '무품', '각인합', '카드합', '엘릭서효율', '초월합'],
    };
  }, [slug]);

  return (
    <main className={'flex min-h-screen flex-col items-center py-24'}>
      <title>{'헥사로아 | ' + decodeURI(slug)}</title>
      <Link href={'/'} className={`text-4xl tracking-tighter text-zinc-400 ${ ekmukta.className }`}>
        <div className={'clip-hexagon inline-block h-4 w-3 bg-green-500'} />
        {'Hexa.Loa'}
      </Link>

      <h2 className={'mt-2 text-xl text-zinc-400'}>
        <div className={'flex h-8 items-center'}>{
          isPending || error
            ? (
              <>
                <div className={'size-2 animate-bounce rounded-full bg-zinc-400'} />
                <div className={'ml-2 size-2 animate-bounce rounded-full bg-zinc-400'} />
                <div className={'ml-2 size-2 animate-bounce rounded-full bg-zinc-400'} />
              </>
            )
            : noData
              ? '캐릭터를 찾을 수 없습니다.'
              : data.data?.CharacterName + ', ' + data.data?.CharacterClassName + ' @' + data.data?.ServerName
        }
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
          value={search}
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

      <RadarChart
        className={'mt-6'}
        targetData={!(noData || error || isPending) ? mockData.targetData : undefined}
        labelData={mockData.labelData}
        chartStyle={(noData || error) ? {
          dataColor: [0.8, 0.4, 0.4, 0.85],
          dataOutlineColor: [0.8, 0.4, 0.4, 0.95],
        } : undefined}
        rotate={(noData || error !== null || isPending)}
        error={noData || error !== null}
        init
      />
    </main>
  );
}
