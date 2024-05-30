import { useQr } from '../../../../../context/QrContext';
import { ColorPicker } from './colorPicker';

export const ScrollableStyleText = () => {
    const { setTextColor, setTextSize, textSize } = useQr();
  
    const handleColorChange = (color) => {
        setTextColor(color);
    };

    const handleFontSizeChange = (event) => {
        setTextSize(`${event.target.value}px`);
    };

    return (
        <div className='w-full space-y-8'>
            <div className='flex justify-center gap-4 px-2'>
                <div className='cursor-pointer hover:bg-gray-500 transition-all delay-75 px-2 rounded-md shadow-xl' style={{ fontSize: '30px', fontWeight: 'bold', textTransform: 'uppercase', color: '#fff', textShadow: '-3px 0 black, 0 3px black, 3px 0 black, 0 -3px black' }}>A</div>
                <div className='cursor-pointer hover:bg-gray-500 transition-all delay-75 px-2 rounded-md shadow-xl' style={{ fontSize: '30px', fontWeight: 'bold', textTransform: 'uppercase', textShadow: '3px 3px #888888' }}>B</div>
                <div className='cursor-pointer hover:bg-gray-500 transition-all delay-75 px-2 rounded-md shadow-xl' style={{ fontSize: '30px', fontWeight: 'bold', textTransform: 'uppercase', textShadow: '-3px 0 white, 0 3px white, 3px 0 white, 0 -3px white' }}>C</div>
                <div className='cursor-pointer hover:bg-gray-500 transition-all delay-75 px-2 rounded-md shadow-xl' style={{ fontSize: '30px', fontWeight: 'bold', textTransform: 'uppercase', color: '#fff', textShadow: '-3px 0 black, 0 3px black, 3px 0 black, 0 -3px black' }}>D</div>
                <div className='cursor-pointer hover:bg-gray-500 transition-all delay-75 px-2 rounded-md shadow-xl' style={{ fontSize: '30px', fontWeight: 'bold', textTransform: 'uppercase', textShadow: '3px 3px #888888' }}>E</div>
                <div className='cursor-pointer hover:bg-gray-500 transition-all delay-75 px-2 rounded-md shadow-xl' style={{ fontSize: '30px', fontWeight: 'bold', textTransform: 'uppercase', textShadow: '-3px 0 white, 0 3px white, 3px 0 white, 0 -3px white' }}>F</div>
            </div>
            <div className='relative justify-evenly items-center flex gap-4'>
                <ColorPicker setColor={handleColorChange} />
                <label htmlFor="fontSize" className="mb-2">Font Size:</label>
                <input
                    type="range"
                    id="fontSize"
                    name="fontSize"
                    min="16"
                    max="30"
                    onChange={handleFontSizeChange}
                />
            </div>
        </div>
    );
};