import styles from './SnackForm.module.css';
import { useState, useEffect } from 'react';

export default function SnackForm({
  addSnack,
  editingSnack,
  cancelEdit,
  updateSnack,
  className,
}) {
  const isEditing = Boolean(editingSnack);

  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [touched, setTouched] = useState({ name: false, rating: false });

  useEffect(() => {
    if (editingSnack) {
      setName(editingSnack.name);
      setRating(String(editingSnack.rating));
    } else {
      setName('');
      setRating('');
    }
    setTouched({
      name: false,
      rating: false,
    });
  }, [editingSnack]);

  // Validation messages

  function validateName() {
    if (name.trim() !== '') {
      return true;
    }
    return false;
  }

  function validateRating() {
    if (rating !== '') {
      return true;
    }
    return false;
  }

  function getNameError() {
    if (!validateName() && touched.name) {
      return 'Snack name is required';
    }
    // return '';
  }

  function getRatingError() {
    if (!validateRating() && touched.rating) {
      return 'Please select a rating';
    }
    return '';
  }

  const nameErrorMessage = getNameError();
  const ratingErrorMessage = getRatingError();

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateName() || !validateRating()) {
      setTouched({
        name: true,
        rating: true,
      });
      return;
    }

    if (isEditing) {
      updateSnack(editingSnack.id, name, rating);
    } else {
      addSnack(name.trim(), rating);
      (setName(''),
        setRating(''),
        setTouched({
          name: false,
          rating: false,
        }));
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${className || ''}`}
    >
      <h3 className={styles['form-title']}>
        {isEditing ? '✏️ Edit Snack' : '➕ Add Snack'}
      </h3>

      <div className={styles['field-container']}>
        <label className={styles['field-label']}>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setTouched((prev) => ({ ...prev, name: true }))}
          className={styles['field-input']}
          placeholder="Enter snack name"
        />
        {nameErrorMessage && (
          <div className={styles.error}>{nameErrorMessage}</div>
        )}
      </div>

      <div className={styles['field-container']}>
        <label className={styles['field-label']}>Rating:</label>
        <input
          type="number"
          name="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          onFocus={() => setTouched((prev) => ({ ...prev, rating: true }))}
          min="1"
          max="5"
          className={styles['field-input']}
          placeholder="Rate 1-5"
        />
        {ratingErrorMessage && (
          <div className={styles.error}>{ratingErrorMessage}</div>
        )}
      </div>

      <div className={styles['button-container']}>
        <button
          type="submit"
          className={`${styles.button} ${styles['submit-button']}`}
        >
          {isEditing ? 'Save' : 'Add'}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={cancelEdit}
            className={`${styles.button} ${styles['cancel-button']}`}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
