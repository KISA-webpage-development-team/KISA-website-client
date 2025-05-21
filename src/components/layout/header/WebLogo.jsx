import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

export default function WebLogo() {
    return (
      <Link href='/' className='flex flex-col items-start gap-0'>
        <Image
          src='/images/kisa_logo.png'
          alt='KISA Logo'
          width={48}
          height={48}
          className='object-contain'
        />
      </Link>
    );
}
