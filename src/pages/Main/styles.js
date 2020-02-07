import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
  background-color: #ffff;
`;

export const Form = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
  border-width: 0px;
  border-bottom-width: 1px;
`;

export const Input = styled.TextInput`
  width: 80%;
  height: 50px;
  border-radius: 5px;
  background-color: #f2f2f2;
  margin-bottom: 20px;
  padding: 0 10px;
`;

export const Submit = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  margin-left: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.loading ? 'rgba(51, 51, 51, 0.5)' : '#333333'};
`;

export const List = styled.FlatList``;

export const User = styled.View`
  align-items: center;
  margin: 20px;
`;

export const Avatar = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 40px;
`;

export const Name = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin: 5px;
`;
export const Bio = styled.Text.attrs({
  numberOfLines: 2,
})`
  margin: 5px;
  text-align: center;
`;

export const ProfileButton = styled.TouchableOpacity`
  background: #333333;
  margin: 5px;
  width: 85%;
  padding: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;
export const ProfileButtonText = styled.Text`
  color: #fff;
`;
