'use client';

import { useCallback, useRef } from 'react';

interface UseAutoPasteOptions {
    onPaste?: (text: string) => void;
    onlyWhenEmpty?: boolean;
}

export function useAutoPaste(options: UseAutoPasteOptions = {}) {
    const {
        onPaste,
        onlyWhenEmpty = true,
    } = options;

    const isPastingRef = useRef(false);

    const handleAutoPaste = useCallback(
        async (currentValue: string, setValue: (text: string) => void) => {
            // Prevent multiple simultaneous paste attempts
            if (isPastingRef.current) return;

            // Only paste if field is empty (when onlyWhenEmpty is true)
            if (onlyWhenEmpty && currentValue.trim().length > 0) {
                return;
            }

            try {
                isPastingRef.current = true;

                // Check if clipboard API is available
                if (!navigator.clipboard || !navigator.clipboard.readText) {
                    console.log('Clipboard API not available');
                    return;
                }

                // Request clipboard permission and read content
                const clipboardText = await navigator.clipboard.readText();

                if (clipboardText && clipboardText.trim().length > 0) {
                    // Set the value
                    setValue(clipboardText);

                    // Call optional callback
                    if (onPaste) {
                        onPaste(clipboardText);
                    }
                }
            } catch (error) {
                // Silently fail if clipboard access is denied or not available
                console.log('Could not access clipboard:', error);
            } finally {
                // Reset the flag after a short delay to prevent immediate re-triggering
                setTimeout(() => {
                    isPastingRef.current = false;
                }, 100);
            }
        },
        [onPaste, onlyWhenEmpty]
    );

    const handleClick = useCallback(
        async (currentValue: string, setValue: (text: string) => void) => {
            await handleAutoPaste(currentValue, setValue);
        },
        [handleAutoPaste]
    );

    const handleFocus = useCallback(
        async (currentValue: string, setValue: (text: string) => void) => {
            await handleAutoPaste(currentValue, setValue);
        },
        [handleAutoPaste]
    );

    return {
        handleClick,
        handleFocus,
        isPasting: () => isPastingRef.current,
    };
}
