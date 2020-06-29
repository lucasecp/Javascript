import Aluno from '../models/Aluno';
import Photo from '../models/Photo';

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email'],
      order: [['id', 'DESC']],
      include: {
        model: Photo,
        attributes: ['url', 'filename'],
      },
    });

    res.json(alunos);
  }

  async store(req, res) {
    try {
      console.log(req.body);
      const aluno = await Aluno.create(req.body);
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
      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email'],
        order: [['id', 'DESC']],
        include: {
          model: Photo,
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
      const aluno = await Aluno.findByPk(id);
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
      const aluno = await Aluno.findByPk(id);
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

export default new AlunoController();
