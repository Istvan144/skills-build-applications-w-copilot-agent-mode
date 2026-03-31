import React, { useState, useEffect, useCallback } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  const fetchTeams = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setTeams(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  useEffect(() => { fetchTeams(); }, [fetchTeams, refreshKey]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="octofit-page-title mb-0">&#128101; Teams</h2>
        <button className="btn btn-outline-success btn-sm" onClick={() => setRefreshKey(k => k + 1)}>
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
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="card octofit-card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>Team Roster</span>
            <span className="badge bg-light text-dark">{teams.length} team{teams.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table mb-0">
                <thead>
                  <tr>
                    <th className="align-middle">#</th>
                    <th className="align-middle">Team Name</th>
                    <th className="align-middle">Members</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-4">
                        <em>No teams found.</em>
                      </td>
                    </tr>
                  ) : (
                    teams.map((team, index) => (
                      <tr key={team._id || index}>
                        <td className="align-middle text-muted">{index + 1}</td>
                        <td className="align-middle"><strong>{team.name}</strong></td>
                        <td className="align-middle">
                          {(Array.isArray(team.members) ? team.members : [team.members]).map((m, i) => (
                            <span key={i} className="badge bg-secondary octofit-badge me-1">{m}</span>
                          ))}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer text-muted small">
            Showing {teams.length} team{teams.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}
    </div>
  );
}

export default Teams;
