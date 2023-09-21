import React, { useState } from 'react';
import ModalA from './ModalA';
import ModalB from './ModalB';
import { useNavigate } from 'react-router-dom';  // import useHistory

function MainButtons() {
  const [activeModal, setActiveModal] = useState(null);
  const navigate = useNavigate(); // instantiate useHistory

  const openModalA = () => {
    // navigate('/modalA'); // Use navigation.navigate
    setActiveModal('A');
  };

  const openModalB = () => {
    // navigate('/modalB'); // Use navigation.navigate
    setActiveModal('B');
  };

  return (
    <div className="main-buttons">
      <button className="btn-a" onClick={openModalA}>Button A</button>
      <button className="btn-b" onClick={openModalB}>Button B</button>
      
      {activeModal === 'A' && 
       <ModalA 
       setActiveModal= {setActiveModal}
         switchToModalA={openModalA} 
         onClose={() => setActiveModal(null)} 
       />}
      {activeModal === 'B' && 
       <ModalB 
       setActiveModal= {setActiveModal}
       switchToModalB={openModalB} 
         onClose={() => setActiveModal(null)} 
       />}
    </div>
  );
}

export default MainButtons;
