import './SearchPage.css'

function CheckboxLocation() {
  return (
    <fieldset className='search-filter1'>
      <div>
        <input
          className='search-checkbox'
          type='checkbox'
          name='in-person'
          id='in-person'
          value='in-person'
        />
        <label className='search-page-label' htmlFor='in-person'>
          In-Person
        </label>
      </div>
      <div>
        <input
          className='search-checkbox'
          type='checkbox'
          name='remote'
          id='remote'
          value='remote'
        />
        <label className='search-page-label' htmlFor='remote'>
          Remote
        </label>
      </div>
    </fieldset>
   
  )
}

export default CheckboxLocation
