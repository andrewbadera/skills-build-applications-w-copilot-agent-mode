import { useEffect, useState } from 'react'
import { fetchCollection, getEndpointUrl } from '../api.js'

function Activities() {
  const [state, setState] = useState({ items: [], total: 0, loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection('activities', 'activities', controller.signal)
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
      <ViewHeader title="Activities" total={state.total} endpoint={getEndpointUrl('activities')} />

      <DataState loading={state.loading} error={state.error} empty={!state.items.length} />

      {!state.loading && !state.error && state.items.length > 0 && (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Distance</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {state.items.map((activity) => (
                <tr key={activity._id ?? `${activity.username}-${activity.date}-${activity.type}`}>
                  <td>{activity.username}</td>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.distanceMiles ? `${activity.distanceMiles} mi` : 'N/A'}</td>
                  <td>{activity.caloriesBurned}</td>
                  <td>{formatDate(activity.date)}</td>
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
        <p className="eyebrow">Activity logging</p>
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
    return <p className="state-message">Loading activities...</p>
  }

  if (error) {
    return <p className="state-message error">{error}</p>
  }

  if (empty) {
    return <p className="state-message">No activities found.</p>
  }

  return null
}

function formatDate(value) {
  if (!value) {
    return 'N/A'
  }

  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}

export default Activities