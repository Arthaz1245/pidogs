import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import BreedDetail from "./components/BreedDetail/BreedDetail";
import CreateBreed from "./components/CreateBreed/CreateBreed";
function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/home/:id" component={BreedDetail} />
      <Route exact path="/home/create" component={CreateBreed} />
    </div>
  );
}

export default App;
