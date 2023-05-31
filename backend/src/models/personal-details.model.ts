import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/config';

class PersonalDetails extends Model {
  public userId!: string;
  public fullName!: string;
  public address!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

PersonalDetails.init(
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'PersonalDetails',
    tableName: 'personal_details',
  }
);

export default PersonalDetails;
