import "./Skill.css";
import React, { useState, useEffect } from "react";
import { getSingleUser, postSkills } from "apiCalls";
import ProgressBar from "@ramonak/react-progress-bar";
import { UserSkill } from "types";
import { useParams } from "react-router-dom";
import { CurrentUser } from "types";

interface SkillProps {
  currentUser: CurrentUser;
  currentUserId: number;
}

function SkillForm({ currentUser, currentUserId }: SkillProps): JSX.Element {
  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [proficiency, setProficiency] = useState(0);
  const [alert, setAlert] = useState("");
  const { id } = useParams();
  const userId = Number(id);
  useEffect(() => {
    const fetchUserSkills = async () => {
      try {
        if (userId !== undefined && !isNaN(userId)) {
          const data = await getSingleUser(userId);
          console.log(data);
          setUserSkills(data.data.attributes.skills);
        }
      } catch (error) {
        console.error("Error fetching user skills:", error);
      }
    };
    fetchUserSkills();
  }, [userId]);

  const handleSkillInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(e.target.value);
  };

  const submitNewSkill = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (currentTag.trim() !== "") {
      if (
        !userSkills.some(
          (skill) =>
            skill.name.toLowerCase() === currentTag.trim().toLowerCase()
        )
      ) {
        const newSkill: UserSkill = {
          name: currentTag.trim(),
          proficiency: Number(proficiency),
        };

        const addedSkill = [newSkill];

        postSkills(id, addedSkill)
          .then((data) => {
            console.log(
              "skills posted successfully:",
              data.data.attributes.skills
            );
            setUserSkills(data.data.attributes.skills);
          })
          .catch((error) => {
            console.error("error posting skills:", error);
          });
        setAlert("");
        setCurrentTag("");
        setProficiency(0);
      } else {
        setAlert("Skill already exists!");
      }
    }
  };

  const handleProficiencyInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProficiency = parseInt(e.target.value, 10);
    setProficiency(selectedProficiency);
  };

  const handleTagRemove = (skillToRemove: UserSkill) => {
    const updatedSkills = userSkills.filter((skill) => skill !== skillToRemove);
    setUserSkills(updatedSkills);
  };
  console.log("skills cur user", currentUser.id);
  console.log("skills param user", id);
  return (
    <div>
      {Number(currentUserId) === userId && (
        <form>
          <input
            type="text"
            value={currentTag}
            onChange={handleSkillInput}
            placeholder="Type skill name"
            className="skill-input"
          />

          <label htmlFor="proficiency" className="proficiency-label">
            Proficiency:
          </label>
          <select
            name="proficiency"
            id="proficiency"
            onChange={handleProficiencyInput}
            className="proficiency-input"
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <p className="alert-message">{alert}</p>
          <button onClick={(e) => submitNewSkill(e)} className="add-skill-btn">
            Add Skill
          </button>
        </form>
      )}
      <section className="skills-section">
        {userSkills.map((skill, index) => (
          <div key={index} className="skill-list">
            <div className="skill-list-container">
              <p className="skill-name" key={`skill-name-${index}`}>
                <span className="skill-text">{skill.name}</span>
                {Number(currentUserId) === userId && (
                  <button
                    type="button"
                    className="tag-removal"
                    onClick={() => handleTagRemove(skill)}
                  >
                    x
                  </button>
                )}
              </p>
            </div>
            <ProgressBar
              key={`progress-${index}`}
              className="progress-bar"
              completed={skill.proficiency}
              bgColor="#f76a1e"
              height="7px"
              isLabelVisible={false}
              baseBgColor="#ffffff"
              labelColor="#f76a1e"
              animateOnRender
              maxCompleted={5}
            />
          </div>
        ))}
      </section>
    </div>
  );
}

export default SkillForm;







