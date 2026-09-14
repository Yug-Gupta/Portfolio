import React, { useRef, useState } from 'react';

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareEffect?: boolean;
}

export const Card3DTilt: React.FC<Card3DTiltProps> = ({
  children,
  className = '',
  maxTilt = 10,
  glareEffect = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>('');
  const [dynamicShadow, setDynamicShadow] = useState<string>('');
  const [glareStyle, setGlareStyle] = useState<{ opacity: number; x: number; y: number }>({
    opacity: 0,
    x: 50,
    y: 50,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
    );

    // Directional shadow calculation tailored for warm light theme
    const shadowX = (-rotateY * 1.5).toFixed(1);
    const shadowY = (rotateX * 1.5 + 10).toFixed(1);
    const shadowBlur = (Math.abs(rotateX) + Math.abs(rotateY) + 18).toFixed(1);
    setDynamicShadow(
      `${shadowX}px ${shadowY}px ${shadowBlur}px -4px rgba(45, 35, 25, 0.12), 0 0 16px rgba(200, 138, 88, 0.08)`
    );

    if (glareEffect) {
      setGlareStyle({
        opacity: 0.3,
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      });
    }
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setDynamicShadow('');
    setGlareStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        boxShadow: dynamicShadow,
        transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden ${className}`}
    >
      <div style={{ transform: 'translateZ(8px)' }} className="w-full h-full">
        {children}
      </div>

      {/* Warm Spun Bronze / Sunlight Sheen on Tilt */}
      {glareEffect && (
        <div
          className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300 z-30"
          style={{
            opacity: glareStyle.opacity,
            background: `radial-gradient(circle 320px at ${glareStyle.x}% ${glareStyle.y}%, rgba(255, 255, 255, 0.6) 0%, rgba(200, 138, 88, 0.18) 40%, transparent 80%)`,
          }}
        />
      )}
    </div>
  );
};
