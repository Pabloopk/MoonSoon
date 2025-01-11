# useThemeSwitcher Hook

Este projeto fornece um hook React personalizado chamado `useThemeSwitcher`, que permite gerenciar facilmente o tema claro/escuro em sua aplicação React. Ele detecta automaticamente as preferências do usuário, permite alternar entre temas e persiste a escolha no `localStorage`.

---

## Recursos Principais
- Detecta automaticamente a preferência do sistema para o tema (claro ou escuro).
- Permite que o usuário alterne manualmente entre temas.
- Armazena a preferência do usuário no `localStorage` para persistência entre visitas.
- Adiciona/remover automaticamente a classe `dark` ao elemento `<html>` para aplicar estilos.

---

## Como Usar

### 1. Instale o React (se ainda não estiver instalado)
Certifique-se de que seu projeto React está configurado:

```bash
npx create-react-app my-app
cd my-app
```

### 2. Adicione o Hook ao Seu Projeto

Copie o código abaixo para um arquivo chamado `useThemeSwitcher.js` no diretório do seu projeto:

```javascript
import React, { useEffect, useState } from 'react';

const useThemeSwitcher = () => {
    const preferDarkQuery = "(prefers-color-scheme: dark)";
    const [mode, setMode] = useState("");

    useEffect(() => {
        const mediaQuery = window.matchMedia(preferDarkQuery);
        const userPref = window.localStorage.getItem("theme");

        const handleChange = () => {
            const check = userPref
                ? userPref === "dark"
                    ? "dark"
                    : "light"
                : mediaQuery.matches
                ? "dark"
                : "light";
            setMode(check);
        };

        handleChange();
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [preferDarkQuery]);

    useEffect(() => {
        if (mode) {
            document.documentElement.classList.toggle("dark", mode === "dark");
            window.localStorage.setItem("theme", mode);
        }
    }, [mode]);

    return [mode, setMode];
};

export default useThemeSwitcher;
```

### 3. Implemente o Hook em um Componente

Use o hook no seu componente React para alternar entre temas:

```javascript
import React from 'react';
import useThemeSwitcher from './useThemeSwitcher';

const App = () => {
    const [theme, setTheme] = useThemeSwitcher();

    return (
        <div>
            <h1>Current Theme: {theme}</h1>
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                Toggle Theme
            </button>
        </div>
    );
};

export default App;
```

---

## Como Funciona

1. **Detecção de Preferência do Sistema:** O hook utiliza a consulta de mídia `window.matchMedia` para verificar se o usuário prefere o modo escuro.
2. **Persistência com localStorage:** A escolha do tema pelo usuário é salva no `localStorage` para garantir que a configuração seja mantida ao recarregar ou revisitar o site.
3. **Classe CSS Dinâmica:** A classe `dark` é adicionada ou removida do elemento raiz (`<html>`), permitindo que os estilos CSS sejam aplicados de acordo com o tema.

---

## Exemplo de CSS

Aqui está um exemplo de como você pode definir estilos para os temas:

```css
/* Tema claro (default) */
body {
    background-color: white;
    color: black;
}

/* Tema escuro */
html.dark body {
    background-color: black;
    color: white;
}
```

---

## Benefícios
- Simples de implementar e usar.
- Respeita as configurações de preferência de tema do usuário.
- Garante uma experiência consistente com o armazenamento no `localStorage`.

---

## Requisitos
- React 16.8 ou superior (para suporte aos hooks).
- Navegadores modernos que suportem `window.matchMedia`.

---



