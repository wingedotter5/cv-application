import React from "react";
import PersonalDetails from "./components/PersonalDetails";
import classes from "./styles/App.module.css";
import Education from "./components/Education";
import WorkExperience from "./components/WorkExperience";

class App extends React.Component {
  render() {
    return (
      <div className={classes.app}>
        <div className={classes.container}>
          <PersonalDetails />
          <Education />
          <WorkExperience />
        </div>
      </div>
    );
  }
}

export default App;
