import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res:NextApiResponse<{signIn:boolean} | {}>) {
    if(req.method === "POST") {
        return res.status(200).json({signIn: true});
    }
    return res.status(400).json({error: "method not supported"});
}