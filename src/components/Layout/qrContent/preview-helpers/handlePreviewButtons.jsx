/*
 * @Author : Nicolas Barrios,   @date 2024-10-25 11:25:06
 * @description : docuemnto que encierra las funciones que modifican los botones de las previews
 * @Props :
 * @return :
 */

import { SocialIcon } from 'react-social-icons'
import apple from "../../../../../src/assets/imgs/apple.png";
import huawei from "../../../../../src/assets/imgs/huawei.png";
import microsoft from "../../../../../src/assets/imgs/microsoft.png";


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
      <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" textAnchor="none"><g transform="scale(5.12,5.12)"><path d="M39,14v2h8v-2zM21,17v2h8v-2zM39,17v2h8v-2zM21,20v2h8v-2zM39,20v2h8v-2zM3,23v2h8v-2zM21,23v2h8v-2zM30,23v2h8v-2zM39,23v2h8v-2zM3,26v2h8v-2zM21,26v2h8v-2zM30,26v2h8v-2zM39,26v2h8v-2zM3,29v2h8v-2zM12,29v2h8v-2zM21,29v2h8v-2zM30,29v2h8v-2zM39,29v2h8v-2zM3,32v2h8v-2zM12,32v2h8v-2zM21,32v2h8v-2zM30,32v2h8v-2zM39,32v2h8v-2zM3,35v2h8v-2zM12,35v2h8v-2zM21,35v2h8v-2zM30,35v2h8v-2zM39,35v2h8v-2z"></path></g></g>
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

  export const musicOptions = [
    {
        value: 'youtube', label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img style={{ marginRight: '5px', width: '25px', height: '25px' }} src="https://img.icons8.com/color/48/youtube-music.png" alt="youtube-music" />
                <span>YouTube Music</span>
            </div>
        ), icon: <img style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} src="https://img.icons8.com/color/48/youtube-music.png" alt="youtube-music" />
    },
    {
        value: 'soundcloud', label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img style={{ marginRight: '5px', width: '25px', height: '25px' }} src='https://img.icons8.com/?size=100&id=13669&format=png&color=000000' />
                <span>SoundCloud</span>
            </div>
        ), icon: <img style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} src='https://img.icons8.com/?size=100&id=13669&format=png&color=000000' />
    },
    {
        value: 'deezer', label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img width="25" height="25" style={{ marginRight: '5px' }} src="https://img.icons8.com/external-tal-revivo-bold-tal-revivo/48/external-deezer-a-french-online-music-streaming-service-logo-bold-tal-revivo.png" alt="external-deezer-a-french-online-music-streaming-service-logo-bold-tal-revivo" />
                <span>Deezer</span>
            </div>
        ), icon: <img style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} src='https://img.icons8.com/external-tal-revivo-bold-tal-revivo/48/external-deezer-a-french-online-music-streaming-service-logo-bold-tal-revivo.png' />
    },
    {
        value: 'spotify', label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img width="25" height="25" style={{ marginRight: '5px' }} src="https://img.icons8.com/?size=100&id=G9XXzb9XaEKX&format=png&color=000000" />
                <span>Spotify</span>
            </div>
        ), icon: <img style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} src='https://img.icons8.com/?size=100&id=lxwUaALAeQmr&format=png&color=000000' />
    },
    {
        value: 'amazon', label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img width="25" height="25" style={{ marginRight: '5px' }} src="https://img.icons8.com/?size=100&id=lxwUaALAeQmr&format=png&color=000000" />
                <span>Amazon</span>
            </div>
        ), icon: <img style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} src='https://img.icons8.com/?size=100&id=lxwUaALAeQmr&format=png&color=000000' />
    },
    {
        value: 'apple', label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img width="25" height="25" style={{ marginRight: '5px' }} src="https://img.icons8.com/?size=100&id=Bri4HBrgCsPa&format=png&color=000000" />
                <span>Apple Music</span>
            </div>
        ), icon: <img style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} src='https://img.icons8.com/?size=100&id=Bri4HBrgCsPa&format=png&color=000000' />
    },
];

