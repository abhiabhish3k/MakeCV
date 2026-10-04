import { useState } from "react";

// Form is controlled from App: shared CV state is lifted so Preview can
// read the same values. Only input-box drafts (skill/language chips) stay local.
function Form({
  cvData,
  setCvData,
  experienceList,
  setExperienceList,
  educationList,
  setEducationList,
  projectsList,
  setProjectsList,
  skills,
  setSkills,
  languages,
  setLanguages,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCvData((prev) => ({ ...prev, [name]: value }));
  };

  const makeEmptyExperience = () => ({
    id: crypto.randomUUID(), // unique ID so React can track each card individually
    jobTitle: "",
    orgname: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
  });

  // Updates ONE field, on ONE specific experience card, identified by its id.
  const handleExperienceChange = (id, field, value) => {
    setExperienceList((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  // Adds a brand-new, blank experience card to the end of the list.
  const addExperience = () => {
    setExperienceList((prev) => [...prev, makeEmptyExperience()]);
  };

  // Removes one experience card by id.
  const removeExperience = (id) => {
    setExperienceList((prev) => prev.filter((exp) => exp.id !== id));
  };

  const makeEmptyEducation = () => ({
    id: crypto.randomUUID(),
    degree: "",
    institution: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
  });

  const handleEducationChange = (id, field, value) => {
    setEducationList((prev) =>
      prev.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const addEducation = () => {
    setEducationList((prev) => [...prev, makeEmptyEducation()]);
  };

  const removeEducation = (id) => {
    setEducationList((prev) => prev.filter((edu) => edu.id !== id));
  };

  const makeEmptyProjects = () => ({
    id: crypto.randomUUID(),
    projectName: "",
    projectURL: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
  });

  const handleProjectsChange = (id, field, value) => {
    setProjectsList((prev) =>
      prev.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj))
    );
  };

  const addProjects = () => {
    setProjectsList((prev) => [...prev, makeEmptyProjects()]);
  };

  const removeProjects = (id) => {
    setProjectsList((prev) => prev.filter((proj) => proj.id !== id));
  };

  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return; // ignore empty/whitespace-only entries
    if (skills.includes(trimmed)) {
      setSkillInput(""); // already added — just clear the box, don't duplicate
      return;
    }
    setSkills((prev) => [...prev, trimmed]);
    setSkillInput("");
  };

  // Enter confirms the chip; comma also works as a quick alternative.
  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault(); // stop Enter from submitting/reloading the form
      addSkill();
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  };

  const [languageInput, setLanguageInput] = useState("");

  const addLanguage = () => {
    const trimmed = languageInput.trim();
    if (!trimmed) return;
    if (languages.includes(trimmed)) {
      setLanguageInput("");
      return;
    }
    setLanguages((prev) => [...prev, trimmed]);
    setLanguageInput("");
  };

  const handleLanguageKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addLanguage();
    }
  };

  const removeLanguage = (languageToRemove) => {
    setLanguages((prev) => prev.filter((lang) => lang !== languageToRemove));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Build Your CV</h1>
          <p className="mt-2 text-sm text-gray-500">
            Enter your information and see the preview update instantly.
          </p>
        </div>

        {/* PERSONAL INFORMATION  */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm text-gray-500">Add your basic contact information.</p>

          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={cvData.name}
                onChange={handleChange}
                placeholder="Elon Musk"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={cvData.email}
                onChange={handleChange}
                placeholder="elon@example.com"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={cvData.phone}
                onChange={handleChange}
                placeholder="+977 98XXXXXXXX"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
              />
            </div>

            <div>
              <label htmlFor="jobTitle" className="mb-2 block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <input
                id="jobTitle"
                name="jobTitle"
                type="text"
                value={cvData.jobTitle}
                onChange={handleChange}
                placeholder="Senior Web Developer"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
              />
            </div>

            <div>
              <label htmlFor="location" className="mb-2 block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={cvData.location}
                onChange={handleChange}
                placeholder="Kathmandu, Nepal"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
              />
            </div>

            <div>
              <label htmlFor="portfolioURL" className="mb-2 block text-sm font-medium text-gray-700">
                Portfolio URL
              </label>
              <input
                id="portfolioURL"
                name="portfolioURL"
                type="url"
                value={cvData.portfolioURL}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
              />
            </div>

            <div>
              <label htmlFor="LinkedinURL" className="mb-2 block text-sm font-medium text-gray-700">
                LinkedIn URL
              </label>
              <input
                id="LinkedinURL"
                name="LinkedinURL"
                type="url"
                value={cvData.LinkedinURL}
                onChange={handleChange}
                placeholder="https://www.linkedin.com/in/yourprofile"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
              />
            </div>

            <div>
              <label htmlFor="profession" className="mb-2 block text-sm font-medium text-gray-700">
                Professional Summary
              </label>
              <input
                id="professionalSummary"
                name="professionalSummary"
                type="text"
                value={cvData.professionalSummary}
                onChange={handleChange}
                placeholder="A brief summary of your professional background and goals."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
              />
            </div>
          </div>
        </div>

        {/* PROFESSIONAL EXPERIENCE (repeatable) */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Professional Experience</h2>
          <p className="mt-1 text-sm text-gray-500">Add one or more roles you've held.</p>

          <div className="mt-6 space-y-6">
            {/* One card per item in experienceList — this loop is the whole trick */}
            {experienceList.map((exp, index) => (
              <div
                key={exp.id}
                className="relative space-y-5 rounded-xl border border-gray-200 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Experience #{index + 1}
                  </span>
                  {/* Only show Remove if there's more than one card, so the form is never empty */}
                  {experienceList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExperience(exp.id)}
                      className="text-xs font-medium text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {/* Job Title */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) => handleExperienceChange(exp.id, "jobTitle", e.target.value)}
                    placeholder="Senior Web Developer"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>

                {/* Company / Organization */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Company or Organization's Name
                  </label>
                  <input
                    type="text"
                    value={exp.orgname}
                    onChange={(e) => handleExperienceChange(exp.id, "orgname", e.target.value)}
                    placeholder="Company or Organization's Name"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>

                {/* Employment Period */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Employment Period
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-500">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={exp.startDate}
                        onChange={(e) => handleExperienceChange(exp.id, "startDate", e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-500">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={exp.endDate}
                        onChange={(e) => handleExperienceChange(exp.id, "endDate", e.target.value)}
                        disabled={exp.isCurrent}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                      />
                    </div>
                  </div>

                  <label className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={exp.isCurrent}
                      onChange={(e) =>
                        setExperienceList((prev) =>
                          prev.map((item) =>
                            item.id === exp.id
                              ? {
                                  ...item,
                                  isCurrent: e.target.checked,
                                  endDate: e.target.checked ? "" : item.endDate,
                                }
                              : item
                          )
                        )
                      }
                      className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900/10"
                    />
                    I currently work here
                  </label>
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(exp.id, "description", e.target.value)}
                    placeholder="Briefly describe your responsibilities and achievements"
                    rows={3}
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addExperience}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
            >
              + Add Another Experience
            </button>
          </div>
        </div>

        {/* EDUCATION (repeatable) */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Education</h2>
          <p className="mt-1 text-sm text-gray-500">Add one or more degrees or certifications.</p>

          <div className="mt-6 space-y-6">
            {educationList.map((edu, index) => (
              <div
                key={edu.id}
                className="relative space-y-5 rounded-xl border border-gray-200 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Education #{index + 1}
                  </span>
                  {educationList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(edu.id)}
                      className="text-xs font-medium text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {/* Degree */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Degree / Certification
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                    placeholder="B.Sc. in Computer Science"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>

                {/* Institution */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    School / Institution
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(edu.id, "institution", e.target.value)}
                    placeholder="Tribhuvan University"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>

                {/* Study Period */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Study Period
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-500">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={edu.startDate}
                        onChange={(e) => handleEducationChange(edu.id, "startDate", e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-500">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={edu.endDate}
                        onChange={(e) => handleEducationChange(edu.id, "endDate", e.target.value)}
                        disabled={edu.isCurrent}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                      />
                    </div>
                  </div>

                  <label className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={edu.isCurrent}
                      onChange={(e) =>
                        setEducationList((prev) =>
                          prev.map((item) =>
                            item.id === edu.id
                              ? {
                                  ...item,
                                  isCurrent: e.target.checked,
                                  endDate: e.target.checked ? "" : item.endDate,
                                }
                              : item
                          )
                        )
                      }
                      className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900/10"
                    />
                    I'm currently studying here
                  </label>
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description (optional)
                  </label>
                  <textarea
                    value={edu.description}
                    onChange={(e) => handleEducationChange(edu.id, "description", e.target.value)}
                    placeholder="Relevant coursework, honors, GPA, etc."
                    rows={3}
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addEducation}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
            >
              + Add Another Education
            </button>
          </div>
        </div>

        {/* Projects  (repeatable) */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
          <p className="mt-1 text-sm text-gray-500">Add one or more projects you've worked on.</p>

          <div className="mt-6 space-y-6">
            {projectsList.map((proj, index) => (
              <div
                key={proj.id}
                className="relative space-y-5 rounded-xl border border-gray-200 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Project #{index + 1}
                  </span>
                  {projectsList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProjects(proj.id)}
                      className="text-xs font-medium text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {/* Project Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={proj.name}
                    onChange={(e) => handleProjectsChange(proj.id, "name", e.target.value)}
                    placeholder="Project Name"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>

                {/* Project URL */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Project URL
                  </label>
                  <input
                    type="text"
                    value={proj.projectURL}
                    onChange={(e) => handleProjectsChange(proj.id, "projectUrl", e.target.value)}
                    placeholder="https://example.com"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>

                {/* Project Duration */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Project Duration
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-500">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={proj.startDate}
                        onChange={(e) => handleProjectsChange(proj.id, "startDate", e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-500">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={proj.endDate}
                        onChange={(e) => handleProjectsChange(proj.id, "endDate", e.target.value)}
                        disabled={proj.isCurrent}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                      />
                    </div>
                  </div>

                  <label className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={proj.isCurrent}
                      onChange={(e) =>
                        setProjectsList((prev) =>
                          prev.map((item) =>
                            item.id === proj.id
                              ? {
                                  ...item,
                                  isCurrent: e.target.checked,
                                  endDate: e.target.checked ? "" : item.endDate,
                                }
                              : item
                          )
                        )
                      }
                      className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900/10"
                    />
                    I'm currently working on this project
                  </label>
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description (optional)
                  </label>
                  <textarea
                    value={proj.description}
                    onChange={(e) => handleProjectsChange(proj.id, "description", e.target.value)}
                    placeholder="Describe the main goal, scope, and key deliverables of your project"
                    rows={3}
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addProjects}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
            >
              + Add Another Project
            </button>
          </div>
        </div>

        {/* SKILLS — type a skill, press Enter, it becomes a removable chip */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
          <p className="mt-1 text-sm text-gray-500">
            Type a skill and press Enter to add it.
          </p>
 
          <div className="mt-6 space-y-3">
            {/* Chips — only shown once there's at least one skill */}
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-800"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      aria-label={`Remove ${skill}`}
                      className="text-gray-400 transition hover:text-red-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div>
              <label htmlFor="skillInput" className="mb-2 block text-sm font-medium text-gray-700">
                Add a Skill
              </label>
              <input
                id="skillInput"
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                placeholder="e.g. JavaScript — press Enter"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
              />
            </div>
          </div>
        </div>

        {/* LANGUAGES — same chip pattern as Skills */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Languages</h2>
          <p className="mt-1 text-sm text-gray-500">
            Type a language and press Enter to add it.
          </p>
 
          <div className="mt-6 space-y-3">
            {languages.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-800"
                  >
                    {lang}
                    <button
                      type="button"
                      onClick={() => removeLanguage(lang)}
                      aria-label={`Remove ${lang}`}
                      className="text-gray-400 transition hover:text-red-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
 
            <div>
              <label htmlFor="languageInput" className="mb-2 block text-sm font-medium text-gray-700">
                Add a Language
              </label>
              <input
                id="languageInput"
                type="text"
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                onKeyDown={handleLanguageKeyDown}
                placeholder="e.g. English — press Enter"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Form;