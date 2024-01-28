import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      className="bg-orange-700 text-center lg:text-left">
      <div className="p-4 text-center text-neutral-700 dark:text-neutral-200 flex-direction-column">
        © 2023 Copyright:
        <Link
          className="text-neutral-800 dark:text-neutral-400"
          to="/"
        > PS Group 71</Link>
        <br />
        <Link
        className='text-neutral-800 dark:text-neutral-400'
        to='/contact-us'>Contact Us</Link>
        <Link
        className='text-neutral-800 dark:text-neutral-400'
        to='/faq'>FAQ</Link>
      </div>
    </footer>
  );
}