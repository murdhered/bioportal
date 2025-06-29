// Path: components/Chart.js

'use client';

import {addDays, differenceInDays, formatISO9075, parseISO, format} from "date-fns";
import {Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";


export default function Chart({data}) {
  // --- NEW: CRASH PREVENTION ---
  // If there is no data, show a helpful message instead of crashing.
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-400 p-8">
        Not enough data to display chart.
      </div>
    );
  }
  
  const xLabelKey = Object.keys(data[0]).find(key => key !== 'date');

  const dataWithoutGaps = [];
  data.forEach((value, index) => {
    const date = value.date;
    dataWithoutGaps.push({
      date,
      [xLabelKey]: value?.[xLabelKey] || 0,
    });
    const nextDate = data?.[index + 1]?.date;
    if (date && nextDate) {
      const daysBetween = differenceInDays(
        parseISO(nextDate),
        parseISO(date)
      );
      if (daysBetween > 0) {
        for (let i = 1; i < daysBetween; i++) {
          const dateBetween = formatISO9075(
            addDays(parseISO(date), i)
          ).split(' ')[0];
          dataWithoutGaps.push({
            date: dateBetween,
            [xLabelKey]: 0,
          })
        }
      }
    }
  });

  return (
    <div>
      <ResponsiveContainer width="100%" height={250}>
        {/* --- UPDATED: Switched to AreaChart for a nicer look --- */}
        <AreaChart data={dataWithoutGaps}
                   margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          {/* --- NEW: Formats the date to look like "Jun 29" --- */}
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tickMargin={10} 
            tick={{fill:'#aaa'}}
            tickFormatter={(str) => format(parseISO(str), 'MMM d')}
          />
          <YAxis axisLine={false} tickLine={false} tickMargin={10} tick={{fill:'#aaa'}} />
          <Tooltip />
          <Area 
            type="monotone" 
            dataKey={xLabelKey} 
            stroke="#8884d8" 
            fillOpacity={1} 
            fill="url(#colorUv)" 
            strokeWidth="3"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}