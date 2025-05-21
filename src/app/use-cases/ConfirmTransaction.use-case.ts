export class ConfirmTransactionUseCase {
  async execute(id: string): Promise<string> {
    // Simulación de validación
    const transaccionesValidas = ['abc123', 'trx456'];
    
    if (!transaccionesValidas.includes(id)) {
      throw new Error('Transacción no encontrada');
    }

    // Simular éxito o fallo
    const success = Math.random() > 0.3; // 70% éxito
    return success
      ? `http://localhost:4200/success?id=${id}`
      : `http://localhost:4200/error?id=${id}`;
  }
}
