import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../services/ApiEndPoint';
import { get } from '../services/ApiEndPoint';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/AuthSlice';
import { BsSun, BsMoon } from 'react-icons/bs'; // Importing icons
import "./style.css"
export default function Navbar({setNotes}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDarkTheme, setIsDarkTheme] = useState(false); // For theme toggle
  const [searchQuery, setSearchQuery] = useState('');
  const handleLogout = async () => {
    try {
      const request = await post('/auth/logout');
      const response = request.data;
      if (response.success) {
        toast.success(response.message);
        dispatch(logout());
        navigate('/login');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      try {
        const request = await get(`/notes/search?query=${query}`);
        const response = request.data;
        if (response.success) {
          setNotes(response.notes); // Update notes with search results
        } else {
          toast.error('No notes found');
        }
      } catch (error) {
        console.log(error);
        toast.error('Search failed');
      }
    }
  };



  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle('dark-theme', !isDarkTheme); // Toggle a class for dark theme
  };

  return (
    <nav className="navbar">
      <div className="container-fluid p-2">
        <input className="mx-3 SerachInput" type="search" placeholder="Search" value={searchQuery} onChange={handleSearch}/>
        {/* Theme Toggle Button */}
        <button type="button" className="btn theme-toggle-btn mx-1" onClick={toggleTheme}>
          {isDarkTheme ? (
            <BsSun className="theme-icon rotate" /> // Sun icon for dark mode
          ) : (
            <BsMoon className="theme-icon rotate" /> // Moon icon for light mode
          )}
        </button>
        {/* Logout Button */}
        <button
          type="button"
          className="btn bg-dark text-white mx-3"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
