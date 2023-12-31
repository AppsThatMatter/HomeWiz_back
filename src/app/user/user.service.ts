import { User } from "../models/user.model";
import { IUser } from "./interface/user.interface";

export class UserService {
  private userModel = User;
  constructor() {}

  async list() {
    return this.userModel.find();
  }

  async create(data: IUser) {
    return this.userModel.create(data);
  }

  async findOne(query: any) {
    return this.userModel.findOne(query);
  }

  async update(id: string, data: IUser) {
    return this.userModel.findByIdAndUpdate(id, data);
  }

  async getById(id: string) {
    return this.userModel.findById(id);
  }
  async setDetail(id: string, role: string, code: string) {
    return this.userModel.findByIdAndUpdate(id, { role, code });
  }

  async delete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
