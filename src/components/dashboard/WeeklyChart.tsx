import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Sun', hours: 1.5 },
  { day: 'Mon', hours: 3.2 },
  { day: 'Tue', hours: 2.8 },
  { day: 'Wed', hours: 4.1 },
  { day: 'Thu', hours: 3.5 },
  { day: 'Fri', hours: 2.9 },
  { day: 'Sat', hours: 0.5 },
];

export const WeeklyChart = () => {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold text-pure-white">Weekly Progress</h3>
        <span className="text-sm text-cool-gray">Last 7 days</span>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: 12 }}
              tickFormatter={(value) => `${value}h`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(217 33% 17% / 0.9)',
                border: '1px solid hsl(215 25% 27% / 0.5)',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
              labelStyle={{ color: '#FFFFFF' }}
              itemStyle={{ color: '#10B981' }}
              formatter={(value: number) => [`${value} hours`, 'Study Time']}
            />
            <Area
              type="monotone"
              dataKey="hours"
              stroke="#10B981"
              strokeWidth={2}
              fill="url(#colorHours)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
