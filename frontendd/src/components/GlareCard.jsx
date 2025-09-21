import React, { useRef, useState } from "react";
import { cn } from "../utils/utils";

const variants = {
  default: "bg-gradient-to-br from-gray-900 to-gray-800",
  primary: "bg-gradient-to-br from-blue-900 to-blue-800 border-0 aspect-square",
  secondary: "bg-gradient-to-br from-purple-900 to-purple-800",
  success: "bg-gradient-to-br from-green-900 to-green-800",
  warning: "bg-gradient-to-br from-yellow-900 to-yellow-800",
  danger: "bg-gradient-to-br from-red-900 to-red-800",
};

const sizes = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const GlareCard = ({
  children,
  className,
  variant = "default",
  size = "md",
  intensity = 0.1,
  rotation = true,
  glare = true,
  background = true,
  border = false,
  starBorder = false,
  ...props
}) => {
  const glareRef = useRef(null);
  const backgroundRef = useRef(null);
  const rotationRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e) => {
    if (!glareRef.current || !backgroundRef.current || !rotationRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    if (rotation) {
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      rotationRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${intensity}) 0%, transparent 50%)`;
    }

    if (background) {
      const bgX = (x / rect.width) * 100;
      const bgY = (y / rect.height) * 100;
      backgroundRef.current.style.background = `radial-gradient(circle at ${bgX}% ${bgY}%, rgba(255,255,255,${intensity * 0.5}) 0%, transparent 50%)`;
    }
  };

  const handlePointerLeave = () => {
    if (!glareRef.current || !backgroundRef.current || !rotationRef.current) return;
    
    if (rotation) {
      rotationRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }
    if (glare) {
      glareRef.current.style.background = "transparent";
    }
    if (background) {
      backgroundRef.current.style.background = "transparent";
    }
    setIsHovered(false);
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const cardContent = (
    <div
      className={cn(
        "w-full relative overflow-hidden rounded-none transition-all duration-300",
        variants[variant],
        sizes[size],
        border && "border border-gray-700/50",
        className
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerEnter={handlePointerEnter}
      style={{
        transformStyle: "preserve-3d",
      }}
      {...props}
    >
      {background && (
        <div
          ref={backgroundRef}
          className="absolute inset-0 transition-all duration-300"
        />
      )}
      {glare && (
        <div
          ref={glareRef}
          className="absolute inset-0 transition-all duration-300"
        />
      )}
      <div
        ref={rotationRef}
        className="relative w-full h-full transition-transform duration-300"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );

  if (starBorder) {
    return (
      <div className="relative">
        <div className="absolute inset-0 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        {cardContent}
      </div>
    );
  }

  return cardContent;
}; 