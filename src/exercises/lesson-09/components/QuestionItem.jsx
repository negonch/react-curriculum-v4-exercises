import { useContext, useState } from 'react';
import { SurveyContext } from '../SurveyContext';
import { QUESTION_TYPES } from '../surveyReducer';
import styles from '../StudentWork.module.css';

// Question Item Component - Students will add Edit/Delete functionality here
export function QuestionItem({ question }) {
  //HINT: use these with controlled form
  const [workingText, setWorkingText] = useState(question.question);
  const { state, dispatch } = useContext(SurveyContext);

  const [workingOptions, setWorkingOptions] = useState(question.options || []);
  const isEditing = state.ui.editingQuestionId === question.id;

  // Helper function to convert type to title case
  const formatQuestionType = (type) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-');
  };

  // TODO: Students will add edit functionality here
  const handleEdit = (questionId) => {
    // Hint: Use SET_EDITING_QUESTION action
    if (isEditing) {
      dispatch({
        type: 'SET_EDITING_QUESTION',
        payload: { questionId: null },
      });
    } else {
      setWorkingText(question.question);
      setWorkingOptions(question.options || []);
      dispatch({
        type: 'SET_EDITING_QUESTION',
        payload: { questionId: question.id },
      });
    }
  };

  // TODO: Students will add save functionality here
  const handleSave = () => {
    // Hint: Use UPDATE_QUESTION_TEXT action with workingText
    dispatch({
      type: 'UPDATE_QUESTION_TEXT',
      payload: {
        id: question.id,
        newText: workingText,
      },
    });
    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: { questionId: null },
    });
  };

  // TODO: Students will add delete functionality here
  const handleDelete = () => {
    // Hint: Show confirmation dialog, then use DELETE_QUESTION action
    const confirmation = window.confirm(
      'Are you sure you want to delete this question?'
    );

    if (!confirmation) {
      return;
    }
    dispatch({
      type: 'DELETE_QUESTION',
      payload: { id: question.id },
    });
  };

  // New option to question
  const handleAddOptionToQuestion = () => {
    const optionText = window.prompt('Add new option text');
    if (!optionText) {
      return;
    }
    dispatch({
      type: 'ADD_OPTION_TO_QUESTION',
      payload: {
        questionId: question.id,
        optionText: optionText,
      },
    });
    setWorkingOptions((prevOptions) => [...prevOptions, optionText]);
  };

  // Update option
  const handleSaveOption = (index) => {
    dispatch({
      type: 'UPDATE_OPTION_TEXT',
      payload: {
        questionId: question.id,
        optionIndex: index,
        newText: workingOptions[index],
      },
    });
  };
  // Delete option
  const handleDeleteOption = (index) => {
    dispatch({
      type: 'DELETE_OPTION_FROM_QUESTION',
      payload: {
        questionId: question.id,
        optionIndex: index,
      },
    });
    setWorkingOptions((prevOptions) =>
      prevOptions.length > 2
        ? prevOptions.filter((_, optionIndex) => optionIndex !== index)
        : prevOptions
    );
  };

  return (
    <div className={styles['question-item']}>
      <div className={styles['question-header']}>
        {/* TEXT question  */}
        <span className={styles['question-type']}>
          Question Type: {formatQuestionType(question.type)}
        </span>

        <div className={styles['question-actions']}>
          {/* EDIT button */}
          <button className={styles['edit-btn']} onClick={handleEdit}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          {/* DELETE button */}
          <button className={styles['delete-btn']} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className={styles['question-content']}>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={workingText}
              onChange={(event) => setWorkingText(event.target.value)}
            />
            {/* SAVE button */}
            <button type="button" onClick={handleSave}>
              Save
            </button>
            {/* CANCEL button */}
            <button type="button" onClick={handleEdit}>
              Cancel
            </button>
          </div>
        ) : (
          <h3>{question.question}</h3>
        )}
      </div>

      {/* MULTIPLE CHOICE question */}
      {question.type === QUESTION_TYPES.MULTIPLE_CHOICE && (
        <div className={styles['options-section']}>
          <h4>Answer Options:</h4>

          {isEditing ? (
            <div>
              {workingOptions.map((option, index) => (
                <div key={index} className={styles['option-item']}>
                  <input
                    type="text"
                    value={option}
                    onChange={(event) =>
                      setWorkingOptions((prevOptions) =>
                        prevOptions.map((currentOption, optionIndex) =>
                          optionIndex === index
                            ? event.target.value
                            : currentOption
                        )
                      )
                    }
                  />
                  {/* SAVE button */}
                  <button type="button" onClick={() => handleSaveOption(index)}>
                    Save
                  </button>
                  {/* DELETE button */}
                  <button
                    type="button"
                    onClick={() => handleDeleteOption(index)}
                    disabled={workingOptions.length <= 2}
                  >
                    Delete
                  </button>
                </div>
              ))}
              {/* + ADD OPTION button */}
              <button type="button" onClick={handleAddOptionToQuestion}>
                + Add Option
              </button>
            </div>
          ) : (
            <ul>
              {question.options.map((option, index) => (
                <li key={index} className={styles['option-item']}>
                  <span className={styles['option-text']}>{option}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
