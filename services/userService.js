const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user

    search(search) {
        const item = UserRepository.getOne(search);
        if (!item) {
            return null;
        }
        return item;
    }

    create(userData) {
        return UserRepository.create(userData) || null;
    }

    update(userId, userDataToUpdate) {
        return UserRepository.update(userId, userDataToUpdate) || null;
    }
}

module.exports = new UserService();