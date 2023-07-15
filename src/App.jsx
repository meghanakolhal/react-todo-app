import "./App.css";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import AppHeader from "./components/AppHeader/AppHeader";
import AppFooter from "./components/AppFooter/AppFooter";
function App() {
  return (<div className="App">
<AppHeader/>
<main >
  <Home/>
</main>
<AppFooter/>
  </div>)
}

export default App;
