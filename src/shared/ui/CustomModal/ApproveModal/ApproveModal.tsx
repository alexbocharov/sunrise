import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styled, alpha } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { ApproveButton } from 'shared/ui/CustomButton/ApproveButton/ApproveButton';
import { RevisionButton } from 'shared/ui/CustomButton/RevisionButton/RevisionButton';
import { Box, TextField, Skeleton } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ReplayIcon from '@mui/icons-material/Replay';

import { Portal } from 'shared/ui/Portal/Portal';
import { Task } from 'entities/Task';
import { ErrorHint } from 'shared/ui/ErrorHint/ErrorHint';
import { format } from 'date-fns';

import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

import FileIcon from 'shared/assets/icons/file-20x20.svg';

import { classNames } from 'shared/lib/classNames/classNames';

import { documentPdf } from './documentPdf';

interface ApproveModalProps {
  className?: string;
  task: Task;
  onCloseClick: () => void;
}

interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

type Order = 'asc' | 'desc';

interface Data {
  name: string;
  from?: string;
  deadline?: string;
}

const rows = [
  {
    id: 1,
    document: 'Решение о проведении инвентаризации.pdf',
  },
  {
    id: 2,
    document: 'Лист согласования.docx',
  },
];

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  width: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Документы',
    width: 'auto',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ background: '#F5F5F5' }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
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

interface EnhancedTableToolbarProps {
  numSelected: number;
  documentCount: number;
  handlePreview: (docs: any) => void;
}

function downloadPDF(pdf) {
  const pdfLink = `${pdf.file}`;
  const anchorElement = document.createElement('a');
  const fileName = `${pdf.file_name}.pdf`;
  anchorElement.href = pdfLink;
  anchorElement.download = fileName;
  anchorElement.click();
  anchorElement.remove();
  // document.body.removeChild(anchorElement);
}

const LoadFromBase64 = () => {
  const pdfContentType = 'application/pdf';

  const base64toBlob = (data: string) => {
    // Cut the prefix `data:application/pdf;base64` from the raw base 64
    const base64WithoutPrefix = data.substr(
      `data:${pdfContentType};base64,`.length,
    );

    const bytes = atob(base64WithoutPrefix);

    let { length } = bytes;
    const out = new Uint8Array(length);

    // eslint-disable-next-line no-plusplus
    while (length--) {
      out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], { type: pdfContentType });
  };

  const url = window.URL.createObjectURL(
    base64toBlob(`data:application/pdf;base64,${documentPdf}`),
  );

  const docs = [{ uri: url, fileName: 'file.pdf' }];

  console.log({ docs });

  return docs;
};

// function zipTargetFiles(files) {
//   if (files.length <= 1) {
//     return files;
//   }
//   for (let i = 0; i < files.length; i += 1) {
//     zip.file(files[i].name, files[i]);
//   }

