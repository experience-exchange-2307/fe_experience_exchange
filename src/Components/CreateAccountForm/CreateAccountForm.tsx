import "./CreateAccountForm.css"
import React from 'react'
import { useState } from 'react'

function CreateAccountForm() {
  const [formData, setFormData] = useState({
    about: "",
    address: {
      street: "",
      apt: "",
      city: "",
      state: "",
    },
    email: "",
    first_name: "",
    last_name: "",
    isRemote: false ,
    id: "",
    type: "",
    skills: [],
  })


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    if (name.includes("address.")) {
      const addressProperty = name.split(".")[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        address: {
          ...prevFormData.address,
          [addressProperty]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleRemoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevRemoteData) => ({
      ...prevRemoteData,
      remote: e.target.checked,
    }));
  };

  const handleSubmit = () => {
    // make POST request with formData here
    console.log('Submitting:', formData);

    
  };

  return (
    <section className="sign-up-container">
  <h2>Let’s get you started with an Experience Exchange account</h2>

  <form className="form">
    <div className="name-container">
      <div className="input-group">
        <label>First Name</label>
        <input
          type="text"
          placeholder="First name"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Last name"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
        />
      </div>
    </div>

    <div className="input-group">
      <label>Email</label>
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
    </div>

    <div className="address-container">
      <div className="input-group">
        <label>Street</label>
        <input
          type="text"
          placeholder="Street"
          name="address.street"
          value={formData.address.street}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <label>Apt</label>
        <input
          type="text"
          placeholder="Apt"
          name="address.apt"
          value={formData.address.apt}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <label>City</label>
        <input
          type="text"
          placeholder="City"
          name="address.city"
          value={formData.address.city}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <label>State</label>
        <input
          type="text"
          placeholder="State"
          name="address.state"
          value={formData.address.state}
          onChange={handleInputChange}
        />
      </div>
    </div>

    <div className="input-group">
      <label>Skills</label>
      <input
        type="text"
        name="skills"
        value={formData.skills.join(',')}
        onChange={handleInputChange}
      />
    </div>

    <div className="input-group">
      <label htmlFor="about">Tell us about yourself</label>
      <textarea
        name="about"
        value={formData.about}
        onChange={handleInputChange}
      ></textarea>
    </div>

    <div className="input-group">
      <label>
        Remote
        <input
          type="checkbox"
          name="isRemote"
          checked={formData.isRemote}
          onChange={handleRemoteChange}
        />
      </label>
    </div>

    <div className="create-account-container">
      <button type="button" onClick={handleSubmit}>
        Create Account
      </button>
    </div>
  </form>
  <div className="solid"></div>
</section>

  );
}

export default CreateAccountForm;

