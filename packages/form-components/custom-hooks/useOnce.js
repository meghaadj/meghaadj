import { useState } from "react";

export const useOnce = (callback) => {
  const [isFirstTime, setIsFirstTime] = useState(true);

  if (isFirstTime) {
    callback();
    setIsFirstTime(false);
  }

  return;
};
