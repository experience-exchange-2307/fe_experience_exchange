import "./SkillForm.css";
import React, { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { postSkills } from "apiCalls";
import { UserSkills } from "types";

interface NewSkill {
  name: string;
  proficiency: number;
}

function SkillForm() {
  const [skills, setSkills] = useState<NewSkill[]>([])
  const [currentTag, setCurrentTag] = useState('')
  const [proficiency, setProficiency] = useState(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(e.target.value)
  };

  const handleAddSkill = () => {
    if (currentTag.trim() !== '') {
      // check if skill already exists
      if (!skills.some((skill) => skill.name.toLowerCase() === currentTag.trim().toLowerCase())) {
        const newSkill: NewSkill = {
          name: currentTag.trim(),
          proficiency: Number(proficiency),
        };

        setSkills((prevSkills) => [...prevSkills, newSkill])

        setCurrentTag('')
        setProficiency(0)
      } else {
        alert('Skill already exists!')
      }
    }
  };

  const handleTagRemove = (skillToRemove: NewSkill) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove)
    setSkills(updatedSkills)
  };

  const handleProficiencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProficiency = parseInt(e.target.value, 10)
    setProficiency(selectedProficiency)
  };

  const handleSaveSkills = () => {
    const userSkills: UserSkills = { skills };
    postSkills( userSkills)
      .then((data) => {
        console.log('skills posted successfully:', data.data)
        setSkills(data.data)
      })
      .catch((error) => {
        console.error('error posting skills:', error)
      });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={currentTag}
          onChange={handleInputChange}
          placeholder="Type skill name"
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

        <button onClick={handleAddSkill}>Add Skill</button>
        <div>
        <button onClick={handleSaveSkills}>Save Skills</button>
        </div>
      </div>

      {skills.map((skill, index) => (
        <div key={index}>
          <div className="tags-container">
            <span className="tag">
              <span className="tag-content">{skill.name}</span>
              <button className="tag-removal" onClick={() => handleTagRemove(skill)}>
                x
              </button>
            </span>
          </div>

          <ProgressBar
            key={`progress-${index}`}
            className='progress-bar'
            completed={skill.proficiency}
            bgColor="#3e3b40"
            height="7px"
            isLabelVisible={false}
            baseBgColor="#cecece"
            labelColor="#fa0000"
            animateOnRender
            maxCompleted={5}
          />
        </div>
      ))}
    </div>
  );
}

export default SkillForm;
