import { useEffect, useRef, useState } from "react";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  siteKey: string;
  theme?: "light" | "dark" | "auto";
  className?: string;
}

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement | string, options: any) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export function TurnstileWidget({
  onVerify,
  siteKey,
  theme = "dark",
  className = ""
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkTurnstileLoaded = setInterval(() => {
      if (window.turnstile) {
        setIsLoaded(true);
        clearInterval(checkTurnstileLoaded);
      }
    }, 100);

    return () => clearInterval(checkTurnstileLoaded);
  }, []);

  useEffect(() => {
    if (!isLoaded || !containerRef.current || widgetIdRef.current) return;

    widgetIdRef.current = window.turnstile!.render(containerRef.current, {
      sitekey: siteKey,
      theme: theme,
      callback: (token: string) => {
        onVerify(token);
      },
    });

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [isLoaded, siteKey, theme, onVerify]);

  return (
    <div
      ref={containerRef}
      className={`flex justify-center items-center ${className}`}
    />
  );
}
