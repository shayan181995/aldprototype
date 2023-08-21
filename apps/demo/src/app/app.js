const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json()); //parse json data
app.use(bodyParser.urlencoded({ extended: false })); //parse url encoded data

// Set up MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Technocomm',
  database: 'ald',
});
connection.keepAliveTimeout = 60000;
// Connect to MySQL server
//connection.connect();

// Define API route to retrieve data

app.get('/api/sectionheadfeedback/:submissionNumber/:report', (req, res) => {
  const submissionNumber = req.params.submissionNumber;
  const report = req.params.report;
  const query =
    'SELECT * FROM `emails` WHERE `SubmissionNumber` = ? and `Form`=?';
  connection.query(
    query,
    [submissionNumber, report],
    (error, results, fields) => {
      //if (error) throw error;
      res.json(results);
    }
  );
});

app.post('/api/sectionheadfeedback', (req, res) => {
  const item = req.body;
  const query =
    'INSERT INTO emails (`Comments`, `Feedback`, `DateofFeedback`, `SubmissionNumber`,`Form`, `FormLink`,`activeCode`, `SectionHeadName`,`EvaluatorName`,`updated`,`flags`) VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?)';

  connection.query(
    query,
    [
      item.Comments,
      item.Feedback,
      item.DateofFeedback == '' ? null : item.DateofFeedback,
      item.SubmissionNumber,
      item.Form,
      item.FormLink,
      item.activeCode,
      item.SectionHeadName,
      item.EvaluatorName,
      item.updated,
      item.flags,
    ],
    (error, results, fields) => {
      if (error) console.log(error);
      res.json(results);
    }
  );
});

app.put('/api/sectionheadfeedback/:id', (req, res) => {
  const id = req.params.id;
  const {
    Comments,
    Feedback,
    DateofFeedback,
    SubmissionNumber,
    Form,
    FormLink,
    activeCode,
    SectionHeadName,
    EvaluatorName,
    updated,
    flags,
  } = req.body;

  connection.query(
    'UPDATE emails SET `Comments` = ?, `Feedback` = ?, `DateofFeedback` = ?, `SubmissionNumber` = ?,`Form`=?, `FormLink` = ?,`activeCode`=?, `SectionHeadName`= ? , `EvaluatorName`=?,`updated`=?,`flags`=? WHERE id = ?',
    [
      Comments,
      Feedback,
      DateofFeedback,
      SubmissionNumber,
      Form,
      FormLink,
      activeCode,
      SectionHeadName,
      EvaluatorName,
      updated,
      flags,
      id,
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .send({ error: 'Unable to update row in the database' });
      }
      console.log(`Row updated: ${this.changes}`);
      return res.status(200).send({ message: 'Row updated in the database' });
    }
  );
});

app.get('/api/data', (req, res) => {
  try {
    const query = 'SELECT * FROM `all_ald_section1`';
    connection.query(query, (error, results, fields) => {
      if (error) console.log(error);
      res.json(results);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: 'Server Error' });
  }
});

app.get('/api/data/:activeCode', (req, res) => {
  try {
    const activeCode = req.params.activeCode;
    const query = 'SELECT * FROM all_ald_section1 WHERE `Active Code` = ?';
    connection.query(query, [activeCode], (error, results, fields) => {
      if (error) console.log(error);
      res.json(results);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: 'Server Error' });
  }
});

app.get('/api/valuesection2/:submissionNumber', (req, res) => {
  try {
    const submissionNumber = req.params.submissionNumber;
    const query =
      'SELECT * FROM `value_section_2_key_value_considerations` WHERE `Submission_Number` = ?';
    connection.query(query, [submissionNumber], (error, results, fields) => {
      if (error) console.log(error);
      res.json(results);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: 'Server Error' });
  }
});

app.put('/api/data/:id', (req, res) => {
  try {
    const id = req.params['id'];
    const {
      'Anchor Submission Number': anchorSubmissionNumber,
      'ALD Report to Generate': aldReportToGenerate,
      'Active Code': activeCode,
      'Active Name': activeName,
      'Cluster Name': clusterName,
      'Related Submission Numbers': relatedSubmissionNumbers,
      'Submission Number': submissionNumber,
      'Initiation Date': initiationDate,
      'ALD Number': aldNumber,
      'Submission Category': submissionCategory,
      'Submission Type': submissionType,
      Level: level,
      'ALD created on': aldCreatedOn,
      'ALD Last Updated on': aldLastUpdatedOn,
      'ALD Approved on': aldApprovedOn,
      'ALD Approved By': aldApprovedBy,
      Evaluator: evaluator,
      USCs: uscs,
      'Purpose of Submission': purposeOfSubmission,
      'Additional Purpose of Submission Comments':
        additionalPurposeOfSubmissionComments,
      'Scoping Document Number': scopingDocumentNumber,
      'SMC BN1': smcBn1,
      'SMC BN1 Date': smcBn1Date,
      'SMC BN2': smcBn2,
      'SMC BN2 Date': smcBn2Date,
      'Proposed Decision Document Number': proposedDecisionDocumentNumber,
      'Final Decision Document Number': finalDecisionDocumentNumber,
      Outcome: outcome,
      'Aditional Outcome Reasons': aditionalOutcomeReasons,
      'Next Assessment Date': nextAssessmentDate,
      'ALD Required': aldRequired,
      'Program Activity': programActivity,
      'flag':flag
    } = req.body;

    connection.query(
      `UPDATE ALL_ALD_Section1 SET
      \`Anchor Submission Number\`=?,
        \`ALD Last Updated on\` = ?,
        \`ALD Approved on\` = ?,
        \`ALD Approved By\` = ?,
        \`Evaluator\` = ?,
        \`USCs\` = ?,
        \`Purpose of Submission\` = ?,
        \`Additional Purpose of Submission Comments\` = ?,
        \`Scoping Document Number\` = ?,
        \`SMC BN1\` = ?,
        \`SMC BN1 Date\` = ?,
        \`SMC BN2\` = ?,
        \`SMC BN2 Date\` = ?,
        \`Proposed Decision Document Number\` = ?,
        \`Final Decision Document Number\` = ?,
        \`Outcome\` = ?,
        \`Aditional Outcome Reasons\` = ?,
        \`Next Assessment Date\` = ?,
        \`ALD Required\` = ?,
        \`Program Activity\` = ?,
        \`flag\`=?
        WHERE \`Submission Number\` = ?`,
        // WHERE \`Submission Number\` = ? and \`ALD Report to Generate\` = ?`,
      [
        anchorSubmissionNumber,
        aldLastUpdatedOn == '' ? null : aldLastUpdatedOn,
        aldApprovedOn == '' ? null : aldApprovedOn,
        aldApprovedBy,
        evaluator,
        uscs,
        purposeOfSubmission,
        additionalPurposeOfSubmissionComments,
        scopingDocumentNumber,
        smcBn1,
        smcBn1Date == '' ? null : smcBn1Date,
        smcBn2,
        smcBn2Date == '' ? null : smcBn2Date,
        proposedDecisionDocumentNumber,
        finalDecisionDocumentNumber,
        outcome,
        aditionalOutcomeReasons,
        nextAssessmentDate == '' ? null : nextAssessmentDate,
        aldRequired,
        programActivity,
        flag,
        id,
      ],
      function (err) {
        if (err) {
          console.error(err.message);
          return res
            .status(500)
            .send({ error: 'Unable to update row in the database' });
        }
        console.log(`Row updated: ${this.changes}`);
        return res.status(200).send({ message: 'Row updated in the database' });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: 'Server Error' });
  }
});

app.post('/api/valuesection2', (req, res) => {
  try {
    const item = req.body;
    const query = `INSERT INTO value_section_2_key_value_considerations (Submission_Number, Reference_PMRA_Document_Numbers_Date, Reference_PMRA_Document_Numbers, Comments) VALUES (?, ?, ?, ?)`;

    connection.query(
      query,
      [
        item.submissionNumber,
        item.Reference_PMRA_Document_Numbers_Date,
        item.Reference_PMRA_Document_Numbers,
        item.Comments,
      ],
      (error, results, fields) => {
        if (error) console.log(error);
        res.json(results);
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: 'Server Error' });
  }
});

app.put('/api/valueSection2/:id', (req, res) => {
  try {
    const id = req.params.id;
    const {
      Reference_PMRA_Document_Numbers_Date,
      Reference_PMRA_Document_Numbers,
      Comments,
    } = req.body;

    connection.query(
      `UPDATE value_section_2_key_value_considerations SET
            Reference_PMRA_Document_Numbers_Date = ?,
            Reference_PMRA_Document_Numbers = ?,
            Comments = ?
            WHERE id = ?`,
      [
        Reference_PMRA_Document_Numbers_Date,
        Reference_PMRA_Document_Numbers,
        Comments,
        id,
      ],
      function (err) {
        if (err) {
          console.error(err.message);
          return res
            .status(500)
            .send({ error: 'Unable to update row in the database' });
        }
        console.log(`Row updated: ${this.changes}`);
        return res.status(200).send({ message: 'Row updated in the database' });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: 'Server Error' });
  }
});

