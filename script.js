// Arquivo: script.js
// Lógica combinada para o seletor de tema e animações de scroll

document.addEventListener('DOMContentLoaded', () => {

    /**
     * LÓGICA DO SELETOR DE TEMA (MODO CLARO/ESCURO)
     */
    const themeToggleButton = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement; // Seleciona o elemento <html>

    // Função para aplicar o tema
    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme); // Salva a preferência no localStorage
    };

    // Event listener para o botão de alternância
    themeToggleButton.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // Lógica de inicialização do tema
    // 1. Verifica se há uma preferência salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    // 2. Se não houver, verifica a preferência do sistema operacional
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        // Aplica o tema salvo se existir
        applyTheme(savedTheme);
    } else if (prefersDark) {
        // Aplica o tema escuro se for a preferência do sistema
        applyTheme('dark');
    }
    // Se nenhuma condição for atendida, o padrão 'light' do HTML será usado.


    /**
     * LÓGICA DE ANIMAÇÃO AO ROLAR A PÁGINA (SCROLL)
     */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(element => observer.observe(element));
    } else {
        // Fallback para navegadores antigos
        animatedElements.forEach(element => element.classList.add('is-visible'));
    }

});