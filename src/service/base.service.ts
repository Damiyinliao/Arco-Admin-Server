import { Inject } from "@midwayjs/decorator";
import { Context } from "@midwayjs/koa";
import { Repository, FindOptionsWhere } from "typeorm";
import { BaseEntity } from "../entity/base.entity";


export abstract class BaseService<T extends BaseEntity> {
  @Inject()
  ctx: Context;

  public abstract getModel(): Repository<T>

  /**
   * @description 创建
   * @param entity
   * @returns
   */
  async create(entity: T) {
    return await this.getModel().save(entity)
  }

  /**
   * @description 更新
   * @param entity
   * @returns
   */
  async update(entity: T) {
    return await this.getModel().save(entity)
  }

  /**
   * @description 删除
   * @param ids
   * @returns
   */
  async delete(ids: number | number[] | string | string[]) {
    return await this.getModel().delete(ids)
  }

  /**
   * @description 根据id查询
   * @param id
   * @returns
   */
  async getById(id: string): Promise<T> {
    return await this.getModel().createQueryBuilder().where('model.id = :id', { id }).getOne()
  }

  /**
   * @description 分页查询
   * @param page
   * @param size
   * @param where
   * @returns
   */
  async page(page: number, size: number, where?: FindOptionsWhere<T>) {
    const order: any = { createTime: 'desc' };

    const [list, total] = await this.getModel().findAndCount({
      where,  // 查询条件
      order,  // 排序
      take: size, // 每页多少条
      skip: (page-1) * size // 跳过多少条
    })
    return { list, total }
  }

  /**
   * @description 查询所有
   * @param where
   * @returns
   */
  async list(where?: FindOptionsWhere<T>) {
    const order: any = { createTime: 'desc' };
    const data = await this.getModel().find({
      where,  // 查询条件
      order,  // 排序
    })
    return data
  }
}
