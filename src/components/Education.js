import React from "react";
import uniqid from "uniqid";

class Form extends React.Component {
  constructor(props) {
    super(props);
    const school = {
      name: "",
      study: "",
      startDate: "",
      endDate: "",
      id: uniqid()
    };
    this.state = this.props.school || school;
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.schoolChangeHandler({
      ...this.state,
      edit: false
    });
  };

  render() {
    const { name, study, startDate, endDate } = this.state;

    return (
      <form onSubmit={this.onSubmitHandler} style={{ marginTop: "8px" }}>
        <div className="form-row">
          <label htmlFor="name">School</label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={this.onChangeHandler}
          />
        </div>
        <div className="form-row">
          <label htmlFor="study">Study</label>
          <input
            id="study"
            type="text"
            name="study"
            value={study}
            onChange={this.onChangeHandler}
          />
        </div>
        <div className="form-row">
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            type="text"
            name="startDate"
            value={startDate}
            onChange={this.onChangeHandler}
          />
        </div>
        <div className="form-row">
          <label htmlFor="endDate">End Date</label>
          <input
            id="endDate"
            type="text"
            name="endDate"
            value={endDate}
            onChange={this.onChangeHandler}
          />
        </div>
        <div className="button-controls">
          <button className="btn btn-success" type="submit">
            Submit
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => this.props.cancelButtonHandler(this.state)}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

class School extends React.Component {
  render() {
    const { name, study, startDate, endDate } = this.props.school;

    return (
      <div className="editable">
        <h2>{study}</h2>
        <h3>{name}</h3>
        <p>
          {startDate} - {endDate}
        </p>
        <div className="button-controls hidden">
          <button
            className="btn btn-primary"
            onClick={() => this.props.editButtonHandler(this.props.school)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.props.deleteButtonHandler(this.props.school)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

const defaultState = {
  showAddButton: true,
  schools: [
    {
      id: uniqid(),
      edit: false,
      name: "University of Houston",
      study: "Ph.D. in Spanish (US Hispanic Literature)",
      startDate: "01/01/2022",
      endDate: "31/12/2022"
    },
    {
      id: uniqid(),
      edit: false,
      name: "University of Houston",
      study: "M.A. in Spanish",
      startDate: "01/01/2022",
      endDate: "31/12/2022"
    },
    {
      id: uniqid(),
      edit: false,
      name: "University of Houston",
      study: "B.A. in Spanish",
      startDate: "01/01/2022",
      endDate: "31/12/2022"
    }
  ]
};

class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  schoolChangeHandler = (school) => {
    const index = this.state.schools.findIndex((item) => item.id === school.id);
    if (index !== -1) {
      const schools = this.state.schools.slice();
      schools.splice(index, 1, school);
      this.setState({ schools });
    } else {
      const schools = this.state.schools.concat(school);
      this.setState({ schools, showAddButton: true });
    }
  };

  editButtonHandler = (school) => {
    const index = this.state.schools.findIndex((item) => item.id === school.id);
    if (index !== -1) {
      const schools = this.state.schools.slice();
      schools.splice(index, 1, { ...school, edit: true });
      this.setState({ schools });
    }
  };

  cancelButtonHandler = (school) => {
    const index = this.state.schools.findIndex((item) => item.id === school.id);
    if (index !== -1) {
      const schools = this.state.schools.slice();
      schools.splice(index, 1, { ...schools[index], edit: false });
      this.setState({ schools });
    }
  };

  deleteButtonHandler = (school) => {
    const index = this.state.schools.findIndex((item) => item.id === school.id);
    if (index !== -1) {
      const schools = this.state.schools.slice();
      schools.splice(index, 1);
      this.setState({ schools });
    }
  };

  addButtonHandler = () => {
    this.setState({
      showAddButton: false
    });
  };

  render() {
    return (
      <div className="section">
        <h1>Education</h1>
        <hr />
        {this.state.schools.map((school) =>
          school.edit ? (
            <Form
              key={school.id}
              school={school}
              schoolChangeHandler={this.schoolChangeHandler}
              cancelButtonHandler={this.cancelButtonHandler}
            />
          ) : (
            <School
              key={school.id}
              school={school}
              editButtonHandler={this.editButtonHandler}
              deleteButtonHandler={this.deleteButtonHandler}
            />
          )
        )}
        {this.state.showAddButton ? (
          <button
            className="add-button btn btn-primary"
            onClick={this.addButtonHandler}
          >
            Add
          </button>
        ) : (
          <Form
            schoolChangeHandler={this.schoolChangeHandler}
            cancelButtonHandler={() => this.setState({ showAddButton: true })}
          />
        )}
      </div>
    );
  }
}

export default Education;
