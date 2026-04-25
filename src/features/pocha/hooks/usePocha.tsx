'use client';
import useSWR from 'swr';
import { getPochaInfo } from '@/apis/pocha/queries';

// types
import { PochaInfo } from '@/types/pocha';
import { HookStatus } from './types';

/**
 * @desc hook to fetch pocha information (getPochaInfo) for "today"
 *
 * Uses a stable SWR key so other parts of the app can revalidate via
 * `mutate('/pocha/status-info/today')` after a create/update.
 */
const usePocha = () => {
  const { data, error, isLoading } = useSWR<PochaInfo>(
    '/pocha/status-info/today',
    () => getPochaInfo(new Date())
  );

  let status: HookStatus = 'loading';
  if (error) {
    status = 'error';
  } else if (!isLoading && data !== undefined) {
    status = 'success';
  }

  const errorMessage = error
    ? error instanceof Error
      ? error.message
      : 'An unexpected error occurred.'
    : undefined;

  return {
    pochaInfo: data,
    status,
    error: errorMessage,
  };
};

export default usePocha;
