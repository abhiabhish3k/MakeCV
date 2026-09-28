
import { formatRange } from "./date";

/** A section heading + thin divider, reused by every block below. */
function SectionHeading({ children }) {
  return (
    <>
      <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">
        {children}
      </h2>
      <div className="mt-2 h-px bg-slate-300" />
    </>
  );
}

function ClassicTemplate({
  cvData,
  experienceList = [],
  educationList = [],
  projectsList = [],
  skills = [],
  languages = [],
}) {
  // Only show a section once it actually has content — an empty card with
  // just a heading looks like a mistake, not a "fill this in" prompt.
  const hasExperience = experienceList.some((exp) => exp.jobTitle || exp.orgname);
  const hasEducation = educationList.some((edu) => edu.degree || edu.institution);
  const hasProjects = projectsList.some((proj) => proj.projectName);
  const hasSkills = skills.length > 0;
  const hasLanguages = languages.length > 0;
  const hasSummary = Boolean(cvData.professionalSummary);

  // Contact line: join only the fields that are filled in, so there's never
  // a trailing or doubled "•" when e.g. no portfolio URL has been entered yet.
  const contactItems = [
    cvData.email,
    cvData.phone,
    cvData.location,
    cvData.portfolioURL,
    cvData.LinkedinURL,
  ].filter(Boolean);

  return (
    <div className="w-full max-w-[794px] min-h-[1123px] bg-white px-14 py-14 shadow-2xl font-serif">
      {/* Header */}
      <header className="border-b-2 border-slate-900 pb-7 text-center">
        <h1 className="text-4xl font-bold uppercase tracking-wide text-slate-900">
          {cvData.name || "Your Name"}
        </h1>

        {cvData.jobTitle && (
          <p className="mt-3 text-lg italic text-slate-600">{cvData.jobTitle}</p>
        )}

        {contactItems.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-x-2 gap-y-1 text-xs text-slate-600">
            {contactItems.map((item, index) => (
              <span key={item} className="flex items-center gap-2">
                {index > 0 && <span className="text-slate-400">•</span>}
                {item}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Professional Summary */}
      {hasSummary && (
        <section className="mt-8">
          <SectionHeading>Professional Summary</SectionHeading>
          <p className="mt-4 text-sm leading-7 text-slate-700">{cvData.professionalSummary}</p>
        </section>
      )}

      {/* Experience */}
      {hasExperience && (
        <section className="mt-8">
          <SectionHeading>Professional Experience</SectionHeading>

          <div className="mt-5 space-y-6">
            {experienceList
              .filter((exp) => exp.jobTitle || exp.orgname)
              .map((exp) => {
                const range = formatRange(exp.startDate, exp.endDate, exp.isCurrent);
                const bullets = exp.description
                  ? exp.description.split("\n").filter((line) => line.trim())
                  : [];

                return (
                  <div key={exp.id}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        {exp.jobTitle && (
                          <h3 className="text-base font-bold text-slate-900">
                            {exp.jobTitle}
                          </h3>
                        )}
                        {exp.orgname && (
                          <p className="mt-1 text-sm italic text-slate-600">{exp.orgname}</p>
                        )}
                      </div>

                      {range && (
                        <span className="shrink-0 whitespace-nowrap text-xs text-slate-500">
                          {range}
                        </span>
                      )}
                    </div>

                    {bullets.length > 0 && (
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
                        {bullets.map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
          </div>
        </section>
      )}

      {/* Education */}
      {hasEducation && (
        <section className="mt-8">
          <SectionHeading>Education</SectionHeading>

          <div className="mt-5 space-y-5">
            {educationList
              .filter((edu) => edu.degree || edu.institution)
              .map((edu) => {
                const range = formatRange(edu.startDate, edu.endDate, edu.isCurrent);
                return (
                  <div key={edu.id} className="flex items-start justify-between gap-4">
                    <div>
                      {edu.degree && (
                        <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                      )}
                      {edu.institution && (
                        <p className="mt-1 text-sm italic text-slate-600">
                          {edu.institution}
                        </p>
                      )}
                      {edu.description && (
                        <p className="mt-1.5 text-sm leading-6 text-slate-700">
                          {edu.description}
                        </p>
                      )}
                    </div>

                    {range && (
                      <span className="shrink-0 whitespace-nowrap text-xs text-slate-500">
                        {range}
                      </span>
                    )}
                  </div>
                );
              })}
          </div>
        </section>
      )}

      {/* Projects */}
      {hasProjects && (
        <section className="mt-8">
          <SectionHeading>Projects</SectionHeading>

          <div className="mt-5 space-y-5">
            {projectsList
              .filter((proj) => proj.projectName)
              .map((proj) => {
                const range = formatRange(proj.startDate, proj.endDate, proj.isCurrent);
                return (
                  <div key={proj.id}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">
                          {proj.projectName}
                          {proj.projectURL && (
                            <span className="ml-2 text-xs font-normal italic text-slate-500">
                              {proj.projectURL}
                            </span>
                          )}
                        </h3>
                      </div>

                      {range && (
                        <span className="shrink-0 whitespace-nowrap text-xs text-slate-500">
                          {range}
                        </span>
                      )}
                    </div>

                    {proj.description && (
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {proj.description}
                      </p>
                    )}
                  </div>
                );
              })}
          </div>
        </section>
      )}

      {/* Skills */}
      {hasSkills && (
        <section className="mt-8">
          <SectionHeading>Skills</SectionHeading>
          <p className="mt-4 text-sm leading-7 text-slate-700">{skills.join("  •  ")}</p>
        </section>
      )}

      {/* Languages */}
      {hasLanguages && (
        <section className="mt-8">
          <SectionHeading>Languages</SectionHeading>
          <p className="mt-4 text-sm leading-7 text-slate-700">{languages.join("  •  ")}</p>
        </section>
      )}
    </div>
  );
}

export default ClassicTemplate;