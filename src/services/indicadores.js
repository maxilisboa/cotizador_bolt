const API_BASE_URL = 'https://mindicador.cl/api';

export const indicadoresService = {
  async getUF() {
    try {
      const response = await fetch(`${API_BASE_URL}/uf`);
      if (!response.ok) throw new Error('Error al obtener UF');
      const data = await response.json();
      return data.serie[0].valor;
    } catch (error) {
      console.error('Error getting UF:', error);
      throw error;
    }
  },

  async getUSD() {
    try {
      const response = await fetch(`${API_BASE_URL}/dolar`);
      if (!response.ok) throw new Error('Error al obtener USD');
      const data = await response.json();
      return data.serie[0].valor;
    } catch (error) {
      console.error('Error getting USD:', error);
      throw error;
    }
  },

  async getAll() {
    try {
      const [uf, usd] = await Promise.all([
        this.getUF(),
        this.getUSD()
      ]);
      return { uf, usd };
    } catch (error) {
      console.error('Error getting indicators:', error);
      throw error;
    }
  }
};
