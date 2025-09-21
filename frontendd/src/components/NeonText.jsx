import '../styles/NeonText.css';

const NeonText = () => {
  // Fixed colors - no animation
  const greetingStyleYellow = {
    color: '#FFD700', // Gold color for "HEY 👋 I'M"
    textShadow: '0 0 10px #FFD70099'
  };
  const greetingStyleWhite = {
    color: '#FFFFFF', // White color for "OM VERMA"
    textShadow: 'none'
  };

  return (
    <div className="neon-text-container">
      <div className="hero-heading-block align-block">
        <div className="hero-line hero-line1">
          <div className="static-greeting">
            <span className="hero-yellow" style={greetingStyleYellow}>HEY 👋 I'M </span>
            <span className="hero-white" style={greetingStyleWhite}>Kushal</span>
          </div>
        </div>
        <div className="hero-line hero-line2">
          <div className="static-text">
            <span className="hero-yellow">TECHIE &</span>
            <span className="hero-white"> DEVELOPER</span>
          </div>
        </div>
        <div className="hero-line hero-line3">
          <div className="hero-tagline">
            <span className="hero-tagline-text">Building AI-Powered Solutions & Intelligent Applications</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeonText; 