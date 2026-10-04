import { formatRange } from "./date";

/** Small uppercase section label + hairline, used in the main column. */
function MainSectionHeading({ children }) {
  return (
    <>
      <h2 className="text-[clamp(0.55rem,1.2vw,0.7rem)] font-bold uppercase tracking-[0.2em] text-slate-900">
        {children}
      </h2>
      <div className="mb-4 mt-2 h-px w-full bg-slate-200" />
    </>
  );
}

/** One entry in the main column: title + date on one line, org below, then description. */
function MainEntry({ title, meta, range, description, className = "" }) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="break-words text-[clamp(0.65rem,1.4vw,0.82rem)] font-bold text-slate-900">
            {title}
          </h3>
          {meta && (
            <p className="mt-1 text-[clamp(0.55rem,1.15vw,0.7rem)] text-slate-500">{meta}</p>
          )}
        </div>

        {range && (
          <span className="shrink-0 text-[clamp(0.5rem,1vw,0.62rem)] text-slate-400">
            {range}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-2 whitespace-pre-line text-[clamp(0.55rem,1.15vw,0.7rem)] leading-[1.7] text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}

function ModernTemplate({
  cvData,
  experienceList = [],
  educationList = [],
  projectsList = [],
  skills = [],
  languages = [],
}) {
  const experiences = experienceList.filter((exp) => exp.jobTitle || exp.orgname);
  const educations = educationList.filter((edu) => edu.degree || edu.institution);
  const projects = projectsList.filter((proj) => proj.projectName);
  const hasSkills = skills.length > 0;
  const hasLanguages = languages.length > 0;

  // Contact items: only the ones actually filled in, so the header never
  // shows an empty/blank span for a missing field.
  const contactItems = [
    cvData?.email,
    cvData?.phone,
    cvData?.location,
    cvData?.portfolioURL,
    cvData?.LinkedinURL,
  ].filter(Boolean);

  return (
    <div className="mx-auto w-full max-w-[794px] aspect-[210/297] overflow-hidden bg-white text-slate-800 shadow-2xl">
      {/*HEADER*/}
      <header className="bg-slate-900 px-[7%] py-[6%] text-white">
        <h1 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold tracking-tight">
          {cvData?.name || "Your Name"}
        </h1>

        {cvData?.jobTitle && (
          <p className="mt-1 text-[clamp(0.75rem,1.8vw,1.125rem)] text-slate-300">
            {cvData?.jobTitle}
          </p>
        )}

        {contactItems.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[clamp(0.55rem,1.2vw,0.75rem)] text-slate-300">
            {contactItems.map((item) => (
              <span key={item} className="break-all">
                {item}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* BODY  */}
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_28%]">
        {/*  MAIN  */}
        <main className="min-w-0 px-[7%] py-[6%]">
          {/* -------- PROFILE -------- */}
          {cvData?.summary && (
            <section className="mb-[7%]">
              <MainSectionHeading>Profile</MainSectionHeading>
              <p className="whitespace-pre-line text-[clamp(0.6rem,1.25vw,0.75rem)] leading-[1.7] text-slate-600">
                {cvData?.summary}
              </p>
            </section>
          )}

          {/*  EXPERIENCE  */}
          {experiences.length > 0 && (
            <section className="mb-[7%]">
              <MainSectionHeading>Experience</MainSectionHeading>

              <div className="space-y-6">
                {experiences.map((exp) => (
                  <MainEntry
                    key={exp.id}
                    title={exp.jobTitle}
                    meta={exp.orgname}
                    range={formatRange(exp.startDate, exp.endDate, exp.isCurrent)}
                    description={exp.description}
                  />
                ))}
              </div>
            </section>
          )}

          {/*  EDUCATION  */}
          {educations.length > 0 && (
            <section className={projects.length > 0 ? "mb-[7%]" : ""}>
              <MainSectionHeading>Education</MainSectionHeading>

              <div className="space-y-6">
                {educations.map((edu) => (
                  <MainEntry
                    key={edu.id}
                    title={edu.degree}
                    meta={edu.institution}
                    range={formatRange(edu.startDate, edu.endDate, edu.isCurrent)}
                    description={edu.description}
                  />
                ))}
              </div>
            </section>
          )}

          {/*  PROJECTS  */}
          {projects.length > 0 && (
            <section>
              <MainSectionHeading>Projects</MainSectionHeading>

              <div className="space-y-6">
                {projects.map((proj) => (
                  <MainEntry
                    key={proj.id}
                    title={proj.projectName}
                    meta={proj.projectURL}
                    range={formatRange(proj.startDate, proj.endDate, proj.isCurrent)}
                    description={proj.description}
                  />
                ))}
              </div>
            </section>
          )}
        </main>

        {/*  SIDEBAR  */}
        <aside className="bg-slate-50 px-[6%] py-[6%] md:block">
          {/* Skills */}
          {hasSkills && (
            <section className={hasLanguages ? "mb-[10%]" : ""}>
              <h2 className="mb-3 text-[clamp(0.5rem,1vw,0.65rem)] font-bold uppercase tracking-[0.2em] text-slate-900">
                Skills
              </h2>

              <div className="space-y-2">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="rounded-md bg-white px-2.5 py-1.5 text-[clamp(0.5rem,1vw,0.68rem)] text-slate-700 shadow-sm"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {hasLanguages && (
            <section>
              <h2 className="mb-3 text-[clamp(0.5rem,1vw,0.65rem)] font-bold uppercase tracking-[0.2em] text-slate-900">
                Languages
              </h2>

              <div className="space-y-2 text-[clamp(0.5rem,1vw,0.68rem)] text-slate-600">
                {languages.map((lang) => (
                  <p key={lang}>{lang}</p>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}

export default ModernTemplate;