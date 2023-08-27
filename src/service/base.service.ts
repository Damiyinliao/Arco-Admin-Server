import { Provide } from "@midwayjs/core";
import { Repository } from "typeorm";
import { BaseEntity } from "../entity/base.entity";

@Provide()
export abstract class BaseService<T extends BaseEntity> {
  public abstract entity: Repository<T>

  add(query: any) {
    return this.entity.save(query)
  }

  update(query: any) {
    return this.entity.update(query.id, query)
  }

  delete(ids: number | number[] | string | string[]) {
    return this.entity.delete(ids)
  }

  info(data: any) {
    return this.entity.findOne({ where: data })
  }

  async page(data) {
    const { page = 1, size = 10 } = data;
    const [list, total] = await this.entity.findAndCount({
      where: {},
      take: size,
      skip: (page - 1) * size
    })
    return { list, pagination: { total, size, page } }
  }

  list(data?: any) {
    return this.entity.find({ where: data } as any)
  }
}
