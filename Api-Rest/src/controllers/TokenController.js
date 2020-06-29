import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    const { password = '', email = '' } = req.body;

    if (!email || !password) return res.status(401).json({ erros: ['credenciais inválidas'] });
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ erros: ['Usuário não existe'] });
    }
    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        erros: ['Senha  inválida'],
      });
    }
    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res.json({ token });
  }
}

export default new TokenController();
