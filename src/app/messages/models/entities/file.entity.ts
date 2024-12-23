import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../../../../config/database';

interface FileAttributes {
  id: number;
  filePath: string;
  mimeType: string;
  size: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type FileCreationAttributes = Optional<FileAttributes, 'id'>;

class File extends Model<FileAttributes, FileCreationAttributes> implements FileAttributes {
  public id!: number;
  public filePath!: string;
  public mimeType!: string;
  public size!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

File.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    filePath: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    mimeType: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'files',
    modelName: 'File',
  }
);

export default File;