app.delete('/api/valueSection2/:id', (req, res) => {
  try {
    const id = req.params.id;
    const sql = `delete from value_section_2_key_value_considerations where id = ?`;
    connection.query(sql, [id], (err, result) => {
      if (err) {
        res.status(500).send({ error: 'Error deleting item' });
      } else {
        res.status(200).send({ message: 'Item deleted successfully' });
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: 'Unable to delete row in the database' });
  }
});

app.get('/api/valuesection3/:submissionNumber', (req, res) => {
  try {
    const submissionNumber = req.params.submissionNumber;
    const query = `SELECT * FROM value_section_3_future_considerations WHERE Submission_Number = ?`;
    connection.query(query, [submissionNumber], (error, results, fields) => {
      if (error) console.log(error);
      res.json(results);
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .send({ error: 'Unable to fetch data from database' });
  }
});

app.post('/api/valuesection3', (req, res) => {
  try {
    const item = req.body;
    const query = `INSERT INTO value_section_3_future_considerations (Submission_Number, Study_Type, Document_Type, PMRA_Number, PMRA_System_Document_Location, Comments) VALUES (?, ?, ?, ?, ?, ?)`;

    connection.query(
      query,
      [
        item.submissionNumber,
        item.Study_Type,
        item.Document_Type,
        item.PMRA_Number,
        item.PMRA_System_Document_Location,
        item.Comments,
      ],
      (error, results, fields) => {
        if (error) console.log(error);
        res.json(results);
      }
    );
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .send({ error: 'Unable to insert data into database' });
  }
});

app.put('/api/valueSection3/:id', (req, res) => {
  try {
    const id = req.params.id;
    const {
      Study_Type,
      Document_Type,
      PMRA_Number,
      PMRA_System_Document_Location,
      Comments,
    } = req.body;

    connection.query(
      `UPDATE value_section_3_future_considerations SET
              Study_Type = ?,
              Document_Type = ?,
              PMRA_Number = ?,
              PMRA_System_Document_Location = ?,
              Comments = ?
              WHERE id = ?`,
      [
        Study_Type,
        Document_Type,
        PMRA_Number,
        PMRA_System_Document_Location,
        Comments,
        id,
      ],
      function (err) {
        if (err) {
          console.error(err.message);
          return res
            .status(500)
            .send({ error: 'Unable to update row in the database' });
        }
        console.log(`Row updated: ${this.changes}`);
        return res.status(200).send({ message: 'Row updated in the database' });
      }
    );
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: 'Unable to update data in database' });
  }
});

app.delete('/api/valueSection3/:id', (req, res) => {
  try {
    const id = req.params.id;
    const sql = `DELETE FROM value_section_3_future_considerations WHERE id = ?`;
    connection.query(sql, [id], (err, result) => {
      if (err) {
        res.status(500).send({ error: 'Error deleting item' });
      } else {
        res.status(200).send({ message: 'Item deleted successfully' });
      }
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .send({ error: 'Unable to delete data from database' });
  }
});

// Get all data for a specific submission number
app.get('/api/valuesection4/:submissionNumber', (req, res) => {
  const submissionNumber = req.params.submissionNumber;
  const query = `SELECT * FROM value_section_4_future_label_considerations WHERE Submission_Number = ?`;
  connection.query(query, [submissionNumber], (error, results, fields) => {
    if (error) console.log(error);
    res.json(results);
  });
});

// Add a new item to value section 4
app.post('/api/valuesection4', (req, res) => {
  const item = req.body;
  const query = `INSERT INTO value_section_4_future_label_considerations (Submission_Number, Registration_Number, Reference_PMRA_Document_Numbers, Comments) VALUES (?, ?, ?, ?)`;

  connection.query(
    query,
    [
      item.submissionNumber,
      item.Registration_Number,
      item.Reference_PMRA_Document_Numbers,
      item.Comments,
    ],
    (error, results, fields) => {
      if (error) console.log(error);
      res.json(results);
    }
  );
});

app.put('/api/valueSection4/:id', (req, res) => {
  const id = req.params.id;
  const { Registration_Number, Reference_PMRA_Document_Numbers, Comments } =
    req.body;

  connection.query(
    `UPDATE value_section_4_future_label_considerations SET Registration_Number = ?, Reference_PMRA_Document_Numbers = ?, Comments = ? WHERE id = ?`,
    [Registration_Number, Reference_PMRA_Document_Numbers, Comments, id],
    function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .send({ error: 'Unable to update row in the database' });
      }
      console.log(`Row updated: ${this.changes}`);
      return res.status(200).send({ message: 'Row updated in the database' });
    }
  );
});

app.delete('/api/valueSection4/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM value_section_4_future_label_considerations WHERE id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting item' });
    } else {
      res.status(200).send({ message: 'Item deleted successfully' });
    }
  });
});

app.get('/api/value/:submissionNumber', (req, res) => {
  const submissionNumber = req.params.submissionNumber;
  const query =
    'SELECT * FROM `all_ald_section1` WHERE `Submission Number` = ?';
  connection.query(query, [submissionNumber], (error, results, fields) => {
    if (error) console.log(error);
    res.json(results);
  });
});

//Environment methods//

app.get('/api/keydocsdata/:submissionNumber', (req, res) => {
  const submissionNumber = req.params.submissionNumber;
  const query =
    'SELECT * FROM `ead_ald_key_documents_table` WHERE `Submission Number` = ?';
  connection.query(query, [submissionNumber], (error, results, fields) => {
    if (error) console.log(error);
    res.json(results);
  });
});

app.post('/api/keydocsdata', (req, res) => {
  const item = req.body;
  const query =
    'INSERT INTO ead_ald_key_documents_table  (`Submission Number`, `Document Name`, `PMRA Number`, Comments) VALUES (?, ?, ?, ?)';

  connection.query(
    query,
    [
      item.Submission_Number,
      item.Document_Name,
      item.PMRA_Number,
      item.Comments,
    ],
    (error, results, fields) => {
      if (error) console.log(error);
      res.json(results);
    }
  );
});

app.put('/api/keydocsdata/:id', (req, res) => {
  const id = req.params.id;
  const { Document_Name, PMRA_Number, Comments } = req.body;

  connection.query(
    'UPDATE ead_ald_key_documents_table SET `Document Name` = ?,`PMRA Number` = ?,`Comments` = ? WHERE row_id = ?',
    [Document_Name, PMRA_Number, Comments, id],
    function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .send({ error: 'Unable to update row in the database' });
      }
      console.log(`Row updated: ${this.changes}`);
      return res.status(200).send({ message: 'Row updated in the database' });
    }
  );
});

app.delete('/api/keydocsdata/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM ead_ald_key_documents_table  WHERE row_id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting item' });
    } else {
      res.status(200).send({ message: 'Item deleted successfully' });
    }
  });
});

app.get('/api/section3to9data/:submissionNumber', (req, res) => {
  const submissionNumber = req.params.submissionNumber;
  const query =
    'SELECT * FROM `ead_ald_sections_3_to_9_table` WHERE `Submission Number` = ?';
  connection.query(query, [submissionNumber], (error, results, fields) => {
    if (error) console.log(error);
    res.json(results);
  });
});

app.post('/api/section3to9data', (req, res) => {
  const item = req.body;
  const query =
    'INSERT INTO ead_ald_sections_3_to_9_table (`Submission Number`, `Section Number`, `Section Name`, Description, `PMRA Number`, `Potential Flag`) VALUES (?, ?, ?, ?, ?, ?)';

  connection.query(
    query,
    [
      item.Submission_Number,
      item.Section_Number,
      item.Section_Name,
      item.Description,
      item.PMRA_Number,
      item.Potential_Flag,
    ],
    (error, results, fields) => {
      if (error) console.log(error);
      res.json(results);
    }
  );
});

app.put('/api/section3to9data/:id', (req, res) => {
  const id = req.params.id;
  const {
    Section_Number,
    Section_Name,
    Description,
    PMRA_Number,
    Potential_Flag,
  } = req.body;

  connection.query(
    'UPDATE ead_ald_sections_3_to_9_table SET `Section Number` = ?,`Section Name` = ?,`Description` = ?,`PMRA Number` = ?,`Potential Flag` = ? WHERE row_id = ?',
    [
      Section_Number,
      Section_Name,
      Description,
      PMRA_Number,
      Potential_Flag,
      id,
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .send({ error: 'Unable to update row in the database' });
      }
      console.log(`Row updated: ${this.changes}`);
      return res.status(200).send({ message: 'Row updated in the database' });
    }
  );
});

app.delete('/api/section3to9data/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM ead_ald_sections_3_to_9_table WHERE row_id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting item' });
    } else {
      res.status(200).send({ message: 'Item deleted successfully' });
    }
  });
});

//TOX Methods//

app.get('/api/toxsection21summarytable/:submissionNumber', (req, res) => {
  const submissionNumber = req.params.submissionNumber;
  const query =
    'SELECT * FROM `tox_section_2_1_summary_table` WHERE `Submission_Number` = ?';
  connection.query(query, [submissionNumber], (error, results, fields) => {
    if (error) console.log(error);
    res.json(results);
  });
});

