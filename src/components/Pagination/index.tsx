import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationBlock = ({ page, onChangePagination }) => {

  return (
    <Stack spacing={2}>
      <Pagination count={3} defaultPage={page} page={page} onChange={(_event: React.ChangeEvent<unknown>, value: number) => onChangePagination(value)} />
    </Stack>
  );

}

export default PaginationBlock;