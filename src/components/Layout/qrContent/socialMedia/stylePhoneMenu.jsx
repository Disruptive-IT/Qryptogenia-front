import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import './../forms/menu/menu.css';
import { createTheme, Modal, ThemeProvider } from '@mui/material';
import { ConstructionOutlined } from '@mui/icons-material';

export default function WebLinkMenuFood({ FormValues, ContentName }) {
  const [tabValue, setTabValue] = useState(0);
  const [openModal,setOpenModal]=useState(false);
  const [selectedIndex,setSelectedIndex]=useState(null);
  const [activeprod,setActiveprod]=useState(0);
  const [activeCategory,setActiveCategory]=useState(0);

  const handleOpenModal=()=>{
    setOpenModal(true)
  }

  const handleCloseModal=()=>{
    setOpenModal(false)
  }

  const handleTabValue = (event, newValue) => {
    if (newValue === FormValues.category.length) {
      setActiveCategory(null);
    } else {
      setActiveCategory(newValue);
    }
    setTabValue(newValue);
  };
  

  const topProducts=FormValues.category.flatMap(category=>category.products.filter(product=>product.top==true));
  console.log(topProducts);

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
  
  console.log("modal producto activo ",activeprod);
  console.log("catgeoria activa: ",activeCategory);

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
          className="w-[60%] p-2 rounded-[10px] mx-auto my-6 bg-slate-500 flex justify-center items-center"
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
          MENU
        </h1>

        <div
          className="w-[100%] max-w-[100%] bg-transparent h-auto py-2 my-4 mx-1 rounded-md shadow-sm scroll-container"
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
              {topProducts.length>0 && (
                <Tab
                  sx={{ color: 'white' }}
                  key={top}
                  label={"top"}
                  value={FormValues.category.length}
                />
              )}
            </Tabs>
            {FormValues.category.map((category, index) => (
  <TabPanel key={index} value={tabValue} index={index}>
    {category.products && category.products.length > 0 && activeCategory!=null ? (
      category.products.map((element, productIndex) => (
        <div key={productIndex} className='w-full h-[135px] flex flex-row rounded-[10px] overflow-auto mb-4' onClick={() => {setActiveprod(productIndex); handleOpenModal();}}>
          <div style={{backgroundColor:element.backgroundProductCard}} className='w-[40%] h-full bg-slate-500 overflow-auto'>
            <img className='object-cover w-full h-full' src={element.productImg ? URL.createObjectURL(element.productImg) : 'jajajaja'} alt={element.productName} />
          </div>
          <div style={{backgroundColor:element.backgroundProductCard}} className='w-[60%] h-full bg-red-300 px-1 py-1  flex flex-col self-center'>
            <span className='flex w-full items-end justify-end hover:cursor-pointer'>+</span>
            <div className='w-full  h-[80%] bg-transparent flex flex-col justify-evenly'>
              <h1 style={{color: element.colorName}} className='text-[17px] text-center break-words font-bold'>{element.productName=='' ? 'Product name' : element.productName}</h1>
              <h1 style={{color: element.colorPrice}} className='text-center break-words font-bold'>{element.price==null ? 'price':element.price+'$'}</h1>
            </div>
            <span className='text-end'>{element.top ? <StarIcon className='text-yellow-300 text-2xl' /> : ''}</span>
          </div>
        </div>
      ))
    ) : (
      <div>No products available</div>
    )}
  </TabPanel>
))}
<TabPanel key={'top'} value={tabValue} index={FormValues.category.length}>
  {
    topProducts.length > 0 ? (
      topProducts.map((element, index) => (
        <div key={index} className='w-full h-[135px] flex flex-row rounded-[10px] overflow-auto mb-4' onClick={() => { setActiveprod(index); handleOpenModal(); }}>
          <div style={{backgroundColor:element.backgroundProductCard}} className='w-[40%] h-full bg-slate-500 overflow-auto'>
            <img className='object-cover w-full h-full' src={element.productImg ? URL.createObjectURL(element.productImg) : 'jajaja'} alt={element.productName} />
          </div>
          <div style={{backgroundColor:element.backgroundProductCard}} className='w-[60%] h-full bg-red-300 px-1 py-1  flex flex-col self-center'>
            <span className='flex w-full items-end justify-end hover:cursor-pointer'>+</span>
            <div className='w-full  h-[80%] bg-transparent flex flex-col justify-evenly'>
              <h1 style={{color: element.colorName}} className='text-[17px] text-center break-words font-bold'>{element.productName === '' ? 'Product name' : element.productName}</h1>
              <h1 style={{color: element.colorPrice}} className='text-center break-words font-bold'>{element.price == null ? 'price' : element.price + '$'}</h1>
            </div>
            <span className='text-end'>{element.top ? <StarIcon className='text-yellow-300 text-2xl' /> : ''}</span>
          </div>
        </div>
      ))
    ) : (
      'There are no top products'
    )
  }
</TabPanel>

          </Box>
        </div>
        <div className={`absolute w-full max-w-full max-h-full h-full bg-[rgba(0,0,0,0.5)] inset-0 text-white ${openModal ? '' : 'hidden'}`}>
  <button onClick={() => { handleCloseModal(); setActiveprod(0); }} className='m-9 float-end'>
    <span className='text-red-600 font-bold text-[25px]'>x</span>
  </button>
  
  {activeCategory !== null ? (
    // Si estás en una categoría normal
    FormValues.category[activeCategory]?.products?.[activeprod] && (
      <div style={{backgroundColor: FormValues.category[activeCategory].products[activeprod].backgroundProductCard}} className={`absolute bg-orange-400 top-[25%] w-[80%] left-[10%] h-auto rounded-[10px] p-4`}>
        <img className='rounded-2xl border-[4px] border-black' src={FormValues.category[activeCategory].products[activeprod].productImg ? URL.createObjectURL(FormValues.category[activeCategory].products[activeprod].productImg) : 'jajaja'} alt={FormValues.category[activeCategory].products[activeprod].productName} />
        <div className='flex flex-row w-full h-auto justify-between p-2 mb-1'>
          <h1 className='mx-3 my-4 font-bold text-[20px] text-black'>{FormValues.category[activeCategory].products[activeprod].productName}</h1>
          <h1 className='mx-3 my-4 font-bold text-[20px] text-black'>{FormValues.category[activeCategory].products[activeprod].price}$</h1>
        </div>
        <div>
          <h1 className='font-bold text-[20px] text-center text-black'>{FormValues.category[activeCategory].products[activeprod].productDescription}</h1>
        </div>
        <div>
          <span className='float-end'>{FormValues.category[activeCategory].products[activeprod].top ? <StarIcon className='text-yellow-400' /> : ''}</span>
        </div>
      </div>
    )
  ) : (
    // Si estás en la pestaña "top" y quieres mostrar los productos destacados
    topProducts[activeprod] && (
      <div style={{backgroundColor: topProducts[activeprod].backgroundProductCard}} className={`absolute bg-orange-400 top-[25%] w-[80%] left-[10%] h-auto rounded-[10px] p-4`}>
        <img className='rounded-2xl border-[4px] border-black' src={topProducts[activeprod].productImg ? URL.createObjectURL(topProducts[activeprod].productImg) : 'jajaja'} alt={topProducts[activeprod].productName} />
        <div className='flex flex-row w-full h-auto justify-between p-2 mb-1'>
          <h1 className='mx-3 my-4 font-bold text-[20px] text-black'>{topProducts[activeprod].productName}</h1>
          <h1 className='mx-3 my-4 font-bold text-[20px] text-black'>{topProducts[activeprod].price}$</h1>
        </div>
        <div>
          <h1 className='font-bold text-[20px] text-center text-black'>{topProducts[activeprod].productDescription}</h1>
        </div>
        <div>
          <span className='float-end'>{topProducts[activeprod].top ? <StarIcon className='text-yellow-400' /> : ''}</span>
        </div>
      </div>
    )
  )}
</div>

      </div>
    </ThemeProvider>
  );
}
