import { useState } from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    console.log("isShowing : " + isShowing);
    setIsShowing(!isShowing);
    console.log("isShowing2 " +isShowing)
  }

  return {
    isShowing,
    setIsShowing
  };
};

export default useModal;
