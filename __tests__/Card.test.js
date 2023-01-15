import {shallow} from 'enzyme';
import Card from '../components/Card';
describe('RecipeCard', () => {
  let wrapper;
  let recipe;
  let recipeId;
  let navigation = {navigate: jest.fn()};

  beforeEach(() => {
    recipe = {
      name: 'test recipe',
      image: 'test_image.jpg',
      likes: 10,
      rating: 4,
      time: 30,
    };
    recipeId = '123';
    wrapper = shallow(
      <Card recipe={recipe} recipeId={recipeId} navigation={navigation} />,
    );
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should navigate to the recipe when the TouchableOpacity is pressed', () => {
    wrapper.find('TouchableOpacity').simulate('press');
    expect(navigation.navigate).toHaveBeenCalledWith('Recipe', {recipeId});
  });
});
