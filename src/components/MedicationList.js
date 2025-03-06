import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import NewMedicationModal from "./NewMedicationModal"; 
import EditMedicationModal from "./EditMedicationModal"; 

const MedicationList = () => {
  const [medications, setMedications] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [openNewModal, setOpenNewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const fetchMedications = async () => {
    const response = await fetch("http://localhost:8080/api/medications");
    const data = await response.json();
    setMedications(data);
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  const handleDeleteClick = (medication) => {
    setSelectedMedication(medication);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedMedication) {
      await fetch(
        `http://localhost:8080/api/medications/${selectedMedication.id}`,
        {
          method: "DELETE",
        }
      );
      setMedications(
        medications.filter((med) => med.id !== selectedMedication.id)
      );
    }
    setOpenDialog(false);
  };

  const handleDeleteCancel = () => {
    setOpenDialog(false);
    setSelectedMedication(null);
  };

  const handleEditClick = (medication) => {
    setSelectedMedication(medication);
    setOpenEditModal(true);
  };

  const handleNewMedicationClick = () => {
    setSelectedMedication(null);
    setOpenNewModal(true);
  };

  const handleMedicationUpdated = async () => {
    await fetchMedications();
    setOpenNewModal(false);
    setOpenEditModal(false);
    setSelectedMedication(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleNewMedicationClick}
        sx={{
            bgcolor: '#00985B',
            '&:hover': { bgcolor: '#007F48' },
            color: 'white',
            fontWeight: 'bold',
            borderRadius: 2,
            mb: 2
          }}
      >
        Novo Medicamento
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}> {/* Cor de fundo cinza claro */}
              <TableCell>Nome</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Dosagem</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medications.map((medication) => (
              <TableRow key={medication.id}>
                <TableCell>{medication.name}</TableCell>
                <TableCell>{medication.brand}</TableCell>
                <TableCell>{medication.price}</TableCell>
                <TableCell>{medication.dosage}</TableCell>
                <TableCell>
                  <IconButton
                    sx={{
                        color: '#1E774E',
                        '&:hover': { color: '#165C3D' }
                      }}
                    onClick={() => handleEditClick(medication)}
                    title="Editar"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(medication)}
                    title="Deletar"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Confirmar Remoção</DialogTitle>
        <DialogContent>
          <p>
            Você realmente deseja remover o medicamento{" "}
            <strong>{selectedMedication?.name}</strong>?
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Remover
          </Button>
        </DialogActions>
      </Dialog>

      <NewMedicationModal
        open={openNewModal}
        handleClose={() => setOpenNewModal(false)}
        onMedicationAdded={handleMedicationUpdated}
      />

      {selectedMedication && (
        <EditMedicationModal
          open={openEditModal}
          handleClose={() => setOpenEditModal(false)}
          medication={selectedMedication}
          onMedicationUpdated={handleMedicationUpdated}
        />
      )}
    </div>
  );
};

export default MedicationList;
