import { Magic } from '@magic-sdk/admin';
import { NextApiRequest, NextApiResponse } from 'next';

// Create an instance of magic admin using our secret key (not our publishable key)
const mAdmin = new Magic(process.env.NEXT_PUBLIC_MAGIC_SECRET_KEY as string);

export default async function login(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        // Check if the authorization header is present
        if (!req.headers.authorization) {
            throw new Error('Authorization header missing');
        }

        // Grab the DID token from our headers and parse it
        const didToken = mAdmin.utils.parseAuthorizationHeader(
            req.headers.authorization,
        );
        // Validate the token and send back a successful response
        await mAdmin.token.validate(didToken);
        res.status(200).json({ authenticated: true });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
