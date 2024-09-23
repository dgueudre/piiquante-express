import { toJson } from './multipart/toJson';
import { upload } from './multipart/upload';

export const multipart = (bodyField: string, fileField: string) => [
  upload.single(fileField),
  toJson(bodyField),
];
