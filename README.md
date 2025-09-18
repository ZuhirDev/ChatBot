# 🤖 ChatBot Inteligente con RAG

Un **asistente virtual avanzado** diseñado para interactuar con los usuarios a través de un chatbot que responde preguntas basándose exclusivamente en documentación propia y personalizada.

Este proyecto implementa la técnica de **RAG (Retrieval Augmented Generation)**, que asegura que el chatbot proporcione respuestas fundamentadas únicamente en la información almacenada en el sistema, evitando la generación de contenido externo o inventado.

---

## ¿Qué es RAG?

**RAG (Retrieval Augmented Generation)** es una metodología que combina dos procesos clave: la recuperación de información y la generación de texto.

Primero, el sistema recupera fragmentos relevantes de una base de datos o documentos específicos (*retrieval*). Luego, un modelo de lenguaje genera respuestas precisas y contextualizadas basándose en esa información (*generation*).

Gracias a este enfoque, el chatbot ofrece respuestas confiables y fundamentadas exclusivamente en la documentación proporcionada, eliminando el riesgo de generar contenido incorrecto o fuera de contexto.

---

## ✨ Características principales

- 📂 **Carga y gestión de documentación**  
  Usuarios autorizados pueden subir documentos en formatos **PDF, TXT o MD**.  
  Los archivos se procesan, dividen en fragmentos (*chunks*) y se almacenan en una **base de datos vectorial** que optimiza las búsquedas.

- 🧠 **Respuestas inteligentes con RAG**  
  El chatbot responde únicamente en función de la documentación disponible.  
  👉 En caso de no encontrar información relevante, comunica de forma clara que no dispone de datos suficientes para responder.

- 💬 **Interacción en tiempo real**  
  Comunicación fluida a través de un **widget de chat flotante**, que ofrece una experiencia de usuario ágil y amigable.

- 🔐 **Seguridad y control de acceso**  
  Solo usuarios autenticados pueden subir y gestionar documentos, garantizando la privacidad, seguridad y actualización constante de la base de conocimiento.

---

## 🔧 Funcionamiento

1. **Procesamiento y almacenamiento de documentos**  
   - Los archivos (PDF, TXT, MD) se procesan automáticamente.  
   - Se extrae su contenido y se fragmenta en bloques manejables (*chunks*).  
   - Se generan vectores de características (*embeddings*) que se almacenan en una base vectorial optimizada para búsquedas eficientes.

2. **Consulta a través del chatbot**  
   - El usuario realiza una pregunta mediante el chat.  
   - El sistema busca en la base vectorial los fragmentos más relevantes.  
   - El modelo de lenguaje genera una respuesta contextualizada utilizando esta información.

3. **Respuesta al usuario**  
   - Si existen datos pertinentes, se ofrece una respuesta **precisa, clara y concisa**.  
   - Si no hay información suficiente, el chatbot informa de manera transparente que no puede proporcionar una respuesta adecuada en ese momento.

---