//   return zip.generateAsync({ type: 'blob' });
// }

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, documentCount, handlePreview } = props;

  const handleDownloadClick = (numSelected: number) => {
    if (numSelected === documentCount) {
      console.log('all');
    } else {
      const pdf = {
        file: `data:application/pdf;base64,${documentPdf}`,
        file_name: 'document',
      };

      downloadPDF(pdf);
    }
  };

  const handleViewClick = () => {
    console.log('view');

    handlePreview(LoadFromBase64());
  };

  return (
    <Toolbar
      sx={{
        backgroundColor: '#e5e5e5',
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(
            theme.palette.primary.main,
            theme.palette.action.activatedOpacity,
          ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {`Выбрано документов: ${numSelected}`}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="subtitle1"
          id="tableTitle"
          component="div"
        >
          Выберите документ
        </Typography>
      )}
      {numSelected > 0 && (
        <>
          <Tooltip title="Загрузить">
            <IconButton onClick={() => handleDownloadClick(numSelected)}>
              <CloudDownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Просмотр">
            <IconButton onClick={() => handleViewClick()}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
}

const TableRowsLoader = ({ rowsNum }: { rowsNum: number }) => {
  return (
    <>
      {[...Array(rowsNum)].map((_, index) => (
        <TableRow key={index}>
          <TableCell component="th" scope="row">
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export const ApproveModal = (props: ApproveModalProps) => {
  const { className, task, onCloseClick } = props;

  const { t } = useTranslation();

  const [open, setOpen] = useState(true);
  const [comment, setComment] = useState('');
  const [errorComment, setErrorComment] = useState(false);

  // const dispatch = useAppDispatch();

  // const tasks: Task[] = useSelector(getTasks.selectAll);
  const isLoading = false; // useSelector(getTasksIsLoading);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('from');
  const [selected, setSelected] = useState<readonly string[]>([]);

  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);

  const [docs, setDocs] = useState([]);
  const [previewIsOpen, setPreviewIsOpen] = useState(false);
  // const [rowsPerPage, setRowsPerPage] = useState(5);

  // const onLoadNextPart = useCallback(() => {
  //   dispatch(fetchNextTasks());
  // }, [dispatch]);

  // useInitialEffect(() => {
  //   dispatch(initTasks());
  // });

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.document);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, row) => {
    const selectedIndex = selected.indexOf(row.document);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row.document);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCloseClick();
  };

  const handleCommentChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setErrorComment(false);

    if (event.target.value.length <= 2000) {
      setComment(event.target.value);
    } else {
      event.target.value = event.target.value.slice(0, 2000);
    }
  };

  const handleRevisionClick = () => {
    if (!comment.length) {
      setErrorComment(true);
    }
  };

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   // setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handlePreview = (docs) => {
    setPreviewIsOpen(true);
    setDocs(docs);
  };

  return (
    <Portal element={document.getElementById('root') ?? document.body}>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 1,
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
              {task?.subject}
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
              {task?.author}
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
              {format(
                new Date(task?.deadline || '1970.10.10'),
                'dd.MM.yyyy HH:mm',
              )}
            </Typography>
          </Box>
        </BootstrapDialogTitle>
        <DialogContent sx={{ p: 2 }}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              pt: 1,
            }}
            className={classNames('', {}, [className])}
          >
            <Paper
              sx={{
                width: '100%',
                height: '100%',
                // mb: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0px 0px 1px 0px rgba(0, 0, 0, 0.7)',
                overflow: 'hidden',
              }}
            >
              <EnhancedTableToolbar
                numSelected={selected.length}
                handlePreview={handlePreview}
                documentCount={rows.length}
              />
              <TableContainer sx={{ background: '#fff', height: '250px' }}>
                <Table
                  // stickyHeader
                  aria-labelledby="tableTitle"
                  size="small"
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {isLoading ? (
                      <TableRowsLoader rowsNum={3} />
                    ) : (
                      rows.map((row, index) => {
                        const isItemSelected = isSelected(row.document);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row)}
                            // role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            // selected={isItemSelected}
                            sx={{ cursor: 'pointer' }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                              />
                            </TableCell>
                            <TableCell component="th" id={labelId} scope="row">
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1,
                                }}
                              >
                                <FileIcon />
                                {row.document}
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}

                    {/* {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: (dense ? 33 : 53) * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )} */}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* <TablePagination
                sx={{ '& .MuiTablePagination-toolbar': { minHeight: '40px' } }}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage="Строк на странице"
                labelDisplayedRows={({ from, to, count }) => {
                  return `${from}–${to} из ${
                    count !== -1 ? count : `больше чем ${to}`
                  }`;
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              /> */}
            </Paper>
          </Box>
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
              value={comment}
              onChange={handleCommentChange}
            />
            {previewIsOpen && (
              <DocViewer
                documents={docs}
                pluginRenderers={DocViewerRenderers}
                config={{ header: { disableHeader: true } }}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mb: 2,
          }}
        >
          <Box>{errorComment && <ErrorHint />}</Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              width: '100%',
            }}
          >
            <ApproveButton
              startIcon={<CheckCircleOutlineIcon />}
              text="Согласовать"
            />
            <RevisionButton
              startIcon={<ReplayIcon />}
              text="На доработку"
              onClick={handleRevisionClick}
            />
          </Box>
        </DialogActions>
      </BootstrapDialog>
      {/* </div> */}
    </Portal>
  );
};
