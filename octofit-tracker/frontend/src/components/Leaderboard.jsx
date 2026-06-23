/**
 * Leaderboard Component
 * Displays a competitive leaderboard ranking users and teams
 * based on fitness metrics and achievement points.
 */

import { useEffect, useState } from 'react'
import { fetchCollection, getEndpointUrl } from '../api.js'

function Leaderboard() {
  const [state, setState] = useState({ items: [], total: 0, loading: true, error: '' })

  useEffect(() => {
    // Create abort controller to cancel request if component unmounts
    const controller = new AbortController()

    // Fetch leaderboard entries from API endpoint
    fetchCollection('leaderboard', 'leaderboard', controller.signal)
      .then((data) => setState({ ...data, loading: false, error: '' }))
      .catch((error) => {
        // Ignore abort errors, only handle actual errors
        if (error.name !== 'AbortError') {
          setState({ items: [], total: 0, loading: false, error: error.message })
        }
      })

    // Cleanup: abort request if component unmounts
    return () => controller.abort()
  }, [])

  return (
    <section className="resource-view">
      <ViewHeader title="Leaderboard" total={state.total} endpoint={getEndpointUrl('leaderboard')} />

      <DataState loading={state.loading} error={state.error} empty={!state.items.length} />

      {!state.loading && !state.error && state.items.length > 0 && (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Points</th>
                <th>Weekly minutes</th>
              </tr>
            </thead>
            <tbody>
              {state.items.map((entry) => (
                <tr key={entry._id ?? `${entry.rank}-${entry.username}`}>
                  <td className="rank-cell">#{entry.rank}</td>
                  <td>{entry.username}</td>
                  <td>{entry.teamName}</td>
                  <td>{entry.points}</td>
                  <td>{entry.weeklyMinutes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

function ViewHeader({ title, total, endpoint }) {
  return (
    <div className="view-header">
      <div>
        <p className="eyebrow">Competitive progress</p>
        <h2>{title}</h2>
      </div>
      <div className="resource-meta">
        <span>{total} records</span>
        <code>{endpoint}</code>
      </div>
    </div>
  )
}

function DataState({ loading, error, empty }) {
  if (loading) {
    return <p className="state-message">Loading leaderboard...</p>
  }

  if (error) {
    return <p className="state-message error">{error}</p>
  }

  if (empty) {
    return <p className="state-message">No leaderboard entries found.</p>
  }

  return null
}

export default Leaderboard