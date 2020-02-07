import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 30px;
  flex: 1;
  background-color: #fff;
`;

export const Header = styled.View`
  align-items: center;
`;

export const Avatar = styled.Image`
  height: 150px;
  width: 150px;
  border-radius: 100px;
  margin: 10px;
`;

export const Bio = styled.Text`
  text-align: center;
  margin: 5px;
`;

export const Name = styled.Text`
  text-align: center;
  margin: 5px;
  font-size: 25px;
  font-weight: bold;
`;

export const List = styled.FlatList``;

export const Holder = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #eee;
  border-radius: 10px;
  padding: 5px;
  height: 80px;
  margin: 10px 0px;
`;

export const TextHolder = styled.View``;

export const GitImage = styled.Image`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  margin-right: 10px;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-weight: bold;
  font-size: 16px;
`;

export const Owner = styled.Text``;
