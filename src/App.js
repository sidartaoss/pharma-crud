import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, CssBaseline, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MedicationList from './components/MedicationList'; // Importe a lista de medicamentos
import ClientList from './components/ClientList'; // Importe a lista de clientes
import SubscriptionList from './components/SubscriptionList'; // Importe a lista de assinaturas
import NewSubscription from './components/NewSubscription';

const App = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <Router>
      <div>
        <AppBar position="sticky" style={{ backgroundColor: '#66b3b7' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
              <Menu />
            </IconButton>
            <Typography variant="h6">
              Sistema de Gestão de Farmácia
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer open={openDrawer} onClose={toggleDrawer}>
          <List>
            <ListItem button component={Link} to="/clients" onClick={toggleDrawer}>
              <ListItemText primary="Clientes" />
            </ListItem>
            <ListItem button component={Link} to="/medications" onClick={toggleDrawer}>
              <ListItemText primary="Medicamentos" />
            </ListItem>
            <ListItem button component={Link} to="/subscriptions" onClick={toggleDrawer}>
              <ListItemText primary="Pesquisa de assinaturas" />
            </ListItem>
            <ListItem button component={Link} to="/new-subscription" onClick={toggleDrawer}>
              <ListItemText primary="Nova assinatura" />
            </ListItem>
          </List>
        </Drawer>

        <div style={{ marginTop: '60px' }}>
          <Routes>
            <Route path="/clients" element={<ClientList />} />
            <Route path="/medications" element={<MedicationList />} />
            <Route path="/subscriptions" element={<SubscriptionList />} />
            <Route path="/new-subscription" element={<NewSubscription />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;