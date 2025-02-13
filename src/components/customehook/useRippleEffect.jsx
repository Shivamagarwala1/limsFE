import { useEffect } from "react";

const useRippleEffect = () => {
    useEffect(() => {
        const createRipple = (event) => {
            const button = event.currentTarget;

            // Create ripple element
            const ripple = document.createElement("span");
            ripple.classList.add("ripple");

            // Get button size
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;

            // Get click position inside the button
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            // Append ripple to the button
            button.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        };

        const buttons = document.querySelectorAll("[data-ripple-light='true']");
        buttons.forEach((button) => {
            button.addEventListener("click", createRipple);
        });

        return () => {
            buttons.forEach((button) => {
                button.removeEventListener("click", createRipple);
            });
        };
    }, []);
};

export default useRippleEffect;
