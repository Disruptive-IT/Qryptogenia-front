import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const InputText = styled(TextField)({
  '& .MuiFilledInput-root': {
    backgroundColor: '#fff', 
    borderRadius: 5,
    border: "2px solid #A0AAB4",
    '&:hover': {
      backgroundColor: '#f2f2f2',
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
      color: '#284B63', 
    },
  },
});

export default InputText;
