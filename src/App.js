import { useState } from 'react';
import faker from 'faker';
import { FixedSizeList as List } from 'react-window';
import './App.css';

let getId = () => Math.random().toString(36).substring(7);

const ReactWindowRow = ({ data, index, style }) => {
  return (
    <div
      style={{
        ...style,
        borderBottom: 'solid 1px grey',
      }}>
      Row {index}
      {data[index]}
    </div>
  );
};

const RowComponent = ({ rowId, rowIdx, array, handleDeleteClick }) => {
  return (
    <div className='header'>
      {array.map((el, i) => (
        <div
          className='headerCol'
          onClick={el === 'delete' ? () => handleDeleteClick(rowId) : null}
          style={el === 'delete' ? { cursor: 'pointer' } : {}}
          key={i}>
          {el}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [data, setData] = useState([
    ...Array(1000)
      .fill({})
      .map((obj, i) => ({
        rowId: getId(),
        array: [
          'delete',
          faker.name.findName(),
          faker.company.companyName(),
          faker.internet.email(),
        ],
      })),
  ]);

  const handleDeleteClick = (rowId) => {
    const newData = data.filter((datum) => datum.rowId !== rowId);
    setData(newData);
  };

  const rowData = data.map((datum, rowIdx) => (
    <RowComponent
      rowId={datum.rowId}
      rowIdx={rowIdx}
      array={datum.array}
      handleDeleteClick={handleDeleteClick}
    />
  ));

  return (
    <div>
      <div className='header'>
        <div className='headerCol'>Action</div>
        <div className='headerCol'>Name</div>
        <div className='headerCol'>Company</div>
        <div className='headerCol'>Email</div>
      </div>
      <div>
        <List
          height={500}
          width={800}
          itemCount={rowData.length}
          itemSize={40}
          itemData={rowData}>
          {ReactWindowRow}
        </List>
      </div>
    </div>
  );
};

export default App;
