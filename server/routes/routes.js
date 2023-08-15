const express = require('express');
const router = express.Router();
const pool = require("../db.js");

/* Routes */

// ADD A LISTING
router.post("/listing", (req, res) => {
    try {
        const { listing_id, company_name, position_title, date_applied, job_status, job_link, user_id } = req.body;
 
        pool.query(`INSERT INTO joblistings (listing_id, company_name, position_title, date_applied, job_status, job_link, user_id) 
                    VALUES ('${listing_id}', '${company_name}','${position_title}','${date_applied}', '${job_status}', '${job_link}', '${user_id}')`);

    } catch (err) {
        console.log(err.message);
    }
 
});

// GET ALL LISTINGS (we are using post request because we want to send in a body)
router.post("/getListing", (req, res) => {
   try {
        const { userId } = req.body;

        pool.query("SELECT * FROM joblistings WHERE user_id = $1", [userId], (err, response) => {
            res.json(response.rows);
        })
   }
   catch (err) {
        console.log(err.message)
   }
});

// EDIT A LISTING
router.put('/listing/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { company_name, position_title, date_applied, job_status, job_link } = req.body;
 
        pool.query('UPDATE joblistings SET company_name = $1, position_title = $2, date_applied = $3, job_status = $4, job_link = $5 WHERE listing_id = $6', [company_name, position_title, date_applied, job_status, job_link, id]);
 
    } catch (err) {
        console.log(err.message);
    }
 });
 

// DELETE A LISTING
router.delete('/listing/:id', (req, res) => {
    try {
        const { id } = req.params;

        pool.query('DELETE FROM joblistings WHERE listing_id = $1', [id]);

    } catch (err) {
        console.log(err.message)
    }
 })

 // GET NUMBER OF JOB STATUSES
 router.post('/getJobStatusNum', (req, res) => {
    try {
        const { listings } = req.body;

        let jobStatusNums = {
            numberOfPending: 0,
            numberOfHired: 0,
            numberOfRejected: 0
        };

        for (let i = 0; i < listings.length; i++) {
            if (listings[i].job_status === "Pending") {
               jobStatusNums = {...jobStatusNums, numberOfPending: jobStatusNums.numberOfPending += 1};
            }
            else if (listings[i].job_status === "Hired")  jobStatusNums = {...jobStatusNums, numberOfHired: jobStatusNums.numberOfHired += 1};
            else jobStatusNums = {...jobStatusNums, numberOfRejected: jobStatusNums.numberOfRejected += 1};
        }

        res.json(jobStatusNums);

    } catch (err) {
        console.log(err);
    }
 });

 module.exports = router;