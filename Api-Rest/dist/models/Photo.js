"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _appHttp = require('../config/appHttp'); var _appHttp2 = _interopRequireDefault(_appHttp);

 class Photo extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      url: {
        type: _sequelize2.default.VIRTUAL,
        get() {
          return `${_appHttp2.default.url}/images/${this.getDataValue('filename')}`;
        },
      },
      originalname: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo está vazio',
          },
        },
      },
      filename: {
        type: _sequelize2.default.STRING,
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
} exports.default = Photo;
