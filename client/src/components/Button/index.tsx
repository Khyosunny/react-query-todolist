import styled from 'styled-components';
import CreateIcon from '@material-ui/icons/Create';

export default function Button() {
  return (
    <CustomButton type="submit">
      <CreateIcon />
    </CustomButton>
  );
}

const CustomButton = styled.button`
  width: 20%;
  height: 50px;
  background-color: #000;

  svg {
    fill: white;
  }
`;
