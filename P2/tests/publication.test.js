const mongoose = require('mongoose');
const UserModel = require('./testSchemas/PublicationTest');
const userData = { editor_first_name: 'TekLoon', editor_last_name: 'Male', publication_title: "new Date()", isbn: 'Facebook', type: "printed", journal: "Frontiers", year: 2000 };

describe('Publication Model Test', () => {

    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save publication successfully', async () => {
        const validUser = new UserModel(userData);
        const savedUser = await validUser.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedUser._id).toBeDefined();
        expect(savedUser.editor_first_name).toBe(userData.editor_first_name);
        expect(savedUser.editor_last_name).toBe(userData.editor_last_name);
        expect(savedUser.publication_title).toBe(userData.publication_title);
        expect(savedUser.isbn).toBe(userData.isbn);
        expect(savedUser.type).toBe(userData.type);
        expect(savedUser.jounal).toBe(userData.jounal);
        expect(savedUser.year).toBe(userData.year);
    });

    // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
        const userWithInvalidField = new UserModel({ editor_first_name: 'TekLoon', editor_last_name: 'Male', publication_title: "new Date()", isbn: 'Facebook', type: "printed", journal: "Frontiers", year: 2000, nickname: "the_bad_book" });
        const savedUserWithInvalidField = await userWithInvalidField.save();
        expect(savedUserWithInvalidField._id).toBeDefined();
        expect(savedUserWithInvalidField.nickkname).toBeUndefined();
    });

    // Test Validation is working!!!
    // It should us told us the errors in on gender field.
    it('create user without required field should failed', async () => {
        const userWithoutRequiredField = new UserModel({ editor_first_name: 'TekLoon' });
        let err;
        try {
            const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
            error = savedUserWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.editor_last_name).toBeDefined();
        expect(err.errors.publication_title).toBeDefined();
        expect(err.errors.isbn).toBeDefined();
        expect(err.errors.type).toBeDefined();
        expect(err.errors.jounal).toBeDefined();
        expect(err.errors.year).toBeDefined();
    });

    
})