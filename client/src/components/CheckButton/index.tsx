import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { TodoType } from '../../types/todoType';

interface CheckButtonProps {
  data: TodoType;
  handleComplete: (e: React.SyntheticEvent, data: TodoType) => void;
}

export default function CheckButton({
  data,
  handleComplete,
}: CheckButtonProps) {
  return (
    <button onClick={(e) => handleComplete(e, data)}>
      {data.completed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
    </button>
  );
}
