import { ALL, Body, Controller, Del, Get, Inject, Param, Post, Provide, Put, Query } from "@midwayjs/core";
import { UserService } from "../service/user.service";
import { Validate } from "@midwayjs/validate";
import { UserDTO } from "../dto/user.dto";
import { User } from "../entity/user.entity";

@Provide()
@Controller('/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Post('/')
  @Validate()
  async create(@Body(ALL) data: UserDTO) {
    const user = new User();
    user.name = data.name;
    user.age = data.age;
    user.description = data.description;
    return await this.userService.create(user);
  }

  @Put('/')
  @Validate()
  async update(@Body(ALL) data: UserDTO) {
    const user = new User();
    user.id = data.id;
    user.name = data.name;
    user.age = data.age;
    return await this.userService.update(user);
  }

  @Del('/:id')
  async delete(id: number) {
    const user = new User();
    user.id = id;
    return await this.userService.delete(user);
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    return await this.userService.getById(id);
  }

  @Get('/page')
  async page(@Query('page') page: number, @Query('size') size: number) {
    console.log('啦啦啦', page, size);
    return await this.userService.page(page, size);
  }

  @Get('/list')
  async list() {
    return await this.userService.list();
  }

}
