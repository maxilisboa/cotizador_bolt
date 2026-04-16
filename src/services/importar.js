import { polizasService } from './polizas.js';
import { aseguradorasService } from './aseguradoras.js';
import { vendedoresService } from './vendedores.js';

export const importarService = {
  async processCSV(fileContent) {
    const lines = fileContent.split('\n').filter(line => line.trim());

    if (lines.length === 0) {
      throw new Error('El archivo está vacío');
    }

    const aseguradoras = await aseguradorasService.getAll();

    if (aseguradoras.length === 0) {
      throw new Error('Debe crear al menos una compañía aseguradora antes de importar');
    }

    const vendedores = await vendedoresService.getAll();
    const defaultAseguradora = aseguradoras[0];
    const defaultVendedor = vendedores.length > 0 ? vendedores[0] : null;

    const results = {
      success: 0,
      errors: [],
      total: lines.length
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (!line) continue;

      try {
        const parts = line.split(',').map(p => p.trim());

        if (parts.length < 3) {
          results.errors.push({
            line: i + 1,
            content: line,
            error: 'Formato inválido: se esperan al menos 3 columnas (MARCA,MODELO,AÑO)'
          });
          continue;
        }

        const marca = parts[0];
        const modelo = parts[1];
        const anoStr = parts[2];

        if (!marca || !modelo) {
          results.errors.push({
            line: i + 1,
            content: line,
            error: 'Marca o modelo vacío'
          });
          continue;
        }

        const ano = parseInt(anoStr);
        if (isNaN(ano) || ano < 1900 || ano > 2100) {
          results.errors.push({
            line: i + 1,
            content: line,
            error: `Año inválido: ${anoStr}`
          });
          continue;
        }

        const numeroPoliza = `AUTO-${marca.substring(0, 3).toUpperCase()}-${ano}-${Date.now()}-${i}`;
        const nombreAsegurado = `Propietario ${marca} ${modelo}`;

        const polizaData = {
          fecha: new Date().toISOString().split('T')[0],
          ejecutivo_venta: defaultVendedor?.nombre || 'Importación',
          vendedor_id: defaultVendedor?.id || null,
          categoria: 'Automotriz',
          estado: 'Pendiente',
          numero_poliza: numeroPoliza,
          nombre_asegurado: nombreAsegurado,
          marca: marca,
          modelo: modelo,
          ano: ano,
          aseguradora_id: defaultAseguradora.id,
          deducible: 0,
          prima_bruta_anual_uf: 0,
          prima_neta_anual_uf: 0,
          prima_bruta_mensual_uf: 0,
          prima_neta_mensual_uf: 0,
          monto: 0
        };

        await polizasService.create(polizaData);
        results.success++;

      } catch (error) {
        results.errors.push({
          line: i + 1,
          content: line,
          error: error.message
        });
      }
    }

    return results;
  }
};
