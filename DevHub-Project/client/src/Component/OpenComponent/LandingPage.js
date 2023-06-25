import React, { useEffect } from 'react';
import RegistrationForm from './registration/RegistrationForm';

function LandingPage() {
  useEffect(() => {
    document.body.classList.add('Landing-Page');

    return () => {
      document.body.classList.remove('Landing-Page');
    };
  }, []);

 

  return (
    <div>     
      <div>
      <RegistrationForm />
      </div>
    </div>
    
    
  );
}

export default LandingPage;
