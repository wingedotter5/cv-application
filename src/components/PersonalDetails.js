import React from "react";

class PersonalDetails extends React.Component {
  constructor(props) {
    super(props);
    const defaults = {
      name: "Gloria Gonzalez",
      role: "Adjunct Lecturer",
      email: "username@domain.com",
      phone: "+1 12345678"
    };
    this.state = {
      edit: false,
      ...defaults,
      user: defaults
    };
  }

  editButtonHandler = () => {
    this.setState({ edit: true });
  };

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmitHandler = (e) => {
    const { name, role, email, phone } = this.state;
    e.preventDefault();
    this.setState({ user: { name, role, email, phone }, edit: false });
  };

  cancelButtonHandler = () => {
    this.setState({ ...this.state.user, edit: false });
  };

  render() {
    const { name, role, email, phone } = this.state;

    return (
      <div className="section">
        {this.state.edit ? (
          <div>
            <form onSubmit={this.onSubmitHandler} autoComplete="off">
              <div className="form-row">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.onChangeHandler}
                />
              </div>
              <div className="form-row">
                <label>Role</label>
                <input
                  type="text"
                  name="role"
                  value={role}
                  onChange={this.onChangeHandler}
                />
              </div>
              <div className="form-row">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.onChangeHandler}
                />
              </div>
              <div className="form-row">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={this.onChangeHandler}
                />
              </div>
              <div className="button-controls">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.cancelButtonHandler}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="editable">
            <h1>{name}</h1>
            <h2>{role}</h2>
            <h3>{email}</h3>
            <h3>{phone}</h3>
            <button
              className="button-controls hidden btn btn-primary"
              onClick={this.editButtonHandler}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default PersonalDetails;
