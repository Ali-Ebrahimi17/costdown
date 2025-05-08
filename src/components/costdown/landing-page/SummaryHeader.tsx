'use client'

interface SummaryHeaderProps {
  categories: Array<{
    name: string
    forecast: number
    budget: number
    target: number
  }>
}

export default function SummaryHeader({ categories }: SummaryHeaderProps) {
  const isDarkMode = true

  // Calculate totals
  const totalForecast = categories.reduce((sum, cat) => sum + cat.forecast, 0)
  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0)
  const totalTarget = categories.reduce((sum, cat) => sum + cat.target, 0)

  // Calculate variances
  const targetVariance = ((totalForecast - totalTarget) / totalTarget) * 100
  const budgetVariance = ((totalForecast - totalBudget) / totalBudget) * 100

  // Determine status color
  const getStatusColor = () => {
    if (totalForecast <= totalTarget) {
      return '#2ca02c' // Green
    }
    return '#ffc107' // Yellow
  }

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
        border: `2px solid ${isDarkMode ? '#333' : '#000'}`,
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <h2
          style={{
            margin: '0 0 8px 0',
            color: isDarkMode ? '#ffffff' : '#000000',
            fontSize: '20px',
          }}
        >
          Cost Summary
        </h2>
        <div
          style={{
            fontSize: '14px',
            color: isDarkMode ? '#aaaaaa' : '#666666',
          }}
        >
          Overall cost performance
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '32px',
        }}
      >
        <div>
          <div style={{ color: isDarkMode ? '#aaa' : '#666' }}>Total Forecast</div>
          <div
            style={{
              color: getStatusColor(),
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            £{totalForecast.toLocaleString()}
            <span
              style={{
                fontSize: '14px',
                marginLeft: '8px',
                color: targetVariance > 0 ? '#ef5350' : '#4caf50',
              }}
            >
              ({targetVariance > 0 ? '+' : ''}
              {targetVariance.toFixed(1)}%)
            </span>
          </div>
        </div>

        <div>
          <div style={{ color: isDarkMode ? '#aaa' : '#666' }}>Total Budget</div>
          <div
            style={{
              color: isDarkMode ? '#fff' : '#000',
              fontSize: '24px',
            }}
          >
            £{totalBudget.toLocaleString()}
          </div>
        </div>

        <div>
          <div style={{ color: isDarkMode ? '#aaa' : '#666' }}>Total Target</div>
          <div
            style={{
              color: isDarkMode ? '#fff' : '#000',
              fontSize: '24px',
            }}
          >
            £{totalTarget.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  )
}
