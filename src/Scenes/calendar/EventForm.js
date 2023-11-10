import React, { useState, useEffect } from 'react';

const EventForm = ({ selectedDate, initialData, onSubmit, onDelete }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    id: null,
  });

  useEffect(() => {
    if (initialData) {
      setEventData(initialData);
    } else {
      setEventData({ title: '', description: '', id: null });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventData.title && eventData.description) {
      onSubmit(eventData);
      setEventData({ title: '', description: '', id: null });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Event Title"
          value={eventData.title}
          onChange={(e) =>
            setEventData({ ...eventData, title: e.target.value })
          }
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Event Description"
          value={eventData.description}
          onChange={(e) =>
            setEventData({ ...eventData, description: e.target.value })
          }
        />
      </div>
      <div>
        <button type="submit">{initialData ? 'Update' : 'Add'}</button>
        {onDelete && (
          <button
            type="button"
            onClick={() => {
              onDelete();
              setEventData({ title: '', description: '', id: null });
            }}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default EventForm;
