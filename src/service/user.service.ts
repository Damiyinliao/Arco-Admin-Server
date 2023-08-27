import { Provide } from '@midwayjs/core';
import { IUserOptions } from '../interface';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { User } from '../entity/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>

  // 新增
  async create(user: User) {
    await this.userModel.save(user);
    return user;
  }

  // 删除
  async delete(user: User) {
    return await this.userModel.remove(user);
  }

  // 修改
  async update(user: User) {
    return await this.userModel.save(user);
  }

  // 根据id查询
  async getById(id: number) {
    return await this.userModel.findOne({ where: { id }});
  }

  // 分页查询
  async page(page: number, pageSize: number, where?: FindOptionsWhere<User>) {
    const order: any = { createDate: 'desc' };
    const [data, total] = await this.userModel.findAndCount({
      where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      order
    });
    return { data, total };
  }

  // 根据查询条件返回全部
  async list(where?: FindOptionsWhere<User>) {
    const order: any = { create_time: 'desc' };
    const data = await this.userModel.find({
      where,
      order,
    });

    return data;
  }

}
