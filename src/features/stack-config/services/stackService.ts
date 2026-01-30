import { PackageManager, TechItem } from '@/shared/types/techItem';

const API_URL = process.env.NEXT_PUBLIC_URL_API_BASE;

export default class StackService {
  async getPackages(): Promise<PackageManager[]> {
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
    const response = await fetch(`${API_URL}/lib/read`, {
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
