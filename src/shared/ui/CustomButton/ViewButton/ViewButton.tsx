import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';

import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// import cls from './CustomButton.module.scss';

interface CustomButtonProps {
  className?: string;
}

export const ViewButton = (props: CustomButtonProps) => {
  const {
    className,
  } = props;

  const { t } = useTranslation();

  return (
    <div className={classNames('', {}, [className])}>
      <Button
        id="demo-customized-button"
        aria-haspopup="true"
        variant="contained"
        disableElevation
        startIcon={<CheckCircleOutlineIcon />}
        sx={{
          background: '#1a7606',
          '&:hover': {
            background: '#176605',
          },
        }}
      >
        {t('acquainted')}
      </Button>
    </div>
  );
};
