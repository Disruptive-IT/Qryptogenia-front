import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import './../forms/menu/menu.css'
import { createTheme, ThemeProvider } from '@mui/material';

export default function WebLinkMenuFood({ FormValues, ContentName }) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabValue = (event, newValue) => {
    setTabValue(newValue);
  };

  const theme=createTheme({
    components:{
      MuiTabs:{
        styleOverrides:{
          scrollButtons:{
            color:'blue'
          }
        }
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
    <div
      className="absolute left-0 top-0 w-full h-full p-4"
      id="main-container"
      style={{ backgroundColor: FormValues.backgroundCard }}
    >
      <div
        className="w-[70%] p-2 rounded-[10px] mx-auto my-6 bg-slate-500 flex justify-center items-center"
        id="logo-container"
      >
        <img
          className="w-full h-auto object-contain"
          id="restaurantLogoPreview"
          alt="restaurantLogo"
        />
      </div>

      <div
        className="w-[80%] max-w-[84%] bg-slate-100 h-auto p-4 mx-auto my-4 rounded-md shadow-sm"
        id="name-container"
      >
        <h1 className="text-center font-semibold text-[25px] break-words">
          {FormValues.restaurantName}
        </h1>
      </div>

      <h1 className="text-center font-semibold text-[25px] text-white">
          CATEGORIES
        </h1>

      <div
        className="w-[100%] max-w-[100%] bg-transparent h-auto p-4 mx-auto my-4 rounded-md shadow-sm scroll-container"
        id="categories-container"
      >
        <div>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <Tabs variant="scrollable" scrollButtons="auto" value={tabValue} onChange={handleTabValue}>
              {FormValues.category.map((element, index) => (
                <Tab sx={{color:'white'}} key={index} label={element.categoryName} value={index} />
              ))}
            </Tabs>
          </Box>
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
}
