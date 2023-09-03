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

  @Del('/:id')
  async delete(id: string) {
    return await this.userService.delete(id);
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
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
