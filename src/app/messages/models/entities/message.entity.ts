import { DataTypes, Model, Optional, Order } from 'sequelize';
import sequelize from '../../../../../config/database';
import File from './file.entity';

export enum MessageTypes {
  text = 1,
  file = 2,
}

interface MessageAttributes {
  id: number;
  userId: number;
  type: MessageTypes; // 1 = text, 2 = file
  content?: string;
  fileId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  file?: File;
}

type MessageCreationAttributes = Optional<MessageAttributes, 'id' | 'content' | 'fileId'>;

class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  public id!: number;
  public userId!: number;
  public type!: MessageTypes;
  public content?: string;
  public fileId?: number;
  public file?: File;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    fileId: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    tableName: 'messages',
    modelName: 'Message',
    scopes: {
      withFile: () => ({
        include: [
          {
            model: File,
            as: 'file'
          }
        ]
      }),
      orderBy: (order = 'desc', field = 'id', additionalOrder = false) => {
        const orderBy: Order = [[field, order]];

        if (field !== 'id' && additionalOrder) {
          orderBy.push(['id', order]);
        }

        return { order: orderBy };
      },
      pagination: (limit: number, offset: number) => ({ limit, offset }),
    }
  }
);

Message.belongsTo(File, {
  foreignKey: 'fileId',
  as: 'file'
});

export default Message;