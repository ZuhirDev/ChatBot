/**
 * Clase base abstracta para proveedores de embeddings.
 * Todos los proveedores deben extender esta clase e implementar el método `embed`.
 */
export class EmbeddingProvider {

  /**
   * @param {string} name - Nombre identificador del proveedor
   */
  constructor(name) {
    if (new.target === EmbeddingProvider) {
      throw new Error('EmbeddingProvider es una clase abstracta y no puede ser instanciada directamente.');
    }
    this.name = name;
  }

  /**
   * Genera embeddings para el texto dado.
   * 
   * @param {string | string[]} inputText - Texto o array de textos a embeber
   * @returns {Promise<number[][]>} - Array de vectores de embedding
   */
  async embed(inputText) {
    throw new Error(`El proveedor "${this.name}" debe implementar el método embed()`);
  }
}
