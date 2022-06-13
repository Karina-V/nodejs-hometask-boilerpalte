const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO: Implement methods to work with fighters
    getFighters() {
        return FighterRepository.getAll();
    }

    getFighterById(id) {
        return FighterRepository.getOne({ id });
    }

    addFighter(data) {
        return FighterRepository.create(data);
    }

    updateFighter(id, data) {
        return FighterRepository.update(id, data);
    }

    deleteFighter(id) {
        return FighterRepository.delete(id);

    }
}

module.exports = new FighterService();