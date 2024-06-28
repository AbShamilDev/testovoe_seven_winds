import "./ProjectItem.style.scss";

export default function ProjectItem({ name }: { name: string }) {
  return (
    <button className={`project_item ${name === "CMP" && "active"}`}>
      <img src="/icons/item.svg" alt="" />
      <span className="project_abbr">{name}</span>
    </button>
  );
}
