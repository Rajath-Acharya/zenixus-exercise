import {Request, Response} from 'express';
import PersonalDetails from '../models/personal-details.model';
import logger from '../utils/logger';

interface AddPersonalDetailsPaylaod {
  userId: string,
  fullName?: string,
  address?: string
}

class PersonalDetailsController {

	static async addPersonalDetails(req:Request,res:Response) {		
		try {
			const {fullName, userId, address} = req.body;

      if(!userId) {
        throw Error("userId cannot be empty");
      }

      const payload = {
        userId,
      } as AddPersonalDetailsPaylaod

      if(fullName) {
        payload.fullName = fullName;
      }

      if(address) {
        payload.address = address;
      }

      const defaults = {
        ...(fullName && { fullName }),
        ...(address && { address }),
      }

      const [_, created] = await PersonalDetails.findOrCreate({
        where: { userId },
        defaults,
      });
      
       if (!created) {
         await PersonalDetails.update({ address, fullName }, { where: { userId: payload.userId } });
        }
        
      // Fetch the updated user
      const updatedProfile = await PersonalDetails.findOne({ where: { userId } });
      
   		res.status(200).json({ profile: updatedProfile });
		} catch(error:any) {
			const message = error.message || "Something went wrong";
			logger.error(message)
			res.status(400).json({ error: error });
		}
	}

}

export default PersonalDetailsController;