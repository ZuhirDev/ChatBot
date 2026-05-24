/**
 * Clase base abstracta para proveedores de LLM.
 * Todos los proveedores deben extender esta clase e implementar el método `chat`.
 */
export class LLMProvider {

  /**
   * @param {string} name - Nombre identificador del proveedor
   */
  constructor(name) {
    if (new.target === LLMProvider) {
      throw new Error('LLMProvider es una clase abstracta y no puede ser instanciada directamente.');
    }
    this.name = name;
  }

  /**
   * Genera una respuesta del modelo de lenguaje.
   * 
   * @param {Object} params
   * @param {string} params.systemPrompt - Instrucciones del sistema
   * @param {string} params.context - Contexto relevante para la pregunta
   * @param {string} params.message - Mensaje/pregunta del usuario
   * @returns {Promise<string>} - Respuesta generada por el modelo
   */
  async chat({ systemPrompt, context, message }) {
    throw new Error(`El proveedor "${this.name}" debe implementar el método chat()`);
  }
}
