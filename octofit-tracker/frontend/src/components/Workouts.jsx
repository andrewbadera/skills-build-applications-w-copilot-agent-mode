import { useEffect, useState } from 'react'
import { fetchCollection, getEndpointUrl } from '../api.js'

function Workouts() {
  const [state, setState] = useState({ items: [], total: 0, loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection('workouts', 'workouts', controller.signal)
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
      <ViewHeader title="Workouts" total={state.total} endpoint={getEndpointUrl('workouts')} />

      <DataState loading={state.loading} error={state.error} empty={!state.items.length} />

      {!state.loading && !state.error && state.items.length > 0 && (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Focus</th>
                <th>Difficulty</th>
                <th>Duration</th>
                <th>Equipment</th>
                <th>Recommended for</th>
              </tr>
            </thead>
            <tbody>
              {state.items.map((workout) => (
                <tr key={workout._id ?? `${workout.name}-${workout.focus}`}>
                  <td>{workout.name}</td>
                  <td>{workout.focus}</td>
                  <td className="text-capitalize">{workout.difficulty}</td>
                  <td>{workout.durationMinutes} min</td>
                  <td>{Array.isArray(workout.equipment) ? workout.equipment.join(', ') : workout.equipment}</td>
                  <td>{workout.recommendedFor}</td>
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
        <p className="eyebrow">Workout suggestions</p>
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
    return <p className="state-message">Loading workouts...</p>
  }

  if (error) {
    return <p className="state-message error">{error}</p>
  }

  if (empty) {
    return <p className="state-message">No workouts found.</p>
  }

  return null
}

export default Workouts