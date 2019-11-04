const mongoose = require('mongoose');
const pubService = require('../service/publicationService');
const pubId = new mongoose.Types.ObjectId();
const auth = "admin";
const userData = {_id: pubId, editor_first_name: 'TekLoon', editor_last_name: 'Male', publication_title: "new Date()", isbn: 'Facebook', type: "printed", journal: "Frontiers", year: 2000, rating_count: 3, total_rating: 3 };
const updateData = {_id: pubId, editor_first_name: 'TekLoon', editor_last_name: 'Male', publication_title: "new Date()", isbn: 'Twitter', type: "printed", journal: "Frontiers", year: 2000, rating_count: 3, total_rating: 3 };


test('create publication successfully', done => {
    pubService.addPublication(userData, auth, async function (result) {
        expect(result.editor_first_name).toBe(userData.editor_first_name);
        expect(result.editor_last_name).toBe(userData.editor_last_name);
        expect(result.publication_title).toBe(userData.publication_title);
        expect(result.isbn).toBe(userData.isbn);
        expect(result.type).toBe(userData.type);
        expect(result.journal).toBe(userData.journal);
        expect(result.year).toBe(userData.year);
        expect(result.rating_count).toBe(userData.rating_count);
        expect(result.total_rating).toBe(userData.total_rating);
        done();
    });
})

test('read publication successfully', async done => {
        const readPub = await pubService.getPublicationsById(pubId.toString());
        expect(readPub.editor_first_name).toBe(userData.editor_first_name);
        expect(readPub.editor_last_name).toBe(userData.editor_last_name);
        expect(readPub.publication_title).toBe(userData.publication_title);
        expect(readPub.isbn).toBe(userData.isbn);
        expect(readPub.type).toBe(userData.type);
        expect(readPub.journal).toBe(userData.journal);
        expect(readPub.year).toBe(userData.year);
        expect(readPub.rating_count).toBe(userData.rating_count);
        expect(readPub.total_rating).toBe(userData.total_rating);
        done();
})

test('update publication successfully', async done => {
    pubService.updatePublication(pubId, updateData, async function (userData) {
        const getUpdateData = await pubService.getPublicationsById({pubId});
        expect(getUpdateData.isbn).toBe(userData.isbn);
        done();
    });
})

test('delete publication', async done => {
    pubService.deletePublication(pubId, auth, async function () {
        const getUpdateData = await pubService.getPublicationsById({pubId});
        expect(getUpdateData.isbn).toBe(undefined);
        done();
    })
})