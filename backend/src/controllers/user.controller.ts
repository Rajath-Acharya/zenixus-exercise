import {Request, Response} from 'express';
import User, { Role } from '../models/user.model';
import logger from '../utils/logger';
import PersonalDetails from '../models/personal-details.model';
import { Op } from 'sequelize';

class UserController {

	static async updateReporterId(req:Request,res:Response) {		
		try {
			const { reporteeId } = req.params;
      const userId = res.locals.userId;
      const user = await User.findByPk(reporteeId);
      // Update the reportedId
      if(user) {
        await user.update({ reporterId: userId });
      }
   		res.status(200).json({ message: "Successfully updated reporter ID" });
		} catch(error:any) {
			const message = error.message || "Something went wrong";
			logger.error(message)
			res.status(400).json({ error: message });
		}
	}

	static async deleteReportId(req:Request,res:Response) {		
		try {
			const { reporteeId } = req.params;
      const user = await User.findByPk(reporteeId);
      // Delete the reportedId
      if(user) {
        await user.update({ reporterId: null });
      }
   		res.status(204).json({ message: "Successfully removed reporter ID" });
		} catch(error:any) {
			const message = error.message || "Something went wrong";
			logger.error(message)
			res.status(400).json({ error: message });
		}
	}

	static async getSubordinates(_:Request,res:Response) {		
		try {
			const userId = res.locals.userId;
      const user = await User.findByPk(userId);
      if(user) {
        const role = user.role;
        if(role === Role.MANAGER) {
          // Find users by role (Lead or Developer) and include personal details
          const users = await User.findAll({
            where: {
              [Op.or]: [
                { '$role$': Role.LEAD },
                { '$role$': Role.DEVELOPER },
              ],
            },
            include: [
              {
                model: PersonalDetails,
                as: 'personalDetails',
              },
            ],
          });
          return res.status(200).json({ users });
        }
        if(role === Role.LEAD) {
        // Find users by role and include personal details
          const users = await User.findAll({
            where: { role: Role.DEVELOPER },
            include: [
              {
                model: PersonalDetails,
                as: 'personalDetails',
              },
            ],
          });
          return res.status(200).json({ users });
        }
      }
  
		} catch(error:any) {
			const message = error.message || "Something went wrong";
			logger.error(message)
			res.status(400).json({ error: message });
		}
	}

  	static async getUserInfo(_:Request,res:Response) {		
		try {
      const userId = res.locals.userId;
      const user = await User.findByPk(userId, {
        include: [
          {
            model: PersonalDetails,
            as: 'personalDetails',
          },
        ],
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Exclude the password field from the response
    	const { password: _, ...userWithoutPassword } = user.toJSON();
   		res.status(200).json({ user: userWithoutPassword });
		} catch(error:any) {
			const message = error.message || "Something went wrong";
			logger.error(message)
			res.status(400).json({ error: message });
		}
	}

}

export default UserController;