app.post('/api/toxsection21summarytable', (req, res) => {
  const item = req.body;
  const query =
    'INSERT INTO tox_section_2_1_summary_table (`Submission_Number`, `CAS_Number`, `Exposure_Scenario`, `Exposure_Scenario_Subtype`, `Study`, `Point_of_Departure_and_End_Point`, `CAF_or_Target_MOE`, `Reference_Document`, `PMRA_Number`, `Arfd_Value`, `ARfD_Unit`, `Actual_End_date`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(
    query,
    [
      item.Submission_Number,
      item.CAS_Number,
      item.Exposure_Scenario,
      item.Exposure_Scenario_Subtype,
      item.Study,
      item.Point_of_Departure_and_End_Point,
      item.CAF_or_Target_MOE,
      item.Reference_Document,
      item.PMRA_Number,
      item.ARfD_Value,
      item.ARfD_Unit,
      item.Actual_End_Date,
    ],
    (error, results, fields) => {
      if (error) console.log(error);
      res.json(results);
    }
  );
});

app.put('/api/toxsection21summarytable/:id', (req, res) => {
  const id = req.params.id;
  const {
    CAS_Number,
    Exposure_Scenario,
    Exposure_Scenario_Subtype,
    Study,
    Point_of_Departure_and_End_Point,
    CAF_or_Target_MOE,
    Reference_Document,
    PMRA_Number,
    ARfD_Value,
    ARfD_Unit,
    Actual_End_Date,
  } = req.body;

  connection.query(
    'UPDATE tox_section_2_1_summary_table SET `CAS_Number` = ?,`Exposure_Scenario` = ?,`Exposure_Scenario_Subtype` = ?,`Study` = ?,`Point_of_Departure_and_End_Point` = ?,`CAF_or_Target_MOE` = ?,`Reference_Document` = ?,`PMRA_Number` = ?,`Arfd_Value` = ?,`ARfD_Unit` = ?,`Actual_End_Date` = ? WHERE row_id = ?',
    [
      CAS_Number,
      Exposure_Scenario,
      Exposure_Scenario_Subtype,
      Study,
      Point_of_Departure_and_End_Point,
      CAF_or_Target_MOE,
      Reference_Document,
      PMRA_Number,
      ARfD_Value,
      ARfD_Unit,
      Actual_End_Date,
      id,
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .send({ error: 'Unable to update row in the database' });
      }
      console.log(`Row updated: ${this.changes}`);
      return res.status(200).send({ message: 'Row updated in the database' });
    }
  );
});

app.delete('/api/toxsection21summarytable/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM tox_section_2_1_summary_table WHERE row_id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting item' });
    } else {
      res.status(200).send({ message: 'Item deleted successfully' });
    }
  });
});

app.get('/api/toxsection5data/:submissionNumber', (req, res) => {
  const submissionNumber = req.params.submissionNumber;
  const query =
    'SELECT * FROM `tox_section_5_table` WHERE `Submission_Number` = ?';
  connection.query(query, [submissionNumber], (error, results, fields) => {
    if (error) console.log(error);
    res.json(results);
  });
});

app.post('/api/toxsection5data', (req, res) => {
  const item = req.body;
  const query =
    'INSERT INTO tox_section_5_table (`Submission_Number`, `PMRA_Number_of_the_Record_of_Residue_Definition_Decision`, `List_of_Metabolites`, `PMRA_Number`, `Category`) VALUES (?, ?, ?, ?,?)';

  connection.query(
    query,
    [
      item.Submission_Number,
      item.PMRA_Number_of_the_Record_of_Residue_Definition_Decision,
      item.List_of_Metabolites,
      item.PMRA_Number,
      item.Category,
    ],
    (error, results, fields) => {
      if (error) console.log(error);
      res.json(results);
    }
  );
});

app.put('/api/toxsection5data/:id', (req, res) => {
  const id = req.params.id;
  const {
    PMRA_Number_of_the_Record_of_Residue_Definition_Decision,
    List_of_Metabolites,
    PMRA_Number,
    Category,
  } = req.body;

  connection.query(
    'UPDATE tox_section_5_table SET `PMRA_Number_of_the_Record_of_Residue_Definition_Decision` = ?, `List_of_Metabolites` = ?, `PMRA_Number` = ?, `Category`=? WHERE row_id = ?',
    [
      PMRA_Number_of_the_Record_of_Residue_Definition_Decision,
      List_of_Metabolites,
      PMRA_Number,
      Category,
      id,
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .send({ error: 'Unable to update row in the database' });
      }
      console.log(`Row updated: ${this.changes}`);
      return res.status(200).send({ message: 'Row updated in the database' });
    }
  );
});

app.delete('/api/toxsection5data/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM tox_section_5_table WHERE row_id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting item' });
    } else {
      res.status(200).send({ message: 'Item deleted successfully' });
    }
  });
});

app.get('/api/toxsections22232434data/:submissionNumber', (req, res) => {
  const submissionNumber = req.params.submissionNumber;
  const query =
    'SELECT * FROM `tox_sections_22_23_24_3_4_table` WHERE `Submission_Number` = ?';
  connection.query(query, [submissionNumber], (error, results, fields) => {
    if (error) console.log(error);
    res.json(results);
  });
});

app.post('/api/toxsections22232434data', (req, res) => {
  const item = req.body;
  const query =
    'INSERT INTO tox_sections_22_23_24_3_4_table (`Submission_Number`, `Section_Number`, `PCPA_Factor_Characterized`, `Cumulative_Risk_Assessment_Required_Flag`, `Cumulative_Risk_Assessment_Status`, `Date`, `Name_of_Reference_Document`, `Reference_Document_Table_of_Content_Reference`, `PMRA_Number`, `Comments`, `Reference_TOX_Review`, `Database_Completion_Comments`, `Tier_1_Studies_Comment`, `Reference_Dose_Submission_Number`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  connection.query(
    query,
    [
      item.Submission_Number,
      item.Section_Number,
      item.PCPA_Factor_Characterized,
      item.Cumulative_Risk_Assessment_Required_Flag,
      item.Cumulative_Risk_Assessment_Status == ''
        ? 'Not required'
        : item.Cumulative_Risk_Assessment_Status,
      item.Date,
      item.Name_of_Reference_Document,
      item.Reference_Document_Table_of_Content_Reference,
      item.PMRA_Number,
      item.Comments,
      item.Reference_TOX_Review,
      item.Database_Completion_Comments,
      item.Tier_1_Studies_Comment,
      item.Reference_Dose_Submission_Number,
    ],
    (error, results, fields) => {
      if (error) console.log(error);
      res.json(results);
    }
  );
});

app.put('/api/toxsections22232434data/:id', (req, res) => {
  const id = req.params.id;
  const {
    Submission_Number,
    Section_Number,
    PCPA_Factor_Characterized,
    Cumulative_Risk_Assessment_Required_Flag,
    Cumulative_Risk_Assessment_Status,
    Date,
    Name_of_Reference_Document,
    Reference_Document_Table_of_Content_Reference,
    PMRA_Number,
    Comments,
    Reference_TOX_Review,
    Database_Completion_Comments,
    Tier_1_Studies_Comment,
    Reference_Dose_Submission_Number,
  } = req.body;

  connection.query(
    'UPDATE tox_sections_22_23_24_3_4_table SET `Submission_Number` = ?, `Section_Number` = ?, `PCPA_Factor_Characterized` = ?, `Cumulative_Risk_Assessment_Required_Flag` = ?, `Cumulative_Risk_Assessment_Status` = ?, `Date` = ?, `Name_of_Reference_Document` = ?, `Reference_Document_Table_of_Content_Reference` = ?, `PMRA_Number` = ?, `Comments` = ?, `Reference_TOX_Review` = ?, `Database_Completion_Comments` = ?, `Tier_1_Studies_Comment` = ?, `Reference_Dose_Submission_Number` = ? WHERE row_id = ?',
    [
      Submission_Number,
      Section_Number,
      PCPA_Factor_Characterized,
      Cumulative_Risk_Assessment_Required_Flag,
      Cumulative_Risk_Assessment_Status,
      Date,
      Name_of_Reference_Document,
      Reference_Document_Table_of_Content_Reference,
      PMRA_Number,
      Comments,
      Reference_TOX_Review,
      Database_Completion_Comments,
      Tier_1_Studies_Comment,
      Reference_Dose_Submission_Number,
      id,
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .send({ error: 'Unable to update row in the database' });
      }
      console.log(`Row updated: ${this.changes}`);
      return res.status(200).send({ message: 'Row updated in the database' });
    }
  );
});

app.delete('/api/toxsections22232434data/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM tox_sections_22_23_24_3_4_table WHERE row_id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting item' });
    } else {
      res.status(200).send({ message: 'Item deleted successfully' });
    }
  });
});

app.get('/api/toxsection6data/:submissionNumber', (req, res) => {
  const submissionNumber = req.params.submissionNumber;
  const query =
    'SELECT * FROM `tox_section_6_table` WHERE `Submission_Number` = ?';
  connection.query(query, [submissionNumber], (error, results, fields) => {
    if (error) console.log(error);
    res.json(results);
  });
});

