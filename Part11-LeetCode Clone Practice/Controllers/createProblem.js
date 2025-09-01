const Problem = require("../models/problems");
const { getLanguageById, submitBatch } = require("c:/Users/HP/Downloads/Day05/Day05/src/utils/problemUtility");
const createProblem = async (req, res) => {


    const { title, tags, description, difficulty, visibleTestCases, hiddenTestCases, problemCreater, referenceSolution, startCode } = req.body;


    try {

        for ({ language, completeCode } of referenceSolution) {
            const languageId = getLanguageById(language);

            const submission = visibleTestCases.map((testcases) => ({


                source_code: completeCode,
                language_id: languageId,
                stdin: testcases.input,
                expectedOutput: testcases.output

            }))

            const submitResult = await submitBatch(submission);

            const resultToken = await submitResult.map((value) => value.token)

            const testResult = await submitResult(resultToken);

            for (const test of testResult) {
                if (test.status_id === 3) {
                    console.log(" Test Passed");
                } else if (test.status_id === 1 || test.status_id === 2) {
                    console.log(" Please wait, still processing...");
                } else if (test.status_id === 4) {
                    return res.status(400).send(" Wrong Answer in reference solution");
                } else if (test.status_id === 5) {
                    return res.status(400).send(" Time Limit Exceeded");
                } else if (test.status_id === 6) {
                    return res.status(400).send(" Compilation Error");
                } else {
                    return res.status(400).send("Runtime/Internal Error");
                }
            }
        }
        const userProblem = await Problem.create({
            ...req.body,
            problemCreater: req.result._id,


        })
        res.status(201).send("Problem Saved Successfully");
    }
    catch (err) {
        res.status(400).send("Error: " + err);
    }
}