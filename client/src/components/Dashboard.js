import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- FIXED DATA ---
const products = [
  { id: 1, name: "Royal Glazed Donut", category: "Pastry", price: 2.50, img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { id: 2, name: "Velvet Chocolate Cake", category: "Cake", price: 5.00, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { id: 3, name: "Berry Cream Cupcake", category: "Cake", price: 3.50, img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { id: 4, name: "Parisian Macarons", category: "Sweet", price: 12.00, img: "https://images.unsplash.com/photo-1569864372136-348990f97802?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { id: 5, name: "Zesty Lemon Tart", category: "Pastry", price: 4.50, img: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { id: 6, name: "Buttery Croissant", category: "Pastry", price: 3.00, img: "https://images.unsplash.com/photo-1555507036-ab1f40388085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { id: 7, name: "New York Cheesecake", category: "Cake", price: 6.00, img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { id: 8, name: "Belgian Waffles", category: "Breakfast", price: 4.50, img: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { id: 9, name: "Sesame Bagel", category: "Breakfast", price: 2.00, img: "https://images.unsplash.com/photo-1585478259539-e6215705a3a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { id: 10, name: "Fudge Brownie", category: "Sweet", price: 3.25, img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { id: 11, name: "Blueberry Muffin", category: "Breakfast", price: 3.00, img: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { id: 12, name: "Soft Pretzel", category: "Pastry", price: 2.50, img: "https://images.unsplash.com/photo-1573133482276-2f137eb13247?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
];

const Dashboard = () => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]); 
  const [activeTab, setActiveTab] = useState('shop');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [toast, setToast] = useState(null); 
  const [userData, setUserData] = useState({ username: "Guest", email: "", initials: "G" });
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedName = localStorage.getItem('userName');
    if (!storedEmail) {
      navigate('/login');
    } else {
      setUserData({
        username: storedName || "User",
        email: storedEmail,
        initials: storedName ? storedName.substring(0, 2).toUpperCase() : "U"
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: Date.now() }]);
    showToast(`🛒 ${product.name} added to cart!`);
  };

  const buyNow = (product) => {
    const newOrder = {
      ...product,
      orderId: Date.now(),
      status: 'Preparing',
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    setOrders([newOrder, ...orders]); 
    showToast(`🚀 Order Placed: ${product.name}`);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div style={styles.container}>
      
      {/* --- SIDEBAR --- */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>GoldenCrust<span style={{color: '#d4a373'}}>.</span></div>
        
        {/* User Info */}
        <div style={styles.sidebarProfile}>
            <div style={styles.sidebarAvatar}>{userData.initials}</div>
            <div style={styles.sidebarUserInfo}>
                <div style={styles.sidebarName}>{userData.username}</div>
                <div style={styles.sidebarEmail}>{userData.email}</div>
            </div>
        </div>

        <nav style={styles.menu}>
          {/* --- NEW: HOME BUTTON --- */}
          <button onClick={() => navigate('/')} style={styles.menuBtn}>
             🏠 Home
          </button>

          <button onClick={() => setActiveTab('shop')} style={activeTab === 'shop' ? styles.menuBtnActive : styles.menuBtn}>
             🛍️ Shop Menu
          </button>
          <button onClick={() => setActiveTab('cart')} style={activeTab === 'cart' ? styles.menuBtnActive : styles.menuBtn}>
             🛒 Cart <span style={styles.badge}>{cart.length}</span>
          </button>
        </nav>

        {/* --- ACTIVE ORDERS PANEL --- */}
        <div style={styles.ordersPanel}>
          <h3 style={styles.ordersTitle}>📦 Active Orders ({orders.length})</h3>
          <div style={styles.ordersList}>
            {orders.length === 0 ? (
              <p style={{fontSize: '0.85rem', color: '#666', fontStyle: 'italic'}}>No active orders yet.</p>
            ) : (
              orders.map(order => (
                <div key={order.orderId} style={styles.orderItem}>
                  <div style={styles.orderHeader}>
                    <span style={styles.orderName}>{order.name}</span>
                    <span style={styles.orderTime}>{order.time}</span>
                  </div>
                  <div style={styles.statusBadge}>🔥 {order.status}</div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main style={styles.content}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.pageTitle}>{activeTab === 'shop' ? "Fresh Bakery Menu" : "Your Shopping Cart"}</h1>
            <p style={{color: '#888'}}>Ready to serve you, {userData.username}!</p>
          </div>
        </header>

        {/* --- VIEW: SHOP --- */}
        {activeTab === 'shop' && (
          <>
            <div style={styles.filterBar}>
              <input 
                type="text" 
                placeholder="Search sweets..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
              <div style={styles.categoryContainer}>
                {categories.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setSelectedCategory(cat)}
                    style={selectedCategory === cat ? styles.catBtnActive : styles.catBtn}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.grid}>
              {filteredProducts.map(item => (
                <div key={item.id} className="card-hover" style={styles.card}>
                  <div style={styles.imgWrapper}>
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      style={styles.img} 
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500"; }} 
                    />
                    <span style={styles.categoryBadge}>{item.category}</span>
                  </div>
                  <div style={styles.cardBody}>
                    <h3 style={styles.productName}>{item.name}</h3>
                    <div style={styles.cardFooter}>
                      <span style={styles.price}>${item.price.toFixed(2)}</span>
                      
                      <div style={{display: 'flex', gap: '8px'}}>
                        <button onClick={() => addToCart(item)} style={styles.addBtn} title="Add to Cart">
                           Add +
                        </button>
                        <button onClick={() => buyNow(item)} style={styles.buyBtn} title="Buy Now">
                           Buy
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* --- VIEW: CART --- */}
        {activeTab === 'cart' && (
          <div style={styles.cartContainer}>
            {cart.length === 0 ? (
              <div style={styles.emptyCart}>
                <div style={{fontSize: '4rem', marginBottom: '20px'}}>🛒</div>
                <h2>Your cart is empty</h2>
                <button onClick={() => setActiveTab('shop')} style={styles.addBtn}>Start Shopping</button>
              </div>
            ) : (
              <>
                <div style={styles.cartList}>
                  {cart.map(item => (
                    <div key={item.cartId} style={styles.cartItem}>
                      <img src={item.img} alt={item.name} style={styles.cartImg} />
                      <div style={{flex: 1, paddingLeft: '20px'}}>
                        <h3 style={{margin: '0 0 5px 0'}}>{item.name}</h3>
                        <span style={styles.categoryBadge}>{item.category}</span>
                      </div>
                      <div style={{fontWeight: 'bold', fontSize: '1.2rem'}}>${item.price.toFixed(2)}</div>
                      <button onClick={() => removeFromCart(item.cartId)} style={styles.removeBtn}>×</button>
                    </div>
                  ))}
                </div>
                <div style={styles.cartSummary}>
                   <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold'}}>
                    <span>Total</span>
                    <span style={{color: '#d4a373'}}>${total}</span>
                  </div>
                  <button onClick={() => showToast("Processing Checkout...")} style={styles.checkoutBtn}>Checkout</button>
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {toast && <div style={styles.toast}>{toast}</div>}
    </div>
  );
};

// --- STYLES ---
const styles = {
  container: { display: 'flex', height: '100vh', backgroundColor: '#f8f9fa', fontFamily: "'Poppins', sans-serif", overflow: 'hidden' },
  
  sidebar: { width: '280px', backgroundColor: '#1e272e', color: 'white', display: 'flex', flexDirection: 'column', padding: '25px 20px', flexShrink: 0, overflowY: 'auto' },
  logo: { fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '30px', fontFamily: '"Playfair Display", serif' },
  
  sidebarProfile: { display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 10px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginBottom: '30px' },
  sidebarAvatar: { width: '40px', height: '40px', backgroundColor: '#d4a373', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1rem' },
  sidebarUserInfo: { display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  sidebarName: { fontSize: '0.95rem', fontWeight: '600', color: 'white' },
  sidebarEmail: { fontSize: '0.75rem', color: '#bdc3c7', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' },

  menu: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' },
  menuBtn: { padding: '12px 15px', textAlign: 'left', backgroundColor: 'transparent', color: '#bdc3c7', border: 'none', cursor: 'pointer', borderRadius: '10px', fontSize: '1rem', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '10px' },
  menuBtnActive: { padding: '12px 15px', textAlign: 'left', backgroundColor: '#d4a373', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '10px', fontSize: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 15px rgba(212, 163, 115, 0.4)' },
  badge: { backgroundColor: '#ff5e57', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8rem', marginLeft: 'auto' },

  ordersPanel: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '15px', padding: '15px', marginBottom: '20px', overflowY: 'auto' },
  ordersTitle: { fontSize: '0.9rem', color: '#bdc3c7', marginBottom: '15px', borderBottom: '1px solid #444', paddingBottom: '5px' },
  ordersList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  orderItem: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '10px' },
  orderHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '5px', alignItems: 'center' },
  orderName: { fontSize: '0.85rem', fontWeight: 'bold', color: 'white' },
  orderTime: { fontSize: '0.7rem', color: '#888' },
  statusBadge: { fontSize: '0.75rem', color: '#d4a373', fontWeight: 'bold' },

  logoutBtn: { padding: '12px', backgroundColor: '#ff5e57', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' },

  content: { flex: 1, padding: '40px', overflowY: 'auto', display: 'flex', flexDirection: 'column' },
  header: { marginBottom: '30px' },
  pageTitle: { fontSize: '2rem', color: '#2d3436', margin: 0 },
  filterBar: { display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' },
  searchInput: { padding: '12px 20px', borderRadius: '30px', border: '1px solid #ddd', width: '300px', outline: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
  categoryContainer: { display: 'flex', gap: '10px' },
  catBtn: { padding: '8px 20px', borderRadius: '20px', border: '1px solid #ddd', backgroundColor: 'white', cursor: 'pointer', transition: '0.2s' },
  catBtnActive: { padding: '8px 20px', borderRadius: '20px', border: '1px solid #d4a373', backgroundColor: '#d4a373', color: 'white', cursor: 'pointer', fontWeight: 'bold' },
  
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '30px', paddingBottom: '40px' },
  card: { backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', transition: 'transform 0.3s, box-shadow 0.3s', border: '1px solid #f1f2f6' },
  imgWrapper: { height: '180px', position: 'relative', overflow: 'hidden' },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  categoryBadge: { position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(255,255,255,0.9)', padding: '4px 10px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold', color: '#2d3436' },
  cardBody: { padding: '20px' },
  productName: { margin: '0 0 10px 0', fontSize: '1.1rem', color: '#2d3436' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' },
  price: { fontSize: '1.3rem', fontWeight: 'bold', color: '#2d3436' },
  
  addBtn: { padding: '8px 15px', backgroundColor: '#eee', color: '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: 'background 0.2s', fontSize: '0.9rem' },
  buyBtn: { padding: '8px 15px', backgroundColor: '#d4a373', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: 'background 0.2s', fontSize: '0.9rem' },

  cartContainer: { maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '30px', flexWrap: 'wrap' },
  cartList: { flex: 2, backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' },
  emptyCart: { textAlign: 'center', marginTop: '50px', width: '100%' },
  cartItem: { display: 'flex', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #f1f2f6' },
  cartImg: { width: '70px', height: '70px', borderRadius: '10px', objectFit: 'cover' },
  removeBtn: { width: '30px', height: '30px', borderRadius: '50%', border: 'none', backgroundColor: '#ffeaa7', color: '#d63031', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' },
  cartSummary: { flex: 1, backgroundColor: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', height: 'fit-content' },
  checkoutBtn: { width: '100%', padding: '15px', backgroundColor: '#2d3436', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' },
  toast: { position: 'fixed', bottom: '30px', right: '30px', backgroundColor: '#2d3436', color: 'white', padding: '15px 30px', borderRadius: '50px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', animation: 'slideUp 0.3s ease-out', zIndex: 1000 },
};

const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;600;700&display=swap');
  .card-hover:hover { transform: translateY(-8px); box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important; }
  .card-hover:hover img { transform: scale(1.05); transition: transform 0.5s; }
  @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  aside::-webkit-scrollbar { width: 5px; }
  aside::-webkit-scrollbar-thumb { background: #444; borderRadius: 5px; }
`;
document.head.appendChild(styleSheet);

export default Dashboard;