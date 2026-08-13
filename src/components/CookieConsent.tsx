'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/language-context';

const STORAGE_KEY = 'nestline-consent';

const copy = {
  en: {
    text: 'We use cookies to improve your experience. By continuing, you agree to our',
    link: 'Privacy Policy',
    accept: 'Accept',
    decline: 'Decline',
  },
  fr: {
    text: 'Nous utilisons des témoins pour améliorer votre expérience. En continuant, vous acceptez notre',
    link: 'Politique de confidentialité',
    accept: 'Accepter',
    decline: 'Refuser',
  },
};

export default function CookieConsent() {
  const { lang, href } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [animIn, setAnimIn] = useState(false);
  const tx = copy[lang];

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => setTimeout(() => setAnimIn(true), 10));
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss(choice: 'accepted' | 'declined') {
    localStorage.setItem(STORAGE_KEY, choice);
    setAnimIn(false);
    setTimeout(() => setVisible(false), 300);
  }

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 max-w-sm w-full transition-all duration-300 ${
        animIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-2xl">
        <p className="text-sm text-white/60 leading-relaxed mb-4">
          {tx.text}{' '}
          <a
            href={href("/privacy-policy")}
            className="text-[#2ee6a6] hover:underline"
          >
            {tx.link}
          </a>
          .
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => dismiss('accepted')}
            className="flex-1 py-2 rounded-full bg-[#2ee6a6] text-black text-sm font-bold hover:bg-[#2ee6a6]/90 transition-colors"
          >
            {tx.accept}
          </button>
          <button
            onClick={() => dismiss('declined')}
            className="flex-1 py-2 rounded-full border border-white/15 text-white/50 text-sm font-medium hover:border-white/30 hover:text-white/70 transition-colors"
          >
            {tx.decline}
          </button>
        </div>
      </div>
    </div>
  );
}
