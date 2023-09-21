import React from 'react';

function ModalC({ contact }) {
  return (
    <div className="modal-c">
      {/* Display selected contact details */}
      {contact.first_name} {contact.last_name}
      {contact.phone_number}
    </div>
  );
}

export default ModalC;
