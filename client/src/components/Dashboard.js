import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  // State for the "Add Sweet" form
  const [newSweet, setNewSweet] = useState({ name: '', category: '', price: '', quantity: '' });

  const navigate = useNavigate();

  // 1. Fetch Sweets
  useEffect(() => {
    fetchSweets();
  }, []); // eslint-disable-line

  const fetchSweets = async () => {
    try {
      const res = await api.get('/sweets');
      setSweets(res.data);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Adding a Sweet
  const handleAddSweet = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to create sweet
      const res = await api.post('/sweets', newSweet);
      // Update list immediately
      setSweets([...sweets, res.data]); 
      // Clear form
      setNewSweet({ name: '', category: '', price: '', quantity: '' });
      alert("Sweet Added!");
    } catch (err) {
      alert(err.response?.data?.msg || 'Error adding sweet. Are you an Admin?');
    }
  };

  const handlePurchase = async (id) => {
    try {
      const res = await api.post(`/sweets/${id}/purchase`);
      setSweets(sweets.map(s => s._id === id ? { ...s, quantity: res.data.quantity } : s));
    } catch (err) {
      alert(err.response?.data?.msg || 'Purchase failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>Sweet Shop Dashboard</h1>
        <button onClick={handleLogout} style={{ background: '#f44336', color: '#fff', border: 'none', padding: '10px', cursor: 'pointer' }}>Logout</button>
      </div>

      {/* --- ADD SWEET FORM --- */}
      <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #ddd' }}>
        <h3>Add New Sweet</h3>
        <form onSubmit={handleAddSweet} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input placeholder="Name" value={newSweet.name} onChange={e => setNewSweet({...newSweet, name: e.target.value})} required style={{padding: '8px'}} />
          <input placeholder="Category" value={newSweet.category} onChange={e => setNewSweet({...newSweet, category: e.target.value})} required style={{padding: '8px'}} />
          <input type="number" placeholder="Price" value={newSweet.price} onChange={e => setNewSweet({...newSweet, price: e.target.value})} required style={{padding: '8px', width: '80px'}} />
          <input type="number" placeholder="Qty" value={newSweet.quantity} onChange={e => setNewSweet({...newSweet, quantity: e.target.value})} required style={{padding: '8px', width: '80px'}} />
          <button type="submit" style={{ background: '#2196F3', color: 'white', border: 'none', padding: '8px 16px', cursor: 'pointer' }}>Add Sweet</button>
        </form>
      </div>

      {/* --- SWEETS GRID --- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {sweets.length === 0 ? <p>No sweets yet. Add one above!</p> : sweets.map(sweet => (
          <div key={sweet._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', background: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <h3 style={{marginTop: 0}}>{sweet.name}</h3>
            <p style={{ color: '#666', fontSize: '0.9em' }}>{sweet.category}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0' }}>
              <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>${sweet.price}</span>
              <span style={{ background: sweet.quantity > 0 ? '#e8f5e9' : '#ffebee', padding: '4px 8px', borderRadius: '4px', fontSize: '0.9em' }}>
                {sweet.quantity} in stock
              </span>
            </div>
            <button 
              onClick={() => handlePurchase(sweet._id)}
              disabled={sweet.quantity <= 0}
              style={{ width: '100%', padding: '10px', background: sweet.quantity > 0 ? '#4CAF50' : '#ccc', color: 'white', border: 'none', cursor: 'pointer' }}
            >
              {sweet.quantity > 0 ? 'Buy Now' : 'Sold Out'}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Dashboard;