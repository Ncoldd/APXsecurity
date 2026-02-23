import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useArticles } from '../context/ArticlesContext';
import { Navigate } from 'react-router-dom';

const AdminPage = () => {
  const { user, isAdmin } = useAuth();
  const { getAllUserArticles } = useArticles();

  // Redirect non-admins to home
  if (!isAdmin()) {
    return <Navigate to="/" />;
  }

  const allUserArticles = getAllUserArticles();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      {Object.keys(allUserArticles).length === 0 ? (
        <p>No saved articles yet.</p>
      ) : (
        Object.entries(allUserArticles).map(([username, articles]) => (
          <div key={username} style={{ marginBottom: '2rem' }}>
            <h2>{username}'s Saved Articles</h2>
            {articles.length === 0 ? (
              <p>No articles saved.</p>
            ) : (
              <ul>
                {articles.map((article) => (
                  <li key={article.url}>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPage;