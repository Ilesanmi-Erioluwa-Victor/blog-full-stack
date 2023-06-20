import React from 'react'
import { ErrorPage }  from 'src/components/molecules/Error'

const Error = () => {
  return (
    <>
      <ErrorPage statusCode={404}/>
    </>
  )
}

export default Error
