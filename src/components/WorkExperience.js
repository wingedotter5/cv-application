import React from "react";
import uniqid from "uniqid";

class Form extends React.Component {
  constructor(props) {
    super(props);
    const job = {
      orgName: "",
      positionTitle: "",
      startDate: "",
      endDate: "",
      id: uniqid()
    };
    this.state = this.props.job || job;
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.jobChangeHandler({
      ...this.state,
      edit: false
    });
  };

  render() {
    const { orgName, positionTitle, startDate, endDate, tasks } = this.state;

    return (
      <form onSubmit={this.onSubmitHandler} style={{ marginTop: "8px" }}>
        <div className="form-row">
          <label htmlFor="orgName">Organization</label>
          <input
            id="orgName"
            type="text"
            name="orgName"
            value={orgName}
            onChange={this.onChangeHandler}
          />
        </div>
        <div className="form-row">
          <label htmlFor="positionTitle">Position / Role</label>
          <input
            id="positionTitle"
            type="text"
            name="positionTitle"
            value={positionTitle}
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
        <div className="form-row">
          <label htmlFor="tasks">Tasks</label>
          <textarea
            id="tasks"
            type="text"
            name="tasks"
            value={tasks}
            onChange={this.onChangeHandler}
            rows="3"
          ></textarea>
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

class Job extends React.Component {
  render() {
    const {
      orgName,
      positionTitle,
      startDate,
      endDate,
      tasks
    } = this.props.job;

    return (
      <div className="editable">
        <h2>{positionTitle}</h2>
        <h3>{orgName}</h3>
        <p className="font-secondary">
          {startDate} - {endDate}
        </p>
        <ul className="font-secondary" style={{ paddingLeft: "16px" }}>
          {tasks.split("\n").map((task) => (
            <li key={this.props.job.id}>{task}</li>
          ))}
        </ul>
        <div className="button-controls hidden">
          <button
            className="btn btn-primary"
            onClick={() => this.props.editButtonHandler(this.props.job)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.props.deleteButtonHandler(this.props.job)}
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
  jobs: [
    {
      id: uniqid(),
      edit: false,
      orgName: "University of Houston",
      positionTitle: "Adjunct Lecturer",
      startDate: "01/01/2022",
      endDate: "31/12/2022",
      tasks:
        "Mexican-American Literature, Spanish 3331\nWomen in Hispanic Literature, Spanish 3350\nSpanish-American Short Story, Spanish 4339"
    },
    {
      id: uniqid(),
      edit: false,
      orgName: "Northwestern University",
      positionTitle: "Graduate Teaching Assistant",
      startDate: "01/01/2022",
      endDate: "31/12/2022",
      tasks:
        "Elementary Spanish 1501, 1502, 1505\nIntermediate Spanish 2301, 2302, 2610"
    }
  ]
};

class WorkExperience extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  jobChangeHandler = (job) => {
    const index = this.state.jobs.findIndex((item) => item.id === job.id);
    if (index !== -1) {
      const jobs = this.state.jobs.slice();
      jobs.splice(index, 1, job);
      this.setState({ jobs });
    } else {
      const jobs = this.state.jobs.concat(job);
      this.setState({ jobs, showAddButton: true });
    }
  };

  editButtonHandler = (job) => {
    const index = this.state.jobs.findIndex((item) => item.id === job.id);
    if (index !== -1) {
      const jobs = this.state.jobs.slice();
      jobs.splice(index, 1, { ...job, edit: true });
      this.setState({ jobs });
    }
  };

  cancelButtonHandler = (job) => {
    const index = this.state.jobs.findIndex((item) => item.id === job.id);
    if (index !== -1) {
      const jobs = this.state.jobs.slice();
      jobs.splice(index, 1, { ...jobs[index], edit: false });
      this.setState({ jobs });
    }
  };

  deleteButtonHandler = (job) => {
    const index = this.state.jobs.findIndex((item) => item.id === job.id);
    if (index !== -1) {
      const jobs = this.state.jobs.slice();
      jobs.splice(index, 1);
      this.setState({ jobs });
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
        <h1>Work Experience</h1>
        <hr />
        {this.state.jobs.map((job) =>
          job.edit ? (
            <Form
              key={job.id}
              job={job}
              jobChangeHandler={this.jobChangeHandler}
              cancelButtonHandler={this.cancelButtonHandler}
            />
          ) : (
            <Job
              key={job.id}
              job={job}
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
            jobChangeHandler={this.jobChangeHandler}
            cancelButtonHandler={() => this.setState({ showAddButton: true })}
          />
        )}
      </div>
    );
  }
}

export default WorkExperience;
