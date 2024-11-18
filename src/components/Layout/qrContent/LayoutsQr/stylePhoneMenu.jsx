import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import instance from '../../../../libs/axios';
import './../forms/menu/menu.css';
import { createTheme, Modal, ThemeProvider } from '@mui/material';
import { UseMenu } from '../forms/menu/menuContext';
import { useTranslation } from 'react-i18next';
export default function WebLinkMenuFood({ FormValues, ContentName }) {
  const [tabValue, setTabValue] = useState(0);
  const [openModal,setOpenModal]=useState(false);
  const [selectedIndex,setSelectedIndex]=useState(null);
  const [fontFamily,setFontFamily]=useState({});
  const [templateUrl,setTemplateUrl]=useState({});
  const [activeprod,setActiveprod]=useState(0);
  const [activeCategory,setActiveCategory]=useState(0);
  const [counterChange,setCounterChange]=useState(0);
  const initialkeys=useRef(FormValues);
  const[showInitialKeys,setShowInitialKeys]=useState(true);
  const isEditRoute = location.pathname.startsWith('/edit');
  const validateLink=/.webp/
  const {t}=useTranslation();
  const defaultProductImage='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpSkKP8LgqK1IPs87-PyJcveeRF0Wet-xgyw&s'
  const defaultLogo='https://media.istockphoto.com/id/981368726/es/vector/restaurante-de-comida-y-bebidas-logotipo-tenedor-cuchillo-fondo-vector-imagen.jpg?s=612x612&w=0&k=20&c=3mPGCDXyBeuGpxeuTlHkECM5rAW5cy07bDFi0i0ZCbw='

  const hasChanged=(current,initial)=>{
    if(!isEditRoute && current.restaurantName===null || current.restaurantName!==initial.restaurantName || current.category!==initial.category || current.restaurantLogo!==initial.restaurantLogo){
      setShowInitialKeys(false);
      if(showInitialKeys==false){
        setCounterChange(counterChange+1);
      }
    }else{
      setShowInitialKeys(true);
    }
  }

  useEffect(()=>{
    if(!isEditRoute){
      hasChanged(FormValues,initialkeys.current);
    }
  },[FormValues])

  console.log("show intial keys menu is : ",showInitialKeys);

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

  const getNameFont=async(id)=>{
    try{
        const getFontsArray=await instance.get(`/getFonts/${id}`);
       setFontFamily(getFontsArray.data);
        return getFontsArray.data;
    }catch(error){
        console.error("error fonts request: ",error.message);
    }
}


const getLinkTemplate=async(id)=>{
    try{
        const getTemplatesArray=await instance.get(`/getTemplates/${id}`);
        setTemplateUrl(getTemplatesArray.data);
        return getTemplatesArray.data;
    }catch(error){
        console.error("error fonts request: ",error.message);
    }
}
  
  const topProducts=FormValues?.category.flatMap(category=>category.products.filter(product=>product.top==true));
  // console.log(topProducts);
  
  // console.log("modal producto activo ",activeprod);
  // console.log("catgeoria activa: ",activeCategory);

  const theme = createTheme({
    palette:{
      primary:{
        main:'#3f50b5'
      },
      secondary:{
        main:FormValues?.colorMenu || '#ff4081'
      }
    },
    typography:{
      fontFamily:`${fontFamily?.fontName}` || 'Arial, sans-serif',
      fontWeightBold:'1000'
    },
    components:{
      MuiTabs:{
        styleOverrides:{
          scrollButtons:{
            color:FormValues?.colorMenu || '#ff4081',
          }
        }
      }
    }
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

  useEffect(()=>{
    if(FormValues?.idImgTemplate!=null){
      getLinkTemplate(FormValues.idImgTemplate);
    }
  },[FormValues?.idImgTemplate])

  useEffect(()=>{
    getNameFont(FormValues?.idFontPreview);
    console.log(fontFamily);
  },[FormValues?.idFontPreview]);

  return (
      <div className='parent-container absolute left-0 w-full h-full'>
<div
    className="relative left-0 top-0 w-full h-full overflow-y-auto p-4"
    id="main-container"
    style={{
      backgroundColor: FormValues?.backgroundCard.includes("gradient")
        ? "transparent"
        : FormValues?.backgroundCard, // Solo asigna si es un color sólido
      backgroundImage: FormValues?.idImgTemplate == null
        ? FormValues?.idUserTemplate !== null
          ? `url(${URL.createObjectURL(FormValues?.idUserTemplate)})`
          : FormValues?.backgroundCard.includes("gradient")
          ? FormValues?.backgroundCard // Asigna el gradiente si lo contiene
          : "" : isEditRoute
          ? `url(${templateUrl?.image})`
          : `url(${templateUrl?.image})`,
      backgroundSize: "340px 660px",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative",
      top: 0,
      width: "100%",
      height: "100%",
    }}
>
        <div
          className="w-[60%] overflow-auto max-w-[196px] max-h-[196px] rounded-[10px] mx-auto my-6 bg-slate-500 flex justify-center items-center"
          id="logo-container"
        >
          <img
            className={`w-full h-auto  object-contain rounded-md ${FormValues.restaurantLogo!==null || counterChange==0 ? '':'hidden'}`}
            id="restaurantLogoPreview"
            alt="restaurantLogo"
             src={showInitialKeys && counterChange==0 && !isEditRoute && FormValues.restaurantLogo==null ? defaultLogo : validateLink.test(FormValues?.restaurantLogo)  ? (isEditRoute ? FormValues?.restaurantLogo : '') : (FormValues?.restaurantLogo instanceof File ? URL.createObjectURL(FormValues?.restaurantLogo) : '')}
          />
        </div>

        <div
          className="w-[80%] max-w-[84%] bg-slate-100 h-auto p-4 mx-auto my-4 rounded-md shadow-sm"
          id="name-container"
        >
          <h1 style={{fontFamily:fontFamily?.fontName}} className="text-center font-semibold text-[25px] break-words">
            {showInitialKeys && counterChange==0 && !isEditRoute && FormValues.restaurantName=='' ? t('Food Restaurant') : FormValues.restaurantName!==''? FormValues.restaurantName : t('Restaurant name')}
          </h1>
        </div>
        <div
          className="w-[100%] max-w-[100%] bg-transparent h-auto py-2 my-3 mx-1 rounded-md shadow-sm scroll-container"
          id="categories-container"
        >
          <ThemeProvider theme={theme}>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <Tabs
              variant="scrollable"
              scrollButtons="auto"
              textColor='secondary'
              indicatorColor='secondary'
              value={tabValue}
              onChange={handleTabValue}
            >
              {FormValues.category.map((element, index) => (
                <Tab
                  sx={{ color: FormValues.colorMenu,fontWeight:'800'}}
                  key={index}
                  label={element.categoryName!==""?element.categoryName:`${t('category')} ${index+1}`}
                  value={index}
                />
              ))}
              {topProducts.length>0 && (
                <Tab
                  sx={{ color:FormValues.colorMenu,fontWeight:'800' }}
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
          <img className='w-full h-full' src={showInitialKeys && index==0 && productIndex==0 && counterChange==0 && element.productImg==null && !isEditRoute ? defaultProductImage : element.productImg && validateLink.test(FormValues?.category?.[index]?.products?.[productIndex]?.productImg)  ? (isEditRoute ? element.productImg : '') : (element?.productImg instanceof File ? URL.createObjectURL(element.productImg) : '')} alt={element.productName || 'Producto'}/>
          </div>
          <div style={{backgroundColor:showInitialKeys && counterChange==0 && !isEditRoute && element.backgroundColor=='#fff' ? '#7EC2DD':element.backgroundProductCard,backgroundImage:element.backgroundProductCard.includes("gradient") ? element.backgroundProductCard : "none"}} className='w-[60%] h-full bg-red-300 px-1 py-1  flex flex-col self-center'>
            <img className='w-4 self-end' src='/eye.svg'/>
            <div className='w-full  h-[80%] bg-transparent flex flex-col justify-evenly'>
              <h1 style={{color: element.colorName,fontFamily:fontFamily?.fontName}} className='text-[17px] text-center break-words font-bold'>{showInitialKeys && index==0 && productIndex==0 && counterChange==0 && !isEditRoute && element.productName=='' ? 'Burguer' : element.productName=='' ? 'Product name' : element.productName}</h1>
              <h1 style={{color: element.colorPrice,fontFamily:fontFamily?.fontName}} className='text-center break-words font-bold'>{showInitialKeys && index==0 && productIndex==0 && counterChange==0 && !isEditRoute && element.price=='' ? '45.67$' : element.price==null ? 'price':element.price+'$'}</h1>
            </div>
            {element.top ? <img className='w-8 self-end pb-1' src='/star.svg'/> : ''}
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
            <img className='w-full h-full' src={validateLink.test(element.productImg)  ? (isEditRoute ? element.productImg : '') : (element.productImg instanceof File ? URL.createObjectURL(element.productImg) : '')} alt={element.productName} />
          </div>
          <div style={{backgroundColor:element.backgroundProductCard}} className='w-[60%] h-full bg-red-300 px-1 py-1  flex flex-col self-center'>
            <img className='w-4 self-end' src='/eye.svg'/>
            <div style={{fontFamily:fontFamily?.fontName || 'sans-serif'}} className='w-full  h-[80%] bg-transparent flex flex-col justify-evenly'>
              <h1 style={{color: element.colorName}} className='text-[17px] text-center break-words font-bold'>{element.productName === '' ? 'Product name' : element.productName}</h1>
              <h1 style={{color: element.colorPrice}} className='text-center break-words font-bold'>{element.price == null ? 'price' : element.price + '$'}</h1>
            </div>
            {element.top ? <img className='w-8 self-end pb-1' src='/star.svg'/>: ''}
          </div>
        </div>
      ))
    ) : (
      'There are no top products'
    )
  }
</TabPanel>

          </Box>
          </ThemeProvider>
        </div>
        {/*modal*/}
        <div className={`absolute inset-0 w-full w-90 overflow-hidden bg-[rgba(0,0,0,0.5)] text-white ${openModal ? '' : 'hidden'}`}>
  <button onClick={() => { handleCloseModal(); setActiveprod(0); }} className='m-9 float-end'>
    <span className='text-red-600 font-bold text-[25px]'>x</span>
  </button>
  
  {activeCategory !== null ? (
    // Si estás en una categoría normal
    FormValues.category[activeCategory]?.products?.[activeprod] && (
      <div style={{backgroundColor: FormValues.category[activeCategory].products[activeprod].backgroundProductCard}} className={`absolute bg-orange-400 top-[25%] w-[80%] left-[10%] h-auto rounded-[10px] p-4`}>
        <img className='rounded-2xl border-[4px] border-black' src={validateLink.test(FormValues?.category?.[activeCategory]?.products?.[activeprod]?.productImg)  ? (isEditRoute ? FormValues?.category?.[activeCategory]?.products?.[activeprod]?.productImg : '') : (FormValues?.category?.[activeCategory]?.products?.[activeprod]?.productImg instanceof File ? URL.createObjectURL(FormValues?.category?.[activeCategory]?.products?.[activeprod]?.productImg) : '')} />
        <div className='flex flex-row w-full h-auto justify-between p-2 mb-1'>
          <h1 className='mx-3 my-4 font-bold text-[20px] text-black'>{FormValues.category[activeCategory].products[activeprod].productName}</h1>
          <h1 className='mx-3 my-4 font-bold text-[20px] text-black'>{FormValues.category[activeCategory].products[activeprod].price}$</h1>
        </div>
        <div>
          <h1 className='font-bold text-[20px] text-center text-black'>{FormValues.category[activeCategory].products[activeprod].productDescription}</h1>
        </div>
        <div>
          {FormValues.category[activeCategory].products[activeprod].top ? <img className='w-10 self-center' src='/star.svg'/> : ''}
        </div>
      </div>
    )
  ) : (
    // Si estás en la pestaña "top" y quieres mostrar los productos destacados
    topProducts[activeprod] && (
      <div style={{backgroundColor: topProducts[activeprod].backgroundProductCard}} className={`absolute bg-orange-400 top-[25%] w-[80%] left-[10%] h-auto rounded-[10px] p-4`}>
        <img className='rounded-2xl border-[4px] border-black' src={validateLink.test(topProducts[activeprod].productImg)  ? (isEditRoute ? topProducts[activeprod].productImg : '') : (topProducts[activeprod].productImg instanceof File ? URL.createObjectURL(topProducts[activeprod].productImg) : '')} alt={topProducts[activeprod].productName} />
        <div className='flex flex-row w-full h-auto justify-between p-2 mb-1'>
          <h1 className='mx-3 my-4 font-bold text-[20px] text-black'>{topProducts[activeprod].productName}</h1>
          <h1 className='mx-3 my-4 font-bold text-[20px] text-black'>{topProducts[activeprod].price}$</h1>
        </div>
        <div>
          <h1 className='font-bold text-[20px] text-center text-black'>{topProducts[activeprod].productDescription}</h1>
        </div>
        <div>
          {topProducts[activeprod].top ? <img className='w-10 self-center' src='/star.svg'/> : ''}
        </div>
      </div>
    )
  )}
</div>

      </div>
      </div>
  );
}
