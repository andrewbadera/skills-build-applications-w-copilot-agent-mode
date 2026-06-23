import { useEffect, useState } from 'react'
import { fetchCollection, getEndpointUrl } from '../api.js'

function Teams() {
  const [state, setState] = useState({ items: [], total: 0, loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection('teams', 'teams', controller.signal)
      .then((data) => setState({ ...data, loading: false, error: '' }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setState({ items: [], total: 0, loading: false, error: error.message })
        }
      })

    return () => controller.abort()
  }, [])

  return (
    <section className="resource-view">
      <ViewHeader title="Teams" total={state.total} endpoint={getEndpointUrl('teams')} />

      <DataState loading={state.loading} error={state.error} empty={!state.items.length} />

      {!state.loading && !state.error && state.items.length > 0 && (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Coach</th>
                <th>Members</th>
                <th>Weekly goal</th>
              </tr>
            </thead>
            <tbody>
              {state.items.map((team) => (
                <tr key={team._id ?? team.name}>
                  <td>{team.name}</td>
                  <td>{team.city}</td>
                  <td>{team.coach}</td>
                  <td>{team.memberCount}</td>
                  <td>{team.weeklyGoalMinutes} min</td>
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
        <p className="eyebrow">Team management</p>
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
    return <p className="state-message">Loading teams...</p>
  }

  if (error) {
    return <p className="state-message error">{error}</p>
  }

  if (empty) {
    return <p className="state-message">No teams found.</p>
  }

  return null
}

export default Teams