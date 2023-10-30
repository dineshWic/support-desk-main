import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket } from '../features/tickets/ticketSlice';
import BackButton from '../components/BackButton';

function NewTicket() {
  const { user } = useSelector((state) => state.auth);

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [description, setDescription] = useState('');
  const [paperFile, setPaperFile] = useState(null);
  const [markingSchemeFile, setMarkingSchemeFile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePaperFile = (e) => {
    const file = e.target.files[0];
    console.log("This is paper",file)
    setPaperFile(file);
  };

  const handleMarkingSchemeFile = (e) => {
    const file = e.target.files[0];
    console.log("This is marking",file)
    setMarkingSchemeFile(file);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('paper', paperFile);
    formData.append('markingScheme', markingSchemeFile);
    formData.append('description', description);
    formData.append('paperName', paperFile.name); // Add this line
    formData.append('markingSchemeName', markingSchemeFile.name); // Add this line

  
    dispatch(createTicket(formData))
      .unwrap()
      .then(() => {
        navigate('/tickets');
        toast.success('Files Uploaded!');
      })
      .catch((error) => {
        toast.error(error.message || 'An error occurred');
      });
  };

  return (
    <>
      <BackButton />
      <section className='heading'>
        <h1>Upload New Documents</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input type='text' className='form-control' value={name} disabled />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Customer Email</label>
          <input type='text' className='form-control' value={email} disabled />
        </div>
        <form onSubmit={onSubmit} >
          <div className='form-group'>
            <label htmlFor='description'>Description of Paper</label>
            <textarea
              name='description'
              id='description'
              className='form-control'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <label htmlFor='paper'>Paper</label>
            <input
              type='file'
              name="paper"
              className='form-control'
              onChange={handlePaperFile}
              accept='.jpg,.png,.jpeg,.pdf'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='paper'>Marking Scheme</label>
            <input
              type='file'
              name="markingScheme"
              className='form-control'
              onChange={handleMarkingSchemeFile}
              accept='.jpg,.png,.jpeg,.pdf'
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
