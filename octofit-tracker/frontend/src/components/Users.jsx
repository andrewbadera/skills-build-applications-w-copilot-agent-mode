/**
 * Users Component
 * Displays a list of all users in the Octofit Tracker system
 * with their profiles, contact info, team assignments, and fitness goals.
 */

import { useEffect, useState } from 'react'
import { fetchCollection, getEndpointUrl } from '../api.js'

function Users() {
  const [state, setState] = useState({ items: [], total: 0, loading: true, error: '' })

  useEffect(() => {
    // Create abort controller to cancel request if component unmounts
    const controller = new AbortController()

    // Fetch users from API endpoint
    fetchCollection('users', 'users', controller.signal)
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
      <ViewHeader title="Users" total={state.total} endpoint={getEndpointUrl('users')} />

      <DataState loading={state.loading} error={state.error} empty={!state.items.length} />

      {!state.loading && !state.error && state.items.length > 0 && (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Team</th>
                <th>Fitness goal</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {state.items.map((user) => (
                <tr key={user._id ?? user.username}>
                  <td>{user.displayName}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.teamName}</td>
                  <td>{user.fitnessGoal}</td>
                  <td>{formatDate(user.joinedAt)}</td>
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
        <p className="eyebrow">Profiles</p>
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
    return <p className="state-message">Loading users...</p>
  }

  if (error) {
    return <p className="state-message error">{error}</p>
  }

  if (empty) {
    return <p className="state-message">No users found.</p>
  }

  return null
}

function formatDate(value) {
  if (!value) {
    return 'N/A'
  }

  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}

export default Users