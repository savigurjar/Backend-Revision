const Problem = require("../models/Problem")
const { getlanguageById, submitBatch, submitToken } = require("../utils/problemUtility")

const createProblem = async (req, res) => {
    const { title, tags, difficulty, constraints, examples, startCode, referenceSolution, visibleTestCases, hiddenTestCases, createdBy } = req.body;


    try {

        for (const { language, completeCode } of referenceSolution) {
            const languageId = getlanguageById(language)


            // source_code:
            // language_id:
            // stdin: 
            // expected_output:
            const submission = visibleTestCases.map((testcases) => ({
                source_code: completeCode,
                language_id: languageId,
                stdin: testcases.input,
                expected_output: testcases.output
            }));

            // Submit batch to Judge0
            const submitResult = await submitBatch(submission);
            const resultTokens = submitResult.map((value) => value.token);

            // Fetch results
            const testResults = await submitToken(resultTokens);

            // Check each result

            for (const testcase of testResults) {
                if (testcase.status_id === 3) {
                    console.log(" Test passed");
                } else if (testcase.status_id === 4) {
                    return res.status(400).send(" Wrong answer");
                } else if (testcase.status_id === 5) {
                    return res.status(400).send(" Time limit exceeded");
                } else if (testcase.status_id === 6) {
                    return res.status(400).send(" Compilation error");
                } else if (testcase.status_id === 7) {
                    return res.status(400).send(" Runtime error");
                } else {
                    return res.status(400).send(" Unknown error");
                }
            }


        }

        const userProblem = {

            ...req.body,
            createdBy: req.result._id

        }
        res.status(201).send("Problem Saved Successfully");

    } catch (err) {
        res.status(500).send("Error " + err)
    }
}

const updateProblem = async (req, res) => {
    const { id } = req.params;

    try {


        if (!id) return res.status(400).send("id is missing");

        const dsaProblem = await Problem.findById(id);
        if (!dsaProblem) return res.status(400).send("Problem is not present in server");

        for (const { language, completeCode } of referenceSolution) {
            const languageId = getlanguageById(language)


            // source_code:
            // language_id:
            // stdin: 
            // expected_output:
            const submission = visibleTestCases.map((testcases) => ({
                source_code: completeCode,
                language_id: languageId,
                stdin: testcases.input,
                expected_output: testcases.output
            }));

            // Submit batch to Judge0
            const submitResult = await submitBatch(submission);
            const resultTokens = submitResult.map((value) => value.token);

            // Fetch results
            const testResults = await submitToken(resultTokens);

            // Check each result

            for (const testcase of testResults) {
                if (testcase.status_id === 3) {
                    console.log(" Test passed");
                } else if (testcase.status_id === 4) {
                    return res.status(400).send(" Wrong answer");
                } else if (testcase.status_id === 5) {
                    return res.status(400).send(" Time limit exceeded");
                } else if (testcase.status_id === 6) {
                    return res.status(400).send(" Compilation error");
                } else if (testcase.status_id === 7) {
                    return res.status(400).send(" Runtime error");
                } else {
                    return res.status(400).send(" Unknown error");
                }
            }


        }

        const newProblem = await Problem.findByIdAndUpdate(id, { ...req.body }, { runValidators: true, new: true })



        //  res.status(200).send(newProblem)


        return res.status(200).json({
            message: "Problem updated successfully",
            data: newProblem
        });

    } catch (err) {
        res.status(500).send("Error ", +err)
    }
}

const delelteProblem = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).send("Id is missing");

        const dsaProblem = await Problem.findById(id);
        if (!dsaProblem) return res.status(400).send("Problem Id is not found");

        const delProblem = await Problem.findByIdAndDelete(id);
        if (!delProblem) return res.status(400).send("Problem is not present in server")

        res.status(200).send("Problem deleted successfully")


    } catch (err) {
        res.status(500).send("Error " + err)
    }
}

const getProblemById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).send("Id is missing");

        const dsaProblem = await Problem.findById(id).select(_id, language, description, tags, visibleTestCases, constraints, startCode);
        if (!dsaProblem) return res.status(400).send("Problem Id is not present");

        res.status(200).send(dsaProblem)

    } catch (err) {
        res.status(500).send("Error " + err)
    }
}
const getAllProblem = async (req, res) => {
    try {
        const dsaProblem = await Problem.find({});

        if (dsaProblem.length == 0) return res.status(400).send("Problems are missing");

        res.status(200).send(dsaProblem);

    } catch (err) {
        res.status(500).send("Error " + err)
    }
}
module.exports = { createProblem, updateProblem, delelteProblem, getProblemById ,getAllProblem};