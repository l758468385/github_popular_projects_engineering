import { useState, useEffect, useRef } from 'react';
import React from 'react';
import LanguagesNav from './LanguagesNav';
import Loading from './Loading';
import { fetchPopularRepos } from '@/utils';
import ReposGrid from './ReposGrid';

function useFetch(selectedLanguage: string) {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const previousLanguage = useRef<string>(selectedLanguage);

  useEffect(() => {
    if (previousLanguage.current !== selectedLanguage) {
      previousLanguage.current = selectedLanguage;
      setRepos([]);
      setPage(1);
      setError(null);
    }

    if (repos.length > 0) return;

    setLoading(true);
    fetchPopularRepos(selectedLanguage, 1)
      .then((data: []) => {
        setRepos(data);
        setPage(1);
        setLoading(false);
        setError(null);
      })
      .catch((error: Error) => {
        console.warn('Error fetching repos:', error);
        setError('Error fetching data. Try again');
        setLoading(false);
      });
  }, [selectedLanguage]);

  const loadMore = () => {
    setLoadingMore(true);
    const nextPage = page + 1;

    fetchPopularRepos(selectedLanguage, nextPage)
      .then((data: []) => {
        setRepos((prevRepos) => [...prevRepos, ...data]);
        setPage(nextPage);
        setLoadingMore(false);
        setError(null);
      })
      .catch(() => {
        window.scrollBy(0, -50);
        setError('Error fetching data. Try again');
        setTimeout(() => {
          setLoadingMore(false);
        });
      });
  };

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadingMore) {
          loadMore();
        }
      },
      {
        threshold: 1.0,
      }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [repos, selectedLanguage, loadingMore]);

  return {
    repos,
    loading,
    error,
    loadingMore,
    sentinelRef,
  };
}

export default function Popular() {
  const getLanguageFromUrl = (): string => {
    const params = new URLSearchParams(window.location.search);
    return params.get('language') || 'All';
  };

  const localLanguage = getLanguageFromUrl();
  const language = localLanguage || 'All';

  const [selectedLanguage, setSelectedLanguage] = useState<string>(language);
  const { repos, loading, error, loadingMore, sentinelRef } = useFetch(selectedLanguage);

  const updateLanguage = (lg: string) => {
    history.pushState(null, null, '?language=' + lg);
    setSelectedLanguage(lg);
  };

  return (
    <>
      <LanguagesNav selected={selectedLanguage} onUpdateLanguage={updateLanguage} />
      {repos.length > 0 && <ReposGrid repos={repos} />}
      {(loadingMore || loading) && <Loading text="努力加载中..." />}
      {error && <p className="center-text error">{error}</p>}
      {repos.length > 0 && <div ref={sentinelRef} style={{ height: '4px' }}></div>}
    </>
  );
}
