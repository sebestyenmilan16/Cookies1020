import React, { Component } from 'react';
import './CookieManager.css';

class CookieManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookies: [],
      newCookieName: '',
      newCookieValue: '',
      newCookieDays: 1,
      editCookieName: '',
      editCookieValue: '',
      editCookieDays: 1,
      message: '',
    };
  }

  componentDidMount() {
    this.refreshCookies();
  }

  // ----- Cookie helpers -----
  getCookies = () => {

  };

  setCookie = (name, value, days) => {

  };

  deleteCookie = (name) => {

  };

  clearAllCookies = () => {

  };

  refreshCookies = () => {
    this.setState({ cookies: this.getCookies() });
  };

  showMessage = (msg) => {
    this.setState({ message: msg });
    setTimeout(() => this.setState({ message: '' }), 2000);
  };

  // ----- Event handlers -----
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCreateCookie = (e) => {
    e.preventDefault();
    const { newCookieName, newCookieValue, newCookieDays } = this.state;
    if (!newCookieName.trim()) {
      this.showMessage('Cookie name is required');
      return;
    }
    this.setCookie(newCookieName.trim(), newCookieValue, Number(newCookieDays) || 1);
    this.refreshCookies();
    this.showMessage(`Cookie "${newCookieName}" created`);
    this.setState({ newCookieName: '', newCookieValue: '', newCookieDays: 1 });
  };

  handleEditSelect = (e) => {
    const name = e.target.value;
    const cookie = this.state.cookies.find((c) => c.name === name);
    if (cookie) {
      this.setState({
        editCookieName: cookie.name,
        editCookieValue: cookie.value,
        editCookieDays: 1,
      });
    } else {
      this.setState({ editCookieName: '', editCookieValue: '', editCookieDays: 1 });
    }
  };

  handleUpdateCookie = (e) => {
    e.preventDefault();
    const { editCookieName, editCookieValue, editCookieDays } = this.state;
    if (!editCookieName) {
      this.showMessage('Select a cookie to update');
      return;
    }
    this.setCookie(editCookieName, editCookieValue, Number(editCookieDays) || 1);
    this.refreshCookies();
    this.showMessage(`Cookie "${editCookieName}" updated`);
  };

  handleDeleteCookie = (name) => {
    this.deleteCookie(name);
    this.refreshCookies();
    this.showMessage(`Cookie "${name}" deleted`);
    if (this.state.editCookieName === name) {
      this.setState({ editCookieName: '', editCookieValue: '', editCookieDays: 1 });
    }
  };

  render() {
    const { cookies=[], message } = this.state;
    const cookieNames = cookies.map((c) => c.name);

    return (
      <div className="cookie-manager">
        <h1>🍪 Cookie Manager</h1>
        {message && <div className="message">{message}</div>}

        {/* Create Cookie */}
        <section className="section">
          <h2>Create Cookie</h2>
          <form onSubmit={this.handleCreateCookie} className="form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="newCookieName"
                value={this.state.newCookieName}
                onChange={this.handleInputChange}
                placeholder="e.g. session"
              />
            </div>
            <div className="form-group">
              <label>Value</label>
              <input
                type="text"
                name="newCookieValue"
                value={this.state.newCookieValue}
                onChange={this.handleInputChange}
                placeholder="e.g. abc123"
              />
            </div>
            <div className="form-group">
              <label>Expiry (days)</label>
              <input
                type="number"
                name="newCookieDays"
                min="1"
                value={this.state.newCookieDays}
                onChange={this.handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        </section>

        {/* Cookie List */}
        <section className="section">
          <h2>Cookie List</h2>
          {cookies.length === 0 ? (
            <p className="empty">No cookies found.</p>
          ) : (
            <ul className="cookie-list">
              {cookies.map((cookie) => (
                <li key={cookie.name} className="cookie-item">
                  <div className="cookie-info">
                    <strong>{cookie.name}</strong>
                    <span className="cookie-value">{cookie.value}</span>
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDeleteCookie(cookie.name)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
          {cookies.length > 0 && (
            <button className="btn btn-warning" onClick={this.clearAllCookies}>
              Clear All Cookies
            </button>
          )}
        </section>

        {/* Edit Cookie */}
        <section className="section">
          <h2>Update Cookie</h2>
          <form onSubmit={this.handleUpdateCookie} className="form">
            <div className="form-group">
              <label>Select Cookie</label>
              <select value={this.state.editCookieName} onChange={this.handleEditSelect}>
                <option value="">-- Select --</option>
                {cookieNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>New Value</label>
              <input
                type="text"
                name="editCookieValue"
                value={this.state.editCookieValue}
                onChange={this.handleInputChange}
                disabled={!this.state.editCookieName}
              />
            </div>
            <div className="form-group">
              <label>New Expiry (days)</label>
              <input
                type="number"
                name="editCookieDays"
                min="1"
                value={this.state.editCookieDays}
                onChange={this.handleInputChange}
                disabled={!this.state.editCookieName}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!this.state.editCookieName}
            >
              Update
            </button>
          </form>
        </section>
      </div>
    );
  }
}

export default CookieManager;