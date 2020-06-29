"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

class AlunoController {
  async index(req, res) {
    const alunos = await _Aluno2.default.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email'],
      order: [['id', 'DESC']],
      include: {
        model: _Photo2.default,
        attributes: ['url', 'filename'],
      },
    });

    res.json(alunos);
  }

  async store(req, res) {
    try {
      console.log(req.body);
      const aluno = await _Aluno2.default.create(req.body);
      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ errors: ['ID não encontrado'] });
      }
      const aluno = await _Aluno2.default.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email'],
        order: [['id', 'DESC']],
        include: {
          model: _Photo2.default,
          attributes: ['url', 'filename'],
        },
      });

      if (!aluno) {
        return res.status(400).json({ errors: ['Aluno não encontrado'] });
      }

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ errors: ['ID não encontrado'] });
      }
      const aluno = await _Aluno2.default.findByPk(id);
      if (!aluno) {
        return res.status(400).json({ errors: ['Aluno não encontrado'] });
      }
      const alunoUpdated = await aluno.update(req.body);
      return res.json(alunoUpdated);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ errors: ['ID não encontrado'] });
      }
      const aluno = await _Aluno2.default.findByPk(id);
      if (!aluno) {
        return res.status(400).json({ errors: ['Aluno não encontrado'] });
      }
      await aluno.destroy();
      return res.json({
        nome: aluno.nome,
        email: aluno.email,
        excluído: true,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new AlunoController();
