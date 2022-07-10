const Header = ({name}) => {
	return (
		<h3>{name} </h3>
	)
}

const Content = ({parts}) => {
	return (
		<p>
			{parts.map((part) => (
			<Part key={part.id} part={part} />
			))}
		</p>
	);
};

const Part = ({part}) => {
	return (
		<p>
			{part.name} {part.exercises} 
		</p>
	);
};

const Total = ({parts}) => {
	const sum = parts.reduce((total, part) => total + part.exercises, 0);
	return (
		<div>
			<strong>Total of {sum} exercises</strong>
		</div>
	);
};

const Course = ({course}) => {
	return (
		<div>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};


function App() {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

	return(
		<div>
			{courses.map((course) => (
			<Course key={course.id} course={course} />
			))}
		</div>
	);
}

export default Course