app.post('/api/toxsection6data', (req, res) => {
  const item = req.body;
  const query =
    'INSERT INTO tox_section_6_table (`Submission_Number`, `Subsection_Number`, `Impurity_Contaminant_Name`, `Use_Site_Categories`, `Acceptable_Level`, `PMRA_Number`, `Name_of_Reference_Document`, `Comments`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  connection.query(
    query,
    [
      item.Submission_Number,
      item.Subsection_Number,
      item.Impurity_Contaminant_Name,
      item.Use_Site_Categories,
      item.Acceptable_Level,
      item.PMRA_Number,
      item.Name_of_Reference_Document,
      item.Comments,
    ],
    (error, results, fields) => {
      if (error) console.log(error);
      res.json(results);
    }
  );
});

app.put('/api/toxsection6data/:id', (req, res) => {
  const id = req.params.id;
  const {
    Subsection_Number,
    Impurity_Contaminant_Name,
    Use_Site_Categories,
    Acceptable_Level,
    PMRA_Number,
    Name_of_Reference_Document,
    Comments,
  } = req.body;

  connection.query(
    'UPDATE tox_section_6_table SET `Subsection_Number` = ?, `Impurity_Contaminant_Name` = ?, `Use_Site_Categories` = ?, `Acceptable_Level` = ?, `PMRA_Number` = ?, `Name_of_Reference_Document` = ?, `Comments` = ? WHERE row_id = ?',
    [
      Subsection_Number,
      Impurity_Contaminant_Name,
      Use_Site_Categories,
      Acceptable_Level,
      PMRA_Number,
      Name_of_Reference_Document,
      Comments,
      id,
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .send({ error: 'Unable to update row in the database' });
      }
      console.log(`Row updated: ${this.changes}`);
      return res.status(200).send({ message: 'Row updated in the database' });
    }
  );
});

app.delete('/api/toxsection6data/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM tox_section_6_table WHERE row_id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting item' });
    } else {
      res.status(200).send({ message: 'Item deleted successfully' });
    }
  });
});

app.get('/api/toxsection7data/:submissionNumber', (req, res) => {
  const submissionNumber = req.params.submissionNumber;
  const query =
    'SELECT * FROM `tox_section_7_table` WHERE `Submission_Number` = ?';
  connection.query(query, [submissionNumber], (error, results, fields) => {
    if (error) console.log(error);
    res.json(results);
  });
});

app.post('/api/toxsection7data', (req, res) => {
  const item = req.body;
  const query =
    'INSERT INTO tox_section_7_table (`Submission_Number`, `Subsection_Number`, `Document_Type`, `Date`, `PMRA_Number`, `Registration_Number`, `Comments`) VALUES (?, ?, ?, ?, ?, ?, ?)';

  connection.query(
    query,
    [
      item['Submission_Number'],
      item['Subsection_Number'],
      item['Document_Type'],
      item['Date'],
      item['PMRA_Number'],
      item['Registration_Number'] == '' ? null : item['Registration_Number'],
      item['Comments'],
    ],
    (error, results, fields) => {
      if (error) console.log(error);
      res.json(results);
    }
  );
});

app.put('/api/toxsection7data/:id', (req, res) => {
  const id = req.params.id;
  const {
    Subsection_Number: Subsection_Number,
    Document_Type: Document_Type,
    Date,
    PMRA_Number: PMRA_Number,
    Registration_Number: Registration_Number,
    Comments,
  } = req.body;

  connection.query(
    'UPDATE tox_section_7_table SET `Subsection_Number` = ?, `Document_Type` = ?, `Date` = ?, `PMRA_Number` = ?, `Registration_Number` = ?, `Comments` = ? WHERE row_id = ?',
    [
      Subsection_Number,
      Document_Type,
      Date,
      PMRA_Number,
      Registration_Number,
      Comments,
      id,
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .send({ error: 'Unable to update row in the database' });
      }
      console.log(`Row updated: ${this.changes}`);
      return res.status(200).send({ message: 'Row updated in the database' });
    }
  );
});

app.delete('/api/toxsection7data/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM tox_section_7_table WHERE row_id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting item' });
    } else {
      res.status(200).send({ message: 'Item deleted successfully' });
    }
  });
});

app.get('/api/toxsection8data/:submissionNumber', (req, res) => {
  const submissionNumber = req.params.submissionNumber;
  const query =
    'SELECT * FROM `tox_section_8_table` WHERE `Submission_Number` = ?';
  connection.query(query, [submissionNumber], (error, results, fields) => {
    if (error) console.log(error);
    res.json(results);
  });
});

app.post('/api/toxsection8data', (req, res) => {
  const item = req.body;
  const query =
    'INSERT INTO tox_section_8_table (`Submission_Number`, `Evaluator`, `Date`, `Comments`, `Reference_PMRA_Document_Number`, `PMRA_Number`) VALUES (?, ?, ?, ?, ?, ?)';

  connection.query(
    query,
    [
      item.Submission_Number,
      item.Evaluator,
      item.Date,
      item.Comments,
      item.Reference_PMRA_Document_Number,
      item.PMRA_Number,
    ],
    (error, results, fields) => {
      if (error) console.log(error);
      res.json(results);
    }
  );
});

app.put('/api/toxsection8data/:id', (req, res) => {
  const id = req.params.id;
  const {
    Evaluator,
    Date,
    Comments,
    Reference_PMRA_Document_Number,
    PMRA_Number,
  } = req.body;

  connection.query(
    'UPDATE tox_section_8_table SET `Evaluator` = ?, `Date` = ?, `Comments` = ?, `Reference_PMRA_Document_Number` = ?, `PMRA_Number` = ? WHERE row_id = ?',
    [
      Evaluator,
      Date,
      Comments,
      Reference_PMRA_Document_Number,
      PMRA_Number,
      id,
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .send({ error: 'Unable to update row in the database' });
      }
      console.log(`Row updated: ${this.changes}`);
      return res.status(200).send({ message: 'Row updated in the database' });
    }
  );
});

app.delete('/api/toxsection8data/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM tox_section_8_table WHERE row_id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting item' });
    } else {
      res.status(200).send({ message: 'Item deleted successfully' });
    }
  });
});

// Get all rows for a submission number
app.get('/api/toxsection9data/:submissionNumber', (req, res) => {
  const submissionNumber = req.params.submissionNumber;
  const query =
    'SELECT * FROM `tox_section_9_table` WHERE `Submission_Number` = ?';
  connection.query(query, [submissionNumber], (error, results, fields) => {
    if (error) console.log(error);
    res.json(results);
  });
});

// Add a new row
app.post('/api/toxsection9data', (req, res) => {
  const item = req.body;
  const query =
    'INSERT INTO tox_section_9_table (`Submission_Number`, `row_id`, `Subsection_Name`, `Study_Type`, `Document_Type`, `PMRA_Number`, `Document_Reference`, `Comments`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  connection.query(
    query,
    [
      item.Submission_Number,
      item.row_id,
      item.Subsection_Name,
      item.Study_Type,
      item.Document_Type,
      item.PMRA_Number,
      item.Document_Reference,
      item.Comments,
    ],
    (error, results, fields) => {
      if (error) console.log(error);
      res.json(results);
    }
  );
});

// Update a row
app.put('/api/toxsection9data/:id', (req, res) => {
  const id = req.params.id;
  const {
    Submission_Number,
    row_id,
    Subsection_Name,
    Study_Type,
    Document_Type,
    PMRA_Number,
    Document_Reference,
    Comments,
  } = req.body;

  connection.query(
    'UPDATE tox_section_9_table SET `Submission_Number` = ?, `row_id` = ?, `Subsection_Name` = ?, `Study_Type` = ?, `Document_Type` = ?, `PMRA_Number` = ?, `Document_Reference` = ?, `Comments` = ? WHERE row_id = ?',
    [
      Submission_Number,
      row_id,
      Subsection_Name,
      Study_Type,
      Document_Type,
      PMRA_Number,
      Document_Reference,
      Comments,
      id,
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .send({ error: 'Unable to update row in the database' });
      }
      console.log(`Row updated: ${this.changes}`);
      return res.status(200).send({ message: 'Row updated in the database' });
    }
  );
});

// DELETE endpoint to delete data from TOX_SECTION_9_Table based on row_id
app.delete('/api/toxsection9data/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM tox_section_9_table WHERE row_id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting item' });
    } else {
      res.status(200).send({ message: 'Item deleted successfully' });
    }
  });
});

app.get('/api/toxsection10data/:submissionNumber', (req, res) => {
  const submissionNumber = req.params.submissionNumber;
  const query =
    'SELECT * FROM `tox_section_10_table` WHERE `Submission_Number` = ?';
  connection.query(query, [submissionNumber], (error, results, fields) => {
    if (error) console.log(error);
    res.json(results);
  });
});

app.post('/api/toxsection10data', (req, res) => {
  const item = req.body;
  const query =
    'INSERT INTO tox_section_10_table (`Submission_Number`, `row_id`, `International_Organization`, `Document_Title`, `PMRA_Number`, `Date_of_Publication`) VALUES (?, ?, ?, ?, ?, ?)';

  connection.query(
    query,
    [
      item.Submission_Number,
      item.row_id,
      item.International_Organization,
      item.Document_Title,
      item.PMRA_Number,
      item.Date_of_Publication,
    ],
    (error, results, fields) => {
      if (error) console.log(error);
      res.json(results);
    }
  );
});

