import { NextApiRequest, NextApiResponse } from 'next'

const fn = (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ text: 'Hello' })
}

export default fn;