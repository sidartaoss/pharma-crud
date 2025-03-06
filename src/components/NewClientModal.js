import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

const NewClientModal = ({ open, onClose, onClientAdded }) => {
  const [client, setClient] = useState({
    name: '',
    email: '',
    cpf: '',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client)
      });

      if (response.ok) {
        onClientAdded();
      } else {
        console.error('Erro ao cadastrar cliente');
      }
    } catch (error) {
      console.error('Erro ao conectar com API:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400, bgcolor: 'background.paper', p: 4, borderRadius: 2
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>Novo Cliente</Typography>

        <TextField fullWidth label="Nome" name="name" value={client.name} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Email" name="email" value={client.email} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="CPF" name="cpf" value={client.cpf} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Telefone" name="phoneNumber" value={client.phoneNumber} onChange={handleChange} sx={{ mb: 2 }} />

        <Button
          variant="contained"
          fullWidth
          sx={{ bgcolor: '#00985B', '&:hover': { bgcolor: '#007F48' }, color: 'white', mt: 2 }}
          onClick={handleSubmit}
        >
          Cadastrar
        </Button>
      </Box>
    </Modal>
  );
};

export default NewClientModal;
