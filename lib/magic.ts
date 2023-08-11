import { Magic } from 'magic-sdk';

const createMagic = (key: string | undefined): Magic | null => {
    if (typeof window !== 'undefined' && key) {
        return new Magic(key);
    }
    return null;
};

// Pass in your publishable key from your .env file
export const magic: Magic | null = createMagic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
