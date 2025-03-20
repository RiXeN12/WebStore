import React from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { useSelector } from 'react-redux'

const Loader = () => {
  const { apiRequestIsLoading: pageIsLoading } = useSelector(
    (store) => store.appSettings
  )

  return (
    <>
      <div>
        {pageIsLoading && (
          <Backdrop
            sx={(theme) => ({
              color: '#fff',
              zIndex: theme.zIndex.drawer + 1,
            })}
            open={pageIsLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </div>
    </>
  )
}
export default Loader
