import React, { useState, useEffect } from 'react';
import { Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import NewClientModal from './NewClientModal';
import EditClientModal from './EditClientModal';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [openNewModal, setOpenNewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [clientToEdit, setClientToEdit] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  const fetchClients = () => {
    fetch('http://localhost:8080/api/clients')
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => console.error('Erro ao buscar clientes:', error));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleClientUpdated = () => {
    fetchClients();
    setOpenNewModal(false);
    setOpenEditModal(false);
    setClientToEdit(null);
  };

  const handleEditClick = (client) => {
    setClientToEdit(client);
    setOpenEditModal(true);
  };

  const handleDeleteClick = (client) => {
    setClientToDelete(client);
    setOpenDeleteDialog(true);
  };

  const confirmDeleteClient = () => {
    if (!clientToDelete) return;

    fetch(`http://localhost:8080/api/clients/${clientToDelete.id}`, {
      method: 'DELETE'
    })
      .then(() => {
        fetchClients();
        setOpenDeleteDialog(false);
        setClientToDelete(null);
      })
      .catch((error) => console.error('Erro ao excluir cliente:', error));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Button
        variant="contained"
        sx={{
          bgcolor: '#00985B',
          '&:hover': { bgcolor: '#007F48' },
          color: 'white',
          fontWeight: 'bold',
          borderRadius: 2,
          mb: 2
        }}
        onClick={() => setOpenNewModal(true)}
      >
        Novo Cliente
      </Button>

      <NewClientModal open={openNewModal} onClose={() => setOpenNewModal(false)} onClientAdded={handleClientUpdated} />

      <EditClientModal open={openEditModal} onClose={() => setOpenEditModal(false)} onClientUpdated={handleClientUpdated} client={clientToEdit} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f0f0f0' }}>
              <TableCell><strong>Nome</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>CPF</strong></TableCell>
              <TableCell><strong>Telefone</strong></TableCell>
              <TableCell align="center"><strong></strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.cpf}</TableCell>
                <TableCell>{client.phoneNumber}</TableCell>
                <TableCell align="center">
                  <IconButton sx={{ color: '#006B3F' }} onClick={() => handleEditClick(client)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteClick(client)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza que deseja excluir o cliente <strong>{clientToDelete?.name}</strong>?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">Cancelar</Button>
          <Button onClick={confirmDeleteClient} color="error" variant="contained">Excluir</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClientList;
