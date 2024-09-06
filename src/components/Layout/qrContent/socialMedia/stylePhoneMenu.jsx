import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import './../forms/menu/menu.css';
import { createTheme, Modal, ThemeProvider } from '@mui/material';

export default function WebLinkMenuFood({ FormValues, ContentName }) {
  const [tabValue, setTabValue] = useState(0);
  const [openModal,setOpenModal]=useState(false);
  const [selectedIndex,setSelectedIndex]=useState(null);

  const handleOpenModal=()=>{
    setOpenModal(true)
  }

  const handleCloseModal=()=>{
    setOpenModal(false)
  }

  const handleTabValue = (event, newValue) => {
    setTabValue(newValue);
  };


  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    padding: '16px',
    borderRadius: '10px',
    zIndex: 10
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
  <div onClick={()=>{if(element.productImg!==null){setSelectedIndex(index) ;handleOpenModal()}}} className="w-24 h-24 rounded-full overflow-hidden border-[3px] border-black flex-shrink-0 mb-1">
  <img
    className="object-cover w-full h-full"
    src={element.productImg ? URL.createObjectURL(element.productImg) : 'jajajaja'}
    alt={element.productName}
    onClick={()=>handleOpenModal(index)}
  />
</div>

  {/* Contenedor del contenido */}
  <div className={`flex bg-white flex-col justify-center items-center py-2 px-2 rounded-md w-full`}>
    <h1 style={{color: element.colorName}} className="text-white font-bold text-lg my-1">{element.productName}</h1>
    <p style={{color: element.colorDescription}} className="text-gray-300 text-sm my-1 text-center">{element.productDescription}</p>
    <h1 style={{color: element.colorPrice}} className="text-green-400 font-semibold text-md my-1">{element.price} $</h1>
    {element.top && (
      <span className="text-yellow-400 font-bold text-sm">Top</span>
    )}
  </div>
  <div className={`absolute w-full h-full bg-[rgba(0,0,0,0.5)] top-[0] left-[0] text-white ${openModal ? '':'hidden'}`}>
    <button onClick={()=>handleCloseModal()} className='m-9 float-end'><span className='text-red-600 font-bold text-[25px]'>x</span></button>
    <div className={`absolute  top-[30%] w-[50%] left-[25%] h-[30%] rounded-[10px]`}>
        <img className='w-full h-full object-cover rounded-[10px]' src={element[selectedIndex]?.productImg ? URL.createObjectURL(element[selectedIndex].productImg) : 'jajajaja'} alt={element[selectedIndex]?.productName || 'Unknown Product'}  />
    </div>
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
