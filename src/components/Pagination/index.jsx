import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function PaginationBlock({page, onChangePagination}) {

  return (
    <Stack spacing={2}>
      <Pagination count={3} defaultPage={page} page={page} onChange={(event: React.ChangeEvent<unknown>, value: number) => onChangePagination(value)}/>
    </Stack>
  );
}

export default PaginationBlock;