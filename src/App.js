import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";

import './App.css';
import Header from './components/Header';
import NotesPage from './pages/NotesPage';
import NotePage from "./pages/NotePage";

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <Header />
          <Route component={NotesPage} path="/" exact />
          <Route component={NotePage} path="/note/:note_id" />
        </div>
      </div>
    </Router>
  );
}

export default App;
