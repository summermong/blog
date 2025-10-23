import { getPostData, getAllPostSlugs } from '../../../lib/posts';
import { Metadata } from 'next';
import Link from 'next/link';
import { format } from 'date-fns';
import { TableOfContents } from '@/components/TableOfContents';
import { Comments } from '@/components/Comments';

export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts.map(post => ({
    slug: post.params.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);
  return {
    title: post.title,
    description: post.excerpt,
    icons: {
      icon: '/images/favicon.ico',
    },
  };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostData(slug);

  return (
    <div className=' bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-6xl mx-auto px-6 py-6'>
        <nav className='mb-4 flex items-center justify-between'>
          <Link
            href='/'
            className='text-lime-600 dark:text-lime-400 hover:text-lime-800 dark:hover:text-lime-300 transition-colors flex items-center gap-2'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 19l-7-7m0 0l7-7m-7 7h18'
              />
            </svg>
            돌아가기
          </Link>
        </nav>

        <div className='flex gap-12'>
          {/* 메인 콘텐츠 */}
          <article className='flex-1 min-w-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12'>
            <header className='mb-12 pb-8 border-b border-gray-200 dark:border-gray-700'>
              <h1 className='text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100'>
                {post.title}
              </h1>
              <div className='flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-4'>
                <time className='flex items-center gap-2'>
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                  {format(new Date(post.date), 'yyyy년 MM월 dd일')}
                </time>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className='flex gap-2 flex-wrap'>
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className='px-4 py-1.5 text-sm font-medium bg-lime-600 dark:bg-gray-700 text-white rounded-full'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <div
              className='prose prose-lg dark:prose-invert'
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <Comments />
          </article>

          {/* 목차 (TOC) */}
          <aside className='hidden xl:block flex-shrink-0'>
            <TableOfContents toc={post.toc} />
          </aside>
        </div>
      </div>
    </div>
  );
}
