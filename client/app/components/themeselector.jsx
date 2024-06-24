import { ToggleButton } from 'primereact/togglebutton';
import { useEffect, useState } from 'react';
const ThemeSelector = ({ theme, setTheme }) => {

  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const checked = localStorage.getItem('checked');
    setChecked(checked === 'true');
    if (theme) {
      setTheme(theme);
    }
  }, []);




  const onChange = e => {
    setDisabled(true);
    setChecked(e.value);

    document.documentElement.style.opacity = 0;
    const logo = document.getElementById(`logo-${theme}`);
    const options = checked ? 'mira' : 'arya-blue';

    if (checked) {
      logo.classList.remove('dark');
      logo.classList.add('light');
    } else {
      logo.classList.remove('light');
      logo.classList.add('dark');
    }

    localStorage.setItem('theme', options);
    localStorage.setItem('checked', !checked);

    setTimeout(() => {
      document.documentElement.style.opacity = 1;
      setDisabled(false);
    }, 250);
    setTimeout(() => {
      setTheme(options);
    }, 300);
  };

  return (
    <div className="theme-selector">
      <ToggleButton
        onIcon="pi pi-sun"
        offIcon="pi pi-moon"
        onLabel=''
        offLabel=''
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default ThemeSelector;
