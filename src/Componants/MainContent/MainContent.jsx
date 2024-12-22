import React, { useEffect, useState } from 'react'

import { Box, Divider, FormControl, Grid2, InputLabel, MenuItem, Radio, Select, Stack, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useTranslation } from "react-i18next";
import axios from "axios"
import img1 from "../../assets/pic/fagr.jpg";
import img2 from "../../assets/pic/zhr.jpg";
import img3 from "../../assets/pic/3sr.jpg";
import img4 from "../../assets/pic/m8rb.jpg";
import img5 from "../../assets/pic/34a.jpg";
import style from "../MainContent/MainContent.module.css";
import { ThreeDots } from 'react-loader-spinner';
import moment from "moment"

export default function MainContent() {
  const { i18n } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const { t } = useTranslation();
let theme = useTheme()

const [age, setAge] = React.useState('');
const handleChange = (event) => {
  setAge(event.target.value);
};


// English & Arabic Information
let sa = [
  {id : 1 , name :  t("choose.makkah") , value : "Makkah"},
  {id : 2 , name :  t("choose.dmam") , value : "Dammam"},
  {id : 3 , name :  t("choose.riad") , value : "Riyadh"},

]
let eg = [
  {id : 1 , name : t("choose.cairo") , value : "Cairo"},
  {id : 2, name : t("choose.alex") , value : "Alexandria"},
  {id : 3 , name : t("choose.giza") , value : "Giza"},

]


// Choose Country & City 
let [chooseCity , setChooseCity]= useState(t("choose.makkah"));
const [selectedValue, setSelectedValue] = React.useState('SA');
const handleChangeRadio = (event) => {
  setSelectedValue(event.target.value);

  console.log(selectedValue);

};


// API 
let [data , setData]= useState(null)
let [loading , setLoading] = useState(true)
async function getData() {
  setLoading(true); // Start the loading state
  try {
    const {data} = await axios.get(`http://api.aladhan.com/v1/timingsByCity?country=${selectedValue}&city=${chooseCity}`
    );


    console.log("API Response:", data);
    setData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setLoading(false); 
  }
}


useEffect(()=>{
  getData();


} , [])

const preyers = data
  ? [
      { id: 1, name: t("card.fagr"), img: img1, time: data.data.timings.Fajr },
      { id: 2, name: t("card.zhr"), img: img2, time: data.data.timings.Dhuhr },
      { id: 3, name: t("card.3sr"), img: img3, time: data.data.timings.Asr },
      { id: 4, name: t("card.m8rb"), img: img4, time: data.data.timings.Maghrib },
      { id: 5, name: t("card.34a"), img: img5, time: data.data.timings.Isha },
    ]
  : [];

  // Timer
  const [nextPrayer, setNextPrayer] = useState({ name: '', countdown: '' });
  const calculateNextPrayer = () => {
    if (!preyers.length) return;

    const currentTime = moment();
    let nextPrayerData = null;

    
    for (let prayer of preyers) {
      const prayerTime = moment(prayer.time, 'HH:mm');
      if (prayerTime.isAfter(currentTime)) {
        nextPrayerData = { name: prayer.name, time: prayerTime };
        break;
      }
    }

    if (!nextPrayerData) {
      // If no upcoming prayer, consider the first prayer of the next day
      const firstPrayer = preyers[0];
      const prayerTime = moment(firstPrayer.time, 'HH:mm').add(1, 'day');
      nextPrayerData = { name: firstPrayer.name, time: prayerTime };
    }

    const countdown = nextPrayerData.time.diff(currentTime);
    setNextPrayer({
      name: nextPrayerData.name,
      countdown: moment.utc(countdown).format('HH:mm:ss'),
    });
  };

  useEffect(() => {
    let interval = setInterval(() => {
      calculateNextPrayer();
    }, 1000);

    return () => clearInterval(interval);
  }, [preyers]);


  return <>

  <div className='h-100 d-flex align-items-center container my-5'>
  <Box sx={{ flexGrow: 1 , position : 'relative', my : 3}}>
    {/* Up Information */}
    <Box>
    <Grid2 container spacing={2}>
        <Grid2 size={6}>
          <Typography variant="h6" sx={{color: theme.palette.mode === 'dark' ? grey[300] : 'black'}} > 
         { moment().format("hh:mm")}   | {data?.data?.date.gregorian.date }  </Typography>
          <Typography variant="h4" sx={{fontWeight : "bold" , mt : 2 }} > {chooseCity} </Typography>

        </Grid2>
        <Grid2 size={6}>
        <Typography variant="h6" sx={{color: theme.palette.mode === 'dark' ? grey[300] : 'black'}} > {t("mainContent.prayer")} {nextPrayer.name} </Typography>
        <Typography variant="h4" sx={{fontWeight : "bold" , mt : 2}} >    {nextPrayer.countdown}</Typography>
        </Grid2>
      </Grid2>
    </Box>

<Divider sx={{my:2}}/>
{/* Cards */}
<Box>
<Stack
      container
      direction="row"
      spacing={2}
      sx={{
        mt: 4,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}
    >
{preyers.length > 0 ? (
  preyers.map((item) => (
    <Stack
      key={item.id}
      sx={{
        width: { xs: "100%", sm: "48%", md: "31%", lg: "19%" },
        display: "flex",
        flexDirection: "column",
        boxShadow: 2,
        borderRadius: 2,
        bgcolor: theme.palette.mode === "dark" ? grey[800] : grey[300],
        textAlign: "center",
        mb: 2,
      }}
    >
      <img
        src={item.img}
        alt={item.name}
        className={`card-img-top ${style.imgStyle} rounded-top-2`}
        style={{
          width: "100%",
          height: "150px",
        }}
      />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 2,
        }}
      >
        <h5 className="card-title h4 fw-semibold">{item.name}</h5>
        <p className="card-text display-1">{item.time}</p>
      </Box>
    </Stack>
  ))
) : (
  <>
        <div className="text-center vh-100">
          <ThreeDots
            height="80"
            width="80"
            color="blue"
            ariaLabel="loading"
            visible={loading}
          />
        </div>
      </> 
)}
    </Stack>
