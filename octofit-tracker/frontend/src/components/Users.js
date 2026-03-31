import React, { useState, useEffect, useCallback } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  const fetchUsers = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setUsers(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  useEffect(() => { fetchUsers(); }, [fetchUsers, refreshKey]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="octofit-page-title mb-0">&#128100; Users</h2>
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
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="card octofit-card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>Registered Users</span>
            <span className="badge bg-light text-dark">{users.length} user{users.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table mb-0">
                <thead>
                  <tr>
                    <th className="align-middle">#</th>
                    <th className="align-middle">Username</th>
                    <th className="align-middle">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-4">
                        <em>No users found.</em>
                      </td>
                    </tr>
                  ) : (
                    users.map((user, index) => (
                      <tr key={user._id || index}>
                        <td className="align-middle text-muted">{index + 1}</td>
                        <td className="align-middle"><strong>{user.username}</strong></td>
                        <td className="align-middle">
                          <a href={`mailto:${user.email}`} className="link-primary text-decoration-none">
                            {user.email}
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer text-muted small">
            Showing {users.length} user{users.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
