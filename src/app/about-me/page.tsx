import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Me | SUMMERMONG.',
  description: '프론트엔드 개발자 썸머몽입니다. 🍀',
  icons: {
    icon: '/images/favicon.ico',
  },
};

export default function page() {
  return (
    <div className=' bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-3xl mx-auto py-16 px-6'>
        <Image
          src='/images/logo.webp'
          alt='프로필'
          width={200}
          height={200}
          className='rounded-full mx-auto mb-8'
          priority
        />
        <div>
          안녕하세요! <br />
          프론트엔드 개발자 썸머몽입니다. 🍀
          <br />
          <br />
          마케터에서 개발자로 전직하며 다양한 서비스를 만들었습니다.
          기획/디자인/마케팅/CS 등 폭넓은 경험을 하면서 기술적 완성도 뿐만
          아니라{' '}
          <span className='text-lime-600'>
            서비스 전체의 흐름을 이해하고, 어떻게 해야 유저 만족도를 높일 수
            있는지 고민하는 것이 중요하다
          </span>
          는 것을 배웠습니다.
          <br />
          <br />
          더불어{' '}
          <span className='text-lime-600'>
            의미 있는 성장과 원활한 협업은 합리적인 근거와 수치를 기반으로 해야
            한다
          </span>
          는 것을 배웠습니다. 코드를 고치든, 새로운 기술을 도입하든 어떤
          액션에는 반드시 합당한 이유와 그를 입증하는 데이터가 따라야 한다고
          생각합니다.
          <br />
          <br />
          2023년도부터 누적 활성 사용자 278만의 서비스{' '}
          <Link className='text-pink-400' href='https://gomgomdiary.site/'>
            [곰곰 다이어리]
          </Link>{' '}
          를 운영하고 있습니다. :)
        </div>
      </div>
    </div>
  );
}
