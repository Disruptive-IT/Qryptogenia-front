/*
 * @Author : Nicolas Barrios,   @date 2024-10-25 11:25:06
 * @description : docuemnto que encierra las funciones que modifican los botones de las previews
 * @Props :
 * @return :
 */

//funcion que maneja las mayusculas en los valores de los botones
export const mapNetworkName = (value) => {
    const formattedValue = value.toLowerCase();
    if (formattedValue.includes('samsung galaxy store')) {
        return 'Galaxy Store';
    } else if (formattedValue.includes('app store')) {
        return 'Apple Store';
    } else if (formattedValue.includes('google play store')) {
        return 'Google Play';
    } else {
        return value.split(' ')[0].charAt(0).toUpperCase() + value.split(' ')[0].slice(1).toLowerCase();
    }
};

//valores de botones para musica y app store
export const options = [
    {
      textTop: "",
      textBottom: "Galaxy Store",
      value: 'Samsung Galaxy Store',
      icon: 'galaxy',
      iconw: 'galaxy'
    },
    {
  
      value: 'Google Play Store',
      textTop: "GET IT ON",
      textBottom: "Google Play",
  
      icon: 'play',
      iconw: 'play'
    },
    {
      textTop: "Download on the",
      textBottom: "App Store",
      value: 'Apple',
      icon: 'apple',
      iconw: 'applew'
  
    },
    {
      textTop: "Download on the",
      textBottom: "App Store",
      value: 'huawei',
      icon: 'huawei',
      iconw: 'huawei'
  
    },
    {
      textTop: "Download on the",
      textBottom: "Microsoft Store",
      value: 'microsoft',
      icon: 'microsoft',
      iconw: 'microsoftw'
  
    },
    {
      value: 'youtube',
      icon: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/color/48/youtube-music.png' />,
      iconw: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/color/48/youtube-music.png' />
    },
    {
      value: 'soundcloud',
      textTop: "GET IT ON",
      textBottom: "Google Play",
      icon: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/?size=100&id=13669&format=png&color=000000' />,
      iconw: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/?size=100&id=13669&format=png&color=000000' />
    },
    {
      value: 'deezer',
      icon: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/external-tal-revivo-bold-tal-revivo/48/external-deezer-a-french-online-music-streaming-service-logo-bold-tal-revivo.png' />,
      iconw: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0,0,256,256">
      <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(5.12,5.12)"><path d="M39,14v2h8v-2zM21,17v2h8v-2zM39,17v2h8v-2zM21,20v2h8v-2zM39,20v2h8v-2zM3,23v2h8v-2zM21,23v2h8v-2zM30,23v2h8v-2zM39,23v2h8v-2zM3,26v2h8v-2zM21,26v2h8v-2zM30,26v2h8v-2zM39,26v2h8v-2zM3,29v2h8v-2zM12,29v2h8v-2zM21,29v2h8v-2zM30,29v2h8v-2zM39,29v2h8v-2zM3,32v2h8v-2zM12,32v2h8v-2zM21,32v2h8v-2zM30,32v2h8v-2zM39,32v2h8v-2zM3,35v2h8v-2zM12,35v2h8v-2zM21,35v2h8v-2zM30,35v2h8v-2zM39,35v2h8v-2z"></path></g></g>
      </svg>,
      textTop: "Download on the",
      textBottom: "App Store",
    },
    {
      value: 'spotify',
      icon: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/?size=100&id=G9XXzb9XaEKX&format=png&color=000000' />,
      textTop: "Download on the",
      textBottom: "App Store",
    },
    {
      value: 'amazon',
      icon: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/?size=100&id=lxwUaALAeQmr&format=png&color=000000' />,
      iconw: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/?size=100&id=lxwUaALAeQmr&format=png&color=000000' />,
      textTop: "Download on the",
      textBottom: "App Store",
    },
    {
      value: 'apple',
      icon: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/?size=100&id=Bri4HBrgCsPa&format=png&color=000000' />,
      iconw: <img style={{ width: '50px', height: '50px' }} src='https://img.icons8.com/?size=100&id=Bri4HBrgCsPa&format=png&color=000000' />,
      textTop: "Download on the",
      textBottom: "App Store",
    }
  ];