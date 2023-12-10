import React from 'react'

interface ErrorPageProps {
  serverError?: string;
  message?: string;
}

function ErrorPage({serverError, message}: ErrorPageProps) {
  return (
    <section>
       {serverError && <p>{serverError}</p>}
       <h2>{message}</h2>
      <h2>There was an error</h2>
    </section>
  )
}

export default ErrorPage
