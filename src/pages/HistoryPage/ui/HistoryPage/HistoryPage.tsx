import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { HistoryPageHeader } from '../HistoryPageHeader/HistoryPageHeader';
import { HistoryPageBody } from '../HistoryPageBody/HistoryPageBody';

interface HistoryPageProps {
  className?: string;
}

export const HistoryPage = memo((props: HistoryPageProps) => {
  const { className } = props;

  const { t } = useTranslation();

  useEffect(() => {
    document.title = 'История';
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <HistoryPageHeader />
      <HistoryPageBody />
    </Box>
  );
});
