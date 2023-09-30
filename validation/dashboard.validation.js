const Joi = require('joi');

const newName = Joi.string().min(2).max(25).required().messages({
    'string.empty': 'Name can not be empty',
    'string.min': 'Name can be maximum 2 symbols',
    'string.max': 'Name can be maximum 15 symbols',
});

const QuestionText = Joi.string().min(5).required().messages({
    'string.empty': "QuestionText can not be empty",
    'string.min': "QuestionText must be minimum 5 sybmols",
})

const AnswerValidation = Joi.string().min(2).required().messages({
    'string.empty': "Answer1 can not be empty",
    'string.min': "Answer1 must be minimum 2 sybmols",
})

const RigthQuestion = Joi.string().required().valid("Answer1", "Answer2", "Answer3", "Answer4").required().messages({
    'string.empty': "RigthQuestion can not be empty",
    'string.only': "RigthQuestion could include only 4 options: Answer1, Answer2, Answer3, Answer4",
})

const id = Joi.number().required().greater(0).messages({
    'number.empty': "ID can not be empty",
    'number.greater': "ID must be more than 0"
})

const Title_QuizID = id
const SubjectID = id

exports.newNameValidation = Joi.object({ newName });

const question = Joi.object({ //Question Object Validation
    QuestionText,
    Answer1: AnswerValidation,
    Answer2: AnswerValidation,
    Answer3: AnswerValidation,
    Answer4: AnswerValidation,
    Title_QuizID,
    RigthQuestion,
    SubjectID
})

exports.questionsValidation = Joi.array().items(question) //Array Of Questions Validation

exports.updateQuestionValidation = Joi.object({
    QuestionText,
    Answer1: AnswerValidation,
    Answer2: AnswerValidation,
    Answer3: AnswerValidation,
    Answer4: AnswerValidation,
    RigthQuestion
})
