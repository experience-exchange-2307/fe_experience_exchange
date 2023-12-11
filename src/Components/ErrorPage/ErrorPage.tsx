// ErrorPage.tsx

import React from 'react';

interface ErrorPageProps {
  serverError?: { status: number; message: string } | null;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ serverError }) => {
  if (!serverError) {
    // Handle the case where serverError is not available
    return (
      <div>
        <h1>Error</h1>
        <p>Something went wrong, but no specific error information is available.</p>
        {/* Additional error handling or UI can be added here */}
      </div>
    );
  }

  return (
    <div>
      <h1>Error {serverError.status}</h1>
      <p>{serverError.message}</p>
      {/* Additional error handling or UI can be added here */}
    </div>
  );
};

export default ErrorPage;
