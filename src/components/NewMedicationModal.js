import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const NewMedicationModal = ({ open, handleClose, onMedicationAdded }) => {
  const [medication, setMedication] = useState({
    name: '',
    brand: '',
    price: '',
    dosage: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedication({
      ...medication,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/medications', medication);
      onMedicationAdded(response.data);
      handleClose();
    } catch (error) {
      console.error('Error creating medication:', error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: 24, width: 400
      }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Novo Medicamento
        </Typography>
        <TextField
          label="Nome"
          name="name"
          value={medication.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Marca"
          name="brand"
          value={medication.brand}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Preço"
          name="price"
          value={medication.price}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Dosagem"
          name="dosage"
          value={medication.dosage}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: '#00985B',
            '&:hover': { bgcolor: '#007F48' },
            color: 'white',
            fontWeight: 'bold',
            borderRadius: 2,
            mb: 2
          }}
          onClick={handleSubmit}
        >
          Cadastrar
        </Button>
      </Box>
    </Modal>
  );
};

export default NewMedicationModal;
