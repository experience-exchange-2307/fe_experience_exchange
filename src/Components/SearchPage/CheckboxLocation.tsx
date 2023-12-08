// CheckboxLocation.tsx
import React from "react";
import './SearchPage.css';

interface CheckboxLocationProps {
  setRemoteQuery: React.Dispatch<React.SetStateAction<string>>;
}

function CheckboxLocation({ setRemoteQuery }: CheckboxLocationProps) {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked){
      setRemoteQuery("&is_remote=true");
    }
    else{ setRemoteQuery("")

    }
  };

  return (
    <fieldset className='search-filter1'>
      <div>
        <input
          className='search-checkbox'
          type='checkbox'
          name='remote'
          id='remote'
          value='remote'
          onChange={handleCheckboxChange}
        />
        <label className='search-page-label' htmlFor='remote'>
          Remote
        </label>
      </div>
    </fieldset>
  );
}

export default CheckboxLocation;
