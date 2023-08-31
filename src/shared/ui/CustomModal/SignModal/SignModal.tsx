import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import DescriptionIcon from '@mui/icons-material/Description';
import { PerformButton } from 'shared/ui/CustomButton/PerformButton/PerformButton';
import { Portal } from 'shared/ui/Portal/Portal';
import { Task } from 'entities/Task';
import { format } from 'date-fns';

// import cls from './SignModal.module.scss';

interface SignModalProps {
  className?: string;
  task: Task;
  onCloseClick: () => void;
}

interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 70,
  },
  // {
  //   field: 'document',
  //   headerName: 'Документ',
  //   width: 430,
  // },
  {
    field: 'document',
    headerName: 'Документы',
    width: 430,
    renderCell: (params: GridRenderCellParams<any>) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DescriptionIcon />
          {params.value}
        </Box>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    document: 'Решение о проведении инвентаризации.docx',
  },
  {
    id: 2,
    document: 'Лист согласования.docx',
  },
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 2,
            top: 2,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export const SignModal = (props: SignModalProps) => {
  const { className, task, onCloseClick } = props;

  const { t } = useTranslation();

  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCloseClick();
  };

  return (
    <Portal element={document.getElementById('root') ?? document.body}>
      {/* <div className={classNames('', {}, [className])}> */}
      {/* <Button variant="outlined" onClick={handleClickOpen}>
         Подписание
      </Button> */}

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '10px',
            width: '100%',
            background: '#f1f1f1',
          },
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '50px 1fr',
              marginTop: 2,
            }}
          >
            <Typography
              gutterBottom
              sx={{
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              Тема:
            </Typography>
            <Typography gutterBottom sx={{ fontSize: '14px' }}>
              {task.subject}
            </Typography>

            <Typography
              gutterBottom
              sx={{
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              От:
            </Typography>
            <Typography gutterBottom sx={{ fontSize: '14px' }}>
              {`${task.author}`}
            </Typography>

            <Typography
              gutterBottom
              sx={{
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              Срок:
            </Typography>
            <Typography gutterBottom sx={{ fontSize: '14px' }}>
              {format(new Date(task.deadline), 'dd.MM.yyyy HH:mm')}
            </Typography>
          </Box>
        </BootstrapDialogTitle>
        <DialogContent>
          <div style={{ height: 270, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              columnVisibilityModel={{
                id: false,
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              sx={{
                background: '#fff',
              }}
            />
          </div>
          <Box sx={{ marginTop: 2 }}>
            <TextField
              id="outlined-multiline-static"
              label="Комментарий"
              multiline
              rows={3}
              // defaultValue="Комментарий..."
              fullWidth
              sx={{
                '& .MuiInputBase-root': {
                  background: '#fff',
                  fontSize: '14px',
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            height: '80px',
          }}
        >
          <PerformButton />
        </DialogActions>
      </BootstrapDialog>
      {/* </div> */}
    </Portal>
  );
};
