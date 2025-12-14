import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('userEmail')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    // 1. GET REGISTERED USERS
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // 2. CHECK CREDENTIALS
    const validUser = existingUsers.find(
      u => u.email === email && u.password === password
    );

    if (validUser) {
      // SUCCESS: Create Session
      localStorage.setItem('userEmail', validUser.email);
      localStorage.setItem('userName', validUser.name);
      navigate('/dashboard');
    } else {
      setError("Invalid email or password. Please register first.");
    }
  };

  // FIX: Clear all data if stuck
  const resetApp = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div style={styles.container}>
      {/* Background Floating Items */}
      <div style={styles.floatingContainer}>
         <div className="float-item item-1" style={styles.sweetWrapper}>
            <img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500" alt="Donut" style={styles.sweetImg} />
         </div>
      </div>

      <div style={styles.formSection}>
        <div style={styles.glassCard} className="fade-in-card">
            <h1 style={styles.brand}>GoldenCrust<span style={{color: '#d4a373'}}>.</span></h1>
            <h2 style={styles.welcome}>Welcome Back</h2>

            <form onSubmit={handleLogin} style={styles.form}>
                <input 
                  type="email" placeholder="Email Address" className="aerial-input"
                  value={email} onChange={e => setEmail(e.target.value)}
                />
                <input 
                  type="password" placeholder="Password" className="aerial-input"
                  value={password} onChange={e => setPassword(e.target.value)}
                />
                
                {error && <span style={{color: '#e74c3c', fontSize: '0.9rem'}}>{error}</span>}

                <button type="submit" className="aerial-btn">Sign In</button>
            </form>

            <div style={styles.footer}>
                New here? <Link to="/register" style={styles.link}>Create an account</Link>
                <br /><br />
                {/* Emergency Reset Button */}
                <button onClick={resetApp} style={{background:'none', border:'none', color:'#aaa', cursor:'pointer', fontSize:'0.8rem', textDecoration:'underline'}}>
                  (Stuck? Click to Reset App)
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- STYLES ---
const styles = {
  container: { position: 'relative', height: '100vh', width: '100vw', display: 'flex', overflow: 'hidden', fontFamily: "'Poppins', sans-serif", background: 'radial-gradient(circle at top left, #fffbf0 0%, #fceeda 100%)' },
  floatingContainer: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 },
  sweetWrapper: { position: 'absolute', borderRadius: '50%', border: '8px solid rgba(255,255,255,0.5)', overflow: 'hidden', width: '250px', height: '250px' },
  sweetImg: { width: '100%', height: '100%', objectFit: 'cover' },
  // Important: zIndex 10 ensures form is ON TOP of background
  formSection: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  glassCard: { width: '100%', maxWidth: '400px', padding: '40px', backgroundColor: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(20px)', borderRadius: '24px', border: '1px solid white', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', textAlign: 'center' },
  brand: { fontFamily: '"Playfair Display", serif', fontSize: '2rem', margin: 0, color: '#2c1810' },
  welcome: { fontSize: '1.5rem', fontWeight: '600', margin: '10px 0 30px', color: '#2c1810' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  footer: { marginTop: '30px', color: '#888' },
  link: { color: '#d4a373', fontWeight: 'bold', textDecoration: 'none' }
};

// --- ROBUST CSS INJECTION ---
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  /* Force Visibility after animation */
  .fade-in-card { animation: fadeIn 1s ease-out forwards; opacity: 0; transform: translateY(20px); }
  
  @keyframes fadeIn { 
    to { opacity: 1; transform: translateY(0); } 
  }

  .aerial-input { width: 100%; padding: 15px; border-radius: 12px; border: 2px solid transparent; background: rgba(255,255,255,0.7); outline: none; transition: 0.3s; box-sizing: border-box; }
  .aerial-input:focus { background: white; border-color: #d4a373; box-shadow: 0 10px 25px rgba(212, 163, 115, 0.15); }
  .aerial-btn { padding: 15px; border-radius: 12px; border: none; background: linear-gradient(45deg, #d4a373, #c08d5d); color: white; font-weight: bold; cursor: pointer; width: 100%; transition: 0.3s; }
  .aerial-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(212, 163, 115, 0.3); }
  
  .float-item { position: absolute; animation: float 6s ease-in-out infinite alternate; }
  .item-1 { top: 10%; right: 10%; }
  @keyframes float { from { transform: translateY(0); } to { transform: translateY(-20px); } }
`;
document.head.appendChild(styleSheet);

export default Login;