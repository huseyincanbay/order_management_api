import { JwtConfig } from './jwt-config.interface';

const jwtConfig: JwtConfig = {
  secret: process.env.JWT_SECRET || 'default-secret',
  expiresIn: process.env.JWT_EXPIRES_IN || '1h',
};

export default jwtConfig;
