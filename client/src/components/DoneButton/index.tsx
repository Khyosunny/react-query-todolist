import styled from 'styled-components';
import DoneIcon from '@material-ui/icons/Done';

export default function DoneButton() {
  return (
    <Button type="submit">
      <DoneIcon />
    </Button>
  );
}

const Button = styled.button`
  height: 40px;
  padding-left: 10px;

  svg {
    fill: green;
  }
`;
