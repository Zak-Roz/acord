import File from '../entities/file.entity';

export class FileDto {
  readonly id: number;
  readonly filePath: string;
  readonly mimeType: string;
  readonly size: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(data: File) {
    this.id = data.id;
    this.filePath = data.filePath;
    this.mimeType = data.mimeType;
    this.size = data.size;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export const responseFileSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    filePath: { type: 'string' },
    mimeType: { type: 'string' },
    size: { type: 'string' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
};
