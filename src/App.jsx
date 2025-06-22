// import Button from '@mui/material/Button'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from './Componants/Home/Home'
import Layout from './Componants/Layout/Layout'
import { Notfound } from './Componants/Notfound/Notfound'


function App() {

  let routers = createBrowserRouter([
    { path : "" , element : <Layout/> , children : [
      {index : true , element : <Home/> },
      {path : "*" , element : <Notfound/>}
    ]},



  ])

  return <>
  <RouterProvider router={routers}/>
  {/* <Button variant="text" color="default" className=' bg-black text-white'>
    srrghgff
  </Button>
  appppppppppppppppppppppppppppppppppp
   */}
  </>
}

export default App
