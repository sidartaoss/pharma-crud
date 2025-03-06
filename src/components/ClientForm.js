import React, { useState } from 'react';
import { createClient, updateClient } from '../services/clientService';
import { Button, TextField, Box } from '@mui/material';

const ClientForm = ({ client = {}, onSubmit }) => {
  const [name, setName] = useState(client.name || '');
  const [email, setEmail] = useState(client.email || '');
  const [cpf, setCpf] = useState(client.cpf || '');
  const [phoneNumber, setPhoneNumber] = useState(client.phoneNumber || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientData = { name, email, cpf, phoneNumber };
    if (client.id) {
      await updateClient(client.id, clientData);
    } else {
      await createClient(clientData);
    }
    onSubmit();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <TextField label="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
      <TextField label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
      <Button type="submit" variant="contained">Submit</Button>
    </Box>
  );
};

export default ClientForm;
