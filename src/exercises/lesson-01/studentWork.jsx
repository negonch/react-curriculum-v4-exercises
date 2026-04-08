//Lesson-01 Introduction to React
//Exercise: Build an "About Me" Component in this file

export default function StudentWork() {
  //add variables here
  const name = 'Natalia Goncharov';
  const age = 47;
  const hobbies = ['cooking', 'traveling', 'fitness'];
  return (
    <div>
      <h1>About me</h1>
      <p>
        {' '}
        Hello! My name is {name}. I am {age} years old. I am a very proud Navy
        wife. I enjoy learning JavaScript and React in the Code The Dream
        course.
      </p>
      <p>My hobbies: </p>
      <ul>
        {hobbies.map((hobby, i) => (
          <li key={i}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}
