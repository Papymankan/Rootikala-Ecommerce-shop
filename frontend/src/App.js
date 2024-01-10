import './App.css';
import routes from './routes'
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useRoutes } from 'react-router-dom'
import './variables.css'

function App() {

  const router = useRoutes(routes)

  return (
    <>
      <div className="App">
        {router}
      </div>
    </>
  );
}

export default App;