app.put('/api/toxsection10data/:id', (req, res) => {
  const id = req.params.id;
  const {
    row_id,
    International_Organization,
    Document_Title,
    PMRA_Number,
    Date_of_Publication,
  } = req.body;

  connection.query(
    'UPDATE tox_section_10_table SET `row_id` = ?, `International_Organization` = ?, `Document_Title` = ?, `PMRA_Number` = ?, `Date_of_Publication` = ? WHERE row_id = ?',
    [
      row_id,
      International_Organization,
      Document_Title,
      PMRA_Number,
      Date_of_Publication,
      id,
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .send({ error: 'Unable to update row in the database' });
      }
      console.log(`Row updated: ${this.changes}`);
      return res.status(200).send({ message: 'Row updated in the database' });
    }
  );
});

app.delete('/api/toxsection10data/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM tox_section_10_table WHERE row_id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting item' });
    } else {
      res.status(200).send({ message: 'Item deleted successfully' });
    }
  });
});

app.get('/api/toxsection11data/:submissionNumber', (req, res) => {
  const submissionNumber = req.params.submissionNumber;
  const query =
    'SELECT * FROM `tox_section_11_table` WHERE `Submission_Number` = ?';
  connection.query(query, [submissionNumber], (error, results, fields) => {
    if (error) console.log(error);
    res.json(results);
  });
});

app.post('/api/toxsection11data', (req, res) => {
  const item = req.body;
  const query =
    'INSERT INTO tox_section_11_table (`Submission_Number`, `row_id`, `Search_Conducted_By`, `Evaluator`, `Search_Conducted_Date`, `Search_String`, `PMRA_Number`, `Comments`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  connection.query(
    query,
    [
      item.Submission_Number,
      item.row_id,
      item.Search_Conducted_By,
      item.Evaluator,
      item.Search_Conducted_Date,
      item.Search_String,
      item.PMRA_Number,
      item.Comments,
    ],
    (error, results, fields) => {
      if (error) console.log(error);
      res.json(results);
    }
  );
});

app.put('/api/toxsection11data/:id', (req, res) => {
  const id = req.params.id;
  const {
    row_id,
    Search_Conducted_By,
    Evaluator,
    Search_Conducted_Date,
    Search_String,
    PMRA_Number,
    Comments,
  } = req.body;

  connection.query(
    'UPDATE tox_section_11_table SET `row_id` = ?, `Search_Conducted_By` = ?, `Evaluator` = ?, `Search_Conducted_Date` = ?, `Search_String` = ?, `PMRA_Number` = ?, `Comments` = ? WHERE row_id = ?',
    [
      row_id,
      Search_Conducted_By,
      Evaluator,
      Search_Conducted_Date,
      Search_String,
      PMRA_Number,
      Comments,
      id,
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .send({ error: 'Unable to update row in the database' });
      }
      console.log(`Row updated: ${this.changes}`);
      return res.status(200).send({ message: 'Row updated in the database' });
    }
  );
});

app.delete('/api/toxsection11data/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM tox_section_11_table WHERE row_id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting item' });
    } else {
      res.status(200).send({ message: 'Item deleted successfully' });
    }
  });
});

//General Info Table

app.get('/api/geninfosection2data/:submissionNumber', (req, res) => {
  const submissionNumber = req.params.submissionNumber;
  const query =
    'SELECT * FROM `geninfo_section_2_table` WHERE `Submission_Number` = ?';
  connection.query(query, [submissionNumber], (error, results, fields) => {
    //if (error) throw error;
    res.json(results);
  });
});

app.post('/api/geninfosection2data', (req, res) => {
  const item = req.body;
  const query =
    'INSERT INTO geninfo_section_2_table (`Submission_Number`, `row_id`, `Subsection_Name`, `Active_Code`, `Active_Name`, `CAS_Number`) VALUES (?, ?, ?, ?, ?, ?)';

  connection.query(
    query,
    [
      item.Submission_Number,
      item.row_id,
      item.Subsection_Name,
      item.Active_Code,
      item.Active_Name,
      item.CAS_Number,
    ],
    (error, results, fields) => {
      //if (error) throw error;
      res.json(results);
    }
  );
});

app.put('/api/geninfosection2data/:id', (req, res) => {
  const id = req.params.id;
  const { row_id, Subsection_Name, Active_Code, Active_Name, CAS_Number } =
    req.body;

  connection.query(
    'UPDATE geninfo_section_2_table SET `row_id` = ?, `Subsection_Name` = ?, `Active_Code` = ?, `Active_Name` = ?, `CAS_Number` = ? WHERE row_id = ?',
    [row_id, Subsection_Name, Active_Code, Active_Name, CAS_Number, id],
    function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .send({ error: 'Unable to update row in the database' });
      }
      console.log(`Row updated: ${this.changes}`);
      return res.status(200).send({ message: 'Row updated in the database' });
    }
  );
});

app.delete('/api/geninfosection2data/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM geninfo_section_2_table WHERE row_id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting item' });
    } else {
      res.status(200).send({ message: 'Item deleted successfully' });
    }
  });
});

app.get('/api/geninfosection3data/:submissionNumber', (req, res) => {
  const submissionNumber = req.params.submissionNumber;
  const query =
    'SELECT * FROM `geninfo_section_3_table` WHERE `Submission_Number` = ?';
  connection.query(query, [submissionNumber], (error, results, fields) => {
    //if (error) throw error;
    res.json(results);
  });
});

app.post('/api/geninfosection3data', (req, res) => {
  const item = req.body;
  const query =
    'INSERT INTO geninfo_section_3_table (`Submission_Number`, `row_id`, `Subsection_Name`, `First_Registered_Date`, `First_Registration_Submission_Number`, `First_Registration_Submission_Type`, `Registration_Number`, `Registration_Status`, `Associated_Publication_RDD`, `PMRA_Number_RDD`, `Date_of_SMC2_BN_for_RDD`, `Re_Evaluation_Status`, `Last_Status_Update_Date`, `Re_Evaluation_Submission_Number`, `Re_Evaluation_Submission_Category`, `Re_Evaluation_Submission_Type`, `Scoping_Document_PMRA_Number`, `Category`, `Associated_Publication_PRVD`, `PMRA_Number_PRVD`, `Date_of_SMC2_BN_for_PRVD`, `PMRA_Number_SMC2_PRVD`, `Associated_Publication_RVD`, `PMRA_Number_RVD`, `Date_of_SMC2_BN_for_RVD`, `PMRA_Number_SMC2_RVD`, `Special_Review_Status_Status`, `Special_Review_Last_Status_Update_Date`, `Special_Review_Submission_Number`, `Special_Review_Submission_Category`, `Special_Review_Submission_Type`, `Preliminary_Analysis_PMRA_Document_Number`, `ColTrigger`, `Associated_Publication_PSR`, `PMRA_Number_PSR`, `Date_of_SMC2_BN_for_PSR`, `PMRA_Number_SMC2_PSR`, `Associated_Publication_SRD`, `PMRA_Number_SRD`, `Date_of_SMC2_BN_for_SRD`, `PMRA_Number_SMC2_SRD`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  connection.query(
    query,
    [
      item.Submission_Number,
      item.row_id,
      item.Subsection_Name,
      item.First_Registered_Date == '' ? null : item.First_Registered_Date,
      item.First_Registration_Submission_Number,
      item.First_Registration_Submission_Type,
      item.Registration_Number == '' ? 0 : item.Registration_Number,
      item.Registration_Status == '' ? 'C' : item.Registration_Status,
      item.Associated_Publication_RDD,
      item.PMRA_Number_RDD == '' ? 0 : item.PMRA_Number_RDD,
      item.Date_of_SMC2_BN_for_RDD == '' ? null : item.Date_of_SMC2_BN_for_RDD,
      item.Re_Evaluation_Status,
      item.Last_Status_Update_Date == '' ? null : item.Last_Status_Update_Date,
      item.Re_Evaluation_Submission_Number,
      item.Re_Evaluation_Submission_Category,
      item.Re_Evaluation_Submission_Type,
      item.Scoping_Document_PMRA_Number == ''
        ? 0
        : item.Scoping_Document_PMRA_Number,
      item.Category == '' ? 0 : item.Category,
      item.Associated_Publication_PRVD,
      item.PMRA_Number_PRVD == '' ? 0 : item.PMRA_Number_PRVD,
      item.Date_of_SMC2_BN_for_PRVD == ''
        ? null
        : item.Date_of_SMC2_BN_for_PRVD,
      item.PMRA_Number_SMC2_PRVD == '' ? 0 : item.PMRA_Number_SMC2_PRVD,
      item.Associated_Publication_RVD == ''
        ? null
        : item.Associated_Publication_RVD,
      item.PMRA_Number_RVD == '' ? 0 : item.PMRA_Number_PRVD,
      item.Date_of_SMC2_BN_for_RVD == '' ? null : item.Date_of_SMC2_BN_for_RVD,
      item.PMRA_Number_SMC2_RVD == '' ? 0 : item.PMRA_Number_SMC2_RVD,
      item.Special_Review_Status,
      item.Special_Review_Last_Status_Update_Date == ''
        ? null
        : item.Special_Review_Last_Status_Update_Date,
      item.Special_Review_Submission_Number,
      item.Special_Review_Submission_Category,
      item.Special_Review_Submission_Type,
      item.Preliminary_Analysis_PMRA_Document_Number == ''
        ? 0
        : item.Preliminary_Analysis_PMRA_Document_Number,
      item.Trigger,
      item.Associated_Publication_PSR,
      item.PMRA_Number_PSR == '' ? 0 : item.PMRA_Number_PSR,
      item.Date_of_SMC2_BN_for_PSR == '' ? null : item.Date_of_SMC2_BN_for_PSR,
      item.PMRA_Number_SMC2_PSR == '' ? 0 : item.PMRA_Number_SMC2_PSR,
      item.Associated_Publication_SRD,
      item.PMRA_Number_SRD == '' ? 0 : item.PMRA_Number_SRD,
      item.Date_of_SMC2_BN_for_SRD == '' ? null : item.Date_of_SMC2_BN_for_SRD,
      item.PMRA_Number_SMC2_SRD == '' ? 0 : item.PMRA_Number_SMC2_SRD,
    ],
    (error, results, fields) => {
      //if (error) throw error;
      res.json(results);
    }
  );
});

