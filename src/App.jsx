import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import './App.css';
import InputAmount from './components/InputAmount';
import SelectCountry from './components/SelectCountry';
import SwitchCurrency from './components/SwitchCurrency';
import { useContext, useEffect, useState } from 'react';
import { CurrencyContext } from './context/CurrencyContext';

function App() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
    setFirstAmount
  } = useContext(CurrencyContext);
  const [resultCurrency, setResultCurrency] = useState();
  const codeFromCurrency = fromCurrency.split('-')[0];
  const codeToCurrency = toCurrency.split('-')[0];
  console.log(codeToCurrency);

  useEffect(() => {
    if (firstAmount) {
      const url = `https://api.freecurrencyapi.com/v1/latest?apikey=pN9G5xEIVd7h1egdsx9Dfh3zjWl0YZpmUaawfEEN&base_currencies=${codeFromCurrency}&currencies=${codeToCurrency}`;

      fetch(url)
        .then(response => response.json())
        .then(response => setResultCurrency(response.data[codeToCurrency]))
        .catch(error => console.log(error));
    }
  }, [firstAmount, fromCurrency, toCurrency]);
  console.log(resultCurrency);

  const multipliedAmount = firstAmount * resultCurrency; // Replace 10 with the desired number
    console.log(multipliedAmount)
  const boxStyle = {
    background: "#F0F8FF",
    marginTop: "7rem",
    textAlign: "center",
    color: "#222",
    minHeight: "23rem",
    borderRadius: 2,
    padding: "4rem 2rem",
    boxShadow: "-16px 11px 13px -7px rgba(0,0,0,0.5)",
    position: "static",
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    }
  };

  return (
    <Container maxWidth="md" sx={boxStyle}>
      <Typography variant='h4' sx={{ marginBottom: "2rem" }}> CURRENCY CONVERTER</Typography>
      <Grid container spacing={2}>
        <InputAmount />
        <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From" />
        <SwitchCurrency />
        <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
      </Grid>
      {firstAmount ? (
        <Box sx={{ textAlign: "left", marginTop: "2rem" }}>
          <Typography>{firstAmount}  {fromCurrency} =</Typography>
          <Typography variant="h4" sx={{ marginTop: "5px", fontWeight: "bold" }}> {multipliedAmount} {toCurrency}</Typography>
        </Box>
      ) : ""}
      
    </Container>
  );
}

export default App;
