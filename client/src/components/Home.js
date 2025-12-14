import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleViewMenu = () => {
    // Check if a session exists
    if (localStorage.getItem('userEmail')) {
      navigate('/dashboard');
    } else {
      // Redirect to login if not authenticated
      navigate('/login');
    }
  };

  return (
    <div style={styles.container}>
      
      {/* --- ENHANCED FLOATING BACKGROUND ANIMATION --- */}
      <div style={styles.floatingContainer}>
         {/* --- Layer 1: Background (Slow, blurred, small) --- */}
         <div className="float-item layer-back item-1" style={styles.sweetWrapper}>
            <img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400" alt="Donut" style={styles.sweetImg} />
         </div>
         <div className="float-item layer-back item-2" style={styles.sweetWrapper}>
            <img src="https://images.unsplash.com/photo-1606313564200-e75d5e30476d?w=400" alt="Brownie" style={styles.sweetImg} />
         </div>

         {/* --- Layer 2: Midground (Normal speed/size) --- */}
         <div className="float-item layer-mid item-3" style={styles.sweetWrapper}>
            <img src="https://images.unsplash.com/photo-1569864372136-348990f97802?w=500" alt="Macarons" style={styles.sweetImg} />
         </div>
         <div className="float-item layer-mid item-4" style={styles.sweetWrapper}>
            <img src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500" alt="Cupcake" style={styles.sweetImg} />
         </div>

         {/* --- Layer 3: Foreground (Faster, sharp, larger) --- */}
         <div className="float-item layer-front item-5" style={styles.sweetWrapper}>
            <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600" alt="Cake Slice" style={styles.sweetImg} />
         </div>
      </div>

      {/* --- MAIN CONTENT CARD --- */}
      <div style={styles.glassCard} className="entrance-anim">
          {/* Logo */}
          <h1 style={styles.brand}>GoldenCrust<span style={{color: '#d4a373'}}>.</span></h1>
          
          {/* Hero Text */}
          <h2 style={styles.headline}>
            Baking Life <br/>
            <span style={{color: '#d4a373'}}>Sweeter.</span>
          </h2>
          <p style={styles.subtext}>
            Handcrafted pastries, artisan cakes, and daily fresh breads. 
            Join our club to enter our world of sweetness.
          </p>

          {/* --- ACTION BUTTONS --- */}
          <div style={styles.buttonGroup}>
            <button onClick={handleViewMenu} className="aerial-btn primary-btn">
              📖 View Menu
            </button>
            
            <div style={styles.secondaryActions}>
              <Link to="/login" style={{flex: 1}}>
                <button className="aerial-btn secondary-btn" style={{width: '100%'}}>Login</button>
              </Link>
              <Link to="/register" style={{flex: 1}}>
                <button className="aerial-btn outline-btn" style={{width: '100%'}}>Register</button>
              </Link>
            </div>
          </div>
      </div>

    </div>
  );
};

