import React from 'react';
import { ResizableBox } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox width={200} height={200} resizeHandles={['s']}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
