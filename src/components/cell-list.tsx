import React from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';

const CellList = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => data[id]);
  });

  return <div>Cell List</div>;
};

export default CellList;
