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

  let categoryIndex;

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
                  onChange={()=>categoryIndex=index}
                />
              ))}
            </Tabs>
            {FormValues.category.map((category, index) => (
  <TabPanel key={index} value={tabValue} index={index}>
    {category.products && category.products.length > 0 ? (
      category.products.map((element, productIndex) => (
        <div
  key={productIndex}
  className="w-full max-w-[100%] p-1 flex flex-col justify-start items-center my-2 bg-white rounded-lg shadow-md"
  style={{backgroundColor:element.backgroundProductCard || '#fff'}}
>
  {/* Contenedor de la imagen */}
  <div className="w-24 h-24 rounded-full overflow-hidden border-[3px] border-black flex-shrink-0 mb-1">
    <img
      className="object-cover w-full h-full"
      id={`imgProductPreview-${categoryIndex}-${index}`}
      src={element.productImg ? URL.createObjectURL(element.productImg) : 'jajajaja'}
      alt={element.productName}
    />
  </div>

  {/* Contenedor del contenido */}
  <div className={`flex bg-slate-600 flex-col justify-center items-center py-2 px-2 rounded-md w-full`}>
    <h1 className="text-white font-bold text-lg my-1">{element.productName}</h1>
    <p className="text-gray-300 text-sm my-1 text-center">{element.productDescription}</p>
    <h1 className="text-green-400 font-semibold text-md my-1">{element.price} $</h1>
    {element.top && (
      <span className="text-yellow-400 font-bold text-sm">Top</span>
    )}
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
