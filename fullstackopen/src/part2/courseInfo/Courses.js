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

export default Course