// --- STYLES ---
const styles = {
  container: {
    position: 'relative',
    height: '100vh', width: '100vw',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    // A slightly richer radial gradient for better contrast
    background: 'radial-gradient(circle at center, #fffbf0 0%, #f6e6c9 100%)',
    fontFamily: "'Poppins', sans-serif", overflow: 'hidden'
  },
  
  // Background Elements container
  floatingContainer: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' },
  
  // The round wrapper for sweets
  sweetWrapper: { 
    position: 'absolute', 
    borderRadius: '50%', 
    border: '6px solid rgba(255,255,255,0.6)', 
    overflow: 'hidden', 
    // Deep, soft shadow for 3D pop
    boxShadow: '0 25px 50px rgba(212, 163, 115, 0.3)' 
  },
  sweetImg: { width: '100%', height: '100%', objectFit: 'cover' },

  // Main Card
  glassCard: {
    position: 'relative', zIndex: 10,
    width: '90%', maxWidth: '480px', // Slightly tighter width
    padding: '50px 40px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Slightly more opaque
    backdropFilter: 'blur(25px) saturate(150%)', // Stronger blur/saturation for premium glass feel
    borderRadius: '35px',
    border: '1px solid rgba(255,255,255,0.9)',
    boxShadow: '0 30px 70px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  
  // Typography
  brand: { fontFamily: '"Playfair Display", serif', fontSize: '2rem', margin: '0 0 20px 0', color: '#2c1810', letterSpacing: '1px' },
  headline: { fontSize: '3.2rem', lineHeight: '1.1', margin: '0 0 20px 0', color: '#2c1810', fontWeight: '800' },
  subtext: { fontSize: '1.05rem', color: '#555', marginBottom: '40px', lineHeight: '1.6', fontWeight: '500' },

  // Buttons
  buttonGroup: { display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', width: '100%' },
  secondaryActions: { display: 'flex', gap: '15px', width: '100%', justifyContent: 'center' }
};

// --- ENHANCED ANIMATION CSS ---
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  /* --- Core Button Styles --- */
  .aerial-btn { padding: 16px 30px; border-radius: 50px; border: none; font-size: 1rem; fontWeight: bold; cursor: pointer; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }
  .primary-btn { background: linear-gradient(135deg, #d4a373, #b88a5c); color: white; width: 100%; font-size: 1.1rem; letter-spacing: 0.5px; box-shadow: 0 10px 30px rgba(212, 163, 115, 0.4); }
  .primary-btn:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 15px 40px rgba(212, 163, 115, 0.5); }
  .secondary-btn { background: #3d2b1f; color: white; }
  .secondary-btn:hover { background: #5a3f2f; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
  .outline-btn { background: transparent; border: 2.5px solid #3d2b1f; color: #3d2b1f; font-weight: 700; }
  .outline-btn:hover { background: #3d2b1f; color: white; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }

  /* Card Entrance */
  .entrance-anim { animation: cardEntrance 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards; opacity: 0; transform: translateY(40px) scale(0.95); }
  @keyframes cardEntrance { to { opacity: 1; transform: translateY(0) scale(1); } }

  /* --- COMPLEX FLOATING ANIMATION SYSTEM --- */
  .float-item { position: absolute; animation-timing-function: ease-in-out; animation-iteration-count: infinite; animation-direction: alternate; }

  /* Depth Layers */
  .layer-back { opacity: 0.5; filter: blur(4px); z-index: 1; }
  .layer-mid { opacity: 0.8; filter: blur(1px); z-index: 2; }
  .layer-front { opacity: 1; filter: blur(0px); z-index: 3; box-shadow: 0 30px 60px rgba(212, 163, 115, 0.5) !important; }

  /* Individual Positioning & Timing */
  /* Donut (Top Left Back) */
  .item-1 { width: 200px; height: 200px; top: -5%; left: 5%; animation-name: floatDrift1; animation-duration: 25s; }
  /* Brownie (Bottom Right Back) */
  .item-2 { width: 180px; height: 180px; bottom: 5%; right: 10%; animation-name: floatDrift2; animation-duration: 22s; animation-delay: -5s; }
  /* Macarons (Mid Right) */
  .item-3 { width: 240px; height: 240px; top: 20%; right: -5%; animation-name: floatDrift1; animation-duration: 18s; animation-delay: -2s; }
  /* Cupcake (Bottom Left Mid) */
  .item-4 { width: 220px; height: 220px; bottom: -10%; left: 15%; animation-name: floatDrift2; animation-duration: 20s; animation-delay: -8s; }
  /* Cake Slice (Top Right Front - Hero Item) */
  .item-5 { width: 280px; height: 280px; top: 10%; right: 20%; animation-name: floatHero; animation-duration: 16s; animation-delay: -1s; }

  /* Animation Keyframes - Varied movement patterns */
  @keyframes floatDrift1 {
    0% { transform: translate(0, 0) rotate(0deg) scale(1); }
    50% { transform: translate(30px, 50px) rotate(15deg) scale(1.05); }
    100% { transform: translate(-20px, 20px) rotate(-5deg) scale(0.95); }
  }
  @keyframes floatDrift2 {
    0% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(-40px, -30px) rotate(-10deg); }
    100% { transform: translate(20px, -60px) rotate(5deg); }
  }
  @keyframes floatHero {
    0% { transform: translateY(0) rotate(0deg) scale(1); }
    100% { transform: translateY(-60px) rotate(8deg) scale(1.1); }
  }
`;
document.head.appendChild(styleSheet);

export default Home;