</Box>

{/* BTN */}
<Stack direction="row" sx={{my : 5 }} alignItems={"center"} justifyContent={"center"}>
  {/* Radio BTN */}
<Box sx={{mt : 2}}>
<div className=' d-flex align-items-center'>
      <Radio
        checked={selectedValue === 'SA'}
        onChange={handleChangeRadio}
        value="SA"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'SA' }}
      />
      <Typography variant="h6" sx={{mr : 2}} >{t("choose.sa")}</Typography>

      <Radio
        checked={selectedValue === 'EG'}
        onChange={handleChangeRadio}
        value="EG"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'EG' }}
      />
      <Typography variant="h6"  >{t("choose.eg")}</Typography>
    </div>


    </Box>
    {/* SA */}
    {selectedValue === "SA" &&    <FormControl variant="standard"
         sx={{width : "30%" , mx : 4 }}
        >
                <InputLabel id="demo-simple-select-label">{t("mainContent.city")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label={t("mainContent.city")}
                  onChange={handleChange}
                >
                  {sa.map((item)=>{
                    return <>
                              <MenuItem key={item.id} value={item.value} onClick={()=>{
                                setChooseCity(item.name);
                                getData()
                              }}>{item.name}</MenuItem>
                    </>
                              })}
                </Select>
              </FormControl>}

    {/* EG */}
 {
        selectedValue === "EG" &&      <FormControl variant="standard"
        sx={{width : "30%" , mx : 4}}
       >
               <InputLabel id="demo-simple-select-label">{t("mainContent.city")}</InputLabel>
               <Select
                 labelId="demo-simple-select-label"
                 id="demo-simple-select"
                 value={age}
                 label={t("mainContent.city")}
                 onChange={handleChange}
               >
                 {eg.map((item)=>{
                   return <>
                             <MenuItem key={item.id} value={item.value} onClick={()=>{
                               setChooseCity(item.name);
                               getData()
                             }} >{item.name}</MenuItem>
                   </>
                 })}
       
               </Select>
             </FormControl>
      }

</Stack>

    </Box>
  </div>


  </>
}
