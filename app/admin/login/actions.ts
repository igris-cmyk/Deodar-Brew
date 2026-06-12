'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { createAdminSessionToken, COOKIE_NAME } from '@/lib/auth';
import { loginSchema } from '@/lib/validators';

export async function loginAction(
  prevState: { error: string | null },
  formData: FormData
) {
  const raw = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: 'Invalid credentials' };
  }

  const { email, password } = parsed.data;

  if (email !== process.env.ADMIN_EMAIL) {
    return { error: 'Invalid credentials' };
  }

  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) {
    return { error: 'Invalid credentials' };
  }

  const valid = await bcrypt.compare(password, hash);
  if (!valid) {
    return { error: 'Invalid credentials' };
  }

  const token = await createAdminSessionToken(email);
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect('/admin');
}
