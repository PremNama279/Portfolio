import { useState } from "react";
import "./App.css";
import Anisquares from "./components/Anisquares";
import BackgroundParticles from "./components/BackgroundParticles";
import Lightning from './components/Lightning';
import Waves from "./components/Waves";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Hero from "./pages/Hero";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

const AppContent = () => {
  const { darkMode } = useTheme();
  const [currentBackground, setCurrentBackground] = useState("particles");

  const renderBackground = (background) => {
    switch (background) {
      case 'particles':
        return <BackgroundParticles />;
      case 'waves':
        return (
          <Waves
            lineColor={darkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)"}
            backgroundColor="transparent"
            waveSpeedX={0.0125}
            waveSpeedY={0.005}
            waveAmpX={32}
            waveAmpY={16}
            friction={0.925}
            tension={0.005}
            maxCursorMove={100}
            xGap={10}
            yGap={32}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: -1,
              pointerEvents: 'none',
              overflow: 'hidden'
            }}
          />
        );
      case 'anisquares':
        return <Anisquares 
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor="rgba(255, 255, 255, 0.1)"
          hoverFillColor="rgba(255, 255, 255, 0.2)"
          className="anisquares-background interactive"
          style={{
            pointerEvents: 'auto'
          }}
        />;
      case 'lightning':
        return (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
            <Lightning
              hue={darkMode ? 220 : 180}
              xOffset={0}
              speed={1}
              intensity={1}
              size={1}
            />
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <>
      {renderBackground(currentBackground)}
      <div className={`app-container ${darkMode ? "dark-theme" : "light-theme"}`}>
        <Navbar currentBackground={currentBackground} onBackgroundChange={setCurrentBackground} />
        <Hero />
        <About />
        <Services />
        <Projects />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default App;
