const { Client } = require("pg");
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Configure the PostgreSQL client, please enter the credentials of your PostgreSQL here.
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
  .then(() => {})
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

// getAllStudents()
//   .then((students) => {
//     console.log(students);
//   })
//   .catch(() => {
//     console.log("ERROR: Student can not be fetched");
//   });

// rl.question(
//   "Please enter the NAME, LASTNAME, EMAIL OF THE STUDENT TO BE INSERTED: \n",
//   (NAME) => {
//     rl.question("", (LASTNAME) => {
//       rl.question("", (EMAIL) => {
//         addStudent(NAME, LASTNAME, EMAIL, new Date())
//           .then(() => {
//             console.log("Student inserted successfully.");
//           })
//           .catch(() => {
//             console.log("ERROR: Student can not be inserted");
//           });
//         rl.close();
//       });
//     });
//   }
// );

// rl.question(
//   "Please enter the id of the student to be updated and the email \n",
//   (ID) => {
//     rl.question("", (EMAIL) => {
//       updateStudentEmail(ID, EMAIL)
//         .then(() => {
//           console.log("Student updated successfully.");
//         })
//         .catch(() => {
//           console.log("ERROR: Student can not be updated");
//         });
//     });
//   }
// );

// rl.question("Please enter the id of the student to be deletd \n", (ID) => {
//   deleteStudent(ID)
//     .then(() => {
//       console.log("Student deleted successfully.");
//     })
//     .catch(() => {
//       console.log("ERROR: Student can not be deleted");
//     });
// });
