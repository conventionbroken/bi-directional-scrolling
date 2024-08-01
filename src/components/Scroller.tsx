import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ScrollerProps } from '../interfaces/ScrollerProps';

export const Scroller = <Item,>({
  hasMoreNextData,
  hasMorePreviousData,
  nextData,
  previousData,
  loadData,
  nextSkeleton,
  previousSkeleton,
  data,
  renderItem,
}: ScrollerProps<Item>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousScrollHeight = useRef<number>(0);
  const previousScrollTop = useRef<number>(0);
  const isLoadingNext = useRef(false);
  const isLoadingPrevious = useRef(false);
  const [isScrollingFast, setIsScrollingFast] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollHeight = container.scrollHeight;
    const scrollTop = container.scrollTop;
    const clientHeight = container.clientHeight;

    if (
      previousScrollTop.current - scrollTop > 6000 ||
      previousScrollTop.current - scrollTop < -6000
    )
      setIsScrollingFast(true);
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      setIsScrollingFast(false);
    }, 150);

    // Check if scrolled to the top and has more previous data
    if (scrollTop < 300 && hasMorePreviousData && !isLoadingPrevious.current) {
      isLoadingPrevious.current = true;
      previousScrollTop.current = scrollTop;
      previousData();
    }

    if (
      scrollTop > scrollHeight - clientHeight - 300 &&
      hasMoreNextData &&
      !isLoadingNext.current
    ) {
      isLoadingNext.current = true;
      previousScrollTop.current = scrollTop;
      nextData();
    }

    previousScrollHeight.current = scrollHeight;
  }, [hasMoreNextData, hasMorePreviousData, nextData, previousData]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const newScrollHeight = container.scrollHeight;
    if (isLoadingNext.current) {
      container.scrollTop +=
        newScrollHeight - previousScrollHeight.current - 600;
    } else
      container.scrollTop =
        container.scrollTop > 500 ? container.scrollTop : 500;
    // Reset loading state after data has been added
    isLoadingNext.current = false;
    isLoadingPrevious.current = false;

    // handleScroll();
  }, [data, handleScroll]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{ overflowY: 'auto', height: '100%' }}
    >
      {hasMorePreviousData &&
        Array(0)
          .fill(previousSkeleton)
          .map((skeleton, index) => <div key={index}>{skeleton}</div>)}
      {isScrollingFast
        ? Array(data.length)
            .fill(nextSkeleton)
            .map((skeleton, index) => <div key={index}>{skeleton}</div>)
        : data.map(renderItem)}
      {hasMoreNextData &&
        Array(0)
          .fill(nextSkeleton)
          .map((skeleton, index) => <div key={index}>{skeleton}</div>)}
    </div>
  );
};
