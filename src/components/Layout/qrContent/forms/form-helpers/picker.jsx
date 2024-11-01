import GradientColorPicker from 'react-gcolor-picker';


function ColorPicker({handlerFunction,pickerValue,pickerColor}){
    return(
        <GradientColorPicker 
        enableAlpha
        disableHueSlider={false}
        disableAlphaSlider={false}
        disableInput={false}
        disableHexInput={false}
        disableRgbInput={false}
        disableAlphaInput={false}
        presetColors={[]}
        gradient={true}
        color={pickerColor}
        value={pickerValue}
        onChange={handlerFunction}
        />
    )
}

export default ColorPicker