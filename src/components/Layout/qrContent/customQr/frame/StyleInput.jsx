import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

/**
 * @Author : Jobserd Julián Ocampo,   @date 2024-08-01 14:09:44
 * @description : Estilos del input del texto de la seccion de frame
**/

const InputText = styled(TextField)({
  '& .MuiFilledInput-root': {
    backgroundColor: '#f2f2f2',
    borderRadius: 5, 
    '&:hover': {
      backgroundColor: '#ddd',
      '&.MuiFilledInput-underline:before': {
        borderBottom: 'none',
        transition: 'none', 
      },
    },
    '&.Mui-focused': {
      backgroundColor: '#e0e0e0', 
    },
  },
  '& .MuiFilledInput-underline:before': {
    borderBottomColor: 'transparent',
    transition: 'none', 
  },
  '& .MuiFilledInput-underline:after': {
    borderBottomColor: 'transparent', 
  },
  '& .MuiInputLabel-root': {
    color: '#A0AAB4',
    '&.Mui-focused': {
      color: '#000', 
      fontWeight: 'bold',
    },
  },
});

export default InputText;
