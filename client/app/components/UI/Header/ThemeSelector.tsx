import { ToggleButton, ToggleButtonChangeEvent } from "primereact/togglebutton";
import { useState } from "react";
import type { ThemeContextType } from "../../../context/ThemeContext/ThemeContext";

interface ThemeSelectorProps {
  theme: ThemeContextType;
  setTheme: (theme: ThemeContextType) => void;
}

const ThemeSelector = ({ theme, setTheme }: ThemeSelectorProps) => {
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onChange = (e: ToggleButtonChangeEvent) => {
    setDisabled(true);
    setChecked(e.value);

    document.documentElement.style.opacity = "0";

    const logo = document.getElementById(`logo-${theme}`);
    const options = checked ? "mira" : "arya-blue";

    setTimeout(() => {
      document.documentElement.style.opacity = "1";
      setDisabled(false);
    }, 250);

    setTimeout(() => {
      console.log(options);

      setTheme(options);
    }, 300);

    if (!logo) return;

    if (checked) {
      logo.classList.remove("dark");
      logo.classList.add("light");
    } else {
      logo.classList.remove("light");
      logo.classList.add("dark");
    }
  };

  return (
    <div className="theme-selector">
      <ToggleButton
        onIcon="pi pi-sun"
        offIcon="pi pi-moon"
        onLabel=""
        offLabel=""
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default ThemeSelector;
