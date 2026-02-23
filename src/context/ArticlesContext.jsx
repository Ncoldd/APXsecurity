import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext'; // <-- import to access user info

// ⚠️ SECURITY ISSUE: This context is shared globally with no user authentication
// All users see the same saved articles!
const ArticlesContext = createContext();

export function ArticlesProvider({ children }) {
  const [savedArticlesByUser, setSavedArticlesByUser] = useState({});

  const getAllUserArticles = () => savedArticlesByUser;

  const { user } = useAuth();

  const saveArticle = (article) => {
  if (!user) return; // safety check
  setSavedArticlesByUser(prev => ({
    ...prev,
    [user.username]: [...(prev[user.username] || []), article]
  }));
};

  const removeArticle = (url) => {
    if (!user) return;
    setSavedArticlesByUser(prev => ({
      ...prev,
      [user.username]: (prev[user.username] || []).filter(a => a.url !== url)
  }));
};

  const isArticleSaved = (url) => {
  if (!user) return false;
  return (savedArticlesByUser[user.username] || []).some(a => a.url === url);
};

  const getUserSavedArticles = (user) => {
  if (!user || !user.username) return [];
  return savedArticlesByUser[user.username] || [];
};

  return (
<ArticlesContext.Provider
  value={{
    saveArticle,
    removeArticle,
    isArticleSaved,
    getUserSavedArticles,
    getAllUserArticles,
    savedArticlesByUser, 
  }}
>
  {children}
</ArticlesContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useArticles must be used within ArticlesProvider');
  }
  return context;
};