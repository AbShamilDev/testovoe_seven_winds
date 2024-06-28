import "./HeaderControl.style.scss";

const modes = ["Просмотр", "Управление"];

export default function HeaderControl() {
  return (
    <header className="app_header">
      <button>
        <img src="/icons/to_main.svg" alt="" />
      </button>
      <button>
        <img src="/icons/share.svg" alt="" />
      </button>
      <div className="mode_buttons">
        {modes.map((modeName) => (
          <button key={modeName} className={`${modeName === "Просмотр" && "active"}`}>
            {modeName}
          </button>
        ))}
      </div>
    </header>
  );
}
