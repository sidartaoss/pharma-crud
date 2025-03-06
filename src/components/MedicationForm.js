import React, { useState } from 'react';
import { createMedication, updateMedication } from '../services/medicationService';
import { Button, TextField, Box } from '@mui/material';

const MedicationForm = ({ medication = {}, onSubmit }) => {
  const [name, setName] = useState(medication.name || '');
  const [brand, setBrand] = useState(medication.brand || '');
  const [price, setPrice] = useState(medication.price || '');
  const [dosage, setDosage] = useState(medication.dosage || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const medicationData = { name, brand, price, dosage };
    if (medication.id) {
      await updateMedication(medication.id, medicationData);
    } else {
      await createMedication(medicationData);
    }
    onSubmit();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <TextField label="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
      <TextField label="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <TextField label="Dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} required />
      <Button type="submit" variant="contained">Submit</Button>
    </Box>
  );
};

export default MedicationForm;
