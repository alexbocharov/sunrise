import { Task, getTasks, getTasksIsLoading, taskReducer } from 'entities/Task';
import { initTasks } from 'entities/Task/model/services/initTasks/initTasks';
import { CSSProperties, memo, useMemo, useState, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  Reducers,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { TableComponents } from 'react-virtuoso';
import { Skeleton } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { ApproveModal } from 'shared/ui/CustomModal/ApproveModal/ApproveModal';
import { SignModal } from 'shared/ui/CustomModal/SignModal/SignModal';
import { ViewModal } from 'shared/ui/CustomModal/ViewModal/ViewModal';
import { addHours, format } from 'date-fns';

// import cls from './IncomingTaskPageBody.module.scss';

interface IncomingTaskPageBodyProps {
  className?: string;
}

type Order = 'asc' | 'desc';

const initialReducer: Reducers = {
  tasks: taskReducer,
};

interface Data {
  subject: string;
  author: string;
  deadline: string;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  width?: string;
}

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

const headCells: readonly HeadCell[] = [
  {
    id: 'subject',
    numeric: false,
    disablePadding: false,
    label: 'Тема',
    width: 'auto',
  },
  {
    id: 'author',
    numeric: false,
    disablePadding: false,
    label: 'От',
    width: '282px',
  },
  {
    id: 'deadline',
    numeric: false,
    disablePadding: false,
    label: 'Срок',
    width: '150px',
  },
];

const VirtuosoTableComponents: TableComponents<Data> = {
  Scroller: forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{
        borderCollapse: 'separate',
        tableLayout: 'fixed',
        '& .MuiTableHead-root': {
          background: '#f5f5f5',
        },
      }}
    />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

const fixedHeaderContent = (order, orderBy, onRequestSort) => () => {
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableRow>
      {headCells.map((column) => (
        <TableCell
          key={column.id}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          // sx={{
          //   backgroundColor: 'background.paper',
          // }}
        >
          <TableSortLabel
            active={orderBy === column.id}
            direction={orderBy === column.id ? order : 'asc'}
            onClick={createSortHandler(column.id)}
          >
            {column.label}
            {orderBy === column.id ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
          {/* {column.label} */}
        </TableCell>
      ))}
    </TableRow>
  );
};

function rowContent(_index: number, row: Data) {
  return (
    <>
      {headCells.map((column) => (
        <TableCell
          key={column.id}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {column.id === 'deadline'
            ? format(addHours(new Date(row[column.id]), -3), 'dd.MM.yyyy HH:mm')
            : row[column.id]}
        </TableCell>
      ))}
    </>
  );
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
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

  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              width: headCell.width,
              backgroundColor: '#f5f5f5',
            }}
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

export const IncomingTaskPageBody = memo((props: IncomingTaskPageBodyProps) => {
  const { className } = props;

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const tasks: Task[] = useSelector(getTasks.selectAll);

  const isLoading = useSelector(getTasksIsLoading);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('deadline');
  const [selected, setSelected] = useState<readonly string[]>([]);

  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);

  const [isApprovalAssignment, setIsApprovalAssignment] = useState(false);
  const [isApprovalSimpleAssignment, setIsApprovalSimpleAssignment] =
    useState(false);
  const [isViewedAssignment, setIsViewedAssignment] = useState(false);

  // const onLoadNextPart = useCallback(() => {
  //   dispatch(fetchNextTasks());
  // }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initTasks());
    setIsApprovalAssignment(true);
  });

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
      const newSelected = tasks.map((n) => n.subject);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClose = () => {
    setIsApprovalAssignment(false);
    setIsApprovalSimpleAssignment(false);
    setIsViewedAssignment(false);

    setCurrentTask(undefined);
  };

  const handleClick = (event: React.MouseEvent<unknown>, task: Task) => {
    if (task.type === 'ApprovalAssignment') {
      setIsApprovalAssignment(true);
      setIsApprovalSimpleAssignment(false);
      setIsViewedAssignment(false);

      setCurrentTask(task);
    }

    if (task.type === 'ApprovalSimpleAssignment') {
      setIsApprovalAssignment(false);
      setIsApprovalSimpleAssignment(true);
      setIsViewedAssignment(false);

      setCurrentTask(task);
    }

    if (task.type === 'AcquaintanceAssignment') {
      setIsApprovalAssignment(false);
      setIsApprovalSimpleAssignment(false);
      setIsViewedAssignment(true);

      setCurrentTask(task);
    }

    const selectedIndex = selected.indexOf(task.subject);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, task.subject);
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

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const visibleRows = useMemo(
    () => stableSort<Task>(tasks, getComparator(order, orderBy)),
    [order, orderBy, tasks],
  );

  const stylesSubject: CSSProperties = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '3',
    WebkitBoxOrient: 'vertical' as const,
  };

  return (
    <DynamicModuleLoader reducers={initialReducer} height>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
        className={classNames('', {}, [className])}
      >
        <Paper
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <TableContainer>
            <Table stickyHeader aria-labelledby="tableTitle" size="small">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={tasks.length}
              />
              <TableBody>
                {isLoading ? (
                  <TableRowsLoader rowsNum={30} />
                ) : (
                  visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row.subject);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row)}
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        // selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell component="th" id={labelId} scope="row">
                          <span style={stylesSubject}>{row.subject}</span>
                        </TableCell>
                        <TableCell align="left">
                          <span>{row.author}</span>
                        </TableCell>
                        <TableCell align="left">
                          {format(
                            addHours(new Date(row.deadline), -3),
                            'dd.MM.yyyy HH:mm',
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        {/* <Paper style={{ minHeight: '400px', width: '100%' }}>
          <TableVirtuoso
            data={visibleRows}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent(
              order,
              orderBy,
              handleRequestSort,
            )}
            itemContent={rowContent}
          />
        </Paper> */}
      </Box>
      {isApprovalAssignment && (
        <ApproveModal task={currentTask as Task} onCloseClick={handleClose} />
      )}
      {isApprovalSimpleAssignment && currentTask && (
        <SignModal task={currentTask} onCloseClick={handleClose} />
      )}
      {isViewedAssignment && currentTask && (
        <ViewModal task={currentTask} onCloseClick={handleClose} />
      )}
    </DynamicModuleLoader>
  );
});
