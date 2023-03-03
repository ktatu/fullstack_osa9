import React from "react";

interface HeaderProps {
  courseName: string;
}

interface TotalProps {
  exerciseArray: Array<number>;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartWithDesc extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartWithDesc {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartWithDesc {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartWithDesc {
  requirements: Array<string>;
  type: "special";
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ];

  const Header = (props: HeaderProps) => {
    return <h1>{props.courseName}</h1>
  };

  const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
    return (
      <div>
        {courseParts.map(part => <Part key={part.name} coursePart={part} />)}
      </div>
    )
  };

  const Total = (props: TotalProps) => {
    const total = props.exerciseArray.reduce((prev, curr) => (prev + curr), 0);
    return <p>Number of exercises: {total}</p>
  };

  const Part = ({coursePart}: {coursePart: CoursePart}) => {
    switch (coursePart.type) {
      case "normal":
        return (
          <p>
            <b>{coursePart.name} {coursePart.exerciseCount}</b>
            <br />
            <i>{coursePart.description}</i>
            <br />
          </p>
        );
      case "groupProject":
        return (
          <p>
            <b>{coursePart.name} {coursePart.exerciseCount}</b>
            <br />
            project exercises {coursePart.groupProjectCount}
            <br />
          </p>
        );
      case "submission":
        return (
          <p>
            <b>{coursePart.name} {coursePart.exerciseCount}</b>
            <br />
            <i>{coursePart.description}</i>
            <br />
            submit to {coursePart.exerciseSubmissionLink}
            <br />
          </p>
        )
      case "special":
        return (
          <p>
            <b>{coursePart.name} {coursePart.exerciseCount}</b>
            <br />
            <i>{coursePart.description}</i>
            <br />
            required skills: {coursePart.requirements.map(requirement => {
              if (requirement === coursePart.requirements[coursePart.requirements.length - 1]) {
                return requirement
              }
              return requirement + ", "
            })}
          </p>
        )
      default:
        return assertNever(coursePart)
    }
  }

  const assertNever = (value: never): never => {
    throw new Error(`Unexpected course part ${JSON.stringify(value)}`)
  }

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total exerciseArray={courseParts.map(part => part.exerciseCount)} />
    </div>
  );
};

export default App;