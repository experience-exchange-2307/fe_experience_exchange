import './SearchPage.css'

function CheckboxSkills() {
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
                />
                <label className='search-page-label' htmlFor={checkbox.id}>
                  {checkbox.label}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      );
    };

export default CheckboxSkills
