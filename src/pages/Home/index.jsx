import React, { useState } from "react";
import { Button, Card, Container, FormLabel, Input } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      const { user } = await axios.post("http://127.0.0.1:5000/api/login", {
        username,
        password,
      });
      localStorage.setItem("userId", user.id);
      navigate("/musics");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card style={{ padding: 8 }}>
        <h3>Faça login</h3>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <FormLabel>Usuário</FormLabel>
          <Input
            placeholder="teste@email.com"
            required
            onChange={(e) => setUsername(e.target.value)}
          />

          <FormLabel>Senha</FormLabel>
          <Input
            placeholder="******"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            onClick={signIn}
            style={{ marginTop: 10 }}
          >
            Entrar
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default Home;
