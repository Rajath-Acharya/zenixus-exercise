import sequelize from '../db/config';
import { Model, DataTypes } from 'sequelize';
import PersonalDetails from './personal-details.model';

export enum Role {
  MANAGER = "MANAGER",
  LEAD = "LEAD",
  DEVELOPER = "DEVELOPER"
}

class User extends Model {
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: Role;
  public reporterId?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
		email: {
      type: DataTypes.STRING,
      allowNull: false,
			unique: true,
			validate: {
        isEmail: {
          msg: 'Invalid email format',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(Role.MANAGER, Role.LEAD, Role.DEVELOPER),
      allowNull: false,
    },
    reporterId: {
      type: DataTypes.UUID,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  }
);

// Associations
User.hasOne(PersonalDetails, { as: "personalDetails", foreignKey: 'userId' });

export default User;