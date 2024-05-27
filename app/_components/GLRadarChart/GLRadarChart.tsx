'use client';

import React from 'react';
import frag from './default.frag';
import vert from './default.vert';
import { initializeGL, render, createClipPathCSS, createAbsoluteLabelsCSS } from './utils';
import { RadarChartStyle, RadarLoadingStyle } from './types';

export interface RadarChartProps {
  targetData?: number[];
  labelData?: string[];
  className?: string;
  vertices?: number;
  style?: React.CSSProperties;
  chartStyle?: RadarChartStyle;
  loadingStyle?: RadarLoadingStyle;
  init?: boolean;
  rotate?: boolean;
  breathe?: boolean;
  error?: boolean;
}

function GLRadarChart(props: RadarChartProps) {
  const {
    targetData = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
    labelData,
    className,
    vertices = 6,
    style,
    chartStyle = {
      backgroundColor: [0.9, 0.9, 0.9, 1],
      lineColor: [0.55, 0.55, 0.55, 1],
      outlineColor: [0.6, 0.6, 0.6, 1],
      dataColor: [0.4, 0.8, 0.4, 0.75],
      dataOutlineColor: [0.4, 0.8, 0.4, 0.95],
    },
    loadingStyle = {
      backgroundColor: [220, 220, 220, 1],
      outlineColor: [180, 180, 180, 1],
    },
    rotate,
    breathe,
    error,
  } = props;

  const chartRef = React.useRef<HTMLCanvasElement>(null);
  const glRef = React.useRef<WebGL2RenderingContext | null>(null);
  const positiveRef = React.useRef([false, false, false, false, false, false]);
  const rotationRef = React.useRef(0);
  const breatheRef = React.useRef(0);
  const breathePositiveRef = React.useRef(false);
  const animationRef = React.useRef<number | null>(null);
  const animData = React.useRef(new Float32Array([0.5, 0.5, 0.5, 0.5, 0.5, 0.5]));

  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (chartRef.current) glRef.current = initializeGL(chartRef.current, vert, frag);
  });

  const initAnimation = React.useCallback(() => {
    if (!glRef.current) return;
    if (rotate) {
      if (rotationRef.current >= 360) rotationRef.current = 0;
      else rotationRef.current += 0.05;
    } else {
      rotationRef.current = 0;
    }
    if (breathe) {
      if (breatheRef.current >= 1) breathePositiveRef.current = false;
      if (breatheRef.current <= 0) breathePositiveRef.current = true;
      breatheRef.current = breathePositiveRef.current ? breatheRef.current + 0.01 : breatheRef.current - 0.01;
    } else {
      breatheRef.current = 0;
    }
    animData.current = animData.current.map((v, i) => {
      if (!positiveRef.current[i]) {
        if (v - 0.03 < 0) {
          positiveRef.current[i] = true;
          return 0;
        }
        return v - 0.03;
      } else {
        if (v + 0.03 > (targetData[i] ?? 0)) return (targetData[i] ?? 0);
        return v + 0.03;
      }
    });

    animationRef.current = requestAnimationFrame(() => {
      if (!glRef.current) return;
      render(glRef.current, animData.current, vertices, chartStyle, rotationRef.current, breatheRef.current);
      initAnimation();
    });
  }, [targetData, vertices, chartStyle, breathe, rotate]);

  React.useEffect(() => {
    if (glRef.current) {
      console.log('GLRadarChart: Animation started');
      setLoaded(true);
      animationRef.current = requestAnimationFrame(() => {
        initAnimation();
      });
      return () => cancelAnimationFrame(animationRef.current ?? 0);
    }
  }, [initAnimation]);

  return (
    <div id={'GLRadarChart'} style={style} className={'relative p-6 transition-all' + (className ? ` ${ className }` : '')}>
      {labelData?.length && createAbsoluteLabelsCSS(vertices, 5, 1.5, 1.05).map((label, i) => {
        return(
          <button
            key={i}
            style={{ top: label[1], left: label[0] }}
            className={
              'absolute bg-zinc-100 rounded-md w-20 h-6 text-sm text-zinc-700 transition-all hover:font-bold hover:text-zinc-800 hover:bg-zinc-200'
              + (loaded ? ' opacity-100' : ' opacity-0 translate-y-1')
            }
          >{labelData[i]}
          </button>
        );
      })}
      <div className={'relative size-[250px]'}>
        {!loaded && (
          <>
            <div
              id={'GLRadarChartLoading'}
              style={{ clipPath: createClipPathCSS(6, 0.96), backgroundColor: `rgba(${ loadingStyle.outlineColor?.join(',') })` }}
              className={'absolute top-0 size-full border-zinc-400 bg-zinc-200'}
            />
            <div
              id={'GLRadarChartLoading'}
              style={{ clipPath: createClipPathCSS(6, 0.94), backgroundColor: `rgba(${ loadingStyle.backgroundColor?.join(',') })` }}
              className={'absolute top-0 flex size-full items-center justify-center border-zinc-400 bg-zinc-200 text-3xl font-bold text-zinc-400'}
            />
          </>
        )}
        <canvas
          ref={chartRef}
          width={'1000'}
          height={'1000'}
          className={'absolute top-0 size-full'}
        />
        {loaded && error && (
          <div className={'absolute top-0 flex size-full items-center justify-center text-3xl font-bold text-zinc-300'}>
            {'?'}
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(GLRadarChart);