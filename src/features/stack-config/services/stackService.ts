import { TechItem } from '@/shared/types/techItem';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default class StackService {
  async getPackages(): Promise<TechItem[]> {
    const response = await fetch(`${API_URL}/package/read`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao buscar pacotes.');
    }
    return response.json();
  }

  async getTechs(): Promise<TechItem[]> {
    const response = await fetch(`https://autolib-api.onrender.com/lib/read`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao buscar libs.');
    }

    return response.json();
  }
}
