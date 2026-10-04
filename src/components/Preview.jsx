
import ModernTemplate from "./Templates/modernTemplate";
import MinimalTemplate from "./Templates/minimalTemplate";
import ClassicTemplate from "./Templates/classicTemplate";

const TEMPLATES = {
  modernTemplate: ModernTemplate,
  minimalTemplate: MinimalTemplate,
  classicTemplate: ClassicTemplate,
};

function Preview({
  selectedTemplate = "modernTemplate",
  zoom = 100,
  cvData = {},
  experienceList = [],
  educationList = [],
  projectsList = [],
  skills = [],
  languages = [],
}) {
  // Look up which template component to render. Falls back to Modern if
  // selectedTemplate is missing or doesn't match a known key.
  const SelectedTemplate = TEMPLATES[selectedTemplate] ?? TEMPLATES.modernTemplate;

  return (
    <div className="flex justify-center p-8">
      {/* The zoom scale is applied here, once, around whichever template is
          active — so zoom logic doesn't need to be duplicated inside every
          template file. */}
      <div
        className="origin-top transition-transform duration-200"
        style={{ transform: `scale(${zoom / 100})` }}
      >
        <SelectedTemplate
          cvData={cvData}
          experienceList={experienceList}
          educationList={educationList}
          projectsList={projectsList}
          skills={skills}
          languages={languages}
        />
      </div>
    </div>
  );
}

export default Preview;