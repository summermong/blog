'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export function Header() {
  const pathname = usePathname();

  const navigation = [{ name: 'About me', href: '/about-me' }];

  return (
    <header className='sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800'>
      <nav className='max-w-6xl mx-auto px-6 py-4'>
        <div className='flex items-center justify-between'>
          <Link href='/' className='flex items-center space-x-2 group'>
            <Image
              src='/images/logo.jpg'
              alt='내 블로그'
              className='rounded-4xl'
              width={40}
              height={40}
              priority
            />
          </Link>

          <div className='flex items-center space-x-1'>
            {navigation.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            <div className='ml-2 pl-2 border-l border-gray-200 dark:border-gray-700'>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
