import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import axios from 'axios';

export default function History() {
  const [chartData, setChartData] = React.useState({
    painData: [],
    depthData: [],
    labels: []
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = 1;
        const response = await axios.get(`http://localhost:4000/sessions/${userId}`);
        
        const sortedData = response.data.sort((a, b) => 
          new Date(a.finish) - new Date(b.finish)
        );
        
        const transformedData = {
          painData: sortedData.map(session => session.pain),
          depthData: sortedData.map(session => session.depth),
          labels: sortedData.map(session => {
            const date = new Date(session.finish);
            return date.toLocaleString(undefined, {
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric'
            });
          })
        };
        
        setChartData(transformedData);
      } catch (error) {
        console.error('Error fetching session data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <LineChart
        width={500}
        height={300}
        series={[
          { 
            data: chartData.painData, 
            label: 'Pain',
            curve: "natural",
            showMark: true,
          },
          { 
            data: chartData.depthData, 
            label: 'Depth',
            curve: "natural",
            showMark: true,
          },
        ]}
        xAxis={[{ 
          scaleType: 'point', 
          data: chartData.labels,
          tickLabelStyle: { angle: 45 }
        }]}
        yAxis={[{
          min: 0,
          max: 5,
          tickInterval: 1, // Show ticks at each integer
          tickValues: [0, 1, 2, 3, 4, 5], // Explicitly set tick values
        }]}
      />
    </div>
  );
}
