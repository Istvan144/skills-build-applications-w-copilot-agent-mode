import React, { useState, useEffect, useCallback } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  const fetchActivities = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setActivities(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  useEffect(() => { fetchActivities(); }, [fetchActivities, refreshKey]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="octofit-page-title mb-0">&#127939; Activities</h2>
        <button className="btn btn-outline-primary btn-sm" onClick={() => setRefreshKey(k => k + 1)}>
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
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="card octofit-card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>Activity Log</span>
            <span className="badge bg-light text-dark">{activities.length} record{activities.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table mb-0">
                <thead>
                  <tr>
                    <th className="align-middle">#</th>
                    <th className="align-middle">User</th>
                    <th className="align-middle">Activity Type</th>
                    <th className="align-middle">Duration (min)</th>
                    <th className="align-middle">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-muted py-4">
                        <em>No activities found.</em>
                      </td>
                    </tr>
                  ) : (
                    activities.map((activity, index) => (
                      <tr key={activity._id || index}>
                        <td className="align-middle text-muted">{index + 1}</td>
                        <td className="align-middle"><strong>{activity.user}</strong></td>
                        <td className="align-middle">
                          <span className="badge bg-primary octofit-badge">{activity.activity_type}</span>
                        </td>
                        <td className="align-middle">{activity.duration}</td>
                        <td className="align-middle">{activity.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer text-muted small">
            Showing {activities.length} activit{activities.length !== 1 ? 'ies' : 'y'}
          </div>
        </div>
      )}
    </div>
  );
}

export default Activities;
