import "./assets/css/App.css";
import Header from "./layouts/header";
import Home from "./Home";

function AppName({ name }) {
  return <h1 className="greeting">Hi, {name}</h1>;
}

function App() {
  return (
    <>
      <Header />


      <Home />
      <main className="main">
        {/* <AppName name="Taran" /> */}
       
      </main>
    </>
  );
}

export default App;
