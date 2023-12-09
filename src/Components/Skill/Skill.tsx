import "./Skill.css";
import React, { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { postSkills } from "apiCalls";
import { UserSkill } from "types";
import { useParams } from "react-router-dom";
import { stringify } from "querystring";
import { getSingleUser } from "apiCalls";
import { CurrentUser } from "types";

// interface UserSkill {
//   name: string;
//   proficiency: number;
// }

// skills state in app?
// GET request to tget skills

function SkillForm() {
  const { id } = useParams()
  const [skills, setSkills] = useState<UserSkill[]>([])
  const [currentTag, setCurrentTag] = useState('')
  const [proficiency, setProficiency] = useState(0)
  const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>(undefined);

  // const currentUserID = id

  useEffect(() => {
        getSingleUser(14)
        .then((data) => {
          console.log("data", data.data);
          setCurrentUser(data.data);
        })
    // eslint-disable-next-line
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(e.target.value)
  };

  const handleAddSkill = () => {

// skillForm and SkillList component 
// then GET skills when you need it or GET current user and only take skills from it
// only get the skills, 

// currentUser.id === id

// rename to Skills, contains skills form and skills list

    if (currentTag.trim() !== '') {
      // check if skill already exists
      if (!skills.some((skill) => skill.name.toLowerCase() === currentTag.trim().toLowerCase())) {
        
        const newSkill: UserSkill = {
          name: currentTag.trim(),
          proficiency: Number(proficiency),
        };

        const combinedSkills = [...skills, newSkill]
        // console.log("newSkill", newSkill)
        postSkills(id, combinedSkills)
        .then((data) => {
                console.log('skills posted successfully:', data.data.attributes.skills)
                setSkills(data.data.attributes.skills)
              })
              .catch((error) => {
                console.error('error posting skills:', error)
              });

        // setSkills((prevSkills) => [...prevSkills, newSkill])
        setCurrentTag('')
        setProficiency(0)
      } else {
        alert('Skill already exists!')
      }
    }
  };

  const handleTagRemove = (skillToRemove: UserSkill) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove)
    setSkills(updatedSkills)
  };

  const handleProficiencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProficiency = parseInt(e.target.value, 10)
    setProficiency(selectedProficiency)
  };

  // const handleSaveSkills = () => {
  //   const userSkills: UserSkills = { skills };
  //   postSkills( userSkills)
  //     .then((data) => {
  //       console.log('skills posted successfully:', data.data)
  //       setSkills(data.data)
  //     })
  //     .catch((error) => {
  //       console.error('error posting skills:', error)
  //     });
  // };

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
