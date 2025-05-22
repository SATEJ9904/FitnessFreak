import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Workouts from './Workout';
import DietFoods from './dietfood';
import BMICalculator from './BMIcalculator';
import About from './About';
import Navbar from './Navbar';


function App() {
  return (
    <Router>
      <div style={styles.app}>
        <nav style={styles.nav}>
          <h2 style={styles.logo}>FitnessPro</h2>
          <ul style={styles.navList}>
            <li><Link to="/" style={styles.link}>Workouts</Link></li>
            <li><Link to="/dietfoods" style={styles.link}>Diet Foods</Link></li>
            <li><Link to="/BMICalculator" style={styles.link}>BMICalculator</Link></li>
            <li><Link to="/about" style={styles.link}>About</Link></li>
          </ul>
        </nav>

        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<Workouts />} />
            <Route path="/dietfoods" element={<DietFoods />} />
            <Route path="/BMIcalculator" element={<BMICalculator />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const styles = {
  app: {
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e88e5',
    padding: '1rem 2rem',
    color: '#fff',
  },
  logo: {
    margin: 0,
    fontSize: '1.8rem',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '1rem',
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    fontWeight: '500',
  },
  content: {
    padding: '2rem',
  },
  background: {
    paper: '#fff',  // Ensure this is set, it is used in your code
  },
};

export default App;
