import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';

import Button from '@mui/material/Button';

// import cls from './RevisionButton.module.scss';

interface RevisionButtonProps {
  className?: string;
  startIcon?: React.ReactNode;
  text: string;
  onClick: () => void;
}

export const RevisionButton = (props: RevisionButtonProps) => {
  const { className, startIcon, text, onClick } = props;

  const { t } = useTranslation();

  return (
    <div className={classNames('', {}, [className])}>
      <Button
        id="demo-customized-button"
        aria-haspopup="true"
        variant="contained"
        disableElevation
        startIcon={startIcon}
        sx={{
          background: 'rgba(168, 123, 0, 0.9)',
          '&:hover': {
            background: 'rgb(168, 123, 0)',
          },
        }}
        onClick={onClick}
      >
        {text}
      </Button>
    </div>
  );
};
