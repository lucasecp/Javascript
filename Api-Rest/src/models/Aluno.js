import Sequelize, { Model } from 'sequelize';
import Photo from './Photo';

export default class Aluno extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter no mínimo 3 caracteres ',
          },
        },
      },

      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo sobrenome deve ter no mínimo 3 caracteres ',
          },
        },
      },

      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já cadastrado',
        },
        validate: {
          isEmail: {
            msg: 'E-mail inválido ',
          },
        },
      },

      idade: {
        type: Sequelize.INTEGER,
        validate: {
          isInt: {
            msg: 'Idade inválida',
          },
        },
      },
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: 'aluno_id' });
  }
}
