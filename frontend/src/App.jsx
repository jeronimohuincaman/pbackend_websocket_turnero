import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import ChatPage from "./pages/ChatPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import TurneroPage from "./pages/TurneroPage";
import TeoriaPage from "./pages/TeoriaPage";
function App() {

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <Router>
          <Routes>
            <Route exact path="/" Component={HomePage} />
            <Route exact path="/teoria" Component={TeoriaPage} />
            <Route exact path="/turnero" Component={TurneroPage} />
            <Route path="/chat" Component={ChatPage} />
            <Route path="*" Component={NotFoundPage} />
          </Routes>
        </Router>
      </Box>
    </>
  )
}

export default App;
