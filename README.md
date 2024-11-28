# 📱 **Producto 3: Interfaz Móvil**

### 📅 **Fecha de Entrega**  
🗓 **8 de diciembre**  
⏰ **Por: 23:59**  
📌 **Puntos Totales**: 25  
🔁 **Intentos Permitidos**: 1  

---

## 🌟 **Descripción**  
Usando el framework **React Native**, desarrollaremos la interfaz para dispositivos móviles. Aprovecharemos el trabajo realizado en los dos primeros productos para transformar las interfaces a "mobile" y conectarlas con nuestra base de datos en **Firebase**.

---

## 🎯 **Objetivos**  
- Conocer y utilizar el framework **React Native** para el desarrollo de una interfaz móvil.

---

## 📝 **Pasos a Seguir**  

1. **📖 Leer las instrucciones:** Identifica los requerimientos de la actividad y revisa la rúbrica de evaluación.  
2. **📚 Consultar recursos:** Usa los materiales facilitados en el aula virtual.  
3. **🛠 Preparar entorno de trabajo:**  
    - Instalar herramientas necesarias para React Native.  
    - Crear un repositorio en GitHub con `.gitignore` para excluir la carpeta `node_modules`.  
4. **📋 Diseñar la interfaz:** Basado en el Producto 1, incluye:  
    - Tres pantallas diferenciadas:  
        - Un reproductor multimedia con botones de interacción.  
        - Un listado.  
        - Una pantalla de detalle.  
5. **🚀 Desarrollo del componente `Inicio`:**  
    - Añade un `FlatList` para mostrar un listado infinito.  
6. **🔥 Integrar Firebase:**  
    - Instalar `react firebase`.  
    - Configurar Firebase e inicializar la conexión con `Firebase.initializeApp`.  
    - Usar el método `once` en `componentDidMount` para obtener datos.  
7. **🔀 Navegación:**  
    - Instalar y configurar **React Native Navigation**.  
    - Crear un Stack con las tres ventanas en `App.js`.  
    - Configurar el menú superior con título, colores y un botón de navegación.  
8. **📤 Subir el proyecto:**  
    - Verificar que compile correctamente en [CodeSandbox](https://codesandbox.io/).  
    - Adjuntar el enlace de GitHub y CodeSandbox en el documento de entrega.

---

## ✅ **Requisitos**  

1. Haber finalizado el **Producto 2** con las correcciones marcadas por el consultor.  
2. Tener instalado **Angular Material** en el proyecto.  

---

## 📚 **Recursos Básicos**  
Consulta el documento **"Recursos de aprendizaje vinculados a los productos"** disponible en el aula virtual.

---

## 🏆 **Criterios de Evaluación**  

| **Criterio**                          | **Puntos Máximos** |  
|---------------------------------------|--------------------|  
| Implementación de React Native        | 35 puntos          |  

📌 **Nota mínima para superar**: 17,5 puntos sobre 35.  

---

## 📦 **Entrega de la Actividad**  

1. 📩 Subir la actividad al canal indicado en el aula virtual.  
2. **Formato de entrega:**  
    - 📄 Documento (DOC o PDF) con:  
        - Documentación del proyecto.  
        - Enlaces a GitHub y CodeSandbox.  
    - 🗜 Archivo comprimido del proyecto **(sin la carpeta `node_modules`)**.  
3. **📁 Nombre del archivo:**  


This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
