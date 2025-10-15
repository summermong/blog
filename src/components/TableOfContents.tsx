'use client';

import { useEffect, useState } from 'react';
import { TocItem } from '../../types/post';

interface TableOfContentsProps {
  toc: TocItem[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const headingElements = toc
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      entries => {
        // 클릭으로 스크롤 중일 때는 업데이트하지 않음
        if (isScrolling) return;

        // 화면에 보이는 heading 중 가장 위에 있는 것 찾기
        const visibleHeadings = entries
          .filter(entry => entry.isIntersecting)
          .map(entry => ({
            id: entry.target.id,
            top: entry.boundingClientRect.top,
          }))
          .sort((a, b) => a.top - b.top);

        if (visibleHeadings.length > 0) {
          setActiveId(visibleHeadings[0].id);
        }
      },
      {
        rootMargin: '-100px 0px -66% 0px',
        threshold: 0,
      }
    );

    headingElements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [toc, isScrolling]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveId(id);
    setIsScrolling(true);

    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // 헤더 높이 고려
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // 스크롤 완료 후 IntersectionObserver 다시 활성화
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  };

  if (toc.length === 0) {
    return null;
  }

  return (
    <nav className='hidden xl:block sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto'>
      <div className='w-48'>
        <h3 className='text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4'>
          🔖 On this page...
        </h3>
        <ul className='space-y-2 text-sm'>
          {toc.map(({ id, text, level }) => (
            <li
              key={id}
              className={`${level === 3 ? 'pl-4' : ''}`}
              style={{ paddingLeft: `${(level - 2) * 1}rem` }}
            >
              <a
                href={`#${id}`}
                onClick={e => handleClick(e, id)}
                className={`block py-1 pl-3 transition-colors ${
                  activeId === id
                    ? ' text-lime-600 dark:text-lime-400 font-medium'
                    : '  text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
