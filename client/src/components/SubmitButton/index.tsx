import styled from 'styled-components';
import CreateIcon from '@material-ui/icons/Create';

export default function SubmitButton() {
  return (
    <Button type="submit">
      <CreateIcon />
    </Button>
  );
}

const Button = styled.button`
  width: 20%;
  height: 50px;
  background-color: #000;

  svg {
    fill: white;
  }
`;
