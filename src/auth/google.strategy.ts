import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
   super({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: process.env.GOOGLE_CALLBACK_URL!,
  scope: ['email', 'profile'],

  passReqToCallback: false,
});
  }

async validate(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
) {
  const email = profile.emails?.[0]?.value;
  const nome = profile.displayName;

  if (!email) {
    throw new Error('Google não retornou email');
  }

  return {
    email,
    nome,
  };

  }
}