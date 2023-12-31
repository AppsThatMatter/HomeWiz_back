import { RequestType } from "../../../utils/req.type";
import { UserService } from "./user.service";

export default class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  async getList() {
    return this.userService.list();
  }

  async create(req: RequestType) {
    const { jwt } = req;
    const { name, email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
      req.set.status = 400;
      return { message: "password not match" };
    }
    const user = await this.userService.findOne({ email });
    if (user) {
      req.set.status = 400;
      return { message: "email already exist" };
    }
    const hashPass = await Bun.password.hash(password, { algorithm: "bcrypt" });
    const newUser = await this.userService.create({
      name,
      email,
      password: hashPass,
    });
    req.set.status = 201;
    const accessToken = await jwt.sign({
      userId: newUser._id,
    });
    return {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: accessToken,
    };
  }

  async getById(req: RequestType) {
    const { id } = req.params;
    const user = await this.userService.getById(id);
    if (!user) {
      req.set.status = 400;
      return { message: "User not found" };
    }
    return user;
  }

  async update(req: RequestType) {
    const data = req.body;
    const { id } = req.params;
    const user = await this.userService.getById(id);
    if (!user) {
      req.set.status = 400;
      return { message: "User not found" };
    }
    await this.userService.update(id, data);
    return { message: "success to updated!!" };
  }
  async addDetail(req: RequestType) {
    console.log(req.body);
    const { id } = req.params;
    const { role, code } = req.body;
    const user = await this.userService.getById(id);
    if (!user) {
      req.set.status = 400;
      return { message: "User not found" };
    }
    await this.userService.setDetail(id, role, code);
    req.set.status = 201;
    return { message: "success to updated!!" };
  }

  async delete(req: RequestType) {
    const { id } = req.params;
    const user = await this.userService.getById(id);
    if (!user) {
      req.set.status = 400;
      return { message: "User not found" };
    }
    await this.userService.delete(id);
    req.set.status = 200;
    return { message: "success to deleted!!" };
  }
}
