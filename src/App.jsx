
// Importo default layout 
import DefaultLayouts from "../src/layouts/DefaultLayout"

// importiamo i Route
import { BrowserRouter, Routes, Route } from "react-router-dom";

// iMPORTO Main
import Main from "../src/components/Main"

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayouts />}>
            <Route index element={<Main/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      
      
    </>
  )
}

export default App
