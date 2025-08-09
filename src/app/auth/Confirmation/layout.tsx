import React, { ReactNode } from 'react';

interface ConfirmationLayoutProps {
  children: ReactNode; 
}

const AnalyticsLayout: React.FC<ConfirmationLayoutProps> = ({ children }) => {
  return (
    <div>
      {children} 
    </div>
  );
};

export default AnalyticsLayout;