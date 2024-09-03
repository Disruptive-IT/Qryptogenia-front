import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import './../forms/menu/menu.css';
import { createTheme, ThemeProvider } from '@mui/material';

export default function WebLinkMenuFood({ FormValues, ContentName }) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabValue = (event, newValue) => {
    setTabValue(newValue);
  };

  const theme = createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          scrollButtons: {
            color: 'blue',
          },
        },
      },
    },
  });

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
      className='w-full w-m-[full]  my-2'
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 2 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div
        className="absolute left-0 top-0 w-full h-full overflow-y-auto p-4"
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
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <Tabs
              variant="scrollable"
              scrollButtons="auto"
              value={tabValue}
              onChange={handleTabValue}
            >
              {FormValues.category.map((element, index) => (
                <Tab
                  sx={{ color: 'white' }}
                  key={index}
                  label={element.categoryName}
                  value={index}
                />
              ))}
            </Tabs>
            {FormValues.category.map((category, index) => (
  <TabPanel key={index} value={tabValue} index={index}>
    {category.products && category.products.length > 0 ? (
      category.products.map((element, productIndex) => (
        <div
          key={productIndex}
          className="w-[100%] f- m-w-[100%] p-3 flex flex-row  justify-items-start my-2 mx-2 bg-white rounded-[10px]"
        >
          <div className='mx-2 w-[50%] h-[90%] rounded-[50%]'>
            <img className='object-cover rounded-[50%]' src="https://images.aws.nestle.recipes/resized/8689e8d974203563ddcc9bbff91323c2_MG_CHORIZOBURGER_Main-880x660_1080_850.png" alt="" />
          </div>
          <div className='flex flex-col p-1 flex-wrap'>
            <h1 className='my-1'>{element.productName}</h1>
            <h1 className='my-1'>{element.productDescription}</h1>
            <h1 className='my-1'>{element.price}</h1>
            {element.top && <h1>Top</h1>}
            </div>
        </div>
      ))
    ) : (
      <div>No products available</div>
    )}
  </TabPanel>
))}
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
}
