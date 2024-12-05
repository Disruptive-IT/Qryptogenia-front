import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SocialButtonM } from '../components/Layout/qrContent/socialMedia/socialButtons';
import Skeleton from '@mui/material/Skeleton';
import { autocompleteClasses, createTheme, Modal, ThemeProvider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';
import ModalComponent from '../components/discounts/form/modal';
import './../components/Layout/qrContent/forms/menu/menu.css';
import { SocialButton, SocialButtonS } from '../components/Layout/qrContent/socialMedia/socialButton';
import { extractColorFromGradient, handleSetIsDark, isDarkColor } from '../components/Layout/qrContent/preview-helpers/handlerColor';
import { mapNetworkName, options } from '../components/Layout/qrContent/preview-helpers/handlePreviewButtons';
import { UseMenu } from '../components/Layout/qrContent/forms/menu/menuContext';
import instance from '../libs/axios';


/**
 * @Author : Jobserd Julián Ocampo,   @date 2024-07-19 09:08:16
 * @description : Página de destino del usuario tras la lectura del QR, donde se muestra la vista previa obtenida
 * @Props : Se recibe el qrId desde los parámetros, el cual se utiliza para realizar una petición al backend
 * @return: Retorna los datos obtenidos de la petición, incluyendo posibles errores y resultados exitosos
**/

const QRScanPage = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qrData, setQrData] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [openModal,setOpenModal]=useState(false);
    const [closeModal,setCloseModal]=useState(false);
    const [activeprod,setActiveprod]=useState(0);
    const [activeCategory,setActiveCategory]=useState(0);
    const [scrollY, setScrollY] = useState(0); // Estado para guardar la posición del scroll
    const [marginValue, setMarginValue] = useState('0%');
    const qrId = searchParams.get('q');
    const [dataBtn,setDataBtn]=useState(null);
    const [isDark, setIsDark] = useState('#000000');
    const [isButtonDark,setIsButtonDark]=useState('#000000');
    const [fontPreview,setFontPreview]=useState({});
    const [hasAnimated,setHasAnimated]=useState(false);
    const {getNameFont,currencyFormat}=UseMenu();

    
    const fetchData = async () => {
        try {
            const res = await instance.get(`/verify-qr?q=${qrId}`);
            console.log(res.data);
            setQrData(res.data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Error de verificación de QR');
            setLoading(false);
        }
    };

    const categoryIndex= tabValue==qrData?.MenuPreview?.category.length ? qrData?.MenuPreview?.category.length : tabValue;

    useEffect(() => {
      if (qrData && "QrPreview" in qrData) {
          const updatedDataBtn = Array.isArray(qrData.QrPreview?.SelectOptions)
              ? qrData.QrPreview.SelectOptions.map(option => {
                  const originalOption = options.find(opt => opt.value === option.value);
                  return {
                      name: mapNetworkName(option.value),
                      icon: originalOption ? originalOption.icon : null,
                      iconw: originalOption ? originalOption.iconw : null,
                      url: option.url,
                      textTop: originalOption ? originalOption.textTop : '',
                      textBottom: originalOption ? originalOption.textBottom : '',
                  };
              })
              : [];
          setDataBtn(updatedDataBtn);
      }
  }, [qrData]);

  useEffect(()=>{
    setHasAnimated(false);
  },[tabValue])

    useEffect(() => {
        const executeFunction=async()=>{
            if (qrId) {
                await fetchData();
            } else {
                setError('No se proporcionó ningún ID de QR');
                setLoading(false);
            }
        }

        executeFunction();
    }, [qrId]);

    useEffect(()=>{
      getNameFont(qrData?.QrPreview?.idFontPreview,setFontPreview);
      console.log("font preview: ",fontPreview);
    },[qrData?.QrPreview])

    useEffect(()=>{
      handleSetIsDark(qrData?.MenuPreview?.category[tabValue]?.products[0].backgroundProductCard,setIsButtonDark);
    },[qrData?.MenuPreview?.category[tabValue]?.products[0]?.backgroundProductCard]);

    if (error) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <p className='text-xl'>{error}</p>
            </div>
        );
    }
  
    useEffect(() => {
      handleSetIsDark(qrData?.QrPreview?.backgroundColor,setIsDark);
    }, [qrData?.QrPreview?.backgroundColor]);
    
    const handleOpenModal=()=>{
        setOpenModal(true)
      }
    
      const handleCloseModal=()=>{
        setOpenModal(false)
      }
    
      const handleTabValue = (event, newValue) => {
        if (newValue === qrData?.Menupreview?.category.length) {
          setActiveCategory(null);
        }
        setTabValue(newValue);
      };
      
      const topProducts = qrData?.MenuPreview?.category 
        ? qrData.MenuPreview.category.flatMap(category => 
            category?.products?.filter(product => product.top === true) || []
            ) 
        : [];
    
      const theme = createTheme({
        palette:{
          primary:{
            main:'#3f50b5'
          },
          secondary:{
            main:qrData?.MenuPreview ? qrData.MenuPreview.colorMenu : '#000'
          }
        },
        typography:{
          fontFamily:qrData?.MenuPreview ? qrData.MenuPreview.fontPreview : 'Arial, sans-serif',
          fontWeightBold:'1000'
        },
        components:{
          MuiTabs:{
            styleOverrides:{
              scrollButtons:{
                color:qrData?.MenuPreview ? qrData.MenuPreview.colorMenu : '#fff',
              }
            }
          }
        }
      });

      const cardVariants = {
        offscreen: {
          y: 300,
          visibility:'hidden'
        },
        onscreen: {
          visibility:'visible',
          y: 0,
          transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.4
          }
        }
      };
      
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
        setActiveCategory(tabValue);
      },[tabValue])

      useEffect(()=>{
        console.log("active prod: ",activeprod);
        console.log("active cat: ",activeCategory);
      },[activeCategory,activeprod])

    return (
      <div style={{
        backgroundColor: !qrData?.MenuPreview?.imgTemplate && !qrData?.MenuPreview?.userTemplate 
                           ? qrData?.MenuPreview?.backgroundCard 
                           : '#fff',
        backgroundImage: 
          qrData?.MenuPreview?.imgTemplate 
            ? `url(${qrData.MenuPreview.imgTemplate})`
            : qrData?.MenuPreview?.userTemplate 
            ? `url(${qrData.MenuPreview.userTemplate})`
            : qrData?.MenuPreview?.backgroundCard?.includes("gradient") 
            ? qrData.MenuPreview.backgroundCard
            : 'none',
        backgroundSize: '100vw 100vh',
        // width: '100%',
        height: 'auto',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        margin: '0',
        overflowY: 'hidden',
        overflowX:'hidden'
      }}>      
            {qrData?.QrPreview && (
                <div style={{fontFamily:fontPreview?.fontName}} className='flex items-center justify-center min-h-screen'>
                <div className='flex flex-col min-h-screen w-full items-center justify-center' style={{ background: qrData?.QrPreview?.backgroudColor || '#f0f0f0' }}>
                    <div className='flex flex-col items-center mt-10 md:mt-28 bg-white rounded-2xl w-[90%] sm:w-[400px] md:w-[600px] h-auto max-h-[600px] p-6 shadow-lg' style={{ background: qrData?.QrPreview?.boxColor || '#ffffff' }}>
                        <div className={`${qrData?.QrPreview?.imgBoxBackgroundBase64==null ? 'hidden':''} relative bg-white rounded-2xl -mt-14 border-4 shadow-md p-1 transition-shadow hover:shadow-xl`} style={{ borderColor: qrData?.QrPreview?.borderImg || '#e0e0e0' }}>
                            {loading ? (
                                <Skeleton variant="rectangular" width={80} height={80} />
                            ) : (
                                <img className={`w-20 ${qrData?.QrPreview?.imgBoxBackgroundBase64==null ? 'hidden':''}`} src={`data:image/png;base64,${qrData.QrPreview.imgBoxBackgroundBase64}`} alt="img" />
                            )}
                        </div>
                        <div className="mt-4 mb-2 w-[90%] text-center">
                            {loading ? (
                                <div className='flex flex-col justify-center items-center'>
                                    <Skeleton variant="text" width="80%" height={40} center />
                                    <Skeleton variant="text" width="90%" height={100} center />
                                </div>
                            ) : (
                                <>
                                    <h1 className="text-2xl mb-2 font-bold" style={{ color: qrData?.QrPreview?.colorTitle }}>
                                        {qrData.QrPreview.title}
                                    </h1>
                                    <div className="break-words overflow-y-auto max-h-[200px] text-lg leading-relaxed" style={{ color: qrData.descriptionColor }}>
                                        {qrData.QrPreview.description}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="mt-5">
                      {loading ? (
                          <Skeleton variant="rectangular" width={400} height={50} />
                      ) : (
                          <>
                              {qrData?.qrType === 'app-store' && <SocialButton data={dataBtn} botonColor={isDark} />}
                              {qrData?.qrType === 'music' && <SocialButtonM data={dataBtn} botonColor={isDark} />}
                              {qrData?.qrType === 'social-media' && <SocialButtonS data={dataBtn} botonColor={isDark} />}
                          </>
                      )}
                  </div>
                </div>
            </div>
            )}

            {qrData?.MenuPreview && (
                <div>
                    {loading ? (
                        <h1>loading......</h1>
                    ):(
                    <div className="h-[100vh] w-full  flex flex-col justify-start items-center space-y-2 md:space-y-0 pt-5">
                    {/* Logo y nombre del restaurante */}
                    <div className="w-full mx-auto sm:p-4 md:p-2  relative sm:top-5 md:top-0 lg:top-1 min-w-[345px] sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] flex justify-center flex-col items-center">
                      <div style={{ boxShadow: '2px 4px 4px 0px rgb(0,0,0,1)' }} className="w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] md:w-[196px] md:h-[196px] lg:w-[230px] lg:h-[230px] rounded-md overflow-hidden">
                          <img 
                              src={qrData?.MenuPreview?.restaurantLogo || ''} 
                              alt={qrData?.MenuPreview?.restaurantName || 'Restaurant logo'} 
                              className="object-cover w-full h-full" 
                          />
                      </div>
                      <div style={{ boxShadow: '2px 4px 4px 0px rgb(0,0,0,1)' }} className="text-center text-[24px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] bg-white w-[80%] mx-2 my-4 sm:my-6 rounded-md py-2">
                          <h1 
                              style={{ fontFamily: qrData?.MenuPreview?.fontPreview }} 
                              className="text-black"
                          >
                              {qrData?.MenuPreview?.restaurantName || 'Restaurant name'}
                          </h1>
                      </div>
                  </div>
                    {/* Categorías y productos */}
                    <motion.div
                    className="lg:w-[90%] sm:w-full p-1 md:w-[90%] min-h-90 h-auto overflow-auto">
                        <ThemeProvider theme={theme}>
                        <Box>
                            <Tabs
                            variant="scrollable"
                            allowScrollButtonsMobile
                            scrollButtons={true}
                            textColor="secondary"
                            indicatorColor="secondary"
                            value={tabValue}
                            onChange={handleTabValue}
                            sx={{
                                position:'sticky',
                                marginLeft: {
                                  xs: '10%', // Elimina margen a la izquierda en pantallas pequeñas
                                  sm: '20%', // Elimina margen en pantallas medianas
                                  md: '30%', // Ajusta el margen en pantallas grandes
                                },
                                marginRight:{
                                    xs:'15%'
                                },
                                '.MuiTabs-scrollButtons': {
                                  width: '40px', // Reduce el tamaño del botón de desplazamiento si es necesario
                                },
                                '.MuiTabScrollButton-root': {
                                  margin: 0, // Elimina el margen que pueda tener el botón
                                },
                              }}>
                            {qrData?.MenuPreview?.category.map((category, index) => (
                                <Tab
                                key={index}
                                sx={{ color: qrData?.MenuPreview?.colorMenu, fontWeight: '800' }}
                                label={category.categoryName || `Category ${index + 1}`}
                                value={index}
                                />
                            ))}
                            {topProducts?.length > 0 && (
                                <Tab
                                sx={{ color: qrData?.MenuPreview?.colorMenu, fontWeight: '800' }}
                                key="top"
                                label="Top"
                                value={qrData?.MenuPreview?.category.length}
                                />
                            )}
                            </Tabs>

                            {/* Paneles de Categorías */}
                            {qrData?.MenuPreview?.category.map((category, indexCategory) => (
                            <TabPanel key={indexCategory} value={tabValue} index={indexCategory}>
                               <motion.div 
                                  initial={!hasAnimated ? { translateY: "500px", opacity: 0 } : false}
                                  animate={{ translateY: "0px", opacity: 1 }}
                                  transition={{
                                    delay: 0.1, // Retraso para que sea más notorio
                                    duration: 0.1, // Aumenta la duración
                                    type: "spring",
                                    stiffness: 80, // Ajusta la rigidez para un movimiento más suave
                                    damping: 10,   // Reduce las oscilaciones
                                    bounce: 0.3,
                                  }}
                                  onAnimationComplete={() => {
                                    if (!hasAnimated) setHasAnimated(true);
                                  }}
                                      className="flex flex-wrap justify-center gap-4"
                                      style={{ marginTop: "20px" }}
                                    >
                            {category.products && category.products.length > 0 ? (
                                category.products.map((product, indexProduct) => (
                                  <motion.div
                                  key={indexProduct}
                                  initial={indexProduct > 3 && cardVariants.offscreen}
                                  transition={{duration:'.3s',type:'spring',bounce:'0.5'}}
                                  whileInView={indexProduct > 3 && cardVariants.onscreen}
                                  viewport={{ once: true, amount: 0.3 }}
                                  style={{
                                      boxShadow: '3px 5px 5px 0px rgb(0,0,0,1)',
                                      backgroundColor: product.backgroundProductCard,
                                      backgroundImage: product.backgroundProductCard.includes("gradient") ? product.backgroundProductCard : "none",
                                  }}
                                  className='w-[320px] h-[116px] flex rounded-md overflow-hidden'
                                  onClick={() => {setActiveprod({activeCat: indexCategory, activeProd: indexProduct}); handleOpenModal();}}
                              >
                                  <div className="w-[40%] h-full overflow-hidden">
                                      <img className="w-full h-full" src={product.productImg} alt={product.productName} />
                                  </div>
                                  <div className="w-[60%] h-full px-2 py-2 flex flex-col justify-between">
                                      {product.top && <img className='w-7 self-end pb-2 bottom-0' src='/star.svg'/>}
                                      <div className="w-full flex-grow bg-transparent flex flex-col justify-evenly">
                                          <h1 style={{ color: product.colorName, fontFamily: qrData?.MenuPreview?.fontPreview }} className="text-[17px] text-center break-words font-bold">
                                              {product.productName || 'Product name'}
                                          </h1>
                                          <h1 style={{ color: product.colorPrice, fontFamily: qrData?.MenuPreview?.fontPreview }} className="text-center break-words font-bold">
                                              {product.price == null ? 'Price' : `${currencyFormat(product.price)}`}
                                          </h1>
                                      </div>
                                      <button style={{backgroundColor:isButtonDark,color:isButtonDark=='#000000' ? '#ffffff' : '#000000'}} className=" w-1/4 text-[12px] self-end text-white px-2 font-semibold rounded-3xl  transition-all duration-200">Ver</button>
                                  </div>
                              </motion.div>                              
                                ))
                            ) : (
                                <div>No products available</div>
                            )}
                            </motion.div>

                            </TabPanel>
                            ))}

                            {/* Panel para los productos destacados */}
                            <TabPanel key="top" value={tabValue} index={qrData?.MenuPreview?.category.length}>
                            <motion.div
                              initial={!hasAnimated ? { translateY: "500px", opacity: 0 } : false}
                              animate={{ translateY: "0px", opacity: 1 }}
                              transition={{
                                delay: 0.1, // Retraso para que sea más notorio
                                duration: 0.1, // Aumenta la duración
                                type: "spring",
                                stiffness: 80, // Ajusta la rigidez para un movimiento más suave
                                damping: 10,   // Reduce las oscilaciones
                                bounce: 0.3,
                              }}
                              onAnimationComplete={() => {
                                if (!hasAnimated) setHasAnimated(true);
                              }}
                                  className="flex flex-wrap justify-center gap-4"
                                  style={{ marginTop: "20px" }}                                  
                            >
                            {topProducts?.length > 0 ? (
                                topProducts.map((element, index) => (
                                <motion.div                               
                                initial={index > 3 && cardVariants.offscreen}
                                whileInView={index > 3 && cardVariants.onscreen}
                                viewport={{ once: true, amount: 0.4 }}
                                style={{ boxShadow: '3px 5px 5px 0px rgb(0,0,0,1)',backgroundColor:element.backgroundProductCard,backgroundImage:element.backgroundProductCard.includes("gradient") ? element.backgroundProductCard : "none" }} key={index} 
                                className="w-[320px] h-[116px] flex rounded-md overflow-hidden" onClick={() => { setActiveprod(index); handleOpenModal(); }}>
                                    <div className="w-[40%] h-full overflow-hidden">
                                    <img className="w-full h-full" src={element.productImg} alt={element.productName} />
                                    </div>
                                    <div className="w-[60%] h-full px-2 py-2 flex flex-col justify-between">
                                    {element.top && <img className='w-7 self-end pb-2 bottom-0' src='/star.svg'/>}
                                    <div style={{ fontFamily: qrData?.MenuPreview?.fontPreview || 'sans-serif' }} className="w-full flex-grow bg-transparent flex flex-col justify-evenly">
                                        <h1 style={{ color: element.colorName }} className="text-[17px] text-center break-words font-bold">
                                        {element.productName || 'Product name'}
                                        </h1>
                                        <h1 style={{ color: element.colorPrice }} className="text-center break-words font-bold">
                                        {element.price == null ? 'Price' : `${currencyFormat(element.price)}`}
                                        </h1>
                                    </div>
                                    <button className="bg-black w-1/4 text-[12px] self-end text-white px-2 font-semibold rounded-3xl  transition-all duration-200">Ver</button>
                                    </div>
                                </motion.div>
                                ))
                            ) : (
                                'There are no top products'
                            )}
                            </motion.div>
                            </TabPanel>
                        </Box>
                        </ThemeProvider>
                    </motion.div>
                    {activeCategory !== null && activeCategory >= 0 && (
                  qrData?.MenuPreview?.category[activeprod.activeCat]?.products[activeprod.activeProd] && (
                    <ModalComponent isOpen={openModal} onClose={closeModal}>
                      <div className='w-32 m-auto flex justify-center'>
                      <button
                        onClick={() => { handleCloseModal(); setActiveprod(0); }} 
                        className="absolute top-0 p-1 text-[15px] rounded-md text-red-600 bg-white font-bold cursor-pointer hover:bg-red-600 hover:text-white"
                      >
                        cerrar
                      </button>
                      </div>
                      <div 
                        style={{ backgroundColor: qrData?.MenuPreview?.category[activeprod.activeCat].products[activeprod.activeProd].backgroundProductCard,backgroundImage:qrData?.MenuPreview?.category[activeprod.activeCat].products[activeprod.activeProd].backgroundProductCard.includes("gradient") ? qrData?.MenuPreview?.category[activeprod.activeCat].products[activeprod.activeProd].backgroundProductCard  : "none", fontFamily: qrData?.MenuPreview?.fontPreview }} 
                        className=" lg:mt-[5%] lg:ml-[40%]  flex lg:w-[20%] flex-col items-center p-4 rounded-lg my-[10%]"
                      >
                        {/* Imagen del producto */}
                        <img 
                          className="w-[200px] h-[200px] rounded-lg border-[2px] border-black" 
                          src={qrData?.MenuPreview?.category[activeprod.activeCat].products[activeprod.activeProd].productImg} 
                          alt={qrData?.MenuPreview?.category[activeprod.activeCat].products[activeprod.activeProd].productName} 
                        />

                        {/* Información del producto */}
                        <div className="w-full mt-4 flex flex-col items-center text-center">
                          <h1 style={{color: qrData?.MenuPreview?.category[activeprod.activeCat].products[activeprod.activeProd].colorName}} className="text-2xl font-bold my-2">{qrData?.MenuPreview?.category[activeprod.activeCat].products[activeprod.activeProd].productName}</h1>
                          <h2 style={{color: qrData?.MenuPreview?.category[activeprod.activeCat].products[activeprod.activeProd].colorPrice}} className="text-xl font-bold text-gray-700 my-2">{currencyFormat(qrData?.MenuPreview?.category[activeprod.activeCat].products[activeprod.activeProd].price)}</h2>
                          <p style={{color: qrData?.MenuPreview?.category[activeprod.activeCat].products[activeprod.activeProd].colorDescription}} className="text-lg mt-2 my-2">{qrData?.MenuPreview?.category[activeprod.activeCat].products[activeprod.activeProd].productDescription}</p>
                        </div>

                        {/* Indicador de producto destacado */}
                        {qrData?.MenuPreview?.category[activeprod.activeCat].products[activeprod.activeProd].top && (
                          <img className='w-10 self-center' src='/star.svg'/>
                        )}
                      </div>
                    </ModalComponent>
                  )
                )}

                  {topProducts?.[activeprod] && (
                    <ModalComponent isOpen={openModal} onClose={closeModal}>
                      <div className='w-32 m-auto flex justify-center'>
                      <button
                        onClick={() => { handleCloseModal(); setActiveprod(0); }} 
                        className="absolute top-0 p-1 text-[15px] rounded-md text-red-600 bg-white font-bold cursor-pointer hover:bg-red-600 hover:text-white"
                      >
                        cerrar
                      </button>
                      </div>
                      <div 
                        style={{ backgroundColor: topProducts[activeprod].backgroundProductCard,backgroundImage:topProducts[activeprod].backgroundProductCard.includes("gradient") ? topProducts[activeprod].backgroundProductCard : "none", fontFamily: qrData?.MenuPreview?.fontPreview || 'sans-serif' }} 
                        className="lg:mt-[5%] lg:ml-[40%]  flex lg:w-[20%] flex-col items-center p-4 rounded-lg my-[10%]"
                      >
                        {/* Imagen del producto destacado */}
                        <img 
                          className="w-[200px] h-[200px] rounded-lg border-[2px] border-black" 
                          src={topProducts[activeprod]?.productImg} 
                          alt={topProducts[activeprod]?.productName || 'Producto'} 
                        />

                        {/* Información del producto destacado */}
                        <div className="w-full mt-4 flex flex-col items-center text-center">
                          <h1 style={{color:topProducts[activeprod].colorName}} className="text-2xl font-bold mb-2">{topProducts[activeprod]?.productName}</h1>
                          <h2 style={{color:topProducts[activeprod].colorPrice}} className="text-xl font-bold mb-2 text-gray-700">{currencyFormat(topProducts[activeprod]?.price)}</h2>
                          <p style={{color:topProducts[activeprod].colorDescription}} className="text-lg mt-2">{topProducts[activeprod]?.productDescription}</p>
                        </div>

                        {/* Indicador de producto destacado */}
                        {topProducts[activeprod]?.top && (
                          <img className='w-10 self-center' src='/star.svg'/>
                        )}
                      </div>
                    </ModalComponent>
                  )}
                    </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default QRScanPage;