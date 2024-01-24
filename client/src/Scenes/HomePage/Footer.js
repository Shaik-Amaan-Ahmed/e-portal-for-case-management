import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-orange-700 ">
      <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
        © 2023 Copyright:
        <a className="text-neutral-800 dark:text-neutral-400" href="/">
          PS Group 71
        </a>
      </div>
      <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
        <a className="text-neutral-800 dark:text-neutral-400 hover:text-blue-500 underline mr-4" href="/contactus">Contact Us</a>
        <a className="text-neutral-800 dark:text-neutral-400 hover:text-blue-500 underline" href="/faq">FAQ</a>
      </div>
    </footer>
  );
}