import styled from "styled-components/native";

export const HomeContainer = styled.View`
  flex: 1;

  align-items: center;
`;

export const Box = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;

  margin-top: 16px;
  margin-bottom: 24px;
  align-self: flex-start;
  padding: 0 16px;
`;

export const Temp = styled.View`
  width: 70%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  margin-top: 30px;
`;

export const Input = styled.TextInput`
  flex: 2;
  height: 45px;
  border-radius: 8px;
  border: 1px solid #ccc;

  margin-right: 10px;
  padding: 0 16px;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.COLORS.white};
  color: ${({ theme }) => theme.COLORS.white};
  height: 45px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.bold};
  font-size: ${({ theme }) => theme.FONT_SIZE.large}px;
  margin-vertical: 30px;
`;
