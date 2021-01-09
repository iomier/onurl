import mongoose, { Schema } from 'mongoose';
import { BaseDocumentData } from './types';
import { maxCustomAliasLength } from '@/constants';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcryptjs';
interface UserField {
  username: string;
  password: string;
}

export type UserData = BaseDocumentData & UserField;
type UserDocument = mongoose.Document & UserField;
export interface IUser extends UserDocument {
  verify(password: string): boolean;
}

const userSchema: Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      maxlength: maxCustomAliasLength,
    },
  },
  { timestamps: true },
);

// To have a custom error message when unique validation fails.
userSchema.plugin(uniqueValidator, {
  message: '"{VALUE}" is already in use. Please use another {PATH}.',
});

userSchema.pre<UserDocument>('save', async function (next) {
  // const user = this;
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.verify = async function (password: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return bcrypt.compare(password, this.password);
};

// For "Cannot overwrite model once compiled" error:
// https://hoangvvo.com/blog/migrate-from-express-js-to-next-js-api-routes/
const User =
  (mongoose.models.User as mongoose.Model<UserDocument>) ||
  mongoose.model<UserDocument>('User', userSchema);

export default User;
