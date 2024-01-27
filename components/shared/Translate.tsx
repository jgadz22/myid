"use client";

import { useEffect } from "react";

const Translate: React.FC = () => {
  const googleTranslateElementInit = () => {
    (window as any).googleTranslateElementInit = new (
      window as any
    ).google.translate.TranslateElement(
      {
        pageLanguage: "en",
        layout: (window as any).google.translate.TranslateElement.InlineLayout
          .VERTICAL,
      },
      "google_translate_element"
    );
  };

  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    (window as any).googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <div>
      <div id="google_translate_element"></div>
    </div>
  );
};

export default Translate;
