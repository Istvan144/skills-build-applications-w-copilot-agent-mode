import React, { useState, useEffect, useCallback } from 'react';

const rankClass = (rank) => {
  if (rank === 1) return 'rank-gold';
  if (rank === 2) return 'rank-silver';
  if (rank === 3) return 'rank-bronze';
  return '';
};

const rankIcon = (rank) => {
  if (rank === 1) return '\uD83E\uDD47';
  if (rank === 2) return '\uD83E\uDD48';
  if (rank === 3) return '\uD83E\uDD49';
  return rank;
};

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  const fetchLeaderboard = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setEntries(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  useEffect(() => { fetchLeaderboard(); }, [fetchLeaderboard, refreshKey]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="octofit-page-title mb-0">&#127942; Leaderboard</h2>
        <button className="btn btn-outline-warning btn-sm" onClick={() => setRefreshKey(k => k + 1)}>
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
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="card octofit-card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>Rankings</span>
            <span className="badge bg-light text-dark">{entries.length} participant{entries.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table mb-0">
                <thead>
                  <tr>
                    <th className="align-middle">Rank</th>
                    <th className="align-middle">User</th>
                    <th className="align-middle">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-4">
                        <em>No entries yet.</em>
                      </td>
                    </tr>
                  ) : (
                    entries.map((entry, index) => {
                      const rank = index + 1;
                      return (
                        <tr key={entry._id || index}>
                          <td className={`align-middle ${rankClass(rank)}`}>{rankIcon(rank)}</td>
                          <td className="align-middle"><strong>{entry.user}</strong></td>
                          <td className="align-middle">
                            <span className="badge bg-success octofit-badge">{entry.score} pts</span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer text-muted small">
            Showing {entries.length} participant{entries.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
