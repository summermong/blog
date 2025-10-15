'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export function Comments() {
  const { theme } = useTheme();

  return (
    <div className='mt-16 pt-8 border-t border-gray-200 dark:border-gray-700'>
      <Giscus
        repo='summermong/blog'
        repoId='R_kgDOQCXnQQ'
        category='General'
        categoryId='DIC_kwDOQCXnQc4Cwq6N'
        mapping='pathname'
        reactionsEnabled='1'
        emitMetadata='0'
        inputPosition='top'
        theme={theme === 'dark' ? 'dark' : 'light'}
        lang='ko'
        loading='lazy'
      />
    </div>
  );
}
