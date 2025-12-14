import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // 1. Basic Validation
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // 2. Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = existingUsers.find(u => u.email === email);

    if (userExists) {
      setError("User with this email already exists.");
      return;
    }

    // 3. Save new user to LocalStorage (Simulating Database)
    const newUser = { name, email, password };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert("Registration Successful! Please Login.");
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      {/* Background Shapes */}
      <div className="float-item item-1" style={styles.sweetWrapper}>
         <img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500" alt="Donut" style={styles.sweetImg} />
      </div>

      <div style={styles.glassCard} className="entrance-anim">
          <h1 style={styles.brand}>GoldenCrust<span style={{color: '#d4a373'}}>.</span></h1>
          <h2 style={styles.welcome}>Join the Club</h2>
          <p style={styles.subtext}>Create an account to start ordering.</p>

          <form onSubmit={handleRegister} style={styles.form}>
              <input 
                type="text" 
                placeholder="Full Name" 
                className="aerial-input"
                value={name} onChange={e => setName(e.target.value)}
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="aerial-input"
                value={email} onChange={e => setEmail(e.target.value)}
              />
              <input 
                type="password" 
                placeholder="Create Password" 
                className="aerial-input"
                value={password} onChange={e => setPassword(e.target.value)}
              />
              
              {error && <span style={{color: 'red', fontSize: '0.9rem'}}>{error}</span>}

              <button type="submit" className="aerial-btn">Register</button>
          </form>

          <div style={styles.footer}>
              Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
          </div>
      </div>
    </div>
  );
};

// --- STYLES (Reusing the Aerial Theme) ---
const styles = {
  container: {
    height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center',
    background: 'radial-gradient(circle at top left, #fffbf0 0%, #fceeda 100%)', fontFamily: "'Poppins', sans-serif", position: 'relative', overflow: 'hidden'
  },
  glassCard: {
    width: '100%', maxWidth: '400px', padding: '40px', backgroundColor: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(20px)', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.8)',
    boxShadow: '0 15px 35px rgba(0,0,0,0.05)', zIndex: 10, textAlign: 'center'
  },
  brand: { fontFamily: '"Playfair Display", serif', fontSize: '2rem', color: '#2c1810', margin: 0 },
  welcome: { fontSize: '1.5rem', fontWeight: '600', margin: '10px 0', color: '#2c1810' },
  subtext: { color: '#888', marginBottom: '30px' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  footer: { marginTop: '30px', color: '#888' },
  link: { color: '#d4a373', fontWeight: 'bold', textDecoration: 'none' },
  // Floating Item Styles
  sweetWrapper: { position: 'absolute', borderRadius: '50%', overflow: 'hidden', top: '10%', right: '10%', width: '200px', height: '200px', opacity: 0.6, animation: 'float 6s infinite alternate' },
  sweetImg: { width: '100%', height: '100%', objectFit: 'cover' }
};

// Inject CSS
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  .aerial-input { width: 100%; padding: 15px; border-radius: 12px; border: 2px solid transparent; background: rgba(255,255,255,0.7); outline: none; transition: 0.3s; box-sizing: border-box; }
  .aerial-input:focus { background: white; border-color: #d4a373; }
  .aerial-btn { padding: 15px; border-radius: 12px; border: none; background: linear-gradient(45deg, #d4a373, #c08d5d); color: white; font-weight: bold; cursor: pointer; transition: 0.3s; width: 100%; }
  .aerial-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(212, 163, 115, 0.3); }
  @keyframes float { from { transform: translateY(0); } to { transform: translateY(-20px); } }
  .entrance-anim { animation: fadeInUp 0.8s ease-out; }
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
`;
document.head.appendChild(styleSheet);

export default Register;