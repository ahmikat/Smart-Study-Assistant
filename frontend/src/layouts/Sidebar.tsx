import React from 'react'; // Make sure React is imported
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTheme } from './ThemeContext'; // Assuming ThemeContext.tsx exists
import { useNavigate } from 'react-router-dom';
import './sidebar.css'; // Keep your custom CSS import

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  // Function to handle navigation to avoid repetition
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    // Use Bootstrap navbar classes for structure and responsiveness
    <nav className={`navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} shadow-sm sticky-top`}>
      <div className="container-fluid p-1 ms-2 me-2"> {/* Use container-fluid for full width */}

        {/* Brand Logo and Name */}
        <div className="top-nav d-flex align-items-center me-3" onClick={() => handleNavigate('/')}>
          <img
            className="h-7 img-fluid custom-logo" // Keep your custom class if needed
            src="https://media.giphy.com/media/mrkk6ctjilhoKnFH8d/giphy.gif?cid=790b7611vla8d1bmshd9ce8spgelpl2jojdnpzdyti54ewqh&ep=v1_stickers_search&rid=giphy.gif&ct=s"
            alt="Logo"
            style={{ height: '35px' }} // Control height directly or via CSS
          />
          <span className="navbar-brand fw-bold ms-2 mb-0 all-h-text"> {/* Use navbar-brand, keep custom class */}
            BoostLearning<span className="text-warning">AI</span>
          </span>
        </div>

        {/* Navbar Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavContent"
          aria-controls="navbarNavContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarNavContent">
          {/* Navigation Links (Aligned Left) */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active fw-medium" aria-current="page" href="#" onClick={(e) => { e.preventDefault(); handleNavigate('/home'); }}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-medium" href="#features" onClick={(e) => { e.preventDefault(); handleNavigate('/#features'); /* Or scroll logic */ }}>
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-medium" href="#" onClick={(e) => { e.preventDefault(); handleNavigate('/profile'); }}>
                Profile
              </a>
            </li>
             <li className="nav-item">
              <a className="nav-link fw-medium" href="#" onClick={(e) => { e.preventDefault(); handleNavigate('/contact'); }}>
                Contact
              </a>
            </li>
          </ul>
          <div className="d-flex align-items-center ms-auto">
             <button
              className="all-p-text btn-grad-blue btn btn-sm btn-outline-light me-3" // Added margin
              onClick={toggleTheme}
              style={{ zIndex: 1100, minWidth: '80px', borderRadius:'45px', height:'40px' }} // Ensure button text fits
            >
              <b>{isDarkMode ? "☀️ Light" : "🌙 Dark"}</b> {/* Shortened text */}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
