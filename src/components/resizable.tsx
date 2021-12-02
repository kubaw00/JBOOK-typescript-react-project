import React from 'react';
import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth * 0.8);

  useEffect(() => {
    const listener = () => {
      let timer: any;
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.8 < width) {
          setWidth(window.innerWidth * 0.8);
        }
      }, 100);
    };

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width]);

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      maxConstraints: [innerWidth * 0.8, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      width,
      height: Infinity,
      resizeHandles: ['e'],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 50],
      width: Infinity,
      height: 300,
      resizeHandles: ['s'],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
