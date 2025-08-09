import React, { ReactNode } from 'react';

interface AnalyticsLayoutProps {
  children: ReactNode; 
}

const AnalyticsLayout: React.FC<AnalyticsLayoutProps> = ({ children }) => {
  return (
    <div>
      {children} 
    </div>
  );
};

export default AnalyticsLayout;