app.put('/api/geninfosection3data/:id', (req, res) => {
  const id = req.params.id;
  const {
    Subsection_Name,
    First_Registered_Date,
    First_Registration_Submission_Number,
    First_Registration_Submission_Type,
    Registration_Number,
    Registration_Status,
    Associated_Publication_RDD,
    PMRA_Number_RDD,
    Date_of_SMC2_BN_for_RDD,
    Re_Evaluation_Status,
    Last_Status_Update_Date,
    Re_Evaluation_Submission_Number,
    Re_Evaluation_Submission_Category,
    Re_Evaluation_Submission_Type,
    Scoping_Document_PMRA_Number,
    Category,
    Associated_Publication_PRVD,
    PMRA_Number_PRVD,
    Date_of_SMC2_BN_for_PRVD,
    PMRA_Number_SMC2_PRVD,
    Associated_Publication_RVD,
    PMRA_Number_RVD,
    Date_of_SMC2_BN_for_RVD,
    PMRA_Number_SMC2_RVD,
    Special_Review_Status_Status,
    Special_Review_Last_Status_Update_Date,
    Special_Review_Submission_Number,
    Special_Review_Submission_Category,
    Special_Review_Submission_Type,
    Preliminary_Analysis_PMRA_Document_Number,
    Trigger,
    Associated_Publication_PSR,
    PMRA_Number_PSR,
    Date_of_SMC2_BN_for_PSR,
    PMRA_Number_SMC2_PSR,
    Associated_Publication_SRD,
    PMRA_Number_SRD,
    Date_of_SMC2_BN_for_SRD,
    PMRA_Number_SMC2_SRD,
    row_id,
  } = req.body;
  console.log('test' + req.body.First_Registration_Submission_Type);
  connection.query(
    `update geninfo_section_3_table set
      Subsection_Name=?, 
      First_Registered_Date=?, 
      First_Registration_Submission_Number=?,
      First_Registration_Submission_Type=?,
      Registration_Number=?,
      Registration_Status=?,
      Associated_Publication_RDD=?,
      PMRA_Number_RDD=?,
      Date_of_SMC2_BN_for_RDD=?,
      Re_Evaluation_Status=?,
      Last_Status_Update_Date=?,
      Re_Evaluation_Submission_Number=?,
      Re_Evaluation_Submission_Category=?,
      Re_Evaluation_Submission_Type=?,
      Scoping_Document_PMRA_Number=?,
      Category=?,
      Associated_Publication_PRVD=?,
      PMRA_Number_PRVD=?,
      Date_of_SMC2_BN_for_PRVD=?,
      PMRA_Number_SMC2_PRVD=?,
      Associated_Publication_RVD=?,
      PMRA_Number_RVD=?,
      Date_of_SMC2_BN_for_RVD=?,
      PMRA_Number_SMC2_RVD=?,
      Special_Review_Status_Status=?,
      Special_Review_Last_Status_Update_Date=?,
      Special_Review_Submission_Number=?,
      Special_Review_Submission_Category=?,
      Special_Review_Submission_Type=?,
      Preliminary_Analysis_PMRA_Document_Number=?,
      ColTrigger=?,
      Associated_Publication_PSR=?,
      PMRA_Number_PSR=?,
      Date_of_SMC2_BN_for_PSR=?,
      PMRA_Number_SMC2_PSR=?,
      Associated_Publication_SRD=?,
      PMRA_Number_SRD=?,
      Date_of_SMC2_BN_for_SRD=?,
      PMRA_Number_SMC2_SRD=?
      WHERE row_id = ?`,
    [
      Subsection_Name,
      First_Registered_Date==''?null:First_Registered_Date,
      First_Registration_Submission_Number,
      First_Registration_Submission_Type,
      Registration_Number,
      Registration_Status,
      Associated_Publication_RDD,
      PMRA_Number_RDD,
      Date_of_SMC2_BN_for_RDD==''?null:Date_of_SMC2_BN_for_RDD,
      Re_Evaluation_Status,
      Last_Status_Update_Date==''?null:Last_Status_Update_Date,
      Re_Evaluation_Submission_Number,
      Re_Evaluation_Submission_Category,
      Re_Evaluation_Submission_Type,
      Scoping_Document_PMRA_Number,
      Category,
      Associated_Publication_PRVD,
      PMRA_Number_PRVD,
      Date_of_SMC2_BN_for_PRVD==''?null:Date_of_SMC2_BN_for_PRVD,
      PMRA_Number_SMC2_PRVD,
      Associated_Publication_RVD,
      PMRA_Number_RVD,
      Date_of_SMC2_BN_for_RVD==''?null:Date_of_SMC2_BN_for_RVD,
      PMRA_Number_SMC2_RVD,
      Special_Review_Status_Status,
      Special_Review_Last_Status_Update_Date==''?null:Special_Review_Last_Status_Update_Date,
      Special_Review_Submission_Number,
      Special_Review_Submission_Category,
      Special_Review_Submission_Type,
      Preliminary_Analysis_PMRA_Document_Number,
      Trigger,
      Associated_Publication_PSR,
      PMRA_Number_PSR,
      Date_of_SMC2_BN_for_PSR==''?null:Date_of_SMC2_BN_for_PSR,
      PMRA_Number_SMC2_PSR,
      Associated_Publication_SRD,
      PMRA_Number_SRD,
      Date_of_SMC2_BN_for_SRD==''?null:Date_of_SMC2_BN_for_SRD,
      PMRA_Number_SMC2_SRD,
      row_id,
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .send({ error: 'Unable to update row in the database' });
      }
      console.log(`Row updated: ${this.changes}`);
      return res.status(200).send({ message: 'Row updated in the database' });
    }
  );
});

