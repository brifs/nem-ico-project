import {default as UserMongo, User} from "./user.model";
import {Model} from "mongoose";
import {Password} from "./password";

export class UserService {
  mongoModel: Model<User>;

  constructor(mongoModel?: Model<User>) {
    this.mongoModel = mongoModel || UserMongo;
  }

  async create(name: string, email: string, password: string) {

    let user = new this.mongoModel({
      name: name,
      email: email,
      password: Password.encrypt(password).value
    });

    return await user.save();
  }

  async findByEmail(email: string) {
    return await this.mongoModel.findOne({email: email});
  }

  async findById(id: string) {
    return await this.mongoModel.findById(id);
  }
}
