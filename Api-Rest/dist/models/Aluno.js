"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _Photo = require('./Photo'); var _Photo2 = _interopRequireDefault(_Photo);

 class Aluno extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter no mínimo 3 caracteres ',
          },
        },
      },

      sobrenome: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo sobrenome deve ter no mínimo 3 caracteres ',
          },
        },
      },

      email: {
        type: _sequelize2.default.STRING,
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
        type: _sequelize2.default.INTEGER,
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
} exports.default = Aluno;
