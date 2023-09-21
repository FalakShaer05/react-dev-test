import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { fetchContacts } from '../redux/actions/contacts';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const ModalB = (props) => {
    const { switchToModalB, onClose, contacts, setActiveModal } = props
    const [copy , setCopy] = useState([]);
    const [allContacts, setAllContacts] = useState([])
    //   const [activeModal, setActiveModal] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");  // state for the search term
    const modalRef = useRef(null); // reference for modal content for infinite scroll

    const fetchContacts = async (countryId) => {
        const params = {
            companyId: 560,
            page: 1
        };

        if (countryId) {
            params.countryId = countryId;
        }

        await axios.get('https://api.dev.pastorsline.com/api/contacts.json', {
            headers: {
                Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNzI2NTY3MTc5LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjk1MDMxMTc5fQ.0y7NtuVDCvcPvmWbliMs1q02sov2oFC6u2Hi6H4A2W4'
            },
            params
        })
            .then(response => {
                setAllContacts(response.data.contacts);
                setCopy(response.data.contacts);
                // dispatch(fetchContactsSuccess(response.data.contacts));
            })
            .catch(error => {
                console.log({ error });
                // dispatch(fetchContactsFailure(error));
            });
    }

    useEffect(() => {
        fetchContacts(226); // fetch only US contacts initially
    }, []);

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (modalRef.current) {
                modalRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [contacts]);

    const handleScroll = () => {
        if (modalRef.current.scrollTop + modalRef.current.clientHeight >= modalRef.current.scrollHeight) {
            // Here, fetch the next page from the API for infinite scroll. You'd need to update your fetchContacts to accept pagination.
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value !== '') {
            let newReg = new RegExp(e.target.value, 'gi')
            const search = Object.values(copy).filter((item) => {
              console.log(item.first_name.match(newReg))
              if (item.first_name.match(newReg)) {
                return item
              }
            })
            setAllContacts(search);
            // setSearchTypeEnable(true)
          } else {
            console.log('empty')
            setAllContacts(copy);
          }
        // Call API with updated searchTerm, debounce if necessary
    };

    return (
        <Modal show={switchToModalB} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>US Contacts</Modal.Title>
            </Modal.Header>
            <Modal.Body ref={modalRef}>
                <input
                    type="text"
                    placeholder="Search Us contacts..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />

                {allContacts ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(allContacts).map(contact => (
                                <tr key={contact.id}>
                                    <td>{contact.id}</td>
                                    <td>{contact.first_name}</td>
                                    <td>{contact.last_name}</td>
                                    <td>{contact?.country?.iso}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <table className="w-100 mt-3">

                        <tbody>
                            <tr>
                                <td className="d-flex justify-content-center align-items-center" colSpan="X">
                                    No data found
                                </td>

                            </tr>
                        </tbody>

                    </table>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => {
                    setActiveModal("A")
                    /* switch to ModalB */
                }}>All Contacts</Button>
                <Button variant="light" style={{ borderColor: "#46139f" }} onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

const mapStateToProps = state => ({
    contacts: state.contacts
});

const mapDispatchToProps = {
    // fetchContacts
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalB);
