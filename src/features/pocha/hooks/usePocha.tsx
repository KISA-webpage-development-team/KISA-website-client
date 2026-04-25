'use client';
import { useCallback, useEffect, useState } from 'react';
import { getPochaInfo } from '@/apis/pocha/queries';

// types
import { PochaInfo } from '@/types/pocha';
import { HookStatus } from './types';

/**
 * @desc hook to fetch pocha information (getPochaInfo).
 *
 * Returns a `refetch` function so callers (e.g. PochaForm after a successful
 * create/update) can re-run the query without a full page reload. SWR is
 * intentionally not used here — this hook has a single consumer
 * (`/pocha/manage`), so the cache-sharing/revalidation benefits don't apply,
 * and a plain useState/useEffect with an exposed refetch matches the
 * codebase's prevailing pattern for single-consumer hooks.
 */
const usePocha = () => {
  const [status, setStatus] = useState<HookStatus>('loading');
  const [pochaInfo, setPochaInfo] = useState<PochaInfo>();
  const [error, setError] = useState<string>();

  const fetchPochaInfo = useCallback(async () => {
    setStatus('loading');
    setError(undefined);
    try {
      const res = await getPochaInfo(new Date());
      setPochaInfo(res);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  }, []);

  useEffect(() => {
    fetchPochaInfo();
  }, [fetchPochaInfo]);

  return {
    pochaInfo,
    status,
    error,
    refetch: fetchPochaInfo,
  };
};

export default usePocha;
