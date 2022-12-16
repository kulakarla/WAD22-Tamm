const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "", // Enter your password here
    database: "testWad", //Try to use the same name for your database
    host: "localhost",
    port: "5432"
});

const execute = async(createTblQuery, insertDataQuery) => {
    try {
        await pool.connect();
        await pool.query(createTblQuery);
        await pool.query(insertDataQuery);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const createTblQuery = ` 
    CREATE TABLE IF NOT EXISTS "courses" (
        "id" SERIAL PRIMARY KEY, 
        "code" VARCHAR(200) NOT NULL,
        "title" VARCHAR(200) NOT NULL,  
        "semester" VARCHAR(200) NOT NULL,  
        "credits" integer NOT NULL,
        "description" VARCHAR(2000) 
        );`;

const insertDataQuery = `WITH data (code, title, semester, credits, description) AS 
   (
    VALUES
    ('LTAT.05.006', 'Software Testing', 'spring', 6, 'The goal of the course is to introduce basic concepts on software testing levels, testing approaches, testing types, and Test-Driven Development (TDD)'), 
    ('LTAT.05.003', 'Software Engineering', 'fall', 6, 'The course is designed to present software engineering concepts and principles in parallel with the software development life cycle.'),  
    ('LTAT.05.026', 'Enterprise Modelling', 'spring', 6, 'The objectives of this course are to get acquainted with basic concepts and principles of enterprise modeling techniques and their usage in the field of business development.'),  
    ('MTAT.03.295', 'Agile Software Development', 'fall', 6, 'The goal of the course is to introduce basic concepts on Agile Software Development and current practices. Students will implement agile practices during the development of a web application.'), 
    ('LTAT.02.007', 'Data Engineering', 'fall', 6, '') 
    )
  INSERT INTO courses(code, title, semester, credits, description) 
  SELECT  d.code, d.title, d.semester, d.credits, d.description
  FROM data d
  WHERE NOT EXISTS (SELECT * FROM courses WHERE id = 1);
`

execute(createTblQuery, insertDataQuery).then(result => {
    if (result) {
        console.log('If does not exists, table "courses" is created');
    }
});

module.exports = pool;