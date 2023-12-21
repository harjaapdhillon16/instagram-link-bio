/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';

import axios from 'axios';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

import { generateRandomId } from '@/lib/random-id';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

const redirectUri = 'https://instaconnects.vercel.app/';

const InstagramAuth = () => {
  const handleLogin = () => {
    const clientId = '1393597341247005';
    window.location.href = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile&response_type=code`;
  };

  return (
    <>
      <button
        className='mx-auto flex w-[210px] items-center space-x-2 rounded-lg bg-[#050708] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#050708] focus:outline-none'
        onClick={handleLogin}
      >
        <span>Login with Instagram</span>
        <img
          className='h-4 w-4 rounded object-cover'
          src='https://img.freepik.com/premium-vector/modern-badge-logo-instagram-icon_578229-124.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1703116800&semt=ais'
        />
      </button>
    </>
  );
};

export default function HomePage() {
  const searchParams = useSearchParams();
  const [userData, setUserData] = useState<any>('');
  const instaDataFetch = useCallback(async (code_fixes: string) => {
    const {
      data: { data }
    } = await axios.post('/api/instafetch', {
      code: code_fixes,
      redirectUri: redirectUri,
      randomId: localStorage.getItem('random-id')
    });
    setUserData(data.username);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('random-id')) {
      localStorage.setItem('random-id', generateRandomId());
    }
    (async () => {
      const code = searchParams?.get('code');
      if (code) {
        await instaDataFetch(code);
      }
    })();
  }, [searchParams, instaDataFetch]);

  return (
    <main>
      <Head>
        <title>Instagram Connect</title>
      </Head>
      <section className='h-[100vh] bg-gradient-to-b from-blue-900 to-blue-600'>
        <p className='py-10 text-center font-sans text-4xl font-semibold text-white'>
          Instagram Profile Viewer
        </p>
        <div className='mx-auto w-[95%]'>
          {userData ? (
            <p className='text-white'>{userData}</p>
          ) : (
            <InstagramAuth />
          )}
        </div>
      </section>
    </main>
  );
}