export const appOptions = [
  {
      value: 'Samsung Galaxy Store', label: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" style={{ marginRight: '5px' }} viewBox="0 0 48 48">
                  <linearGradient id="gTN3BY4aRov8yoX_HP084a_GnODgj39wOZm_gr1" x1="9.422" x2="36.928" y1="8.565" y2="37.688" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#c72cce"></stop><stop offset="1" stopColor="#fe5b5b"></stop></linearGradient><path fill="url(#gTN3BY4aRov8yoX_HP084a_GnODgj39wOZm_gr1)" d="M29.393,43H18.607C11.092,43,5,36.908,5,29.393V18.607C5,11.092,11.092,5,18.607,5h10.787 C36.908,5,43,11.092,43,18.607v10.787C43,36.908,36.908,43,29.393,43z"></path><path fill="#222220" d="M28.303,36h-8.605c-3.169,0-5.791-2.464-5.989-5.626l-0.707-11.312 C12.966,18.487,13.423,18,14,18h4c0-3.309,2.691-6,6-6s6,2.691,6,6h4c0.577,0,1.034,0.487,0.998,1.062l-0.707,11.312 C34.093,33.537,31.471,36,28.303,36z M15.064,20l0.641,10.249C15.837,32.353,17.591,34,19.697,34h8.605 c2.106,0,3.86-1.647,3.992-3.751L32.936,20H28v-2v2H15.064z M22,18h4c0-1.103-0.897-2-2-2S22,16.897,22,18z" opacity=".05"></path><path fill="#030000" d="M28.302,35.5h-8.605c-2.905,0-5.308-2.258-5.49-5.157l-0.674-10.78 c-0.036-0.576,0.421-1.062,0.998-1.062H18.5v-0.254c0-2.871,2.093-5.44,4.95-5.719c3.278-0.32,6.05,2.259,6.05,5.473v0.5h3.968 c0.577,0,1.034,0.487,0.998,1.062l-0.674,10.78C33.611,33.242,31.207,35.5,28.302,35.5z M14.532,19.5l0.674,10.78 c0.148,2.366,2.121,4.22,4.491,4.22h8.605c2.37,0,4.343-1.854,4.491-4.22l0.674-10.78H28.5V18c0-2.481-2.019-4.5-4.5-4.5 s-4.5,2.019-4.5,4.5v1.5H14.532z M27.5,19.5h-7V18c0-1.93,1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5V19.5z M21.5,18.5h5V18 c0-1.379-1.121-2.5-2.5-2.5s-2.5,1.121-2.5,2.5V18.5z" opacity=".07"></path><path fill="#fff" d="M29,19l0-0.777c0-2.61-1.903-4.945-4.5-5.199C21.52,12.733,19,15.078,19,18v1h-3.936 c-0.577,0-1.034,0.487-0.998,1.062l0.641,10.249c0.165,2.635,2.35,4.688,4.99,4.688h8.605c2.64,0,4.826-2.053,4.99-4.688 l0.641-10.249C33.97,19.487,33.512,19,32.936,19H29z M21,18c0-1.654,1.346-3,3-3s3,1.346,3,3v1h-6V18z"></path>
              </svg>
              <span>Samsung Galaxy Store</span>
          </div>
      ), icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" style={{ marginTop: '8px' }} viewBox="0 0 48 48">
          <linearGradient id="gTN3BY4aRov8yoX_HP084a_GnODgj39wOZm_gr1" x1="9.422" x2="36.928" y1="8.565" y2="37.688" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#c72cce"></stop><stop offset="1" stopColor="#fe5b5b"></stop></linearGradient><path fill="url(#gTN3BY4aRov8yoX_HP084a_GnODgj39wOZm_gr1)" d="M29.393,43H18.607C11.092,43,5,36.908,5,29.393V18.607C5,11.092,11.092,5,18.607,5h10.787 C36.908,5,43,11.092,43,18.607v10.787C43,36.908,36.908,43,29.393,43z"></path><path fill="#222220" d="M28.303,36h-8.605c-3.169,0-5.791-2.464-5.989-5.626l-0.707-11.312 C12.966,18.487,13.423,18,14,18h4c0-3.309,2.691-6,6-6s6,2.691,6,6h4c0.577,0,1.034,0.487,0.998,1.062l-0.707,11.312 C34.093,33.537,31.471,36,28.303,36z M15.064,20l0.641,10.249C15.837,32.353,17.591,34,19.697,34h8.605 c2.106,0,3.86-1.647,3.992-3.751L32.936,20H28v-2v2H15.064z M22,18h4c0-1.103-0.897-2-2-2S22,16.897,22,18z" opacity=".05"></path><path fill="#030000" d="M28.302,35.5h-8.605c-2.905,0-5.308-2.258-5.49-5.157l-0.674-10.78 c-0.036-0.576,0.421-1.062,0.998-1.062H18.5v-0.254c0-2.871,2.093-5.44,4.95-5.719c3.278-0.32,6.05,2.259,6.05,5.473v0.5h3.968 c0.577,0,1.034,0.487,0.998,1.062l-0.674,10.78C33.611,33.242,31.207,35.5,28.302,35.5z M14.532,19.5l0.674,10.78 c0.148,2.366,2.121,4.22,4.491,4.22h8.605c2.37,0,4.343-1.854,4.491-4.22l0.674-10.78H28.5V18c0-2.481-2.019-4.5-4.5-4.5 s-4.5,2.019-4.5,4.5v1.5H14.532z M27.5,19.5h-7V18c0-1.93,1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5V19.5z M21.5,18.5h5V18 c0-1.379-1.121-2.5-2.5-2.5s-2.5,1.121-2.5,2.5V18.5z" opacity=".07"></path><path fill="#fff" d="M29,19l0-0.777c0-2.61-1.903-4.945-4.5-5.199C21.52,12.733,19,15.078,19,18v1h-3.936 c-0.577,0-1.034,0.487-0.998,1.062l0.641,10.249c0.165,2.635,2.35,4.688,4.99,4.688h8.605c2.64,0,4.826-2.053,4.99-4.688 l0.641-10.249C33.97,19.487,33.512,19,32.936,19H29z M21,18c0-1.654,1.346-3,3-3s3,1.346,3,3v1h-6V18z"></path>
      </svg>,
      url:''
  },
  {
      value: 'Google Play Store', label: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" style={{ marginRight: '5px' }} viewBox="0 0 48 48">
                  <linearGradient id="jFdG-76_seIEvf-hbjSsaa_rZwnRdJyYqRi_gr1" x1="1688.489" x2="1685.469" y1="-883.003" y2="-881.443" gradientTransform="matrix(11.64 0 0 22.55 -19615.32 19904.924)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#047ed6"></stop><stop offset="1" stopColor="#50e6ff"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsaa_rZwnRdJyYqRi_gr1)" fillRule="evenodd" d="M7.809,4.608c-0.45,0.483-0.708,1.227-0.708,2.194	v34.384c0,0.967,0.258,1.711,0.725,2.177l0.122,0.103L27.214,24.2v-0.433L7.931,4.505L7.809,4.608z" clipRule="evenodd"></path><linearGradient id="jFdG-76_seIEvf-hbjSsab_rZwnRdJyYqRi_gr2" x1="1645.286" x2="1642.929" y1="-897.055" y2="-897.055" gradientTransform="matrix(9.145 0 0 7.7 -15001.938 6931.316)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#ffda1c"></stop><stop offset="1" stopColor="#feb705"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsab_rZwnRdJyYqRi_gr2)" fillRule="evenodd" d="M33.623,30.647l-6.426-6.428v-0.45l6.428-6.428	l0.139,0.086l7.603,4.321c2.177,1.227,2.177,3.249,0,4.493l-7.603,4.321C33.762,30.561,33.623,30.647,33.623,30.647z" clipRule="evenodd"></path><linearGradient id="jFdG-76_seIEvf-hbjSsac_rZwnRdJyYqRi_gr3" x1="1722.978" x2="1720.622" y1="-889.412" y2="-886.355" gradientTransform="matrix(15.02 0 0 11.5775 -25848.943 10324.73)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#d9414f"></stop><stop offset="1" stopColor="#8c193f"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsac_rZwnRdJyYqRi_gr3)" fillRule="evenodd" d="M33.762,30.561l-6.565-6.567L7.809,43.382	c0.708,0.761,1.9,0.847,3.232,0.103L33.762,30.561" clipRule="evenodd"></path><linearGradient id="jFdG-76_seIEvf-hbjSsad_rZwnRdJyYqRi_gr4" x1="1721.163" x2="1722.215" y1="-891.39" y2="-890.024" gradientTransform="matrix(15.02 0 0 11.5715 -25848.943 10307.886)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#33c481"></stop><stop offset="1" stopColor="#61e3a7"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsad_rZwnRdJyYqRi_gr4)" fillRule="evenodd" d="M33.762,17.429L11.041,4.522	c-1.33-0.761-2.524-0.658-3.232,0.103l19.386,19.369L33.762,17.429z" clipRule="evenodd"></path>
              </svg>
              <span>Google Play Store</span>
          </div>
      ), icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" style={{ marginTop: '8px' }} viewBox="0 0 48 48">
          <linearGradient id="jFdG-76_seIEvf-hbjSsaa_rZwnRdJyYqRi_gr1" x1="1688.489" x2="1685.469" y1="-883.003" y2="-881.443" gradientTransform="matrix(11.64 0 0 22.55 -19615.32 19904.924)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#047ed6"></stop><stop offset="1" stopColor="#50e6ff"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsaa_rZwnRdJyYqRi_gr1)" fillRule="evenodd" d="M7.809,4.608c-0.45,0.483-0.708,1.227-0.708,2.194	v34.384c0,0.967,0.258,1.711,0.725,2.177l0.122,0.103L27.214,24.2v-0.433L7.931,4.505L7.809,4.608z" clipRule="evenodd"></path><linearGradient id="jFdG-76_seIEvf-hbjSsab_rZwnRdJyYqRi_gr2" x1="1645.286" x2="1642.929" y1="-897.055" y2="-897.055" gradientTransform="matrix(9.145 0 0 7.7 -15001.938 6931.316)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#ffda1c"></stop><stop offset="1" stopColor="#feb705"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsab_rZwnRdJyYqRi_gr2)" fillRule="evenodd" d="M33.623,30.647l-6.426-6.428v-0.45l6.428-6.428	l0.139,0.086l7.603,4.321c2.177,1.227,2.177,3.249,0,4.493l-7.603,4.321C33.762,30.561,33.623,30.647,33.623,30.647z" clipRule="evenodd"></path><linearGradient id="jFdG-76_seIEvf-hbjSsac_rZwnRdJyYqRi_gr3" x1="1722.978" x2="1720.622" y1="-889.412" y2="-886.355" gradientTransform="matrix(15.02 0 0 11.5775 -25848.943 10324.73)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#d9414f"></stop><stop offset="1" stopColor="#8c193f"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsac_rZwnRdJyYqRi_gr3)" fillRule="evenodd" d="M33.762,30.561l-6.565-6.567L7.809,43.382	c0.708,0.761,1.9,0.847,3.232,0.103L33.762,30.561" clipRule="evenodd"></path><linearGradient id="jFdG-76_seIEvf-hbjSsad_rZwnRdJyYqRi_gr4" x1="1721.163" x2="1722.215" y1="-891.39" y2="-890.024" gradientTransform="matrix(15.02 0 0 11.5715 -25848.943 10307.886)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#33c481"></stop><stop offset="1" stopColor="#61e3a7"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsad_rZwnRdJyYqRi_gr4)" fillRule="evenodd" d="M33.762,17.429L11.041,4.522	c-1.33-0.761-2.524-0.658-3.232,0.103l19.386,19.369L33.762,17.429z" clipRule="evenodd"></path>
      </svg>,
      url:''
  },
  {
      value: 'Apple', label: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={apple} style={{ width: '25px', height: '25px' }} />
              <span>App Store</span>
          </div>
      ), icon: <img src={apple} style={{ width: '40px', height: '40px', marginRight: '5px' }} />,
      url:''
  },
  {
      value: 'huawei', label: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={huawei} style={{ width: '20px', height: '20px', marginRight: '5px' }} />
              <span>Huawei App Gallery</span>

          </div>
      ), icon: <img src={huawei} style={{ width: '34px', height: '34px', marginRight: '5px', marginTop: '8px' }} />,
      url:''
  },
  {
      value: 'microsoft', label: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={microsoft} style={{ width: '20px', height: '20px', marginRight: '5px' }} />
              <span>Microsoft Store</span>

          </div>
      ), icon: <img src={microsoft} style={{ width: '40px', height: '40px', marginRight: '5px' }} />,
      url:''
  }
];

