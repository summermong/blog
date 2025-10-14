import { getSortedPostsData } from '@/lib/posts';
import { PostList } from '@/components/PostList';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className=' bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-4xl mx-auto py-12 px-6'>
        <div className='text-center mb-16'>
          <h1 className='text-3xl font-bold text-lime-600 dark:text-gray-100 mb-4'>
            SUMMERMONG. 🍀
          </h1>
          <p className='text-md text-gray-600 dark:text-gray-400'>
            안녕하세요, 프론트엔드 개발자 썸머몽입니다.
          </p>
        </div>

        <main>
          <section>
            <h2 className='text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6'>
              📝 Posts
            </h2>
            <PostList posts={allPostsData} />
          </section>
        </main>
      </div>
    </div>
  );
}
