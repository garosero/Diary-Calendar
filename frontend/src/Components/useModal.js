import { useState } from "react";

const useModal = () => {
  const [isShowing, setisShowing] = useState(false);

  function toggle() {
    console.log("useModal isShowing : " + isShowing);
    setisShowing(!isShowing);
    console.log("useModal isShowing2 " +isShowing)
  }

  return {
    isShowing,
    setisShowing,
    toggle
  };
};

export default useModal;
