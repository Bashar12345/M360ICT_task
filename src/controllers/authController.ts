// src/controllers/authController.ts

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';
import knex from '../db';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [userId] = await knex('users').insert({
      username,
      password: hashedPassword,
    });

    res.status(201).json({ id: userId, token: generateToken(userId) });
  } catch (error) {
    res.status(400).json({ error: 'Failed to register' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await knex('users').where({ username }).first();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ id: user.id, token: generateToken(user.id) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
};
