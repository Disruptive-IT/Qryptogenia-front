import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import CreateIcon from '@mui/icons-material/Create';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DownloadIcon from '@mui/icons-material/Download';
import { useStepper } from '../../../context/StepperContext';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            background:
                'linear-gradient( 95deg,#D9D9D9 0%,#3C6E71 50%,#284B63 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            background:
                'linear-gradient( 95deg,#D9D9D9 0%,#3C6E71 50%,#284B63 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#D9D9D9',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundColor: '#284B63',
        boxShadow: '0 0px 7px 0px #000',
    }),
    ...(ownerState.completed && {
        backgroundColor: '#284B63',
    }),

}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <HighlightAltIcon />,
        2: <AutoFixHighIcon />,
        3: <DownloadIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    completed: PropTypes.bool,
    icon: PropTypes.node,
};

const steps = ['Select qr type', 'Customize QR design', 'Generate and download QR'];

export default function StepperQr() {
    const { activeStep, setActiveStep } = useStepper();

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <Stack sx={{ width: { xs: '100%', md: '70%' }, margin: 'auto' }} spacing={4}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map((label, index) => (
                    <Step key={label} completed={index < activeStep}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
}
