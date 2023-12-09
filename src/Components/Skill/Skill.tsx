import "./Skill.css";
import React, { useState, useEffect } from "react";
import { getSingleUser, postSkills } from "apiCalls";
import ProgressBar from "@ramonak/react-progress-bar";
import { UserSkill } from "types";
import { useParams } from "react-router-dom";

function SkillForm() {
  const [userSkills, setUserSkills] = useState<UserSkill[]>([])
  const [currentTag, setCurrentTag] = useState('')
  const [proficiency, setProficiency] = useState(0)
  const [alert, setAlert] = useState("");
  const { id } = useParams<{id: string | undefined}>()
  const userId = id ? parseInt(id, 10) : undefined;

  useEffect(() => {
    if(userId !== undefined && !isNaN(userId)) {

      getSingleUser(userId)
      .then((data) => {
        console.log("data", data.data);
        setUserSkills(data.data.attributes.skills);
      })
    }
  }, [])

  const handleSkillInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(e.target.value)
  };

  const submitNewSkill = () => {
    if (currentTag.trim() !== '') {
      // check if skill already exists
      if (!userSkills.some((skill) => skill.name.toLowerCase() === currentTag.trim().toLowerCase())) {

        const newSkill: UserSkill = {
          name: currentTag.trim(),
          proficiency: Number(proficiency),
        };

        const combinedSkills = [...userSkills, newSkill]

        postSkills(id, combinedSkills)
          .then((data) => {
          console.log('skills posted successfully:', data.data.attributes.skills)
          setUserSkills(data.data.attributes.skills)
        })
        .catch((error) => {
          console.error('error posting skills:', error)
        })
        setAlert("")
        setCurrentTag('')
        setProficiency(0)
      } else {
        setAlert('Skill already exists!')
      }
    }
  };
  
  const handleProficiencyInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProficiency = parseInt(e.target.value, 10)
    setProficiency(selectedProficiency)
  };

  const handleTagRemove = (skillToRemove: UserSkill) => {
    const updatedSkills = userSkills.filter((skill) => skill !== skillToRemove)
    setUserSkills(updatedSkills)
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={currentTag}
          onChange={handleSkillInput}
          placeholder="Type skill name"
        />

        <label htmlFor="proficiency">Proficiency:</label>
        <select name="proficiency" id="proficiency" onChange={handleProficiencyInput}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <p className="alert-message">{alert}</p>
        <button onClick={submitNewSkill}>Add Skill</button>
      </div>

      {userSkills.map((skill, index) => (
        <div key={index}>
          <div className="skill-list-container">
            <p className='skill-name' 
              key={`skill-name-${index}`}>
              {skill.name}
               <button className="tag-removal" onClick={() => handleTagRemove(skill)}>x</button>
            </p>
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
