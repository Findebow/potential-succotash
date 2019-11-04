const mongoose = require('mongoose');
const userService = require('../service/userService');
const userId = new mongoose.Types.ObjectId();
const userData = {
    _id: userId,
    first_name: 'Flossi',
    last_name: 'Andersson',
    address: '1 Barnett Point',
    phone: '+688-557-373-6174',
    email: 'fandersson5@mozilla.com'
}




  test('create & save user successfully', done  => {
    
    userService.createUser(userData, async function (result) {
      expect(result._id).toBeDefined();
      expect(result.first_name).toBe(userData.first_name);
      expect(result.last_name).toBe(userData.last_name);
      expect(result.address).toBe(userData.address);
      expect(result.phone).toBe(userData.phone);
      expect(result.email).toBe(userData.email);
      done();
    })

  });


  // Read user

  test('Reads user successfully', async done => {
      userService.getUserById(userId.toString(), function (user) {
        expect(user._id).toBeDefined();
        expect(user.first_name).toBe(userData.first_name);
        expect(user.last_name).toBe(userData.last_name);
        expect(user.address).toBe(userData.address);
        expect(user.phone).toBe(userData.phone);
        expect(user.email).toBe(userData.email);
        done();      
    })

  });


  // Updata user

  test('Update user', async done => {
    const user = {
      _id: userId,
      first_name: 'Flossi',
      last_name: 'Andersson',
      address: '1 Barnett Point',
      phone: '+688-557-373-6174',
      email: 'fandersson5@gmail.com'
    };

    userService.updateUser(userId, user, async function () {
      userService.getUserById(userId, function (updateUser) {
        expect(updateUser.email).toBe(user.email);
        done();
      })
    })

    
  });

  // Delete user

  test('Delete user', async done => {
    userService.deleteUser(userId, function () {
      userService.getUserById(userId, function (emptyUser) {
        expect(emptyUser).toBe(null);
        done();
      });
    })
  });


  // // You shouldn't be able to add in any field that isn't defined in the schema
  // test('insert user successfully, but the field doesnt defined in schema should be undefined', async done => {
  //   const userWithInvalidField = new UserModel({
  //     first_name: 'Flossi',
  //     last_name: 'Andersson',
  //     address: '1 Barnett Point',
  //     phone: '+688-557-373-6174',
  //     email: 'fandersson5@mozilla.com',
  //     nickname: "Floffi" 
  //   });
  //   const savedUserWithInvalidField = await userWithInvalidField.save();
  //   expect(savedUserWithInvalidField._id).toBeDefined();
  //   expect(savedUserWithInvalidField.nickname).toBeUndefined();
  //   done();
  // });

  // // It should us told us the errors in on gender field.

  // test('create user without required field should failed', async done => {
  //   const userWithoutRequiredField = new UserModel({first_name: 'Flossi'});
  //   let err;
  //   try {
  //     const savedUserWithoutInvalidField = await userWithoutRequiredField.save();
  //     error = savedUserWithoutInvalidField;
  //   } catch (error){
  //     err = error;
  //   }
  //   expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  //   expect(err.errors.address).toBeDefined();
  //   expect(err.errors.phone).toBeDefined();
  //   expect(err.errors.email).toBeDefined();
  //   done();
  // })


