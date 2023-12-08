import "./SkillForm.css";
import React, { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";

interface NewSkill {
  name: string;
  proficiency: number;
}

function SkillForm() {
  const [skills, setSkills] = useState<NewSkill[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [proficiency, setProficiency] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim() !== '') {
      // Check if the skill already exists
      if (!skills.some((skill) => skill.name.toLowerCase() === currentTag.trim().toLowerCase())) {
        const newSkill: NewSkill = {
          name: currentTag.trim(),
          proficiency: Number(proficiency),
        };

        setSkills((prevSkills) => [...prevSkills, newSkill]);

        setCurrentTag('');
        setProficiency(0);
      } else {
        alert('Skill already exists!');
      }
    }
  };

  const handleTagRemove = (skillToRemove: NewSkill) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
  };

  const handleProficiencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProficiency = parseInt(e.target.value, 10);
    setProficiency(selectedProficiency);
  };

  return (
    <div>
      <div className="tags-container">
        {skills.map((skill, index) => (
          <span key={index} className="tag">
            <span className="tag-content">{skill.name}</span>
            <button className="tag-removal" onClick={() => handleTagRemove(skill)}>
              x
            </button>
          </span>
        ))}
      </div>

      <input
        type="text"
        value={currentTag}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Type and press Enter"
      />

      <ProgressBar
        className='progress-bar'
        completed={proficiency}
        bgColor="#3e3b40"
        height="7px"
        isLabelVisible={false}
        baseBgColor="#cecece"
        labelColor="#fa0000"
        animateOnRender
        maxCompleted={5}
      />

      <label htmlFor="proficiency">Select Proficiency Level:</label>
      <select name="proficiency" id="proficiency" onChange={handleProficiencyChange}>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
  );
}

export default SkillForm;
