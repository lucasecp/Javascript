import Sequelize, { Model } from 'sequelize';
import appHttp from '../config/appHttp';

export default class Photo extends Model {
  static init(sequelize) {
    super.init({
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appHttp.url}/images/${this.getDataValue('filename')}`;
        },
      },
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo está vazio',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo está vazio',
          },
        },
      },

    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' });
  }
}
