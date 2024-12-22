import  { useState } from "react";

import style from "./Layout.module.css";
import { Outlet } from "react-router-dom";
// import Footer from "../Footer/Footer"
import { createTheme, styled, ThemeProvider} from '@mui/material/styles';

import { grey } from '@mui/material/colors'
import Navbar from "../Navbar/Navbar";
import CssBaseline from '@mui/material/CssBaseline';


export default function Layout() {

  const[showArrow , setShowArrow]=useState(false)
  window.addEventListener("scroll" , ()=>{
    if(window.scrollY >200){
      setShowArrow(true)
    }else{
      setShowArrow(false)
    }
  })

  const [mode , setMode] = useState(localStorage.getItem("currentMode") === null ? "dark" :  localStorage.getItem("currentMode")  )

  const darkTheme = createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // palette values for light mode
            favColor : {
              light : grey[100],
              main : grey[900]
            }

          }
        : {
            // palette values for dark mode
          favColor : {
            light : grey[900],
            main : grey[50]
          }
          }
  )
}
  });

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  



  return <>
  <ThemeProvider  theme={darkTheme}>
  <CssBaseline />
  <div id="pu">
  <Navbar setMode={setMode}/>
  <DrawerHeader />
  <Outlet ></Outlet>
  {/* <Footer/> */}
  <div style={{opacity: showArrow ? 1 : 0}} className={`${style.backToTop} cursor-pointer d-flex  rounded-circle position-fixed justify-content-center align-items-center bottom-0 end-0 mb-4 me-4`}>
  
  <a href="#up" >
    <i className=" fa-solid fa-arrow-up fw-semibold fs-5 text-white "></i>
  </a>
  

</div>
  </div>
  </ThemeProvider>

  </>


}
