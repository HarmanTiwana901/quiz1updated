import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/database"
import { ResponseFuncs } from "../../../utils/types"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

 
  const catcher = (error: Error) => res.status(400).json({ error })


  const handleCase: ResponseFuncs = {
    
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Flamingos } = await connect() // connect to database
      res.json(await Flamingos.find({}).catch(catcher))
    },
    
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Flamingos } = await connect() // connect to database
      res.json(await Flamingos.create(req.body).catch(catcher))
    },
  }

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}

export default handler