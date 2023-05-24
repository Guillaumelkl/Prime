import React, { useEffect } from 'react';
import RegistrationForm from './registration/RegistrationForm';

function LandingPage() {
  useEffect(() => {
    document.body.classList.add('Landing-Page');

    return () => {
      document.body.classList.remove('Landing-Page');
    };
  }, []);

  function Footer() {
    return (
      <footer>
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="https://www.facebook.com">Facebook</a></li>
          <li><a href="https://www.linkedin.com">LinkedIn</a></li>
        </ul>
      </footer>
    );
  }

  return (
    <div>
      <h1>Welcome to the Landing Page</h1>
      <RegistrationForm />
      <div>
      
      </div>
    </div>
  );
}

export default LandingPage;
