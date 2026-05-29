import { useEffect, useRef } from "react";
import gsap from "gsap";

const GsapLoader = ({
  label = "Loading...",
  className = "",
}) => {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return undefined;

    const dots = rootRef.current.querySelectorAll(
      ".gsap-loader-dot"
    );

    const ctx = gsap.context(() => {
      gsap.set(dots, {
        transformOrigin: "50% 50%",
      });

      gsap.timeline({ repeat: -1 }).to(dots, {
        y: -10,
        scale: 1.08,
        duration: 0.35,
        ease: "power2.out",
        stagger: {
          each: 0.1,
          yoyo: true,
          repeat: 1,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className={`
      inline-flex
      flex-col
      items-center
      gap-3
      ${className}
      `}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="flex items-center gap-2">
        <span className="gsap-loader-dot w-3 h-3 rounded-full bg-blue-500" />
        <span className="gsap-loader-dot w-3 h-3 rounded-full bg-cyan-500" />
        <span className="gsap-loader-dot w-3 h-3 rounded-full bg-indigo-500" />
      </div>
      <p className="text-sm text-gray-500 dark:text-slate-400">
        {label}
      </p>
    </div>
  );
};

export default GsapLoader;
