import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import '../../styles/Carousel.css';

export const Carousel = ({ 
  items, 
  baseWidth = 300, 
  autoplay = true, 
  autoplayDelay = 3000, 
  pauseOnHover = true,
  loop = true,
  round = false,
  showArrows = true 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!autoplay || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex === items.length - 1) {
          return loop ? 0 : prevIndex;
        }
        return prevIndex + 1;
      });
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, isPaused, items.length, loop]);

  const handleDragEnd = (event, info) => {
    const threshold = baseWidth * 0.2;
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (info.offset.x < 0 && currentIndex < items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (loop) {
      setCurrentIndex(items.length - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (loop) {
      setCurrentIndex(0);
    }
  };

  return (
    <div 
      className="carousel-container"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Navigation Arrows */}
      {showArrows && items.length > 1 && (
        <>
          <button 
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrevious}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>
      )}

      <motion.div
        className="carousel-track"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={{ x: -currentIndex * baseWidth }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <AnimatePresence mode="sync">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className={`carousel-item ${round ? 'round' : ''}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: index === currentIndex ? 1 : 0.5,
                scale: index === currentIndex ? 1 : 0.8,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              style={{ width: baseWidth }}
            >
              <div className="carousel-item-content">
                {item.image && (
                  <div className="carousel-icon-container">
                    <img src={item.image} alt={item.name} className="carousel-icon" />
                  </div>
                )}
                <h3 className="carousel-item-title">{item.name}</h3>
                <p className="carousel-item-role">{item.role}</p>
                <p className="carousel-item-company">{item.company}</p>
                <p className="carousel-item-description">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="carousel-indicators">
        {items.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}; 