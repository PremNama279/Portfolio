import '../styles/NeonText.css';

const NeonText = () => {
  // Fixed colors - no animation
  const greetingStyleRed= {
    color: '#E63946', // Gold color for "HEY 👋 I'M"
    textShadow: '0 0 10pxrgba(255, 0, 64, 0.6)'
  };
  const greetingStyleGrey= {
    color: '#BDBDBD', // White color for "OM VERMA"
    textShadow: 'none'
  };

  return (
    <div className="neon-text-container">
      <div className="hero-heading-block align-block">
        <div className="hero-line hero-line1">
          <div className="static-greeting">
            <span className="hero-red" style={greetingStyleRed}>HEY 👋 I'M </span>
            <span className="hero-grey" style={greetingStyleGrey}> Prem</span>
          </div>
        </div>
        <div className="hero-line hero-line2">
          <div className="static-text">
            <span className="hero-red" style={greetingStyleRed}>TECHIE &</span>
            <span className="hero-grey" style={greetingStyleGrey}>  DEVELOPER</span>
          </div>
        </div>
        <div className="hero-line hero-line3">
          <div className="hero-tagline">
            <span className="hero-tagline-text">Turning Data into Decisions & Ideas into Intelligent Systems.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeonText; 