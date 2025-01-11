import React, { useEffect, useState } from 'react';
// Importa o React e os hooks `useEffect` e `useState` para manipular estado e efeitos colaterais.

const useThemeSwitcher = () => {
    // Declaração de um hook personalizado chamado `useThemeSwitcher`.

    const preferDarkQuery = "(prefers-color-scheme: dark)";
    // Define uma string que será usada como consulta de mídia para verificar se o usuário prefere o modo escuro.

    const [mode, setMode] = useState("");
    // Cria um estado `mode` para armazenar o tema atual ("dark" ou "light") e `setMode` para atualizá-lo.

    useEffect(() => {
        // Hook `useEffect` para lidar com a configuração inicial do tema e mudanças no sistema.

        const mediaQuery = window.matchMedia(preferDarkQuery);
        // Cria um objeto `mediaQuery` que verifica se o sistema do usuário prefere o modo escuro.

        const userPref = window.localStorage.getItem("theme");
        // Recupera a preferência do usuário armazenada no localStorage, se existir.

        const handleChange = () => {
            // Função que define o tema com base na preferência do usuário ou no sistema.

            const check = userPref
                ? userPref === "dark"
                    ? "dark"
                    : "light"
                : mediaQuery.matches
                ? "dark"
                : "light";
            // Determina o tema: 
            // 1. Se `userPref` existe, usa a preferência armazenada ("dark" ou "light").
            // 2. Caso contrário, usa a configuração do sistema (modo escuro ou claro).

            setMode(check);
            // Atualiza o estado `mode` com o valor calculado.
        };

        handleChange();
        // Executa a função `handleChange` uma vez para configurar o tema inicial.

        mediaQuery.addEventListener("change", handleChange);
        // Adiciona um ouvinte de eventos para monitorar mudanças na preferência de tema do sistema.

        return () => mediaQuery.removeEventListener("change", handleChange);
        // Remove o ouvinte de eventos quando o componente é desmontado, para evitar vazamentos de memória.

    }, [preferDarkQuery]);
    // O `useEffect` será executado apenas quando `preferDarkQuery` mudar (praticamente nunca, neste caso).

    useEffect(() => {
        // Hook `useEffect` que é executado sempre que o estado `mode` mudar.

        if (mode) {
            // Verifica se o `mode` não está vazio (para evitar execução desnecessária).

            document.documentElement.classList.toggle("dark", mode === "dark");
            // Adiciona ou remove a classe `dark` no elemento raiz (`<html>`) com base no valor de `mode`.

            window.localStorage.setItem("theme", mode);
            // Armazena a preferência do usuário no localStorage para persistir entre visitas.
        }
    }, [mode]);
    // O `useEffect` depende do estado `mode`, então será executado sempre que `mode` for alterado.

    return [mode, setMode];
    // Retorna o estado atual do tema (`mode`) e a função para atualizá-lo (`setMode`) como um array.
};

export default useThemeSwitcher;
// Exporta o hook para ser utilizado em outros componentes.
