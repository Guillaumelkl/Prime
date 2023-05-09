import React, {useEffect} from 'react'


function LandingPage() {
    useEffect(() => {
        document.body.classList.add('Landing-Page');
    
        return () => {
          document.body.classList.remove('Landing-Page');
        };
      }, []);
  return (
    <div>LandingPage</div>
  )
}

export default LandingPage