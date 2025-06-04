import { Injectable, NotFoundException } from '@nestjs/common';
import { IEntity } from './IEntity';

interface Query<T> {
  where?: T;
}

@Injectable()
export class Repository<T extends IEntity> {
  private readonly storage: Array<T>;

  constructor(storage: Array<T>) {
    this.storage = storage;
  }

  async findOne(query: Query<unknown>): Promise<T | undefined> {
    if (!query.where) throw new Error("Query rule 'where' should be provided");
    // Probably doesn't needed, will return undefined if found nothing
    // if (!Object.keys(defaultUser).includes(Object.keys(query.where)[0]))
    //   throw new Error('Query should provide existing object field');
    const result = this.storage.find(
      (entity) =>
        entity[Object.keys(query.where)[0]] === Object.values(query.where)[0],
    );
    if (!result) {
      throw new NotFoundException(
        `Item with query ${JSON.stringify(query.where)} not found.`,
      );
    }
    return result;
  }

  async find(query?: Query<unknown>): Promise<T[] | undefined> {
    if (!query) return this.storage;
    return this.storage.filter(
      (entity) =>
        entity[Object.keys(query.where)[0]] === Object.values(query.where)[0],
    );
  }

  async save(dto: T): Promise<T> {
    const initialIdx = this.storage.findIndex((fItem) => fItem.id === dto.id);
    if (initialIdx > -1) this.storage.splice(initialIdx, 1);
    this.storage.push(dto);
    return dto;
  }

  async delete(id: string): Promise<T> {
    const initialIdx = this.storage.findIndex((fItem) => fItem.id === id);
    if (initialIdx === -1)
      throw new NotFoundException(`Item with id ${id} not found.`);
    const entity = this.storage[initialIdx];
    if (initialIdx > -1) this.storage.splice(initialIdx, 1);
    return entity;
  }
}
