const mongoose = require('mongoose');
const UserModel = require('./testSchemas/PublicationTest');
const userData = { editor_first_name: 'TekLoon', editor_last_name: 'Male', publication_title: "new Date()", isbn: 'Facebook', type: "printed", journal: "Frontiers", year: 2000, rating_count: 3, total_rating: 3, average_rating: 3 };

describe('Publication Model Test', () => {

    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
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
        expect(savedUser.journal).toBe(userData.journal);
        expect(savedUser.year).toBe(userData.year);
        expect(savedUser.rating_count).toBe(userData.rating_count);
        expect(savedUser.total_rating).toBe(userData.total_rating);
        expect(savedUser.average_rating).toBe(userData.average_rating);
    });

    // Read publication
    it('Read publication successfully', async () => {
        const publications = await UserModel.find({});
        const publication = publications[0];

        expect(publication._id).toBeDefined();
        expect(publication.editor_first_name).toBe(userData.editor_first_name);
        expect(publication.editor_last_name).toBe(userData.editor_last_name);
        expect(publication.publication_title).toBe(userData.publication_title);
        expect(publication.isbn).toBe(userData.isbn);
        expect(publication.type).toBe(userData.type);
        expect(publication.journal).toBe(userData.journal);
        expect(publication.year).toBe(userData.year);
        expect(publication.rating_count).toBe(userData.rating_count);
        expect(publication.total_rating).toBe(userData.total_rating);
        expect(publication.average_rating).toBe(userData.average_rating);
    });

    // Update publication
    it('Update publication', async () => {
        const publication = new UserModel({ editor_first_name: 'TekLoon', editor_last_name: 'Male', publication_title: "new Date()", isbn: 'Twitter', type: "printed", journal: "Frontiers", year: 2000, rating_count: 3, total_rating: 3, average_rating: 3 });
        await UserModel.updateOne({editor_first_name: "TekLoon"}, 
        {
            editor_first_name: publication.editor_first_name,
            editor_last_name: publication.editor_last_name,
            publication_title: publication.publication_title,
            isbn: publication.isbn,
            type: publication.type,
            journal: publication.journal,
            year: publication.year,
            rating_count: publication.rating_count,
            total_rating: publication.total_rating,
            average_rating: publication.average_rating
        });
        const updatePublication = await UserModel.find({});
        const pub = updatePublication[0];

        expect(pub._id).toBeDefined();
        expect(pub.editor_first_name).toBe(publication.editor_first_name);
        expect(pub.editor_last_name).toBe(publication.editor_last_name);
        expect(pub.publication_title).toBe(publication.publication_title);
        expect(pub.isbn).toBe(publication.isbn);
        expect(pub.type).toBe(publication.type);
        expect(pub.journal).toBe(publication.journal);
        expect(pub.year).toBe(publication.year);
        expect(pub.rating_count).toBe(publication.rating_count);
        expect(pub.total_rating).toBe(publication.total_rating);
        expect(pub.average_rating).toBe(publication.average_rating);
    });

    // Delete publication
    it('Delete publication', async () => {
        await UserModel.deleteOne({editor_first_name: "TekLoon"});
        const emptyPub = await UserModel.find({});

        expect(emptyPub.length).toBe(0);

    });

    // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
        const userWithInvalidField = new UserModel({ editor_first_name: 'TekLoon', editor_last_name: 'Male', publication_title: "new Date()", isbn: 'Facebook', type: "printed", journal: "Frontiers", year: 2000, rating_count: 3, total_rating: 3, average_rating: 3, nickkname: "the_bad" });
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
        expect(err.errors.publication_title).toBeDefined();
        expect(err.errors.isbn).toBeDefined();
        expect(err.errors.journal).toBeDefined();
    });

    
})