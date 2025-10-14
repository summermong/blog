'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { useState, useMemo } from 'react';
import { PostMeta } from '../../types/post';

interface PostListProps {
  posts: PostMeta[];
}

export function PostList({ posts }: PostListProps) {
  const [selectedTag, setSelectedTag] = useState<string>('ALL');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
    });
    return ['ALL', ...Array.from(tags)];
  }, [posts]);

  // 필터링된 포스트
  const filteredPosts = useMemo(() => {
    return selectedTag === 'ALL'
      ? posts
      : posts.filter(post => post.tags?.includes(selectedTag));
  }, [posts, selectedTag]);

  return (
    <>
      {/* 태그 필터 */}
      <div className='mb-8 flex gap-2 flex-wrap'>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
              selectedTag === tag
                ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 '
            }`}
          >
            {tag}
            {tag !== 'ALL' &&
              `(${posts.filter(p => p.tags?.includes(tag)).length})`}
          </button>
        ))}
      </div>

      {/* 모바일: 세로 나열 */}
      <div className='flex flex-col gap-6 md:hidden w-68 mx-auto'>
        {filteredPosts.map(
          ({ slug, title, date, excerpt, thumbnail, tags }) => (
            <Link key={slug} href={`/posts/${slug}`}>
              <article className='bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden dark:bg-gray-800'>
                {thumbnail && (
                  <div className='flex items-center justify-center p-4  bg-white dark:bg-gray-800'>
                    <div className='relative w-[240px] h-[240px] overflow-hidden rounded'>
                      <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        className='object-cover'
                      />
                    </div>
                  </div>
                )}
                <div className='bg-white dark:bg-gray-800 p-6'>
                  <h3 className='text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100 '>
                    {title}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400 line-clamp-2 mb-2'>
                    {excerpt}
                  </p>
                  <div className='flex flex-col  justify-between'>
                    <div className='flex gap-2 flex-wrap'>
                      {tags &&
                        tags.map(tag => (
                          <span
                            key={tag}
                            className='px-3 py-1 text-xs font-medium bg-lime-600 dark:bg-gray-700 text-white rounded-full'
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                    <p className='text-gray-500 dark:text-gray-500 text-sm font-medium py-2'>
                      {format(new Date(date), 'yyyy.MM.dd')}
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          )
        )}
      </div>

      {/* PC: 2열 그리드 */}
      <div className='hidden md:grid md:grid-cols-2 gap-6'>
        {filteredPosts.map(
          ({ slug, title, date, excerpt, thumbnail, tags }) => (
            <Link key={slug} href={`/posts/${slug}`}>
              <article className='bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex h-full dark:bg-gray-800'>
                {thumbnail && (
                  <div className='flex items-center justify-center p-4  bg-white dark:bg-gray-800'>
                    <div className='relative w-[180px] h-[180px] overflow-hidden rounded'>
                      <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        className='object-cover'
                      />
                    </div>
                  </div>
                )}
                <div className='py-4 pr-4 flex-1 flex flex-col bg-white dark:bg-gray-800'>
                  <h3 className='text-xl font-bold  text-gray-900 dark:text-gray-100 hover:text-lime-600 dark:hover:text-lime-400 transition-colors line-clamp-2'>
                    {title}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400line-clamp-2 flex-1'>
                    {excerpt}
                  </p>
                  <div className='flex flex-col  justify-between mt-auto pt-4'>
                    <div className='flex gap-2 flex-wrap'>
                      {tags &&
                        tags.map(tag => (
                          <span
                            key={tag}
                            className='px-3 py-1 text-xs font-medium bg-lime-600 dark:bg-gray-700 text-white rounded-full'
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                    <p className='text-gray-500 dark:text-gray-500 text-sm font-medium whitespace-nowrap text-left py-2'>
                      {format(new Date(date), 'yyyy.MM.dd')}
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          )
        )}
      </div>
    </>
  );
}
