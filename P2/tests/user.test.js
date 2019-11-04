const mongoose = require('mongoose');
const UserModel = require('./testSchemas/UserTest');
const userData = {
    first_name: 'Flossi',
    last_name: 'Andersson',
    address: '1 Barnett Point',
    phone: '+688-557-373-6174',
    email: 'fandersson5@mozilla.com'
}

describe('User Model Test', () => {

  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
      if(err) {
        console.error(err);
        process.exit(1);
      }
    });
  });


  it('create & save user successfully', async () => {
    const validUser = new UserModel(userData);
    const savedUser = await validUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.first_name).toBe(userData.first_name);
    expect(savedUser.last_name).toBe(userData.last_name);
    expect(savedUser.address).toBe(userData.address);
    expect(savedUser.phone).toBe(userData.phone);
    expect(savedUser.email).toBe(userData.email);
  });


  // Read user

  it('Reads user successfully', async () => {
    const users = await UserModel.find({});
    const user = users[0];

    expect(user._id).toBeDefined();
    expect(user.first_name).toBe(userData.first_name);
    expect(user.last_name).toBe(userData.last_name);
    expect(user.address).toBe(userData.address);
    expect(user.phone).toBe(userData.phone);
    expect(user.email).toBe(userData.email);
  });


  // Updata user

  it('Update user', async () => {
    const user = new UserModel({ 
    first_name: 'Flossi',
    last_name: 'Andersson',
    address: '1 Barnett Point',
    phone: '+688-557-373-6174',
    email: 'fandersson5@mozilla.com'
    });
    await UserModel.updateOne({first_name: 'Flossi'},
    {
    first_name: user.first_name,
    last_name: user.last_name,
    address: user.address,
    phone: user.phone,
    email: user.email
    });

    const updateUser = await UserModel.find({});
    const us = updateUser[0];

    expect(us._id).toBeDefined();
    expect(us.first_name).toBe(user.first_name);
    expect(us.last_name).toBe(user.last_name);
    expect(us.address).toBe(user.address);
    expect(us.phone).toBe(user.phone);
    expect(us.email).toBe(user.email);
  });

  // Delete user

  it('Delete user', async() => {
    await UserModel.deleteOne({first_name: "Flossi"});
    const emptyPub = await UserModel.find({});
    expect(emptyPub.length).toBe(0);
  });


  // You shouldn't be able to add in any field that isn't defined in the schema
  it('insert user successfully, but the field doesnt defined in schema should be undefined', async () => {
    const userWithInvalidField = new UserModel({
      first_name: 'Flossi',
      last_name: 'Andersson',
      address: '1 Barnett Point',
      phone: '+688-557-373-6174',
      email: 'fandersson5@mozilla.com',
      nickname: "Floffi" 
    });
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.nickname).toBeUndefined();
  });

  // It should us told us the errors in on gender field.

  it('create user without required field should failed', async() => {
    const userWithoutRequiredField = new UserModel({first_name: 'Flossi'});
    let err;
    try {
      const savedUserWithoutInvalidField = await userWithoutRequiredField.save();
      error = savedUserWithoutInvalidField;
    } catch (error){
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.address).toBeDefined();
    expect(err.errors.phone).toBeDefined();
    expect(err.errors.email).toBeDefined();
  })


})

