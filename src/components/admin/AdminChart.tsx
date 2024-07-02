import { BarChart, Bar, CartesianGrid, Tooltip, Legend, XAxis, YAxis } from 'recharts'
import colors from 'tailwindcss/colors'
import { useKpiQuery } from '@/hooks/queries/useKpi'

export default function AdminChart() {
  const { data, isLoading } = useKpiQuery()

  const parsedData = Object.entries(data || {}).map(([key, value]) => ({
    name: parseName(key),
    quantity: value,
  }))

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className="my-4">
      <h5 className="text-lg font-bold mb-6">Key Performance Indicators</h5>
      <BarChart
        width={600}
        height={400}
        data={parsedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="quantity" fill={colors.teal[500]} background={{ fill: '#eee' }} />
      </BarChart>
    </div>
  )
}

/**
 * Helper function to parse the name from camelCase to a more readable format
 * @example
 * const name = 'totalUsers'
 * parseName(name) // 'Total users'
 */
const parseName = (name: string) => {
  return (
    name.charAt(0).toUpperCase() +
    name
      .replace(/([A-Z])/g, ' $1')
      .toLowerCase()
      .slice(1)
  )
}
