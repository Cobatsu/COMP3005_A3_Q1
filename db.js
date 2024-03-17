const { Client } = require("pg");

// Configure the PostgreSQL client
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "assignment_3",
  password: "2231223122",
  port: 5432,
});

// Connects to the database
client
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Connection error", err.stack));

//retrieves all students
async function getAllStudents() {
  const query = "SELECT * FROM students";
  const { rows } = await client.query(query);
  return rows;
}

//adds a new student
async function addStudent(first_name, last_name, email, enrollment_date) {
  const query =
    "INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES ($1, $2, $3, $4)";
  await client.query(query, [first_name, last_name, email, enrollment_date]);
}

//updates a student's email
async function updateStudentEmail(student_id, new_email) {
  const query = "UPDATE students SET email = $1 WHERE student_id = $2";
  await client.query(query, [new_email, student_id]);
}

//deletes a student
async function deleteStudent(student_id) {
  const query = "DELETE FROM students WHERE student_id = $1";
  await client.query(query, [student_id]);
}

//getAllStudents().then((students) => {

//});

//addStudent("FATIH", "OZER", "fatih.ozer@cmail.carleton.ca", new Date());

//updateStudentEmail(9, "huze.ozr@gmail.com");

deleteStudent(9);
