import { Link, useLocation } from 'react-router-dom';
import { useArticles } from '../context/ArticlesContext';
import { useAuth } from '../context/AuthContext';

function Navigation() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { getUserSavedArticles } = useArticles();
  const userSavedArticles = user ? getUserSavedArticles(user) : [];

  return (
    <nav>
      <div className="nav-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <h1 className="nav-brand">NewsReader</h1>
          <div className="nav-links">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
            <Link to="/search" className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}>Search</Link>
            <Link to="/saved" className={`nav-link ${location.pathname === '/saved' ? 'active' : ''}`}>
              Saved Articles ({userSavedArticles.length})
            </Link>
          </div>
        </div>
        <div className="nav-user">
          {isAuthenticated() ? (
            <>
              <span>{user.username}</span>
              <button onClick={logout}>Logout</button>
              {user.role === 'admin' && <Link to="/admin">Admin</Link>}
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;