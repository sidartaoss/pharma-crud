import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

const EditMedicationModal = ({ open, handleClose, medication, onMedicationUpdated }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (medication) {
      setFormData({ ...medication });
    }
  }, [medication]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await fetch(`http://localhost:8080/api/medications/${formData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    onMedicationUpdated();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Editar Medicamento</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Nome"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Marca"
          name="brand"
          value={formData.brand || ""}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Preço"
          name="price"
          value={formData.price || ""}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Dosagem"
          name="dosage"
          value={formData.dosage || ""}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, justifyContent: "flex-start" }}>
        <Button
          onClick={handleClose}
          sx={{ color: "white", bgcolor: "#007F48", "&:hover": { bgcolor: "#005F36" } }}
        >
          Cancelar
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          onClick={handleSave}
          sx={{
            color: "white",
            bgcolor: "#00985B",
            "&:hover": { bgcolor: "#007F48" },
            ml: 2,
          }}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditMedicationModal;
