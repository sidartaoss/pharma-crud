import React, { useState } from "react";
import { getSubscriptionsByEmail } from "../services/subscriptionService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";

const SubscriptionList = () => {
  const [clientEmail, setClientEmail] = useState("");
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (clientEmail) {
      setLoading(true);
      try {
        const { data } = await getSubscriptionsByEmail(clientEmail);
        setSubscriptions(data);
      } catch (error) {
        alert("Erro ao buscar assinaturas.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
        Pesquisar Assinaturas
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "flex-start",
          marginBottom: 3,
        }}
      >
        <TextField
          label="Email do cliente"
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
          fullWidth
          variant="outlined"
        />

        <Button
          onClick={handleSearch}
          variant="contained"
          sx={{
            bgcolor: "#00985B",
            "&:hover": { bgcolor: "#007F48" },
            color: 'white',
            fontWeight: 'bold',
            borderRadius: 2,
            width: '100%',
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Pesquisar"}
        </Button>
      </Box>

      {subscriptions.length === 0 ? (
        <Typography>
          Nenhuma assinatura encontrada para este cliente.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Medicamento</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Dosagem</TableCell>
                <TableCell>Dia de Renovação Mensal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell>{subscription.medicationName}</TableCell>
                  <TableCell>{subscription.medicationBrand}</TableCell>
                  <TableCell>{subscription.medicationDosage}</TableCell>
                  <TableCell>
                    {subscription.medicationMonthlyRenewalDay}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default SubscriptionList;
