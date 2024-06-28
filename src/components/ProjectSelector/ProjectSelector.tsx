import ProjectItem from "./ProjectItem/ProjectItem";
import "./ProjectSelector.style.scss";

const projects = [{ name: "По проекту" }, { name: "Объекты" }, { name: "CMP" }];

export default function ProjectSelector() {
  return (
    <div className="p_selector_wrapper">
      <div className="p_selector_header">
        <div className="text_block">
          <span className="p_selector_name">Название проекта</span>
          <span className="p_selector_abbr">Аббревиатура</span>
        </div>
        <img src="/icons/selector_arrow.svg" alt="" />
      </div>
      {projects.map((project) => (
        <ProjectItem key={project.name} name={project.name} />
      ))}
    </div>
  );
}
