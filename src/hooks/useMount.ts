import { useEffect, useRef, useState } from "react";

type fnType = (this: unknown, ...args: unknown[]) => unknown;

const useMount = <T extends fnType>(fn: T) => {
  const [mounted, setMounted] = useState(false);

  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => {
    if (mounted) {
      fnRef.current();
    }
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);
};

export default useMount;
