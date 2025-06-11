import React from 'react';

const About = () => {
  return (
    <div className="about-container" style={styles.container}>
      <h1 style={styles.heading}>About Our Health & Fitness Assistant</h1>
      <p style={styles.text}>
        Welcome to our smart and interactive health assistant — a platform that helps you stay fit and eat right based on your personal Body Mass Index (BMI).
      </p>

      <h2 style={styles.subheading}> What We Offer</h2>
      <ul style={styles.list}>
        <li><strong>BMI Calculator:</strong> A simple and perfectly designed calculator to evaluate your BMI based on your height and weight.</li>
        <li><strong>Food Suggestions:</strong> Receive scientifically curated food recommendations tailored to your BMI category, focusing on calories, proteins, vitamins, and other nutrients.</li>
        <li><strong>Workout Suggestions:</strong> Get animated and effective workout routines that match your fitness level and BMI status.</li>
      </ul>

      <h2 style={styles.subheading}>Creative UI/UX</h2>
      <p style={styles.text}>
        Our design philosophy focuses on clean layouts, intuitive navigation, vibrant animations, and modern aesthetics — making health tracking enjoyable and engaging!
      </p>

      <h2 style={styles.subheading}>Developed By</h2>
      <ul style={styles.list}>
        <li><strong>Satej Vinay Shendage</strong></li>
      </ul>

      <p style={styles.footer}>Thank you for trusting us to guide you toward a healthier lifestyle!</p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: 'auto',
    padding: '2rem',
    fontFamily: 'Poppins, sans-serif',
    lineHeight: 1.7,
    color: '#333',
    backgroundColor: '#f8f9fa',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#1e88e5',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  subheading: {
    fontSize: '1.5rem',
    color: '#3949ab',
    marginTop: '1.5rem',
  },
  text: {
    fontSize: '1rem',
    marginBottom: '1rem',
  },
  list: {
    paddingLeft: '1.5rem',
  },
  footer: {
    marginTop: '2rem',
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#6c757d',
  },
};

export default About;
