import { observable, action } from 'mobx';

class Store {
  user = 'sander';
   isLoading = false;

  setUser(user) {
    this.user = user;
  }

  setLoading(isLoading) {
    this.isLoading = isLoading;
  }
}

decorate(Store, {
  user: observable,
  isLoading: observable,
  setUser: action,
  setLoading: action
});
export default new Store();