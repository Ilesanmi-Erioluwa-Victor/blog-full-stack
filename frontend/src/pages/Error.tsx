import React from 'react'
import ErrorPage from 'src/components/molecules/Error/Errorcomp'

const Error = () => {
  return (
    <>
      <ErrorPage statusCode={404}/>
    </>
  )
}

export default Error
