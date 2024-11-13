import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useBeforeUnload = (callback: () => void, when: boolean = true) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (when) {
        callback();

        navigate("/", { replace: true, state: null });
        e.preventDefault();
        e.returnValue = ""; // This is needed for Chrome to trigger the prompt
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [callback, navigate, when]);
};

export default useBeforeUnload;
