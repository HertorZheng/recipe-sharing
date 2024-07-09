const mongoose = require('mongoose');
const { User, Recipe } = require('./model');

mongoose.connect('mongodb://localhost:27017/recipe-proj', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});


async function runCRUDOperations() {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        message: req.body.message
    });

    await newUser.save();
    console.log('User created:', newUser);

    const newRecipe = new Recipe({
        title: req.body.title,
        description: req.body.description,
        message: req.body.message
    });

    await newRecipe.save();
    console.log('Recipe created:', newRecipe);

    const users = await User.find();
    console.log('Users:', users);

    const recipes = await Recipe.find();
    console.log('Recipes:', recipes);

    exports.updateUser = async (req, res) => {
        if (!req.body) {
            return res.status(400).send({ message: "Data to update cannot be empty" });
        }
    
        const id = req.params.id;
    
        try {
            const userUpdate = await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true });
    
            if (!userUpdate) {
                return res.status(404).send({ message: `Cannot update user with id=${id}. User not found!` });
            }
    
            res.send(userUpdate);
        } catch (err) {
            res.status(500).send({ message: "Error updating user information" });
        }
    };
    exports.deleteUser = async (req, res) => {
        const id = req.params.id;
    
        try {
            const userDelete = await User.findByIdAndDelete(id);
    
            if (!userDelete) {
                return res.status(404).send({ message: `Cannot delete user with id=${id}. User not found!` });
            }
    
            res.send({ message: "User was deleted successfully!" });
        } catch (err) {
            res.status(500).send({ message: "Could not delete user with id=" + id });
        }
    };

    exports.updateRecipe = async (req, res) => {
        if (!req.body) {
            return res.status(400).send({ message: "Data to update cannot be empty" });
        }
    
        const id = req.params.id;
    
        try {
            const recipeUpdate = await Recipe.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true });
    
            if (!recipeUpdate) {
                return res.status(404).send({ message: `Cannot update recipe with id=${id}. Recipe not found!` });
            }
    
            res.send(recipeUpdate);
        } catch (err) {
            res.status(500).send({ message: "Error updating recipe information" });
        }
    };
    exports.deleteRecipe = async (req, res) => {
        const id = req.params.id;
    
        try {
            const recipeDelete = await Recipe.findByIdAndDelete(id);
    
            if (!recipeDelete) {
                return res.status(404).send({ message: `Cannot delete recipe with id=${id}. Recipe not found!` });
            }
    
            res.send({ message: "Recipe was deleted successfully!" });
        } catch (err) {
            res.status(500).send({ message: "Could not delete recipe with id=" + id });
        }
    };
    
}
runCRUDOperations().catch(err => console.error(err));