export const socialOptions = [
  {
    value: 'instagram', label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SocialIcon network='instagram' style={{ marginRight: '5px', width: '20px', height: '20px' }} />
        <span>Instagram</span>
      </div>
    ), icon: <SocialIcon network='instagram' style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} />
  },
  {
    value: 'facebook', label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SocialIcon network='facebook' style={{ marginRight: '5px', width: '20px', height: '20px' }} />
        <span>Facebook</span>
      </div>
    ), icon: <SocialIcon network='facebook' style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} />
  },
  {
    value: 'tiktok', label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SocialIcon network='tiktok' style={{ marginRight: '5px', width: '20px', height: '20px' }} />
        <span>TikTok</span>
      </div>
    ), icon: <SocialIcon network='tiktok' style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} />
  },
  {
    value: 'x', label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SocialIcon network='x' style={{ marginRight: '5px', width: '20px', height: '20px' }} />
        <span>X</span>
      </div>
    ), icon: <SocialIcon network='x' style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} />
  },
  {
    value: 'discord', label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SocialIcon network='discord' style={{ marginRight: '5px', width: '20px', height: '20px' }} />
        <span>Discord</span>
      </div>
    ), icon: <SocialIcon network='discord' style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} />
  },
  {
    value: 'youtube', label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SocialIcon network='youtube' style={{ marginRight: '5px', width: '20px', height: '20px' }} />
        <span>YouTube</span>
      </div>
    ), icon: <SocialIcon network='youtube' style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} />
  },
  {
    value: 'reddit', label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SocialIcon network='reddit' style={{ marginRight: '5px', width: '20px', height: '20px' }} />
        <span>Reddit</span>
      </div>
    ), icon: <SocialIcon network='reddit' style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} />
  },
];