import React, { useState, useCallback, useEffect } from 'react';
import { Scroller } from './components/Scroller';

const generateSampleData = (count, startId = 0) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const id = startId + i;
    data.push({
      id: id,
      avatar: `https://via.placeholder.com/40?text=User${id}`,
      name: `User ${id}`,
      time: new Date().toLocaleString(),
      message: `This is message ${id}`,
    });
  }
  return data;
};

const App = () => {
  const [data, setData] = useState(generateSampleData(30));
  const [highestId, setHighestId] = useState(29); // Initialize with the highest ID from initial data
  const [hasMoreNextData, setHasMoreNextData] = useState(true);
  const [hasMorePreviousData, setHasMorePreviousData] = useState(true);

  useEffect(() => {
    if (data.length > 200) {
      setData((prevData) => prevData.slice(0, 50));
    }
  }, [data]);

  const loadData = useCallback(() => {
    setTimeout(() => {
      setData((prevData) => {
        const newData = generateSampleData(10, highestId + 1);
        setHighestId(highestId + 10);
        return [...prevData, ...newData];
      });
    }, 200);
  }, [highestId]);

  const loadNextData = useCallback(() => {
    setTimeout(() => {
      setData((prevData) => {
        const newData = generateSampleData(15, highestId + 1);
        setHighestId(highestId + 15);
        return [...prevData, ...newData];
      });
    }, 200);
  }, [highestId]);

  const loadPreviousData = useCallback(() => {
    setTimeout(() => {
      const firstId = data[0]?.id || 0;
      setData((prevData) => [
        ...generateSampleData(15, firstId - 15),
        ...prevData,
      ]);
    }, 200);
  }, [data]);

  return (
    <div style={{ height: '600px', border: '1px solid black' }}>
      <Scroller
        data={data}
        renderItem={(item) => (
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <img
              src={item.avatar}
              alt='Avatar'
              style={{
                width: '40px',
                borderRadius: '50%',
                marginRight: '10px',
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ fontWeight: 'bold', marginRight: '10px' }}>
                  {item.name}
                </div>
                <div style={{ fontSize: 'small', color: 'gray' }}>
                  {item.time}
                </div>
              </div>
              <div>{item.message}</div>
            </div>
          </div>
        )}
        hasMoreNextData={hasMoreNextData}
        hasMorePreviousData={hasMorePreviousData}
        nextData={loadNextData}
        loadData={loadData}
        previousData={loadPreviousData}
        nextSkeleton={
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <img
              src={`https://via.placeholder.com/40?text=User`}
              alt='Avatar'
              style={{
                width: '40px',
                borderRadius: '50%',
                marginRight: '10px',
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    fontWeight: 'bold',
                    marginRight: '10px',
                    width: '100px',
                    backgroundColor: '#D3D3D3',
                    height: '12px',
                  }}
                ></div>
                <div
                  style={{
                    fontSize: 'small',
                    color: 'gray',
                    width: '60px',
                    backgroundColor: '#D3D3D3',
                    height: '12px',
                  }}
                ></div>
              </div>
              <div
                style={{
                  backgroundColor: '#D3D3D3',
                  margin: '5px',
                  width: '250px',
                  height: '16px',
                }}
              ></div>
            </div>
          </div>
        }
        previousSkeleton={
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <img
              src={'https://via.placeholder.com/40?text=User'}
              alt='Avatar'
              style={{
                width: '40px',
                borderRadius: '50%',
                marginRight: '10px',
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    fontWeight: 'bold',
                    marginRight: '10px',
                    width: '100px',
                    backgroundColor: '#D3D3D3',
                    height: '12px',
                  }}
                ></div>
                <div
                  style={{
                    fontSize: 'small',
                    color: '#gray',
                    width: '60px',
                    backgroundColor: '#D3D3D3',
                    height: '12px',
                  }}
                ></div>
              </div>
              <div
                style={{
                  backgroundColor: '#D3D3D3',
                  margin: '5px',
                  width: '250px',
                  height: '16px',
                }}
              ></div>
            </div>
          </div>
        }
        nextThreshold={0.8}
        previousThreshold={0.2}
      />
    </div>
  );
};

export default App;
