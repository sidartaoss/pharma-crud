import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

const EditClientModal = ({ open, onClose, onClientUpdated, client }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name,
        email: client.email,
        cpf: client.cpf,
        phoneNumber: client.phoneNumber,
      });
    }
  }, [client]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/clients/${client.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        onClientUpdated();
      })
      .catch((error) => console.error("Erro ao atualizar cliente:", error));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Editar Cliente
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="CPF"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Telefone"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#00985B",
                "&:hover": { bgcolor: "#007F48" },
                color: "white",
                fontWeight: "bold",
                borderRadius: 2,
                mb: 2,
              }}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#00985B",
                "&:hover": { bgcolor: "#007F48" },
                color: "white",
                fontWeight: "bold",
                borderRadius: 2,
                mb: 2,
              }}
            >
              Salvar
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditClientModal;
