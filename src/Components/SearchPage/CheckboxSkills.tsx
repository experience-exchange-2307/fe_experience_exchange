import "./SearchPage.css";
import React from 'react';

interface CheckboxSkillsProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

function CheckboxSkills({ searchQuery, setSearchQuery }: CheckboxSkillsProps) {

  const handleSkillCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;

    setSearchQuery((searchQuery) => {
      if (searchQuery && event.target.checked ) {
        return `${searchQuery}, ${keyword}`;
      }
      if (!searchQuery && event.target.checked ) {
        return `${keyword}`;
      }
      else {
        const updatedQuery = searchQuery.replace(new RegExp(`${keyword},?`), "");
        const trimmedQuery = updatedQuery.trim();
        return trimmedQuery.endsWith(',') ? trimmedQuery.slice(0, -1) : trimmedQuery;
   
      }
    });
  };

  const checkboxes = [
    { id: 'knitting', label: 'Knitting', value: 'knitting' },
    { id: 'crochet', label: 'Crochet', value: 'crochet' },
    { id: 'sewing', label: 'Sewing', value: 'sewing' },
    { id: 'quilting', label: 'Quilting', value: 'quilting' },
    { id: 'juggling', label: 'Juggling', value: 'juggling' },
    { id: 'piano', label: 'Piano', value: 'piano' },
  ];

  return (
    <fieldset className='search-filter2'>
      <div className='checkbox-grid'>
        {checkboxes.map((checkbox) => (
          <div key={checkbox.id}>
            <input
              className='search-checkbox'
              type='checkbox'
              name={checkbox.id}
              id={checkbox.id}
              value={checkbox.value}
              onChange={handleSkillCheckboxChange}
            />
            <label className='search-page-label' htmlFor={checkbox.id}>
              {checkbox.label}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

export default CheckboxSkills;