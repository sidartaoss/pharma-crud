import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const NewSubscription = () => {
  const [clients, setClients] = useState([]);
  const [medications, setMedications] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedMedication, setSelectedMedication] = useState("");
  const [renewalDay, setRenewalDay] = useState("");
  const [loadingClients, setLoadingClients] = useState(false);
  const [loadingMedications, setLoadingMedications] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const fetchClients = async () => {
    setLoadingClients(true);
    const response = await fetch("http://localhost:8080/api/clients");
    const data = await response.json();
    setClients(data);
    setLoadingClients(false);
  };

  const fetchMedications = async () => {
    setLoadingMedications(true);
    const response = await fetch("http://localhost:8080/api/medications");
    const data = await response.json();
    setMedications(data);
    setLoadingMedications(false);
  };

  useEffect(() => {
    fetchClients();
    fetchMedications();
  }, []);

  const handleSubmit = async () => {
    if (!selectedClient || !selectedMedication || !renewalDay) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    setIsSubmitting(true);

    const requestBody = {
      medicationId: selectedMedication,
      monthlyRenewalDay: renewalDay,
    };

    try {
      await fetch(
        `http://localhost:8080/api/clients/${selectedClient}/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      alert("Assinatura criada com sucesso!");
      navigate("/subscriptions");
    } catch (error) {
      alert("Erro ao criar assinatura.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <h2>Criar Nova Assinatura</h2>

      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel id="client-label">Cliente</InputLabel>
        <Select
          labelId="client-label"
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          label="Cliente"
          disabled={loadingClients}
        >
          {loadingClients ? (
            <MenuItem disabled>
              <CircularProgress size={24} />
            </MenuItem>
          ) : (
            clients.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {client.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel id="medication-label">Medicamento</InputLabel>
        <Select
          labelId="medication-label"
          value={selectedMedication}
          onChange={(e) => setSelectedMedication(e.target.value)}
          label="Medicamento"
          disabled={loadingMedications}
        >
          {loadingMedications ? (
            <MenuItem disabled>
              <CircularProgress size={24} />
            </MenuItem>
          ) : (
            medications.map((medication) => (
              <MenuItem key={medication.id} value={medication.id}>
                {medication.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        margin="normal"
        label="Dia de Renovação Mensal"
        type="number"
        value={renewalDay}
        onChange={(e) => setRenewalDay(e.target.value)}
        variant="outlined"
        inputProps={{ min: 1, max: 31 }}
      />

      <Button
        fullWidth
        variant="contained"
        sx={{
          bgcolor: "#00985B",
          "&:hover": { bgcolor: "#007F48" },
          color: "white",
          fontWeight: "bold",
          mt: 2,
          borderRadius: 2,
        }}
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Criando..." : "Nova Assinatura"}
      </Button>
    </Box>
  );
};

export default NewSubscription;
