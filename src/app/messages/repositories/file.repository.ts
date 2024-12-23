import { ScopeOptions } from 'sequelize';
import File from '../models/entities/file.entity';

export const createFileInDB = (filePath: string, mimeType: string, size: string) => {
  return File.create({
    filePath,
    mimeType,
    size 
  });
};

export const getFileById = (
  id: number,
  scopes: readonly (string | ScopeOptions)[] = [],
) => {
  return File.scope(scopes).findByPk(id);
};