app.delete('/api/geninfosection3data/:id', (req, res) => {
  const id = req.params.id;
  const sql = `delete from geninfo_section_3_table where row_id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting item' });
    } else {
      res.status(200).send({ message: 'Item deleted successfully' });
    }
  });
});

app.get('/api/geninfotgairegistrantslist/:submissionNumber', (req, res) => {
  const submissionNumber = req.params.submissionNumber;
  const query =
    'select * from `geninfo_tgai_registrants_list_table` where `submission_number` = ?';
  connection.query(query, [submissionNumber], (error, results, fields) => {
    //if (error) throw error;
    res.json(results);
  });
});

app.post('/api/geninfotgairegistrantslist', (req, res) => {
  const item = req.body;
  const query =
    'INSERT INTO geninfo_tgai_registrants_list_table (`Submission_Number`, `Registrant_Name`, `Registrant_Assigned_Code`, `Registrant_Assigned_Number`, `Registration_Number`, `Date_First_Registered`, `Initial_Submission_Category`, `Initial_Submission_Type`, `USC_List`, `Registration_Status`, `Comments`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  connection.query(
    query,
    [
      item.Submission_Number,
      item.Registrant_Name,
      item.Registrant_Assigned_Code,
      item.Registrant_Assigned_Number,
      item.Registration_Number,
      item.Date_First_Registered==''?null:item.Date_First_Registered,
      item.Initial_Submission_Category,
      item.Initial_Submission_Type,
      item.USC_List,
      item.Registration_Status,
      item.Comments,
    ],
    (error, results, fields) => {
      //if (error) throw error;
      res.json(results);
    }
  );
});

app.put('/api/geninfotgairegistrantslist/:id', (req, res) => {
  const id = req.params.id;
  const {
    Registrant_Name,
    Registrant_Assigned_Code,
    Registrant_Assigned_Number,
    Registration_Number,
    Date_First_Registered,
    Initial_Submission_Category,
    Initial_Submission_Type,
    USC_List,
    Registration_Status,
    Comments,
    row_id,
  } = req.body;

  connection.query(
    'UPDATE geninfo_tgai_registrants_list_table SET `Registrant_Name` = ?, `Registrant_Assigned_Code` = ?, `Registrant_Assigned_Number` = ?, `Registration_Number` = ?, `Date_First_Registered` = ?, `Initial_Submission_Category` = ?, `Initial_Submission_Type` = ?, `USC_List` = ?, `Registration_Status` = ?, `Comments` = ? WHERE `row_id` = ?',
    [
      Registrant_Name,
      Registrant_Assigned_Code,
      Registrant_Assigned_Number,
      Registration_Number,
      Date_First_Registered==''?null:Date_First_Registered,
      Initial_Submission_Category,
      Initial_Submission_Type,
      USC_List,
      Registration_Status,
      Comments,
      row_id,
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .send({ error: 'Unable to update row in the database' });
      }
      console.log(`Row updated: ${this.changes}`);
      return res.status(200).send({ message: 'Row updated in the database' });
    }
  );
});

app.delete('/api/geninfotgairegistrantslist/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM geninfo_tgai_registrants_list_table WHERE \`row_id\` = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting item' });
    } else {
      res.status(200).send({ message: 'Item deleted successfully' });
    }
  });
});

app.get('/api/geninforegulatorstable/:submissionNumber', (req, res) => {
  const submissionNumber = req.params.submissionNumber;
  const query =
    'SELECT * FROM `geninfo_regulators_table` WHERE `Submission_Number` = ?';
  connection.query(query, [submissionNumber], (error, results, fields) => {
    //if (error) throw error;
    res.json(results);
  });
});

app.post('/api/geninforegulatorstable', (req, res) => {
  const item = req.body;
  const query =
    'INSERT INTO geninfo_regulators_table (`Submission_Number`, `Regulator`, `Status_of_Active_Ingredient`, `Status_date`, `Comments`) VALUES (?, ?, ?, ?, ?)';

  connection.query(
    query,
    [
      item.Submission_Number,
      item.Regulator,
      item.Status_of_Active_Ingredient,
      item.Status_date==''?null:item.Status_date,
      item.Comments,
    ],
    (error, results, fields) => {
      //if (error) throw error;
      res.json(results);
    }
  );
});

app.put('/api/geninforegulatorstable/:id', (req, res) => {
  const id = req.params.id;
  const { Regulator, Status_of_Active_Ingredient, Status_date, Comments } =
    req.body;

  connection.query(
    'UPDATE geninfo_regulators_table SET `Regulator` = ?, `Status_of_Active_Ingredient` = ?, `Status_date` = ?, `Comments` = ? WHERE row_id = ?',
    [Regulator, Status_of_Active_Ingredient, Status_date==''?null:Status_date, Comments, id],
    function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .send({ error: 'Unable to update row in the database' });
      }
      console.log(`Row updated: ${this.changes}`);
      return res.status(200).send({ message: 'Row updated in the database' });
    }
  );
});

app.delete('/api/geninforegulatorstable/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM geninfo_regulators_table WHERE row_id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting item' });
    } else {
      res.status(200).send({ message: 'Item deleted successfully' });
    }
  });
});

app.get('/api/geninfobackgrounddata/:submissionNumber', (req, res) => {
  const submissionNumber = req.params.submissionNumber;
  const query =
    'SELECT * FROM `geninfo_background_table` WHERE `Submission_Number` = ?';
  connection.query(query, [submissionNumber], (error, results, fields) => {
    //if (error) throw error;
    res.json(results);
  });
});

app.post('/api/geninfobackgrounddata', (req, res) => {
  const item = req.body;
  const query =
    'INSERT INTO geninfo_background_table (`Submission_Number`, `row_id`, `Subsection_Name`, `Subsection_ID`, `Conducted`, `Submission_Status_Level`, `Submission_Status_Activity`, `PMRA_Number`, `Purpose`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

  connection.query(
    query,
    [
      item.Submission_Number,
      item.row_id,
      item.Subsection_Name,
      item.Subsection_ID,
      item.Conducted,
      item.Submission_Status_Level,
      item.Submission_Status_Activity,
      item.PMRA_Number,
      item.Purpose,
    ],
    (error, results, fields) => {
      //if (error) throw error;
      res.json(results);
    }
  );
});

app.put('/api/geninfobackgrounddata/:id', (req, res) => {
  const id = req.params.id;
  const {
    row_id,
    Subsection_Name,
    Subsection_ID,
    Conducted,
    Submission_Status_Level,
    Submission_Status_Activity,
    PMRA_Number,
    Purpose,
  } = req.body;

  connection.query(
    'UPDATE geninfo_background_table SET `row_id` = ?, `Subsection_Name` = ?, `Subsection_ID` = ?, `Conducted` = ?, `Submission_Status_Level` = ?, `Submission_Status_Activity` = ?, `PMRA_Number` = ?, `Purpose` = ? WHERE row_id = ?',
    [
      row_id,
      Subsection_Name,
      Subsection_ID,
      Conducted,
      Submission_Status_Level,
      Submission_Status_Activity,
      PMRA_Number,
      Purpose,
      id,
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .send({ error: 'Unable to update row in the database' });
      }
      console.log(`Row updated: ${this.changes}`);
      return res.status(200).send({ message: 'Row updated in the database' });
    }
  );
});

app.delete('/api/geninfobackgrounddata/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM geninfo_background_table WHERE row_id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting item' });
    } else {
      res.status(200).send({ message: 'Item deleted successfully' });
    }
  });
});

app.get('/api/geninfoepmarketingdata/:submissionNumber', (req, res) => {
  const submissionNumber = req.params.submissionNumber;
  const query =
    'SELECT * FROM `geninfo_ep_marketing_table` WHERE `Submission_Number` = ?';
  connection.query(query, [submissionNumber], (error, results, fields) => {
    //if (error) throw error;
    res.json(results);
  });
});

app.post('/api/geninfoepmarketingdata', (req, res) => {
  const item = req.body;
  const query =
    'INSERT INTO geninfo_ep_marketing_table (`Submission_Number`, `Restrictions`, `Registration_Number`, `Product_Name`, `Historical`, `Current`, `From_Submission_Number`) VALUES (?, ?, ?, ?, ?, ?, ?)';

  connection.query(
    query,
    [
      item.Submission_Number,
      item.Restrictions,
      item.Registration_Number,
      item.Product_Name,
      item.Historical,
      item.Current,
      item.From_Submission_Number,
    ],
    (error, results, fields) => {
      //if (error) throw error;
      res.json(results);
    }
  );
});

app.put('/api/geninfoepmarketingdata/:id', (req, res) => {
  const id = req.params.id;
  const {
    Restrictions,
    Registration_Number,
    Product_Name,
    Historical,
    Current,
    From_Submission_Number,
    row_id,
  } = req.body;

  connection.query(
    'UPDATE geninfo_ep_marketing_table SET `Restrictions` = ?, `Registration_Number` = ?, `Product_Name` = ?, `Historical` = ?, `Current` = ?, `From_Submission_Number` = ? WHERE row_id = ?',
    [
      Restrictions,
      Registration_Number,
      Product_Name,
      Historical,
      Current,
      From_Submission_Number,
      row_id,
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .send({ error: 'Unable to update row in the database' });
      }
      console.log(`Row updated: ${this.changes}`);
      return res.status(200).send({ message: 'Row updated in the database' });
    }
  );
});

app.delete('/api/geninfoepmarketingdata/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM geninfo_ep_marketing_table WHERE Registration_Number = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting item' });
    } else {
      res.status(200).send({ message: 'Item deleted successfully' });
    }
  });
});

app.get(
  '/api/geninforoebcomplianceaudittrail/:submissionNumber',
  (req, res) => {
    const submissionNumber = req.params.submissionNumber;
    const query =
      'SELECT * FROM `geninfo_roeb_compliance_audit_trail_table` WHERE `Submission_Number` = ?';
    connection.query(query, [submissionNumber], (error, results, fields) => {
      //if (error) throw error;
      res.json(results);
    });
  }
);

app.post('/api/geninforoebcomplianceaudittrail', (req, res) => {
  const item = req.body;
  const query =
    'INSERT INTO geninfo_roeb_compliance_audit_trail_table (`Submission_Number`, `row_id`, `Sector`, `PCPA_Contravention`, `Date_Of_Reported_Contravention`, `Product_Description_At_Time_Of_Contravention`, `Corrective_Action_Taken`, `Compliance_Status_Of_Registrant_At_Time_Of_Contravention`, `Additional_Information`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

  connection.query(
    query,
    [
      item.Submission_Number,
      item.row_id,
      item.Sector,
      item.PCPA_Contravention,
      item.Date_Of_Reported_Contravention==''?null:item.Date_Of_Reported_Contravention,
      item.Product_Description,
      item.Corrective_Action_Taken,
      item.Compliance_Status,
      item.Additional_Information,
    ],
    (error, results, fields) => {
      //if (error) throw error;
      res.json(results);
    }
  );
});

app.put('/api/geninforoebcomplianceaudittrail/:id', (req, res) => {
  const id = req.params.id;
  const {
    row_id,
    Sector,
    PCPA_Contravention,
    Date_Of_Reported_Contravention,
    Product_Description,
    Corrective_Action_Taken,
    Compliance_Status,
    Additional_Information,
  } = req.body;

  connection.query(
    'UPDATE geninfo_roeb_compliance_audit_trail_table SET `row_id` = ?, `Sector` = ?, `PCPA_Contravention` = ?, `Date_Of_Reported_Contravention` = ?, `Product_Description_At_Time_Of_Contravention` = ?, `Corrective_Action_Taken` = ?, `Compliance_Status_Of_Registrant_At_Time_Of_Contravention` = ?, `Additional_Information` = ? WHERE row_id = ?',
    [
      row_id,
      Sector,
      PCPA_Contravention,
      Date_Of_Reported_Contravention==''?null:Date_Of_Reported_Contravention,
      Product_Description,
      Corrective_Action_Taken,
      Compliance_Status,
      Additional_Information,
      id,
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .send({ error: 'Unable to update row in the database' });
      }
      console.log(`Row updated: ${this.changes}`);
      return res.status(200).send({ message: 'Row updated in the database' });
    }
  );
});

app.delete('/api/geninforoebcomplianceaudittrail/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM geninfo_roeb_compliance_audit_trail_table WHERE row_id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting item' });
    } else {
      res.status(200).send({ message: 'Item deleted successfully' });
    }
  });
});

app.get('/api/geninfoinfolinetable/:submissionNumber', (req, res) => {
  const submissionNumber = req.params.submissionNumber;
  const query =
    'SELECT * FROM `geninfo_info_line_table` WHERE `Submission_Number` = ?';
  connection.query(query, [submissionNumber], (error, results, fields) => {
    //if (error) throw error;
    res.json(results);
  });
});

app.post('/api/geninfoinfolinetable', (req, res) => {
  const item = req.body;
  const query =
    'INSERT INTO geninfo_info_line_table (`Submission_Number`, `row_id`, `Date_Received`, `Comments_Received`) VALUES (?, ?, ?, ?)';

  connection.query(
    query,
    [
      item.Submission_Number,
      item.row_id,
      item.Date_Received==''?null:item.Date_Received,
      item.Comments_Received,
    ],
    (error, results, fields) => {
      //if (error) throw error;
      res.json(results);
    }
  );
});

app.put('/api/geninfoinfolinetable/:id', (req, res) => {
  const id = req.params.id;
  const { row_id, Date_Received, Comments_Received } = req.body;

  connection.query(
    'UPDATE geninfo_info_line_table SET `row_id` = ?, `Date_Received` = ?, `Comments_Received` = ? WHERE row_id = ?',
    [row_id, Date_Received==''?null:Date_Received, Comments_Received, id],
    function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .send({ error: 'Unable to update row in the database' });
      }
      console.log(`Row updated: ${this.changes}`);
      return res.status(200).send({ message: 'Row updated in the database' });
    }
  );
});

app.delete('/api/geninfoinfolinetable/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM geninfo_info_line_table WHERE row_id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting item' });
    } else {
      res.status(200).send({ message: 'Item deleted successfully' });
    }
  });
});

// GET request to retrieve all rows for a specific submission number
app.get(
  '/api/geninfotgaiepunfulfilledconditionstable/:submissionNumber',
  (req, res) => {
    const submissionNumber = req.params.submissionNumber;
    const query =
      'SELECT * FROM `geninfo_tgai_ep_unfulfilled_conditions_table` WHERE `Submission_Number` = ?';
    connection.query(query, [submissionNumber], (error, results, fields) => {
      //if (error) throw error;
      res.json(results);
    });
  }
);

// POST request to insert a new row
app.post('/api/geninfotgaiepunfulfilledconditionstable', (req, res) => {
  const item = req.body;
  const query =
    'INSERT INTO geninfo_tgai_ep_unfulfilled_conditions_table (`Submission_Number`, `row_id`, `State`, `TGAI_EP_MA`, `Registration_Number`, `PMRA_Number`, `Due_date`, `DACO_Number`, `Unfulfilled_Requirements`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

  connection.query(
    query,
    [
      item.Submission_Number,
      item.row_id,
      item.State,
      item.TGAI_EP_MA,
      item.Registration_Number,
      item.PMRA_Number,
      item.Due_date==''?null:item.Due_date,
      item.DACO_Number,
      item.Unfulfilled_Requirements,
    ],
    (error, results, fields) => {
      //if (error) throw error;
      res.json(results);
    }
  );
});

// PUT request to update a row by ID
app.put('/api/geninfotgaiepunfulfilledconditionstable/:id', (req, res) => {
  const id = req.params.id;
  const {
    State,
    TGAI_EP_MA,
    Registration_Number,
    PMRA_Number,
    Due_date,
    DACO_Number,
    Unfulfilled_Requirements,
  } = req.body;

  connection.query(
    'UPDATE geninfo_tgai_ep_unfulfilled_conditions_table SET `State` = ?, `TGAI_EP_MA` = ?, `Registration_Number` = ?, `PMRA_Number` = ?, `Due_date` = ?, `DACO_Number` = ?, `Unfulfilled_Requirements` = ? WHERE row_id = ?',
    [
      State,
      TGAI_EP_MA,
      Registration_Number,
      PMRA_Number,
      Due_date==''?null:Due_date,
      DACO_Number,
      Unfulfilled_Requirements,
      id,
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .send({ error: 'Unable to update row in the database' });
      }
      console.log(`Row updated: ${this.changes}`);
      return res.status(200).send({ message: 'Row updated in the database' });
    }
  );
});

// DELETE request to delete a row by ID
app.delete('/api/geninfotgaiepunfulfilledconditionstable/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM geninfo_tgai_ep_unfulfilled_conditions_table WHERE row_id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting item' });
    } else {
      res.status(200).send({ message: 'Item deleted successfully' });
    }
  });
});

// GET request to retrieve all rows for a specific submission number
app.get('/api/geninfoscienceteamaldstable/:submissionNumber', (req, res) => {
  const submissionNumber = req.params.submissionNumber;
  const query =
    'SELECT * FROM `geninfo_science_team_alds_table` WHERE `Submission_Number` = ?';
  connection.query(query, [submissionNumber], (error, results, fields) => {
    //if (error) throw error;
    res.json(results);
  });
});

// POST request to insert a new row
app.post('/api/geninfoscienceteamaldstable', (req, res) => {
  const item = req.body;
  const query =
    'INSERT INTO geninfo_science_team_alds_table (`Submission_Number`, `row_id`, `TOX`, `TOX_Details`, `Dietary`, `Dietary_Details`, `Occupational`, `Occupational_Details`, `IRP`, `IRP_Details`, `RRS`, `RRS_Details`, `EAD`, `EAD_Details`, `EAD-WM`, `EAD_WM_Details`, `VALUE`, `VALUE_Details`, `CES`, `CES_Details`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  connection.query(
    query,
    [
      item.Submission_Number,
      item.row_id,
      item.TOX,
      item.TOX_Details,
      item.Dietary,
      item.Dietary_Details,
      item.Occupational,
      item.Occupational_Details,
      item.IRP,
      item.IRP_Details,
      item.RRS,
      item.RRS_Details,
      item.EAD,
      item.EAD_Details,
      item.EAD_WM,
      item.EAD_WM_Details,
      item.VALUE,
      item.VALUE_Details,
      item.CES,
      item.CES_Details,
    ],
    (error, results, fields) => {
      //if (error) throw error;
      res.json(results);
    }
  );
});

// PUT request to update a row by ID
app.put('/api/geninfoscienceteamaldstable/:id', (req, res) => {
  const id = req.params.id;
  const {
    TOX,
    TOX_Details,
    Dietary,
    Dietary_Details,
    Occupational,
    Occupational_Details,
    IRP,
    IRP_Details,
    RRS,
    RRS_Details,
    EAD,
    EAD_Details,
    EAD_WM,
    EAD_WM_Details,
    VALUE,
    VALUE_Details,
    CES,
    CES_Details,
  } = req.body;

  const query =
    'UPDATE geninfo_science_team_alds_table SET `TOX` = ?, `TOX_Details` = ?, `Dietary` = ?, `Dietary_Details` = ?, `Occupational` = ?, `Occupational_Details` = ?, `IRP` = ?, `IRP_Details` = ?, `RRS` = ?, `RRS_Details` = ?, `EAD` = ?, `EAD_Details` = ?, `EAD-WM` = ?, `EAD_WM_Details` = ?, `VALUE` = ?, `VALUE_Details` = ?, `CES` = ?, `CES_Details` = ? WHERE `row_id` = ?';
  connection.query(
    query,
    [
      TOX,
      TOX_Details,
      Dietary,
      Dietary_Details,
      Occupational,
      Occupational_Details,
      IRP,
      IRP_Details,
      RRS,
      RRS_Details,
      EAD,
      EAD_Details,
      EAD_WM,
      EAD_WM_Details,
      VALUE,
      VALUE_Details,
      CES,
      CES_Details,
      id,
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .send({ error: 'Unable to update row in the database' });
      }
      console.log(`Row updated: ${this.changes}`);
      return res.status(200).send({ message: 'Row updated in the database' });
    }
  );
});

// DELETE request to delete a row by ID
app.delete('/api/geninfoscienceteamaldstable/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM geninfo_science_team_alds_table WHERE row_id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Error deleting item' });
    } else {
      res.status(200).send({ message: 'Item deleted successfully' });
    }
  });
});


//      key: fs.readFileSync("../../../../aldprototype.key"),
//      cert: fs.readFileSync("../../../../aldprototype.crt"),

https
  .createServer(
    {
      key: fs.readFileSync("C:/ALDPrototype/ald/apps/demo/src/app/home/aldadmin/aldprototype.key"),
      cert: fs.readFileSync("C:/ALDPrototype/ald/apps/demo/src/app/home/aldadmin/aldprototype.crt"),
    },
    app
  )
  .listen(3000, () => {
    console.log("server is runing at port 3000");
});

//Start the server
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });
