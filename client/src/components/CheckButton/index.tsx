import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

interface CheckButtonProps {
  completed: boolean;
  handleComplete: () => void;
}

export default function CheckButton({
  completed,
  handleComplete,
}: CheckButtonProps) {
  return (
    <button onClick={handleComplete}>
      {completed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
    </button>
  );
}
