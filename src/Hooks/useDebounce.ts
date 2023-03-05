import {useState} from "react";

export function usePromiseDebounce<T>(fn: (...args: any) => Promise<T>, delay: number = 500): (...args: any) => Promise<T> {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>()

  return function (...args: any): Promise<T> {
    if (timeoutId)
      clearTimeout(timeoutId);

    return new Promise((resolve) => {
      setTimeoutId(setTimeout(() => resolve(fn(...args)),
        delay));
    })
  }
}
