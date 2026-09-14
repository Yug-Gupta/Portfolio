import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  id?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.35,
  onClick,
  id,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    setPosition({
      x: distanceX * strength,
      y: distanceY * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={buttonRef}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 250, damping: 15, mass: 0.2 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

