import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Routes from '@/routes';

import GitHubIcon from '@icons/GitHub';
import MoonIcon from '@icons/Moon';
import SunIcon from '@icons/Sun';
import BackTop from '@components/BackTop';

export default function BaseLayout() {
  const [themeMode, setThemeMode] = useState('system'); // 'system', 'light', 'dark'
  const navigate = useNavigate();
  const themeModeRef = useRef(themeMode); // Create a ref to hold the current themeMode

  // Update the ref whenever themeMode changes
  useEffect(() => {
    themeModeRef.current = themeMode;
  }, [themeMode]);

  const getAppliedTheme = (mode: string) => {
    if (mode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dracula' : 'cupcake';
    } else {
      return mode === 'dark' ? 'dracula' : 'cupcake';
    }
  };

  const applyTheme = (mode: string) => {
    const html = document.documentElement;
    const applied = getAppliedTheme(mode);
    html.setAttribute('data-theme', applied);
    if (applied === 'dracula') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('theme', mode);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme === 'dracula' ? 'dark' : (savedTheme === 'cupcake' ? 'light' : 'system');
    setThemeMode(initialTheme);
    applyTheme(initialTheme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      // Use the ref to get the current themeMode
      if (themeModeRef.current === 'system') {
        applyTheme('system'); // Re-apply if system preference changes
      }
    };
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []); // Empty dependency array - runs only once on mount

  const toggleTheme = () => {
    setThemeMode((prevMode) => {
      const newMode = prevMode === 'system' ? 'light' : (prevMode === 'light' ? 'dark' : 'system');
      applyTheme(newMode);
      return newMode;
    });
  };

  return (
    <div className="flex flex-col bg-base-100 text-slate-600 dark:text-slate-400 overflow-hidden h-full">
      <header className="fixed bg-base-100 px-4 lg:px-8 top-0 z-30 flex h-16 w-full justify-between items-center bg-opacity-90 backdrop-blur transition-all duration-100 [transform:translate3d(0,0,0)] shadow-sm dark:shadow-slate-500/20">
        <img
          alt="GPTHub"
          className="w-10 h-10 select-none" src="/gpthub.png"
          onClick={() => navigate('/')}
        />
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="w-[22px] h-[22px] cursor-pointer rounded flex items-center justify-center">
            {themeMode === 'dark' || (themeMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? (
              <MoonIcon size={22} />
            ) : (
              <SunIcon size={22} />
            )}
          </button>
          <a
            href="https://github.com/ren-418/Custom-GPT-Plugin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-[28px] h-[28px]"
            title="GitHub"
          >
            <GitHubIcon size={28} />
          </a>
          <a
            href="https://chat.openai.com/g/g-e2bIguMqf-findgpt"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-[26px] h-[26px] border border-slate-300 rounded-full"
            title="FindGPT by ren"
          >
            <img
              alt="FindGPT"
              className="select-none rounded-full w-[26px]" src="/findgpt.png"
              onClick={() => navigate('/')}
            />
          </a>
          <a href="https://www.producthunt.com/posts/gpthub?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-gpthub" target="_blank" rel="noopener noreferrer">
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=424710&theme=light" alt="GPTHub | Product Hunt"
              className="w-[140px]"
            />
          </a>
        </div>
      </header>
      <div className="h-16"></div>
      <main className="flex-grow px-6 lg:max-w-screen-2xl m-auto flex items-center justify-center">
        <Routes />
      </main>
      <BackTop />
      <footer className="h-10"></footer>
    </div>
  )
}