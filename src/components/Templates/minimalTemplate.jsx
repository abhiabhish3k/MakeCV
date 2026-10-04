
import { formatRange } from "./date";

/** One section: quiet label on the left, content on the right, hairline on top. */
function Section({ title, children }) {
  return (
    <section className="grid grid-cols-[110px_1fr] gap-8 border-t border-slate-100 py-8">
      <h2 className="pt-0.5 text-[10px] font-medium uppercase tracking-[0.25em] text-slate-400">
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

/** One entry (a job, degree or project): title + date on one line, meta below. */
function Entry({ title, meta, range, description }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-6">
        <h3 className="text-sm font-medium text-slate-900">{title}</h3>
        {range && (
          <span className="shrink-0 whitespace-nowrap text-xs tabular-nums text-slate-400">
            {range}
          </span>
        )}
      </div>

      {meta && <p className="mt-0.5 text-sm text-slate-500">{meta}</p>}

      {description && (
        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}

function MinimalTemplate({
  cvData = {},
  experienceList = [],
  educationList = [],
  projectsList = [],
  skills = [],
  languages = [],
}) {
  // Keep only entries that have something meaningful filled in.
  const experiences = experienceList.filter((exp) => exp.jobTitle || exp.orgname);
  const educations = educationList.filter((edu) => edu.degree || edu.institution);
  const projects = projectsList.filter((proj) => proj.projectName);

  // Contact details: only the fields that are filled in.
  const contactItems = [
    cvData.email,
    cvData.phone,
    cvData.location,
    cvData.portfolioURL,
    cvData.LinkedinURL,
  ].filter(Boolean);

  return (
    <div className="w-full max-w-[794px] min-h-[1123px] bg-white px-16 py-16 font-sans shadow-2xl">
      {/* Header */}
      <header className="pb-10">
        <h1 className="text-4xl font-light tracking-tight text-slate-900">
          {cvData.name || "Your Name"}
        </h1>

        {cvData.jobTitle && (
          <p className="mt-2 text-sm text-slate-500">{cvData.jobTitle}</p>
        )}

        {contactItems.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-400">
            {contactItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        )}
      </header>

      {/* About */}
      {cvData.professionalSummary && (
        <Section title="About">
          <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
            {cvData.professionalSummary}
          </p>
        </Section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <Section title="Experience">
          <div className="space-y-7">
            {experiences.map((exp) => (
              <Entry
                key={exp.id}
                title={exp.jobTitle}
                meta={exp.orgname}
                range={formatRange(exp.startDate, exp.endDate, exp.isCurrent)}
                description={exp.description}
              />
            ))}
          </div>
        </Section>
      )}

      {/* Education */}
      {educations.length > 0 && (
        <Section title="Education">
          <div className="space-y-7">
            {educations.map((edu) => (
              <Entry
                key={edu.id}
                title={edu.degree}
                meta={edu.institution}
                range={formatRange(edu.startDate, edu.endDate, edu.isCurrent)}
                description={edu.description}
              />
            ))}
          </div>
        </Section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <Section title="Projects">
          <div className="space-y-7">
            {projects.map((proj) => (
              <Entry
                key={proj.id}
                title={proj.projectName}
                meta={proj.projectURL}
                range={formatRange(proj.startDate, proj.endDate, proj.isCurrent)}
                description={proj.description}
              />
            ))}
          </div>
        </Section>
      )}

      {/* Skills — plain text, no chips */}
      {skills.length > 0 && (
        <Section title="Skills">
          <p className="text-sm leading-7 text-slate-600">{skills.join(", ")}</p>
        </Section>
      )}

      {/* Languages — plain text, no chips */}
      {languages.length > 0 && (
        <Section title="Languages">
          <p className="text-sm leading-7 text-slate-600">{languages.join(", ")}</p>
        </Section>
      )}
    </div>
  );
}

export default MinimalTemplate;