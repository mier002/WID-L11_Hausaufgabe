import { Button, Typography, Select, MenuItem, TextField, Box, Alert } from "@mui/material";
import { useState } from "react";

const URL1 = "http://localhost:8000/wgs84lv95/";
const URL2 = "http://localhost:8000/lv95wgs84/";

function Transformation() {
  const [umrechnung, setUmrechnung] = useState("");
  const [ostEingabe, setOstEingabe] = useState("");
  const [nordEingabe, setNordEingabe] = useState("");
  const [ostAusgabe, setOstAusgabe] = useState("");
  const [nordAusgabe, setNordAusgabe] = useState("");
  const [fehler, setFehler] = useState("");

  async function handleTransformation() {
    try {
      const url =
      umrechnung === "WGS84zuLV95"
        ? `${URL1}?lat=${ostEingabe}&lng=${nordEingabe}`
        : `${URL2}?E=${ostEingabe}&N=${nordEingabe}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Transformation fehlgeschlagen");
      }

      const data = await response.json();

      setOstAusgabe(data.E || data.longitude);
      setNordAusgabe(data.N || data.latitude);
      setFehler("");
    } catch (error) {
      console.error("Fehler bei Transformation", error);
      setFehler("Fehler bei Transformation");
    }
  }

  return (
    <Box >
      <Typography variant="h3">Koordinaten-Transformation WGS84 / LV95</Typography>

      <Select
        value={umrechnung}
        onChange={(event) => setUmrechnung(event.target.value)}
        variant="outlined"
        style={{ marginBottom: "16px", minWidth: "200px" }}
        displayEmpty
      >
        <MenuItem value="" disabled>
        </MenuItem>
        <MenuItem value="WGS84zuLV95">WGS84 zu LV95</MenuItem>
        <MenuItem value="LV95zuWGS84">LV95 zu WGS84</MenuItem>
      </Select>

      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Eingabe Ost/Lat"
          variant="outlined"
          value={ostEingabe}
          onChange={(e) => setOstEingabe(e.target.value)}
        />
        <TextField
          label="Eingabe Nord/Lat"
          variant="outlined"
          value={nordEingabe}
          onChange={(e) => setNordEingabe(e.target.value)}
        />
      </Box>

      <Button variant="contained" onClick={handleTransformation}>
        Transformieren
      </Button>

      {fehler && (
        <Alert severity="error" style={{ marginTop: "16px" }}>
          {fehler}
        </Alert>
      )}

      <Box mt={4} display="flex" gap={2}>
        <TextField
          label="Ausgabe Ost/Long"
          variant="outlined"
          value={ostAusgabe}
        />
        <TextField
          label="Ausgabe Nord/Lat"
          variant="outlined"
          value={nordAusgabe}
        />
      </Box>
    </Box>
  );
}

export default Transformation;
