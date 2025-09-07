const Problem = require("../models/Problem");
const Submission = require("../models/Submission");
const { getlanguage, submitBatch, submitToken } = require("../utils/problemUtility");

const submitProblem = async (req, res) => {
    try {
        const userId = req.result._id;
        const problemId = req.params.id; // from URL

        const { code, language } = req.body;

        if (!(userId && code && problemId && language)) {
            return res.status(400).send("Some fields are missing");
        }

        const problem = await Problem.findById(problemId);
        if (!problem) return res.status(404).send("Problem not found");

        const submittedResult = await Submission.create({
            userId,
            problemId,
            code,
            language,
            status: "Pending",
            testCaseTotal: problem.hiddenTestCases?.length || 0
        });

        const languageId =  getlanguage(language);
        const submissions = problem.hiddenTestCases.map(tc => ({
            source_code: code,
            language_id: languageId,
            stdin: tc.input,
            expected_output: tc.output
        }));

        const submitResult = await submitBatch(submissions);
        const resultTokens = submitResult.map(r => r.token);
        const testResults = await submitToken(resultTokens);

        let testCasesPassed = 0;
        let runtime = 0;
        let memory = 0;
        let status = "Accepted";
        let errorMessages = [];

        for (const test of testResults) {
            switch (test.status_id) {
                case 3: // Accepted
                    testCasesPassed++;
                    runtime = Math.max(runtime, parseFloat(test.time || 0));
                    memory = Math.max(memory, test.memory || 0);
                    break;
                case 4: // Wrong Answer
                    status = "Wrong";
                    if (test.stderr) errorMessages.push(test.stderr);
                    break;
                case 5: // Time Limit Exceeded
                    status = "Time Limit Exceeded";
                    break;
                case 6: // Compilation Error
                case 7: // Runtime Error
                    status = "Error";
                    if (test.stderr) errorMessages.push(test.stderr);
                    break;
            }
        }

        submittedResult.status = status;
        submittedResult.testCasesPasses = testCasesPassed;
        submittedResult.errorMessage = errorMessages.join("\n") || null;
        submittedResult.runtime = runtime;
        submittedResult.memory = memory;

        await submittedResult.save();

        res.status(201).send(submittedResult);

    } catch (err) {
        console.error(err);
        res.status(500).send("Error: " + err.message);
    }
};

module.exports = { submitProblem };
