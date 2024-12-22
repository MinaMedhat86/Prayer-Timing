import { alpha, IconButton, InputBase, styled, Toolbar, useTheme } from "@mui/material";
import style from "./Navbar.module.css"

import SearchIcon from '@mui/icons-material/Search';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

import MuiAppBar from '@mui/material/AppBar';
import { useTranslation } from "react-i18next";
import { t } from "i18next";


// eslint-disable-next-line react/prop-types
export default function Navbar(  {setMode} ) {
    let theme = useTheme();
let drawerWidth = "0px";
const { i18n } = useTranslation();
const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
};
function allArabic(){
    changeLanguage("ar");
  }

  function allEnglish(){
    changeLanguage("en");
  }


    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
      })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }));
      const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
        display: 'flex',
        flexDirection: i18n.dir() === 'rtl' ? 'row-reverse' : 'row', // Adjust for language direction
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        flexGrow: 1, // Allow input to grow
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          paddingRight: i18n.dir() === 'ltr' ? theme.spacing(4) : 0, // Adjust padding for LTR
          paddingLeft: i18n.dir() === 'rtl' ? theme.spacing(4) : 0, // Adjust padding for RTL
          transition: theme.transitions.create('width'),
          [theme.breakpoints.up('sm')]: {
            width: '30ch',
            '&:focus': {
              width: '30ch',
            },
          },
        },
      }));
      
    
    
      function changeMode (){
        if(theme.palette.mode === 'light'){
          setMode('dark');
          localStorage.setItem("currentMode" , "dark")
    
        }else{
          setMode('light');
          localStorage.setItem("currentMode" , "light")
    
        }
      }
    
  return <>
<AppBar position="static"> {/* Set position to static */}
  <Toolbar className="px-5">
    <div className="d-flex justify-content-between w-100">
      <Search className="pe-3">
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={t("navbar.search")}
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>

      <div className="d-flex">
        {theme.palette.mode === "light" ? (
          <IconButton
            aria-label="dark mode"
            onClick={() => {
              changeMode();
            }}
            color="inherit"
          >
            <LightModeOutlinedIcon className="fs-3" />
          </IconButton>
        ) : (
          <IconButton
            aria-label="dark mode"
            onClick={() => {
              changeMode();
            }}
            color="inherit"
          >
            <DarkModeOutlinedIcon className="fs-3" />
          </IconButton>
        )}

        <IconButton aria-label="bell" color="inherit">
          <NotificationsNoneOutlinedIcon className="fs-3" />
        </IconButton>

        <IconButton aria-label="setting" color="inherit">
          <SettingsOutlinedIcon className="fs-3" />
        </IconButton>

        <IconButton aria-label="person" color="inherit">
          <Person2OutlinedIcon className="fs-3" />
        </IconButton>
      </div>
    </div>

    <div className={`${style.line} `}></div>

    <div className={`d-flex justify-content-center ${style.divLang} rounded-5`}>
      <button className="btn border-0" onClick={() => allEnglish()}>
        <h5 className={`${style.lang} text-white mt-2`}>ENG</h5>
      </button>
      <button className="btn border-0" onClick={() => allArabic()}>
        <h5 className={`${style.lang} text-white mt-2`}>
          {t("navbar.ar")}
        </h5>
      </button>
    </div>
  </Toolbar>
</AppBar>
  
  </>
}
