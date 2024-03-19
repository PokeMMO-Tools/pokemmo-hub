import { TablePagination } from '@mui/material'
import React from 'react'

export const Pagination = ({ count, page, setPage, rowsPerPage, setRowsPerPage }) => {
    return (
        <TablePagination
            className='text-white'
            component="div"
            count={count}
            page={page}
            onPageChange={(event, page) => setPage(page)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={({ target }) => setRowsPerPage(target.value)}
        />
    )
}
