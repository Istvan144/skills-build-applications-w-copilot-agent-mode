import React, { useState, useEffect, useCallback } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  const fetchWorkouts = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setWorkouts(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  useEffect(() => { fetchWorkouts(); }, [fetchWorkouts, refreshKey]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="octofit-page-title mb-0">&#127947; Workouts</h2>
        <button className="btn btn-outline-danger btn-sm" onClick={() => setRefreshKey(k => k + 1)}>
          &#8635; Refresh
        </button>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error:</strong> {error}
          <button type="button" className="btn-close" onClick={() => setError(null)} aria-label="Close"></button>
        </div>
      )}

      {loading && !error && (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="card octofit-card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>Workout Suggestions</span>
            <span className="badge bg-light text-dark">{workouts.length} workout{workouts.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table mb-0">
                <thead>
                  <tr>
                    <th className="align-middle">#</th>
                    <th className="align-middle">Workout Name</th>
                    <th className="align-middle">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-4">
                        <em>No workouts found.</em>
                      </td>
                    </tr>
                  ) : (
                    workouts.map((workout, index) => (
                      <tr key={workout._id || index}>
                        <td className="align-middle text-muted">{index + 1}</td>
                        <td className="align-middle"><strong>{workout.name}</strong></td>
                        <td className="align-middle text-muted">{workout.description}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer text-muted small">
            Showing {workouts.length} workout{workouts.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}
    </div>
  );
}

export default Workouts;
